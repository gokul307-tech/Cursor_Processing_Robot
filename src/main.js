import * as THREE from 'three';
import './style.css';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020106);

const camera = new THREE.PerspectiveCamera(
  42,
  innerWidth / innerHeight,
  0.1,
  100
);

camera.position.set(0, 1.25, 7.6);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance'
});

renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

document.querySelector('#app').appendChild(renderer.domElement);

// ======================================================
// LIGHTING
// ======================================================

scene.add(new THREE.AmbientLight(0x4d3766, 1.8));

const keyLight = new THREE.PointLight(
  0xff4edb,
  85,
  15,
  2
);

keyLight.position.set(3, 3.5, 4);
scene.add(keyLight);

const fillLight = new THREE.PointLight(
  0x563bff,
  55,
  12,
  2
);

fillLight.position.set(-4, 1, 2);
scene.add(fillLight);

// ======================================================
// FLOOR
// ======================================================

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(22, 22),
  new THREE.MeshBasicMaterial({
    color: 0x16001e,
    transparent: true,
    opacity: 0.8
  })
);

floor.rotation.x = -Math.PI / 2;
floor.position.y = -2.05;

scene.add(floor);

// ======================================================
// STAR FIELD
// ======================================================

const stars = new THREE.BufferGeometry();

const starCount = Math.min(
  2600,
  Math.max(
    700,
    Math.floor((innerWidth * innerHeight) / 650)
  )
);

const positions = new Float32Array(
  starCount * 3
);

for (let i = 0; i < starCount; i++) {

  const i3 = i * 3;

  positions[i3] =
    (Math.random() - 0.5) * 18;

  positions[i3 + 1] =
    (Math.random() - 0.5) * 10;

  positions[i3 + 2] =
    -Math.random() * 14 - 2;
}

stars.setAttribute(
  'position',
  new THREE.BufferAttribute(
    positions,
    3
  )
);

const starMaterial = new THREE.PointsMaterial({
  color: 0xb9a6ff,
  size: 0.018,
  transparent: true,
  opacity: 0.7,
  sizeAttenuation: true
});

scene.add(
  new THREE.Points(
    stars,
    starMaterial
  )
);

// ======================================================
// BLACK HOLE BACKGROUND
// ======================================================

const blackHole = new THREE.Group();

const shadow = new THREE.Mesh(
  new THREE.SphereGeometry(
    1.15,
    64,
    64
  ),
  new THREE.MeshBasicMaterial({
    color: 0x000000
  })
);

blackHole.add(shadow);

const ring = new THREE.Mesh(
  new THREE.TorusGeometry(
    1.55,
    0.08,
    18,
    160
  ),
  new THREE.MeshBasicMaterial({
    color: 0x8c20ff,
    transparent: true,
    opacity: 0.32
  })
);

ring.rotation.x = 0.25;

blackHole.add(ring);

blackHole.position.set(
  0,
  1.2,
  -5.5
);

scene.add(blackHole);

// ======================================================
// ROBOT
// ======================================================

const robot = new THREE.Group();

robot.position.set(
  0,
  -0.65,
  0
);

scene.add(robot);

// ------------------------------------------------------
// ROBOT MATERIALS
// ------------------------------------------------------

const bodyMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x09091a,
    metalness: 0.78,
    roughness: 0.22
  });

const sideMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x282834,
    metalness: 0.72,
    roughness: 0.28
  });

const glowMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x7600ff,
    emissive: 0x6500ff,
    emissiveIntensity: 2.5,
    metalness: 0.35,
    roughness: 0.22
  });

// ------------------------------------------------------
// BODY
// ------------------------------------------------------

const body = new THREE.Mesh(
  new THREE.BoxGeometry(
    2.65,
    2.0,
    2.25
  ),
  bodyMaterial
);

body.position.y = -0.55;
body.scale.set(1, 1, 0.92);

robot.add(body);

// ------------------------------------------------------
// CHEST
// ------------------------------------------------------

const chest = new THREE.Mesh(
  new THREE.BoxGeometry(
    2.48,
    1.82,
    0.12
  ),
  new THREE.MeshStandardMaterial({
    color: 0x080817,
    metalness: 0.7,
    roughness: 0.18
  })
);

chest.position.set(
  0,
  -0.55,
  1.15
);

robot.add(chest);

const chestLine = new THREE.Mesh(
  new THREE.BoxGeometry(
    2.15,
    0.035,
    0.035
  ),
  glowMaterial
);

chestLine.position.set(
  0,
  -0.1,
  1.23
);

robot.add(chestLine);

// ------------------------------------------------------
// NECK
// ------------------------------------------------------

const neck = new THREE.Mesh(
  new THREE.CylinderGeometry(
    0.42,
    0.55,
    0.7,
    32
  ),
  bodyMaterial
);

neck.position.y = 0.62;

robot.add(neck);

// ------------------------------------------------------
// HEAD
// ------------------------------------------------------

const head = new THREE.Group();

head.position.y = 1.42;

robot.add(head);

const headShell = new THREE.Mesh(
  new THREE.BoxGeometry(
    2.9,
    1.78,
    1.55
  ),
  sideMaterial
);

head.add(headShell);

// ------------------------------------------------------
// FACE
// ------------------------------------------------------

const face = new THREE.Mesh(
  new THREE.BoxGeometry(
    2.66,
    1.55,
    0.13
  ),
  new THREE.MeshStandardMaterial({
    color: 0x21003d,
    emissive: 0x4b00aa,
    emissiveIntensity: 1.6,
    metalness: 0.35,
    roughness: 0.2
  })
);

face.position.z = 0.81;

head.add(face);

// ------------------------------------------------------
// GLOWING FACE FRAME
// ------------------------------------------------------

const faceFrame = new THREE.Mesh(
  new THREE.BoxGeometry(
    2.82,
    1.69,
    0.08
  ),
  glowMaterial
);

faceFrame.position.z = 0.86;

head.add(faceFrame);

// ------------------------------------------------------
// EYES
// ------------------------------------------------------

const eyeMaterial =
  new THREE.MeshStandardMaterial({
    color: 0xf5f2ff,
    emissive: 0x8c74ff,
    emissiveIntensity: 0.45,
    metalness: 0.1,
    roughness: 0.2
  });

const eyeGeometry =
  new THREE.SphereGeometry(
    0.23,
    32,
    32
  );

const leftEye =
  new THREE.Mesh(
    eyeGeometry,
    eyeMaterial
  );

const rightEye =
  new THREE.Mesh(
    eyeGeometry,
    eyeMaterial
  );

leftEye.position.set(
  -0.55,
  0.1,
  0.9
);

rightEye.position.set(
  0.55,
  0.1,
  0.9
);

head.add(
  leftEye,
  rightEye
);

// ------------------------------------------------------
// EYE GLOW
// ------------------------------------------------------

const eyeGlowMaterial =
  new THREE.MeshBasicMaterial({
    color: 0xcbbdff,
    transparent: true,
    opacity: 0.35
  });

for (const x of [-0.55, 0.55]) {

  const glow =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        0.34,
        24,
        24
      ),
      eyeGlowMaterial
    );

  glow.position.set(
    x,
    0.1,
    0.87
  );

  head.add(glow);
}

// ------------------------------------------------------
// SIDE ANTENNA
// ------------------------------------------------------

const ear = new THREE.Mesh(
  new THREE.CylinderGeometry(
    0.12,
    0.16,
    0.5,
    24
  ),
  bodyMaterial
);

ear.rotation.z = Math.PI / 2;

ear.position.set(
  1.5,
  1.45,
  0
);

head.add(ear);

// ======================================================
// CURSOR / WORLD POSITION
// ======================================================

const pointer = new THREE.Vector2();

const targetWorld =
  new THREE.Vector3();

const raycaster =
  new THREE.Raycaster();

// Plane on which the robot moves.
const movementPlane =
  new THREE.Plane(
    new THREE.Vector3(0, 1, 0),
    0.65
  );

// Cursor visual
const cursorDot = new THREE.Mesh(
  new THREE.SphereGeometry(
    0.055,
    16,
    16
  ),
  new THREE.MeshBasicMaterial({
    color: 0xffffff
  })
);

scene.add(cursorDot);

// ======================================================
// MOUSE MOVEMENT
// ======================================================

addEventListener(
  'pointermove',
  (event) => {

    pointer.x =
      (event.clientX / innerWidth) * 2 - 1;

    pointer.y =
      -(event.clientY / innerHeight) * 2 + 1;
  }
);

// ======================================================
// GET 3D CURSOR POSITION
// ======================================================

function updateTarget() {

  raycaster.setFromCamera(
    pointer,
    camera
  );

  const hit =
    raycaster.ray.intersectPlane(
      movementPlane,
      targetWorld
    );

  if (!hit) return;

  targetWorld.x =
    THREE.MathUtils.clamp(
      targetWorld.x,
      -4.2,
      4.2
    );

  targetWorld.z =
    THREE.MathUtils.clamp(
      targetWorld.z,
      -4.5,
      2.5
    );

  targetWorld.y = -0.65;
}

// ======================================================
// FIRECRACKER SYSTEM
// ======================================================

const firecrackerBursts = [];

const firecrackerColors = [
  0xff35ff,
  0x8c4dff,
  0x4da6ff,
  0xffffff,
  0xff7b35,
  0xffe45e
];

function createFirecracker(position) {

  const burst = {
    particles: [],
    age: 0,
    lifetime: 1.4,
    flash: null
  };

  const particleCount = 90;

  // ----------------------------------------------------
  // PARTICLES
  // ----------------------------------------------------

  for (
    let i = 0;
    i < particleCount;
    i++
  ) {

    const color =
      firecrackerColors[
        Math.floor(
          Math.random() *
          firecrackerColors.length
        )
      ];

    const material =
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 1
      });

    const particle =
      new THREE.Mesh(
        new THREE.SphereGeometry(
          THREE.MathUtils.randFloat(
            0.012,
            0.035
          ),
          6,
          6
        ),
        material
      );

    particle.position.copy(
      position
    );

    const direction =
      new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(2),
        THREE.MathUtils.randFloatSpread(2),
        THREE.MathUtils.randFloatSpread(2)
      ).normalize();

    const speed =
      THREE.MathUtils.randFloat(
        1.2,
        4.5
      );

    particle.userData.velocity =
      direction.multiplyScalar(
        speed
      );

    particle.userData.life =
      THREE.MathUtils.randFloat(
        0.7,
        1.25
      );

    burst.particles.push(
      particle
    );

    scene.add(particle);
  }

  // ----------------------------------------------------
  // CENTRAL FLASH
  // ----------------------------------------------------

  const flashMaterial =
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1
    });

  const flash =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        0.18,
        20,
        20
      ),
      flashMaterial
    );

  flash.position.copy(
    position
  );

  scene.add(flash);

  burst.flash = flash;

  firecrackerBursts.push(
    burst
  );
}

// ======================================================
// CLICK TO CREATE FIRECRACKER
// ======================================================

addEventListener(
  'pointerdown',
  () => {

    raycaster.setFromCamera(
      pointer,
      camera
    );

    const clickPosition =
      new THREE.Vector3();

    const hit =
      raycaster.ray.intersectPlane(
        movementPlane,
        clickPosition
      );

    if (!hit) return;

    clickPosition.x =
      THREE.MathUtils.clamp(
        clickPosition.x,
        -4.2,
        4.2
      );

    clickPosition.z =
      THREE.MathUtils.clamp(
        clickPosition.z,
        -4.5,
        2.5
      );

    clickPosition.y = -0.65;

    createFirecracker(
      clickPosition
    );
  }
);

// ======================================================
// CLOCK
// ======================================================

const clock =
  new THREE.Clock();

// ======================================================
// ANIMATION
// ======================================================

function animate() {

  requestAnimationFrame(
    animate
  );

  const dt =
    Math.min(
      clock.getDelta(),
      0.05
    );

  const t =
    clock.elapsedTime;

  updateTarget();

  // ====================================================
  // ROBOT MOVEMENT
  // ====================================================

  const robotTarget =
    new THREE.Vector3(
      targetWorld.x,
      -0.65,
      targetWorld.z
    );

  const distanceToCursor =
    robot.position.distanceTo(
      robotTarget
    );

  const movementDirection =
    new THREE.Vector3()
      .subVectors(
        robotTarget,
        robot.position
      );

  movementDirection.y = 0;

  // ----------------------------------------------------
  // RUN TOWARD CURSOR
  // ----------------------------------------------------

  if (
    movementDirection.lengthSq() >
    0.001
  ) {

    movementDirection.normalize();

    const runSpeed =
      THREE.MathUtils.clamp(
        1.8 +
        distanceToCursor * 1.25,
        1.8,
        7.5
      );

    const movementAmount =
      Math.min(
        runSpeed * dt,
        distanceToCursor
      );

    robot.position.addScaledVector(
      movementDirection,
      movementAmount
    );

    // --------------------------------------------------
    // ROTATE BODY TOWARD CURSOR
    // --------------------------------------------------

    const desiredRotation =
      Math.atan2(
        movementDirection.x,
        movementDirection.z
      );

    robot.rotation.y =
      THREE.MathUtils.damp(
        robot.rotation.y,
        desiredRotation,
        10,
        dt
      );
  }

  // ====================================================
  // RUNNING ANIMATION
  // ====================================================

  const isRunning =
    distanceToCursor > 0.12;

  if (isRunning) {

    const runIntensity =
      THREE.MathUtils.clamp(
        distanceToCursor / 3,
        0,
        1
      );

    // Body bounce
    robot.position.y =
      -0.65 +
      Math.abs(
        Math.sin(
          t * (
            8 +
            runIntensity * 5
          )
        )
      ) * 0.06;

    // Slight body tilt
    robot.rotation.z =
      Math.sin(t * 9) *
      0.025 *
      runIntensity;

  } else {

    robot.position.y =
      THREE.MathUtils.damp(
        robot.position.y,
        -0.65,
        8,
        dt
      );

    robot.rotation.z =
      THREE.MathUtils.damp(
        robot.rotation.z,
        0,
        8,
        dt
      );
  }

  // ====================================================
  // HEAD TRACKING
  // ====================================================

  const localTarget =
    targetWorld.clone();

  head.parent.worldToLocal(
    localTarget
  );

  const desiredYaw =
    Math.atan2(
      localTarget.x,
      Math.max(
        0.5,
        localTarget.z
      )
    );

  const desiredPitch =
    Math.atan2(
      localTarget.y -
        head.position.y,
      4.5
    );

  head.rotation.y =
    THREE.MathUtils.damp(
      head.rotation.y,
      THREE.MathUtils.clamp(
        desiredYaw * 0.72,
        -0.7,
        0.7
      ),
      7,
      dt
    );

  head.rotation.x =
    THREE.MathUtils.damp(
      head.rotation.x,
      THREE.MathUtils.clamp(
        -desiredPitch * 0.45,
        -0.35,
        0.35
      ),
      7,
      dt
    );

  // ====================================================
  // CURSOR VISUAL
  // ====================================================

  cursorDot.position.lerp(
    targetWorld,
    1 -
      Math.exp(
        -12 * dt
      )
  );

  cursorDot.scale.setScalar(
    1 +
      Math.sin(t * 8) *
      0.25
  );

  // ====================================================
  // BLACK HOLE ANIMATION
  // ====================================================

  ring.rotation.z +=
    dt * 0.22;

  blackHole.rotation.y +=
    dt * 0.04;

  // ====================================================
  // FIRECRACKER UPDATE
  // ====================================================

  for (
    let b =
      firecrackerBursts.length - 1;
    b >= 0;
    b--
  ) {

    const burst =
      firecrackerBursts[b];

    burst.age += dt;

    // --------------------------------------------------
    // UPDATE SPARKS
    // --------------------------------------------------

    for (
      const particle
      of burst.particles
    ) {

      particle.userData.life -=
        dt;

      // Gravity
      particle.userData.velocity.y -=
        3.2 * dt;

      particle.position.addScaledVector(
        particle.userData.velocity,
        dt
      );

      particle.material.opacity =
        Math.max(
          0,
          particle.userData.life
        );

      particle.scale.multiplyScalar(
        1 + dt * 1.2
      );
    }

    // --------------------------------------------------
    // UPDATE FLASH
    // --------------------------------------------------

    if (burst.flash) {

      burst.flash.scale.multiplyScalar(
        1 + dt * 8
      );

      burst.flash.material.opacity =
        Math.max(
          0,
          1 -
            burst.age * 5
        );
    }

    // --------------------------------------------------
    // REMOVE FINISHED BURST
    // --------------------------------------------------

    if (
      burst.age >=
      burst.lifetime
    ) {

      for (
        const particle
        of burst.particles
      ) {

        scene.remove(
          particle
        );

        particle.geometry.dispose();
        particle.material.dispose();
      }

      if (burst.flash) {

        scene.remove(
          burst.flash
        );

        burst.flash.geometry.dispose();
        burst.flash.material.dispose();
      }

      firecrackerBursts.splice(
        b,
        1
      );
    }
  }

  // ====================================================
  // CAMERA FOLLOW
  // ====================================================

  camera.position.x =
    THREE.MathUtils.damp(
      camera.position.x,
      pointer.x * 0.22,
      2,
      dt
    );

  camera.position.y =
    THREE.MathUtils.damp(
      camera.position.y,
      1.25 +
        pointer.y * 0.12,
      2,
      dt
    );

  camera.lookAt(
    0,
    0.35,
    -1.7
  );

  // ====================================================
  // RENDER
  // ====================================================

  renderer.render(
    scene,
    camera
  );
}

animate();

// ======================================================
// RESPONSIVE WINDOW
// ======================================================

addEventListener(
  'resize',
  () => {

    camera.aspect =
      innerWidth /
      innerHeight;

    camera.updateProjectionMatrix();

    renderer.setPixelRatio(
      Math.min(
        devicePixelRatio,
        2
      )
    );

    renderer.setSize(
      innerWidth,
      innerHeight
    );
  }
);