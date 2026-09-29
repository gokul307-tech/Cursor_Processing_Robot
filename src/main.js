import * as THREE from 'three';
import './style.css';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020106);

const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 1.25, 7.6);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
document.querySelector('#app').appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x4d3766, 1.8));
const key = new THREE.PointLight(0xff4edb, 85, 15, 2);
key.position.set(3, 3.5, 4);
scene.add(key);
const fill = new THREE.PointLight(0x563bff, 55, 12, 2);
fill.position.set(-4, 1, 2);
scene.add(fill);

// Ground glow
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(22, 22),
  new THREE.MeshBasicMaterial({ color: 0x16001e, transparent: true, opacity: 0.8 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2.05;
scene.add(floor);

// Stars / processing particles
const stars = new THREE.BufferGeometry();
const starCount = Math.min(2600, Math.max(700, Math.floor(innerWidth * innerHeight / 650)));
const positions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i++) {
  const i3 = i * 3;
  positions[i3] = (Math.random() - .5) * 18;
  positions[i3 + 1] = (Math.random() - .5) * 10;
  positions[i3 + 2] = -Math.random() * 14 - 2;
}
stars.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const starMat = new THREE.PointsMaterial({ color: 0xb9a6ff, size: .018, transparent: true, opacity: .7, sizeAttenuation: true });
scene.add(new THREE.Points(stars, starMat));

// Black-hole style backdrop
const bh = new THREE.Group();
const shadow = new THREE.Mesh(
  new THREE.SphereGeometry(1.15, 64, 64),
  new THREE.MeshBasicMaterial({ color: 0x000000 })
);
bh.add(shadow);
const ring = new THREE.Mesh(
  new THREE.TorusGeometry(1.55, .08, 18, 160),
  new THREE.MeshBasicMaterial({ color: 0x8c20ff, transparent: true, opacity: .32 })
);
ring.rotation.x = .25;
bh.add(ring);
bh.position.set(0, 1.2, -5.5);
scene.add(bh);

// Robot
const robot = new THREE.Group();
robot.position.y = -0.65;
scene.add(robot);

const bodyMat = new THREE.MeshStandardMaterial({ color: 0x09091a, metalness: .78, roughness: .22 });
const sideMat = new THREE.MeshStandardMaterial({ color: 0x282834, metalness: .72, roughness: .28 });
const glowMat = new THREE.MeshStandardMaterial({ color: 0x7600ff, emissive: 0x6500ff, emissiveIntensity: 2.5, metalness: .35, roughness: .22 });

const body = new THREE.Mesh(new THREE.BoxGeometry(2.65, 2.0, 2.25), bodyMat);
body.position.y = -.55;
body.scale.set(1, 1, .92);
robot.add(body);

const chest = new THREE.Mesh(
  new THREE.BoxGeometry(2.48, 1.82, .12),
  new THREE.MeshStandardMaterial({ color: 0x080817, metalness: .7, roughness: .18 })
);
chest.position.set(0, -.55, 1.15);
robot.add(chest);

const chestLine = new THREE.Mesh(new THREE.BoxGeometry(2.15, .035, .035), glowMat);
chestLine.position.set(0, -.1, 1.23);
robot.add(chestLine);

const neck = new THREE.Mesh(new THREE.CylinderGeometry(.42, .55, .7, 32), bodyMat);
neck.position.y = .62;
robot.add(neck);

const head = new THREE.Group();
head.position.y = 1.42;
robot.add(head);

const headShell = new THREE.Mesh(new THREE.BoxGeometry(2.9, 1.78, 1.55), sideMat);
headShell.scale.set(1, .94, 1);
headShell.castShadow = true;
head.add(headShell);

const face = new THREE.Mesh(
  new THREE.BoxGeometry(2.66, 1.55, .13),
  new THREE.MeshStandardMaterial({ color: 0x21003d, emissive: 0x4b00aa, emissiveIntensity: 1.6, metalness: .35, roughness: .2 })
);
face.position.z = .81;
head.add(face);

const frame = new THREE.Mesh(new THREE.BoxGeometry(2.82, 1.69, .08), glowMat);
frame.position.z = .86;
head.add(frame);

// Eyes
const eyeMat = new THREE.MeshStandardMaterial({ color: 0xf5f2ff, emissive: 0x8c74ff, emissiveIntensity: .45, metalness: .1, roughness: .2 });
const eyeGeo = new THREE.SphereGeometry(.23, 32, 32);
const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
eyeL.position.set(-.55, .1, .9);
eyeR.position.set(.55, .1, .9);
head.add(eyeL, eyeR);

const eyeGlowMat = new THREE.MeshBasicMaterial({ color: 0xcbbdff, transparent: true, opacity: .35 });
for (const x of [-.55, .55]) {
  const glow = new THREE.Mesh(new THREE.SphereGeometry(.34, 24, 24), eyeGlowMat);
  glow.position.set(x, .1, .87);
  head.add(glow);
}

// Side antenna / ear
const ear = new THREE.Mesh(new THREE.CylinderGeometry(.12, .16, .5, 24), bodyMat);
ear.rotation.z = Math.PI / 2;
ear.position.set(1.5, 1.45, 0);
head.add(ear);

// Cursor target
const pointer = new THREE.Vector2();
const targetWorld = new THREE.Vector3();
const raycaster = new THREE.Raycaster();
const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 2.8);
const cursorDot = new THREE.Mesh(
  new THREE.SphereGeometry(.06, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
scene.add(cursorDot);

const trail = [];
const trailGroup = new THREE.Group();
scene.add(trailGroup);

addEventListener('pointermove', (e) => {
  pointer.x = (e.clientX / innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / innerHeight) * 2 + 1;
});

function updateTarget() {
  raycaster.setFromCamera(pointer, camera);
  raycaster.ray.intersectPlane(plane, targetWorld);
  targetWorld.x = THREE.MathUtils.clamp(targetWorld.x, -4.7, 4.7);
  targetWorld.y = THREE.MathUtils.clamp(targetWorld.y, -1.4, 4.4);
  targetWorld.z = -2.1;
}

const clock = new THREE.Clock();
let processValue = 0;
let scanPulse = 0;

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), .05);
  const t = clock.elapsedTime;

  updateTarget();

  // Smooth robot head tracking: independent of frame rate.
  const localTarget = targetWorld.clone();
  head.parent.worldToLocal(localTarget);
  const desiredYaw = Math.atan2(localTarget.x, Math.max(.5, localTarget.z));
  const desiredPitch = Math.atan2(localTarget.y - head.position.y, 4.5);
  head.rotation.y = THREE.MathUtils.damp(head.rotation.y, THREE.MathUtils.clamp(desiredYaw * .72, -.7, .7), 7, dt);
  head.rotation.x = THREE.MathUtils.damp(head.rotation.x, THREE.MathUtils.clamp(-desiredPitch * .45, -.35, .35), 7, dt);

  const distance = robot.position.distanceTo(targetWorld);
  processValue = THREE.MathUtils.damp(processValue, THREE.MathUtils.clamp(1 - distance / 6, 0, 1), 4, dt);
  scanPulse += dt * (2 + processValue * 6);

  robot.position.y = -.65 + Math.sin(t * 1.25) * .025;
  body.rotation.y = THREE.MathUtils.damp(body.rotation.y, pointer.x * .045, 4, dt);
  ring.rotation.z += dt * .22;
  bh.rotation.y += dt * .04;

  cursorDot.position.lerp(targetWorld, 1 - Math.exp(-12 * dt));
  cursorDot.scale.setScalar(1 + Math.sin(scanPulse) * .25);

  // Processing particles
  if (trail.length < 90 && Math.random() < 0.25 + processValue * .6) {
    const p = new THREE.Mesh(
      new THREE.SphereGeometry(.012 + Math.random() * .018, 8, 8),
      new THREE.MeshBasicMaterial({ color: Math.random() > .5 ? 0xc400ff : 0x7b63ff, transparent: true })
    );
    p.position.copy(cursorDot.position);
    p.userData.life = 1;
    trailGroup.add(p);
    trail.push(p);
  }
  for (let i = trail.length - 1; i >= 0; i--) {
    const p = trail[i];
    p.userData.life -= dt * 1.7;
    p.material.opacity = Math.max(0, p.userData.life);
    p.scale.multiplyScalar(1 + dt * 1.5);
    if (p.userData.life <= 0) {
      trailGroup.remove(p);
      p.geometry.dispose();
      p.material.dispose();
      trail.splice(i, 1);
    }
  }

  document.querySelector('#cursorReadout').textContent = `${pointer.x.toFixed(2)}, ${pointer.y.toFixed(2)}`;
  document.querySelector('#distanceReadout').textContent = distance.toFixed(2);
  document.querySelector('#processReadout').textContent = processValue > .68 ? 'PROCESSING' : processValue > .25 ? 'SCANNING' : 'IDLE';

  camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * .22, 2, dt);
  camera.position.y = THREE.MathUtils.damp(camera.position.y, 1.25 + pointer.y * .12, 2, dt);
  camera.lookAt(0, .35, -1.7);

  renderer.render(scene, camera);
}
animate();

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
});
