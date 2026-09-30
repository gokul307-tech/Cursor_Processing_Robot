import * as THREE from 'three';
import './style.css';

// ============================================================
// BASIC SETUP
// ============================================================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020107);

const camera = new THREE.PerspectiveCamera(
  42,
  innerWidth / innerHeight,
  0.1,
  100
);

camera.position.set(0, 1.3, 8);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance'
});

// FPS optimization
renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 1.35)
);

renderer.setSize(
  innerWidth,
  innerHeight
);

renderer.outputColorSpace =
  THREE.SRGBColorSpace;

renderer.toneMapping =
  THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.1;

document
  .querySelector('#app')
  .appendChild(renderer.domElement);


// ============================================================
// LIGHTING
// ============================================================

scene.add(
  new THREE.AmbientLight(
    0x9bb7ff,
    2.2
  )
);

const keyLight =
  new THREE.PointLight(
    0xffffff,
    70,
    16
  );

keyLight.position.set(
  3,
  4,
  4
);

scene.add(keyLight);

const blueLight =
  new THREE.PointLight(
    0x258cff,
    70,
    13
  );

blueLight.position.set(
  -3,
  2,
  3
);

scene.add(blueLight);

const purpleLight =
  new THREE.PointLight(
    0x9c38ff,
    40,
    12
  );

purpleLight.position.set(
  3,
  1,
  -3
);

scene.add(purpleLight);


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
      opacity: 0.65
    })
  );

floor.rotation.x =
  -Math.PI / 2;

floor.position.y =
  -2.15;

scene.add(floor);


// ============================================================
// STAR FIELD
// ============================================================

const starGeometry =
  new THREE.BufferGeometry();

const STAR_COUNT = 1200;

const starPositions =
  new Float32Array(
    STAR_COUNT * 3
  );

for (
  let i = 0;
  i < STAR_COUNT;
  i++
) {
  const i3 = i * 3;

  starPositions[i3] =
    (Math.random() - 0.5) * 20;

  starPositions[i3 + 1] =
    (Math.random() - 0.5) * 11;

  starPositions[i3 + 2] =
    -Math.random() * 15 - 2;
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
    color: 0xdce5ff,
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
      1.15,
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
      color: 0x7b22d8,
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
  1.4,
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
  -0.55,
  0
);

scene.add(robot);


// ============================================================
// ROBOT MATERIALS
// ============================================================

const whiteMaterial =
  new THREE.MeshStandardMaterial({
    color: 0xf3f6fa,
    metalness: 0.25,
    roughness: 0.3
  });

const whiteBrightMaterial =
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.15,
    roughness: 0.25
  });

const darkVisorMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x050a12,
    metalness: 0.45,
    roughness: 0.18
  });

const blueMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x176de5,
    metalness: 0.35,
    roughness: 0.25
  });

const blueGlowMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x24cfff,
    emissive: 0x009cff,
    emissiveIntensity: 2.8,
    metalness: 0.1,
    roughness: 0.2
  });

const blackMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x070a12,
    metalness: 0.3,
    roughness: 0.25
  });


// ============================================================
// SHARED GEOMETRIES
// ============================================================

const bodyGeometry =
  new THREE.SphereGeometry(
    1,
    24,
    20
  );

const jointGeometry =
  new THREE.SphereGeometry(
    0.22,
    16,
    16
  );

const handGeometry =
  new THREE.SphereGeometry(
    0.19,
    14,
    14
  );

const footGeometry =
  new THREE.SphereGeometry(
    0.32,
    18,
    16
  );


// ============================================================
// BODY
// ============================================================

const body =
  new THREE.Mesh(
    bodyGeometry,
    whiteMaterial
  );

body.scale.set(
  0.82,
  1.0,
  0.62
);

body.position.y =
  -0.45;

robot.add(body);


// ============================================================
// BELT / WAIST
// ============================================================

const waist =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.52,
      20,
      16
    ),
    darkVisorMaterial
  );

waist.scale.set(
  1.25,
  0.35,
  0.75
);

waist.position.y =
  -1.15;

robot.add(waist);


// ============================================================
// CHEST PANEL
// ============================================================

const chestPanel =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.48,
      24,
      20
    ),
    whiteBrightMaterial
  );

chestPanel.scale.set(
  1.0,
  1.0,
  0.25
);

chestPanel.position.set(
  0,
  -0.35,
  0.55
);

robot.add(chestPanel);


// ============================================================
// BLUE CHEST CORE
// ============================================================

const chestCore =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.22,
      20,
      20
    ),
    blueGlowMaterial
  );

chestCore.position.set(
  0,
  -0.38,
  0.69
);

robot.add(chestCore);


// ============================================================
// HEAD
// ============================================================

const head =
  new THREE.Group();

head.position.y =
  0.95;

robot.add(head);


// Rounded white head

const headShell =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.95,
      32,
      24
    ),
    whiteBrightMaterial
  );

headShell.scale.set(
  1.12,
  0.88,
  0.86
);

head.add(
  headShell
);


// ============================================================
// BLUE HEAD CAP
// ============================================================

const headCap =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.95,
      24,
      16,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.3
    ),
    blueMaterial
  );

headCap.scale.set(
  1.12,
  0.88,
  0.86
);

headCap.position.y =
  0.08;

head.add(
  headCap
);


// ============================================================
// FACE VISOR
// ============================================================

const visor =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.75,
      28,
      20
    ),
    darkVisorMaterial
  );

visor.scale.set(
  1.18,
  0.72,
  0.25
);

visor.position.set(
  0,
  0.02,
  0.76
);

head.add(
  visor
);


// ============================================================
// EYES
// ============================================================

const eyeGeometry =
  new THREE.SphereGeometry(
    0.17,
    20,
    20
  );

const leftEye =
  new THREE.Mesh(
    eyeGeometry,
    blueGlowMaterial
  );

const rightEye =
  new THREE.Mesh(
    eyeGeometry,
    blueGlowMaterial
  );

leftEye.position.set(
  -0.31,
  0.08,
  0.92
);

rightEye.position.set(
  0.31,
  0.08,
  0.92
);

head.add(
  leftEye,
  rightEye
);


// ============================================================
// EYE HIGHLIGHTS
// ============================================================

const highlightGeometry =
  new THREE.SphereGeometry(
    0.045,
    10,
    10
  );

const highlightMaterial =
  new THREE.MeshBasicMaterial({
    color: 0xffffff
  });

const leftHighlight =
  new THREE.Mesh(
    highlightGeometry,
    highlightMaterial
  );

const rightHighlight =
  new THREE.Mesh(
    highlightGeometry,
    highlightMaterial
  );

leftHighlight.position.set(
  -0.36,
  0.14,
  1.04
);

rightHighlight.position.set(
  0.26,
  0.14,
  1.04
);

head.add(
  leftHighlight,
  rightHighlight
);


// ============================================================
// SMILE
// ============================================================

const mouth =
  new THREE.Mesh(
    new THREE.TorusGeometry(
      0.12,
      0.025,
      8,
      20,
      Math.PI
    ),
    blueGlowMaterial
  );

mouth.rotation.x =
  Math.PI;

mouth.position.set(
  0,
  -0.17,
  0.94
);

head.add(
  mouth
);


// ============================================================
// SIDE EAR PANELS
// ============================================================

const earGeometry =
  new THREE.CylinderGeometry(
    0.28,
    0.28,
    0.12,
    20
  );

const leftEar =
  new THREE.Mesh(
    earGeometry,
    blueMaterial
  );

const rightEar =
  new THREE.Mesh(
    earGeometry,
    blueMaterial
  );

leftEar.rotation.z =
  Math.PI / 2;

rightEar.rotation.z =
  Math.PI / 2;

leftEar.position.set(
  -1.0,
  0,
  0
);

rightEar.position.set(
  1.0,
  0,
  0
);

head.add(
  leftEar,
  rightEar
);


// ============================================================
// NECK
// ============================================================

const neck =
  new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.25,
      0.3,
      0.22,
      16
    ),
    blackMaterial
  );

neck.position.y =
  -0.03;

robot.add(neck);


// ============================================================
// ANTENNA
// ============================================================

const antenna =
  new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.025,
      0.035,
      0.35,
      10
    ),
    blueMaterial
  );

antenna.position.y =
  1.9;

robot.add(antenna);

const antennaTip =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.08,
      14,
      14
    ),
    blueGlowMaterial
  );

antennaTip.position.y =
  2.08;

robot.add(antennaTip);


// ============================================================
// ARMS
// ============================================================

const leftArm =
  new THREE.Group();

const rightArm =
  new THREE.Group();

leftArm.position.set(
  -0.78,
  -0.25,
  0
);

rightArm.position.set(
  0.78,
  -0.25,
  0
);

robot.add(
  leftArm,
  rightArm
);


// Upper arms

const upperArmGeometry =
  new THREE.CapsuleGeometry(
    0.14,
    0.45,
    6,
    10
  );

const leftUpperArm =
  new THREE.Mesh(
    upperArmGeometry,
    whiteMaterial
  );

const rightUpperArm =
  new THREE.Mesh(
    upperArmGeometry,
    whiteMaterial
  );

leftUpperArm.position.y =
  -0.25;

rightUpperArm.position.y =
  -0.25;

leftArm.add(
  leftUpperArm
);

rightArm.add(
  rightUpperArm
);


// Elbows

const leftElbow =
  new THREE.Mesh(
    jointGeometry,
    blueMaterial
  );

const rightElbow =
  new THREE.Mesh(
    jointGeometry,
    blueMaterial
  );

leftElbow.position.y =
  -0.56;

rightElbow.position.y =
  -0.56;

leftArm.add(
  leftElbow
);

rightArm.add(
  rightElbow
);


// Forearms

const forearmGeometry =
  new THREE.CapsuleGeometry(
    0.13,
    0.4,
    6,
    10
  );

const leftForearm =
  new THREE.Mesh(
    forearmGeometry,
    whiteMaterial
  );

const rightForearm =
  new THREE.Mesh(
    forearmGeometry,
    whiteMaterial
  );

leftForearm.position.y =
  -0.82;

rightForearm.position.y =
  -0.82;

leftArm.add(
  leftForearm
);

rightArm.add(
  rightForearm
);


// Hands

const leftHand =
  new THREE.Mesh(
    handGeometry,
    blackMaterial
  );

const rightHand =
  new THREE.Mesh(
    handGeometry,
    blackMaterial
  );

leftHand.position.y =
  -1.12;

rightHand.position.y =
  -1.12;

leftArm.add(
  leftHand
);

rightArm.add(
  rightHand
);


// ============================================================
// LEGS
// ============================================================

const leftLeg =
  new THREE.Group();

const rightLeg =
  new THREE.Group();

leftLeg.position.set(
  -0.3,
  -1.35,
  0
);

rightLeg.position.set(
  0.3,
  -1.35,
  0
);

robot.add(
  leftLeg,
  rightLeg
);


// Upper legs

const upperLegGeometry =
  new THREE.CapsuleGeometry(
    0.16,
    0.42,
    6,
    10
  );

const leftUpperLeg =
  new THREE.Mesh(
    upperLegGeometry,
    whiteMaterial
  );

const rightUpperLeg =
  new THREE.Mesh(
    upperLegGeometry,
    whiteMaterial
  );

leftUpperLeg.position.y =
  -0.23;

rightUpperLeg.position.y =
  -0.23;

leftLeg.add(
  leftUpperLeg
);

rightLeg.add(
  rightUpperLeg
);


// Knees

const leftKnee =
  new THREE.Mesh(
    jointGeometry,
    blueMaterial
  );

const rightKnee =
  new THREE.Mesh(
    jointGeometry,
    blueMaterial
  );

leftKnee.position.y =
  -0.51;

rightKnee.position.y =
  -0.51;

leftLeg.add(
  leftKnee
);

rightLeg.add(
  rightKnee
);


// Lower legs

const lowerLegGeometry =
  new THREE.CapsuleGeometry(
    0.13,
    0.4,
    6,
    10
  );

const leftLowerLeg =
  new THREE.Mesh(
    lowerLegGeometry,
    whiteMaterial
  );

const rightLowerLeg =
  new THREE.Mesh(
    lowerLegGeometry,
    whiteMaterial
  );

leftLowerLeg.position.y =
  -0.8;

rightLowerLeg.position.y =
  -0.8;

leftLeg.add(
  leftLowerLeg
);

rightLeg.add(
  rightLowerLeg
);


// ============================================================
// FEET
// ============================================================

const leftFoot =
  new THREE.Mesh(
    footGeometry,
    whiteBrightMaterial
  );

const rightFoot =
  new THREE.Mesh(
    footGeometry,
    whiteBrightMaterial
  );

leftFoot.scale.set(
  1.25,
  0.55,
  1.55
);

rightFoot.scale.set(
  1.25,
  0.55,
  1.55
);

leftFoot.position.set(
  0,
  -1.15,
  0.15
);

rightFoot.position.set(
  0,
  -1.15,
  0.15
);

leftLeg.add(
  leftFoot
);

rightLeg.add(
  rightFoot
);


// ============================================================
// MOUSE TARGET
// ============================================================

const pointer =
  new THREE.Vector2();

const target =
  new THREE.Vector3();


// ============================================================
// CURSOR
// ============================================================

const cursorDot =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.055,
      10,
      10
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
      color: 0x39aaff,
      transparent: true,
      opacity: 0.85
    })
  );

scene.add(cursorRing);


// ============================================================
// MOUSE → ROBOT TARGET
// ============================================================

function updateTarget() {

  target.x =
    pointer.x * 4.4;

  target.z =
    pointer.y * 2.8 - 0.5;

  target.z =
    THREE.MathUtils.clamp(
      target.z,
      -4.3,
      2.4
    );

  target.y =
    -0.55;
}


window.addEventListener(
  'pointermove',
  event => {

    pointer.x =
      (event.clientX /
        innerWidth) *
        2 -
      1;

    pointer.y =
      -(
        event.clientY /
        innerHeight
      ) *
        2 +
      1;

    updateTarget();
  }
);


// ============================================================
// GAS TRAIL
// ============================================================

const gasGeometry =
  new THREE.SphereGeometry(
    0.09,
    7,
    7
  );

const gasMaterials = [
  new THREE.MeshBasicMaterial({
    color: 0x4f9cff,
    transparent: true,
    opacity: 0.35
  }),

  new THREE.MeshBasicMaterial({
    color: 0x8f4dff,
    transparent: true,
    opacity: 0.32
  }),

  new THREE.MeshBasicMaterial({
    color: 0xb96cff,
    transparent: true,
    opacity: 0.25
  })
];

const gasParticles = [];

const MAX_GAS =
  38;

function spawnGas() {

  if (
    gasParticles.length >=
    MAX_GAS
  ) {
    return;
  }

  const p =
    new THREE.Mesh(
      gasGeometry,
      gasMaterials[
        Math.floor(
          Math.random() *
          gasMaterials.length
        )
      ]
    );

  p.position.copy(
    robot.position
  );

  p.position.x +=
    THREE.MathUtils.randFloatSpread(
      0.35
    );

  p.position.y +=
    THREE.MathUtils.randFloat(
      -1.0,
      -0.25
    );

  p.position.z +=
    THREE.MathUtils.randFloatSpread(
      0.3
    );

  p.scale.setScalar(
    THREE.MathUtils.randFloat(
      0.5,
      1.1
    )
  );

  p.userData.life =
    THREE.MathUtils.randFloat(
      0.5,
      0.9
    );

  p.userData.maxLife =
    p.userData.life;

  p.userData.vx =
    THREE.MathUtils.randFloat(
      -0.25,
      0.25
    );

  p.userData.vy =
    THREE.MathUtils.randFloat(
      0.05,
      0.3
    );

  p.userData.vz =
    THREE.MathUtils.randFloat(
      0.25,
      0.7
    );

  scene.add(p);

  gasParticles.push(p);
}


// ============================================================
// FIRECRACKERS
// ============================================================

const firecrackerBursts = [];

const explosionGeometry =
  new THREE.SphereGeometry(
    0.022,
    6,
    6
  );

const explosionColors = [
  0x35bfff,
  0x6c65ff,
  0xffffff,
  0xff5de8,
  0xffd45c
];


// ============================================================
// CLICK
// ============================================================

window.addEventListener(
  'pointerdown',
  () => {

    const particles = [];

    const count = 42;

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
        target
      );

      const direction =
        new THREE.Vector3(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1
        ).normalize();

      const speed =
        THREE.MathUtils.randFloat(
          1.5,
          4
        );

      particle.userData.vx =
        direction.x * speed;

      particle.userData.vy =
        direction.y * speed;

      particle.userData.vz =
        direction.z * speed;

      particle.userData.life =
        THREE.MathUtils.randFloat(
          0.6,
          1.1
        );

      scene.add(
        particle
      );

      particles.push(
        particle
      );
    }

    firecrackerBursts.push({
      particles,
      age: 0
    });
  }
);


// ============================================================
// ANIMATION
// ============================================================

const clock =
  new THREE.Clock();

let gasTimer = 0;

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


  // ==========================================================
  // ROBOT MOVEMENT
  // ==========================================================

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


  const running =
    distance > 0.07;


  if (running) {

    const dirX =
      dx / distance;

    const dirZ =
      dz / distance;


    // Fast but smooth
    const speed =
      Math.min(
        8.5,
        3.2 +
        distance * 1.8
      );


    const movement =
      Math.min(
        speed * dt,
        distance
      );


    robot.position.x +=
      dirX * movement;

    robot.position.z +=
      dirZ * movement;


    // ========================================================
    // BODY ROTATION
    // ========================================================

    const angle =
      Math.atan2(
        dirX,
        dirZ
      );

    robot.rotation.y =
      THREE.MathUtils.damp(
        robot.rotation.y,
        angle,
        12,
        dt
      );


    // ========================================================
    // RUNNING ANIMATION
    // ========================================================

    const runWave =
      Math.sin(
        time * 15
      );


    const runWave2 =
      Math.sin(
        time * 15 +
        Math.PI
      );


    // Body bounce
    robot.position.y =
      -0.55 +
      Math.abs(
        runWave
      ) * 0.075;


    // Body tilt
    robot.rotation.z =
      runWave *
      0.035;


    // Arms swing
    leftArm.rotation.z =
      runWave *
      0.55;

    rightArm.rotation.z =
      runWave2 *
      0.55;


    // Legs swing
    leftLeg.rotation.x =
      runWave2 *
      0.65;

    rightLeg.rotation.x =
      runWave *
      0.65;


    // ========================================================
    // GAS
    // ========================================================

    gasTimer += dt;

    if (
      gasTimer > 0.045
    ) {

      spawnGas();

      gasTimer = 0;
    }

  } else {

    // ========================================================
    // IDLE ANIMATION
    // ========================================================

    robot.position.y =
      THREE.MathUtils.damp(
        robot.position.y,
        -0.55,
        7,
        dt
      );


    robot.rotation.z =
      THREE.MathUtils.damp(
        robot.rotation.z,
        0,
        7,
        dt
      );


    leftArm.rotation.z =
      THREE.MathUtils.damp(
        leftArm.rotation.z,
        -0.08,
        6,
        dt
      );


    rightArm.rotation.z =
      THREE.MathUtils.damp(
        rightArm.rotation.z,
        0.08,
        6,
        dt
      );


    leftLeg.rotation.x =
      THREE.MathUtils.damp(
        leftLeg.rotation.x,
        0,
        6,
        dt
      );


    rightLeg.rotation.x =
      THREE.MathUtils.damp(
        rightLeg.rotation.x,
        0,
        6,
        dt
      );


    // Cute floating
    robot.position.y +=
      Math.sin(
        time * 2.5
      ) * 0.012;
  }


  // ==========================================================
  // HEAD FOLLOWS CURSOR
  // ==========================================================

  const headDX =
    target.x -
    robot.position.x;

  const headDZ =
    target.z -
    robot.position.z;


  const headAngle =
    Math.atan2(
      headDX,
      Math.max(
        0.5,
        headDZ
      )
    );


  head.rotation.y =
    THREE.MathUtils.damp(
      head.rotation.y,
      THREE.MathUtils.clamp(
        headAngle * 0.55,
        -0.65,
        0.65
      ),
      8,
      dt
    );


  // ==========================================================
  // EYES TRACK TARGET
  // ==========================================================

  const eyeX =
    THREE.MathUtils.clamp(
      headDX * 0.025,
      -0.055,
      0.055
    );


  leftEye.position.x =
    -0.31 +
    eyeX;

  rightEye.position.x =
    0.31 +
    eyeX;


  // ==========================================================
  // CHEST CORE PULSE
  // ==========================================================

  const pulse =
    1 +
    Math.sin(
      time * 5
    ) * 0.08;

  chestCore.scale.setScalar(
    pulse
  );

  antennaTip.scale.setScalar(
    1 +
    Math.sin(
      time * 6
    ) * 0.12
  );


  // ==========================================================
  // CURSOR
  // ==========================================================

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


// ==========================================================
// GAS UPDATE
// ==========================================================

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
      1.018
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


// ==========================================================
// FIRECRACKER UPDATE
// ==========================================================

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
      const particle of
      burst.particles
    ) {

      particle.userData.life -=
        dt;

      particle.userData.vy -=
        3.5 * dt;


      particle.position.x +=
        particle.userData.vx * dt;

      particle.position.y +=
        particle.userData.vy * dt;

      particle.position.z +=
        particle.userData.vz * dt;


      particle.material.opacity =
        Math.max(
          0,
          particle.userData.life
        );
    }


    if (
      burst.age > 1.15
    ) {

      for (
        const particle of
        burst.particles
      ) {

        scene.remove(
          particle
        );

        particle.material.dispose();
      }

      firecrackerBursts.splice(
        b,
        1
      );
    }
  }


// ==========================================================
// BLACK HOLE
// ==========================================================

  blackHoleRing.rotation.z +=
    dt * 0.18;

  blackHole.rotation.y +=
    dt * 0.025;


// ==========================================================
// CAMERA
// ==========================================================

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
      1.3 +
      pointer.y * 0.08,
      2,
      dt
    );

  camera.lookAt(
    0,
    0.15,
    -1.5
  );


// ==========================================================
// RENDER
// ==========================================================

  renderer.render(
    scene,
    camera
  );
}


// ============================================================
// START
// ============================================================

pointer.set(
  0,
  0
);

updateTarget();

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
        1.35
      )
    );

    renderer.setSize(
      innerWidth,
      innerHeight
    );
  }
);