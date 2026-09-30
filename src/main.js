import * as THREE from 'three';
import './style.css';

// ============================================================
// SCENE
// ============================================================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020106);

const camera = new THREE.PerspectiveCamera(
  42,
  innerWidth / innerHeight,
  0.1,
  100
);

camera.position.set(0, 1.5, 8);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance'
});

// Lower pixel ratio = much better FPS
renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 1.5)
);

renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

document.querySelector('#app').appendChild(
  renderer.domElement
);


// ============================================================
// LIGHTING
// ============================================================

scene.add(
  new THREE.AmbientLight(
    0x8060a0,
    2
  )
);

const purpleLight =
  new THREE.PointLight(
    0xc020ff,
    80,
    15
  );

purpleLight.position.set(
  2,
  4,
  3
);

scene.add(purpleLight);

const blueLight =
  new THREE.PointLight(
    0x405cff,
    55,
    14
  );

blueLight.position.set(
  -4,
  2,
  2
);

scene.add(blueLight);


// ============================================================
// FLOOR
// ============================================================

const floor =
  new THREE.Mesh(
    new THREE.PlaneGeometry(
      24,
      24
    ),
    new THREE.MeshBasicMaterial({
      color: 0x100016,
      transparent: true,
      opacity: 0.75
    })
  );

floor.rotation.x =
  -Math.PI / 2;

floor.position.y =
  -2.05;

scene.add(floor);


// ============================================================
// STARS
// ============================================================

const starGeometry =
  new THREE.BufferGeometry();

const starCount = 1400;

const starPositions =
  new Float32Array(
    starCount * 3
  );

for (
  let i = 0;
  i < starCount;
  i++
) {
  const i3 = i * 3;

  starPositions[i3] =
    (Math.random() - 0.5) * 20;

  starPositions[i3 + 1] =
    (Math.random() - 0.5) * 12;

  starPositions[i3 + 2] =
    -Math.random() * 16 - 2;
}

starGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(
    starPositions,
    3
  )
);

const starMaterial =
  new THREE.PointsMaterial({
    color: 0xd8caff,
    size: 0.018,
    transparent: true,
    opacity: 0.75
  });

scene.add(
  new THREE.Points(
    starGeometry,
    starMaterial
  )
);


// ============================================================
// BLACK HOLE
// ============================================================

const blackHole =
  new THREE.Group();

const blackHoleCore =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      1.2,
      32,
      32
    ),
    new THREE.MeshBasicMaterial({
      color: 0x000000
    })
  );

blackHole.add(
  blackHoleCore
);

const blackHoleRing =
  new THREE.Mesh(
    new THREE.TorusGeometry(
      1.55,
      0.075,
      12,
      80
    ),
    new THREE.MeshBasicMaterial({
      color: 0x8e25ff,
      transparent: true,
      opacity: 0.35
    })
  );

blackHoleRing.rotation.x =
  0.25;

blackHole.add(
  blackHoleRing
);

blackHole.position.set(
  0,
  1.3,
  -6
);

scene.add(
  blackHole
);


// ============================================================
// ROBOT
// ============================================================

const robot =
  new THREE.Group();

robot.position.set(
  0,
  -0.65,
  0
);

scene.add(robot);


// ============================================================
// MATERIALS
// ============================================================

const bodyMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x171326,
    metalness: 0.55,
    roughness: 0.3
  });

const darkMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x0a0712,
    metalness: 0.5,
    roughness: 0.25
  });

const purpleMaterial =
  new THREE.MeshStandardMaterial({
    color: 0xb923ff,
    emissive: 0x8500ff,
    emissiveIntensity: 2.5,
    roughness: 0.25
  });

const eyeMaterial =
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x8f70ff,
    emissiveIntensity: 2,
    roughness: 0.15
  });


// ============================================================
// BODY
// ============================================================

const body =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.85,
      24,
      20
    ),
    bodyMaterial
  );

body.scale.set(
  1,
  1.15,
  0.8
);

body.position.y =
  -0.4;

robot.add(body);


// ============================================================
// HEAD
// ============================================================

const head =
  new THREE.Group();

head.position.y =
  0.95;

robot.add(head);

const headMesh =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.9,
      28,
      24
    ),
    darkMaterial
  );

headMesh.scale.set(
  1.05,
  0.9,
  0.85
);

head.add(headMesh);


// ============================================================
// FACE
// ============================================================

const face =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.72,
      24,
      20
    ),
    new THREE.MeshStandardMaterial({
      color: 0x180022,
      emissive: 0x35004d,
      emissiveIntensity: 1.2,
      roughness: 0.3
    })
  );

face.scale.set(
  1,
  0.72,
  0.25
);

face.position.z =
  0.67;

head.add(face);


// ============================================================
// EYES
// ============================================================

const eyeGeometry =
  new THREE.SphereGeometry(
    0.22,
    20,
    20
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
  -0.32,
  0.1,
  0.76
);

rightEye.position.set(
  0.32,
  0.1,
  0.76
);

head.add(
  leftEye,
  rightEye
);


// ============================================================
// PUPILS
// ============================================================

const pupilGeometry =
  new THREE.SphereGeometry(
    0.09,
    12,
    12
  );

const pupilMaterial =
  new THREE.MeshBasicMaterial({
    color: 0x6400ff
  });

const leftPupil =
  new THREE.Mesh(
    pupilGeometry,
    pupilMaterial
  );

const rightPupil =
  new THREE.Mesh(
    pupilGeometry,
    pupilMaterial
  );

leftPupil.position.set(
  -0.32,
  0.1,
  0.95
);

rightPupil.position.set(
  0.32,
  0.1,
  0.95
);

head.add(
  leftPupil,
  rightPupil
);


// ============================================================
// MOUTH
// ============================================================

const mouth =
  new THREE.Mesh(
    new THREE.TorusGeometry(
      0.14,
      0.035,
      8,
      20,
      Math.PI
    ),
    purpleMaterial
  );

mouth.rotation.x =
  Math.PI;

mouth.position.set(
  0,
  -0.2,
  0.76
);

head.add(mouth);


// ============================================================
// EARS
// ============================================================

const earGeometry =
  new THREE.SphereGeometry(
    0.22,
    16,
    16
  );

const leftEar =
  new THREE.Mesh(
    earGeometry,
    bodyMaterial
  );

const rightEar =
  new THREE.Mesh(
    earGeometry,
    bodyMaterial
  );

leftEar.position.set(
  -0.9,
  0,
  0
);

rightEar.position.set(
  0.9,
  0,
  0
);

head.add(
  leftEar,
  rightEar
);


// ============================================================
// ANTENNA
// ============================================================

const antenna =
  new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.035,
      0.045,
      0.4,
      10
    ),
    bodyMaterial
  );

antenna.position.y =
  0.9;

head.add(antenna);

const antennaBall =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.1,
      14,
      14
    ),
    purpleMaterial
  );

antennaBall.position.y =
  1.12;

head.add(antennaBall);


// ============================================================
// CHEST LIGHT
// ============================================================

const chest =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.18,
      16,
      16
    ),
    purpleMaterial
  );

chest.scale.set(
  1.5,
  0.5,
  0.35
);

chest.position.set(
  0,
  -0.42,
  0.67
);

robot.add(chest);


// ============================================================
// ARMS
// ============================================================

const leftArm =
  new THREE.Group();

const rightArm =
  new THREE.Group();

leftArm.position.set(
  -0.82,
  -0.35,
  0
);

rightArm.position.set(
  0.82,
  -0.35,
  0
);

robot.add(
  leftArm,
  rightArm
);

const armGeometry =
  new THREE.SphereGeometry(
    0.25,
    16,
    16
  );

const leftArmMesh =
  new THREE.Mesh(
    armGeometry,
    bodyMaterial
  );

const rightArmMesh =
  new THREE.Mesh(
    armGeometry,
    bodyMaterial
  );

leftArmMesh.scale.y =
  1.5;

rightArmMesh.scale.y =
  1.5;

leftArmMesh.position.y =
  -0.25;

rightArmMesh.position.y =
  -0.25;

leftArm.add(
  leftArmMesh
);

rightArm.add(
  rightArmMesh
);


// ============================================================
// LEGS
// ============================================================

const leftLeg =
  new THREE.Group();

const rightLeg =
  new THREE.Group();

leftLeg.position.set(
  -0.32,
  -1.25,
  0
);

rightLeg.position.set(
  0.32,
  -1.25,
  0
);

robot.add(
  leftLeg,
  rightLeg
);

const legGeometry =
  new THREE.SphereGeometry(
    0.27,
    16,
    16
  );

const leftLegMesh =
  new THREE.Mesh(
    legGeometry,
    bodyMaterial
  );

const rightLegMesh =
  new THREE.Mesh(
    legGeometry,
    bodyMaterial
  );

leftLegMesh.scale.y =
  1.35;

rightLegMesh.scale.y =
  1.35;

leftLegMesh.position.y =
  -0.22;

rightLegMesh.position.y =
  -0.22;

leftLeg.add(
  leftLegMesh
);

rightLeg.add(
  rightLegMesh
);


// ============================================================
// TARGET
// ============================================================

const pointer =
  new THREE.Vector2();

const target =
  new THREE.Vector3();


// ============================================================
// CURSOR VISUAL
// ============================================================

const cursorDot =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.06,
      12,
      12
    ),
    new THREE.MeshBasicMaterial({
      color: 0xffffff
    })
  );

scene.add(cursorDot);

const cursorRing =
  new THREE.Mesh(
    new THREE.TorusGeometry(
      0.14,
      0.018,
      8,
      24
    ),
    new THREE.MeshBasicMaterial({
      color: 0xb72cff
    })
  );

scene.add(cursorRing);


// ============================================================
// IMPORTANT: DIRECT MOUSE → WORLD POSITION
// ============================================================

function updateTargetFromMouse() {

  // Convert mouse position directly
  // into our robot movement area.

  target.x =
    pointer.x * 4.3;

  target.y =
    -0.65;

  // Mouse Y is inverted

  target.z =
    pointer.y * 2.8 - 0.5;

  target.z =
    THREE.MathUtils.clamp(
      target.z,
      -4.2,
      2.5
    );
}


// ============================================================
// MOUSE MOVE
// ============================================================

window.addEventListener(
  'pointermove',
  event => {

    pointer.x =
      (event.clientX /
        window.innerWidth) *
        2 -
      1;

    pointer.y =
      -(
        event.clientY /
        window.innerHeight
      ) *
        2 +
      1;

    // UPDATE IMMEDIATELY
    updateTargetFromMouse();
  }
);


// ============================================================
// GAS TRAIL
// ============================================================

// Reuse ONE geometry
const gasGeometry =
  new THREE.SphereGeometry(
    0.1,
    8,
    8
  );

// Reuse materials
const gasMaterials = [
  new THREE.MeshBasicMaterial({
    color: 0xb82cff,
    transparent: true,
    opacity: 0.4
  }),
  new THREE.MeshBasicMaterial({
    color: 0x762cff,
    transparent: true,
    opacity: 0.35
  }),
  new THREE.MeshBasicMaterial({
    color: 0xe45cff,
    transparent: true,
    opacity: 0.3
  })
];

const gasParticles = [];

const MAX_GAS =
  45;


function spawnGas() {

  if (
    gasParticles.length >=
    MAX_GAS
  ) {
    return;
  }

  const particle =
    new THREE.Mesh(
      gasGeometry,
      gasMaterials[
        Math.floor(
          Math.random() *
          gasMaterials.length
        )
      ]
    );

  particle.position.copy(
    robot.position
  );

  particle.position.x +=
    THREE.MathUtils.randFloatSpread(
      0.35
    );

  particle.position.y +=
    THREE.MathUtils.randFloat(
      -0.8,
      -0.1
    );

  particle.position.z +=
    THREE.MathUtils.randFloat(
      -0.2,
      0.25
    );

  particle.userData.life =
    0.55 +
    Math.random() * 0.4;

  particle.userData.maxLife =
    particle.userData.life;

  particle.userData.vx =
    (Math.random() - 0.5) *
    0.3;

  particle.userData.vy =
    Math.random() * 0.3;

  particle.userData.vz =
    0.3 +
    Math.random() * 0.5;

  particle.scale.setScalar(
    0.5 +
    Math.random() * 0.7
  );

  scene.add(particle);

  gasParticles.push(
    particle
  );
}


// ============================================================
// FIRECRACKER
// ============================================================

const firecrackerBursts = [];

const explosionGeometry =
  new THREE.SphereGeometry(
    0.025,
    6,
    6
  );

const explosionColors = [
  0xff45ff,
  0xa855ff,
  0x5f9cff,
  0xffffff,
  0xffa33b,
  0xffef65
];


// ============================================================
// CLICK EXPLOSION
// ============================================================

window.addEventListener(
  'pointerdown',
  () => {

    const position =
      target.clone();

    const particles = [];

    const count = 45;


    for (
      let i = 0;
      i < count;
      i++
    ) {

      const material =
        new THREE.MeshBasicMaterial({
          color:
            explosionColors[
              Math.floor(
                Math.random() *
                explosionColors.length
              )
            ],
          transparent: true,
          opacity: 1
        });

      const particle =
        new THREE.Mesh(
          explosionGeometry,
          material
        );

      particle.position.copy(
        position
      );

      const direction =
        new THREE.Vector3(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1
        ).normalize();

      particle.userData.vx =
        direction.x *
        (1.5 +
          Math.random() * 3);

      particle.userData.vy =
        direction.y *
        (1.5 +
          Math.random() * 3);

      particle.userData.vz =
        direction.z *
        (1.5 +
          Math.random() * 3);

      particle.userData.life =
        0.7 +
        Math.random() * 0.4;

      scene.add(particle);

      particles.push(
        particle
      );
    }

    firecrackerBursts.push(
      {
        particles,
        age: 0
      }
    );
  }
);


// ============================================================
// CLOCK
// ============================================================

const clock =
  new THREE.Clock();

let gasTimer = 0;


// ============================================================
// ANIMATION
// ============================================================

function animate() {

  requestAnimationFrame(
    animate
  );

  const dt =
    Math.min(
      clock.getDelta(),
      0.033
    );

  const time =
    clock.elapsedTime;


  // ========================================================
  // ROBOT MOVEMENT
  // ========================================================

  const dx =
    target.x -
    robot.position.x;

  const dz =
    target.z -
    robot.position.z;

  const distance =
    Math.sqrt(
      dx * dx +
      dz * dz
    );


  if (
    distance > 0.06
  ) {

    // Normalize direction

    const dirX =
      dx / distance;

    const dirZ =
      dz / distance;


    // FAST BUT SMOOTH

    const speed =
      Math.min(
        8,
        3.5 +
        distance * 2
      );


    const move =
      Math.min(
        speed * dt,
        distance
      );


    robot.position.x +=
      dirX * move;

    robot.position.z +=
      dirZ * move;


    // ======================================================
    // ROTATION
    // ======================================================

    const angle =
      Math.atan2(
        dirX,
        dirZ
      );

    robot.rotation.y =
      THREE.MathUtils.damp(
        robot.rotation.y,
        angle,
        14,
        dt
      );


    // ======================================================
    // RUNNING BOUNCE
    // ======================================================

    const run =
      Math.sin(
        time * 15
      );

    robot.position.y =
      -0.65 +
      Math.abs(run) *
      0.09;


    robot.rotation.z =
      run *
      0.025;


    // ======================================================
    // ARM ANIMATION
    // ======================================================

    leftArm.rotation.z =
      run * 0.55;

    rightArm.rotation.z =
      -run * 0.55;


    // ======================================================
    // LEG ANIMATION
    // ======================================================

    leftLeg.rotation.x =
      run * 0.6;

    rightLeg.rotation.x =
      -run * 0.6;


    // ======================================================
    // GAS
    // ======================================================

    gasTimer += dt;

    if (
      gasTimer >
      0.045
    ) {

      spawnGas();

      gasTimer = 0;
    }

  } else {

    // ======================================================
    // IDLE
    // ======================================================

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

    leftArm.rotation.z =
      THREE.MathUtils.damp(
        leftArm.rotation.z,
        -0.08,
        7,
        dt
      );

    rightArm.rotation.z =
      THREE.MathUtils.damp(
        rightArm.rotation.z,
        0.08,
        7,
        dt
      );

    leftLeg.rotation.x =
      THREE.MathUtils.damp(
        leftLeg.rotation.x,
        0,
        7,
        dt
      );

    rightLeg.rotation.x =
      THREE.MathUtils.damp(
        rightLeg.rotation.x,
        0,
        7,
        dt
      );
  }


  // ========================================================
  // HEAD TRACKING
  // ========================================================

  const headTarget =
    new THREE.Vector3(
      target.x -
      robot.position.x,
      target.y -
      robot.position.y,
      target.z -
      robot.position.z
    );


  const headAngle =
    Math.atan2(
      headTarget.x,
      Math.max(
        0.5,
        headTarget.z
      )
    );


  head.rotation.y =
    THREE.MathUtils.damp(
      head.rotation.y,
      THREE.MathUtils.clamp(
        headAngle * 0.5,
        -0.6,
        0.6
      ),
      8,
      dt
    );


  // ========================================================
  // ANTENNA
  // ========================================================

  antennaBall.scale.setScalar(
    1 +
    Math.sin(
      time * 6
    ) *
    0.12
  );


  // ========================================================
  // CURSOR
  // ========================================================

  cursorDot.position.lerp(
    target,
    1 -
    Math.exp(
      -18 * dt
    )
  );

  cursorRing.position.copy(
    cursorDot.position
  );

  cursorRing.rotation.z +=
    dt * 2.5;


  // ========================================================
  // GAS UPDATE
  // ========================================================

  for (
    let i =
      gasParticles.length - 1;
    i >= 0;
    i--
  ) {

    const p =
      gasParticles[i];

    p.userData.life -=
      dt;

    p.position.x +=
      p.userData.vx * dt;

    p.position.y +=
      p.userData.vy * dt;

    p.position.z +=
      p.userData.vz * dt;


    p.scale.multiplyScalar(
      1.015
    );


    const alpha =
      Math.max(
        0,
        p.userData.life /
        p.userData.maxLife
      );

    p.material.opacity =
      alpha * 0.45;


    if (
      p.userData.life <= 0
    ) {

      scene.remove(p);

      gasParticles.splice(
        i,
        1
      );
    }
  }


  // ========================================================
  // FIRECRACKER UPDATE
  // ========================================================

  for (
    let b =
      firecrackerBursts.length - 1;
    b >= 0;
    b--
  ) {

    const burst =
      firecrackerBursts[b];

    burst.age += dt;


    for (
      let i = 0;
      i <
      burst.particles.length;
      i++
    ) {

      const p =
        burst.particles[i];

      p.userData.life -=
        dt;

      p.userData.vy -=
        4 * dt;


      p.position.x +=
        p.userData.vx * dt;

      p.position.y +=
        p.userData.vy * dt;

      p.position.z +=
        p.userData.vz * dt;


      p.material.opacity =
        Math.max(
          0,
          p.userData.life
        );
    }


    if (
      burst.age >
      1.2
    ) {

      for (
        const p of
        burst.particles
      ) {

        scene.remove(p);

        p.material.dispose();
      }

      firecrackerBursts.splice(
        b,
        1
      );
    }
  }


  // ========================================================
  // BLACK HOLE
  // ========================================================

  blackHoleRing.rotation.z +=
    dt * 0.2;

  blackHole.rotation.y +=
    dt * 0.03;


  // ========================================================
  // CAMERA
  // ========================================================

  camera.position.x =
    THREE.MathUtils.damp(
      camera.position.x,
      pointer.x * 0.15,
      2,
      dt
    );

  camera.position.y =
    THREE.MathUtils.damp(
      camera.position.y,
      1.5 +
      pointer.y * 0.1,
      2,
      dt
    );

  camera.lookAt(
    0,
    0.15,
    -1.5
  );


  // ========================================================
  // RENDER
  // ========================================================

  renderer.render(
    scene,
    camera
  );
}


// ============================================================
// INITIAL TARGET
// ============================================================

pointer.set(
  0,
  0
);

updateTargetFromMouse();


// START

animate();


// ============================================================
// RESIZE
// ============================================================

window.addEventListener(
  'resize',
  () => {

    camera.aspect =
      innerWidth /
      innerHeight;

    camera.updateProjectionMatrix();

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        1.5
      )
    );

    renderer.setSize(
      innerWidth,
      innerHeight
    );
  }
);