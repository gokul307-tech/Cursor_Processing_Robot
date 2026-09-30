import * as THREE from 'three';
import './style.css';

import { RoundedBoxGeometry } from
'three/examples/jsm/geometries/RoundedBoxGeometry.js';


// ============================================================
// SCENE
// ============================================================

const scene = new THREE.Scene();

scene.background =
  new THREE.Color(0x020107);


const camera =
  new THREE.PerspectiveCamera(
    42,
    innerWidth / innerHeight,
    0.1,
    100
  );

camera.position.set(
  0,
  1.2,
  8
);


const renderer =
  new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: 'high-performance'
  });

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

renderer.outputColorSpace =
  THREE.SRGBColorSpace;

renderer.toneMapping =
  THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
  1.1;

document
  .querySelector('#app')
  .appendChild(renderer.domElement);


// ============================================================
// LIGHTING
// ============================================================

scene.add(
  new THREE.AmbientLight(
    0x9bb7ff,
    2
  )
);


const whiteLight =
  new THREE.PointLight(
    0xffffff,
    65,
    16
  );

whiteLight.position.set(
  3,
  4,
  4
);

scene.add(whiteLight);


const blueLight =
  new THREE.PointLight(
    0x2299ff,
    65,
    14
  );

blueLight.position.set(
  -3,
  2,
  3
);

scene.add(blueLight);


const purpleLight =
  new THREE.PointLight(
    0x8f35ff,
    35,
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
      opacity: 0.6
    })
  );

floor.rotation.x =
  -Math.PI / 2;

floor.position.y =
  -2.1;

scene.add(floor);


// ============================================================
// STARS
// ============================================================

const starGeometry =
  new THREE.BufferGeometry();

const STAR_COUNT = 1100;

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

scene.add(
  new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({
      color: 0xdce6ff,
      size: 0.018,
      transparent: true,
      opacity: 0.7
    })
  )
);


// ============================================================
// BLACK HOLE
// ============================================================

const blackHole =
  new THREE.Group();


const blackCore =
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
  blackCore
);


const blackRing =
  new THREE.Mesh(
    new THREE.TorusGeometry(
      1.5,
      0.07,
      12,
      80
    ),
    new THREE.MeshBasicMaterial({
      color: 0x8c29e8,
      transparent: true,
      opacity: 0.35
    })
  );

blackRing.rotation.x =
  0.25;

blackHole.add(
  blackRing
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
// MATERIALS
// ============================================================

const white =
  new THREE.MeshStandardMaterial({
    color: 0xf4f7fb,
    metalness: 0.2,
    roughness: 0.28
  });


const white2 =
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.12,
    roughness: 0.22
  });


const blue =
  new THREE.MeshStandardMaterial({
    color: 0x176bd6,
    metalness: 0.35,
    roughness: 0.25
  });


const blueGlow =
  new THREE.MeshStandardMaterial({
    color: 0x28cfff,
    emissive: 0x009dff,
    emissiveIntensity: 2.8,
    metalness: 0.05,
    roughness: 0.18
  });


const visorMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x030811,
    metalness: 0.35,
    roughness: 0.16
  });


const black =
  new THREE.MeshStandardMaterial({
    color: 0x080b13,
    metalness: 0.3,
    roughness: 0.25
  });


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
// HELPER: CURVED BOX
// ============================================================

function roundedBox(
  width,
  height,
  depth,
  radius,
  material,
  segments = 5
) {

  const geometry =
    new RoundedBoxGeometry(
      width,
      height,
      depth,
      segments,
      radius
    );

  return new THREE.Mesh(
    geometry,
    material
  );
}


// ============================================================
// BODY
// ============================================================

const body =
  roundedBox(
    1.35,
    1.45,
    0.95,
    0.28,
    white,
    6
  );

body.position.y =
  -0.45;

robot.add(body);


// ============================================================
// BODY SIDE PANEL
// ============================================================

const bodyPanel =
  roundedBox(
    1.15,
    0.8,
    0.08,
    0.12,
    white2,
    5
  );

bodyPanel.position.set(
  0,
  -0.35,
  0.51
);

robot.add(bodyPanel);


// ============================================================
// CHEST BLUE CORE
// ============================================================

const chestRing =
  roundedBox(
    0.55,
    0.55,
    0.12,
    0.18,
    blue,
    6
  );

chestRing.position.set(
  0,
  -0.35,
  0.59
);

robot.add(chestRing);


const chestCore =
  new THREE.Mesh(
    new THREE.CircleGeometry(
      0.16,
      20
    ),
    blueGlow
  );

chestCore.position.set(
  0,
  -0.35,
  0.66
);

chestCore.rotation.y =
  0;

robot.add(chestCore);


// ============================================================
// WAIST
// ============================================================

const waist =
  roundedBox(
    0.95,
    0.28,
    0.7,
    0.12,
    black,
    5
  );

waist.position.y =
  -1.22;

robot.add(waist);


// ============================================================
// HEAD
// ============================================================

const head =
  new THREE.Group();

head.position.y =
  1.0;

robot.add(head);


// Main curved head

const headShell =
  roundedBox(
    1.65,
    1.25,
    1.15,
    0.3,
    white2,
    7
  );

head.add(
  headShell
);


// ============================================================
// BLUE TOP PANEL
// ============================================================

const topPanel =
  roundedBox(
    0.65,
    0.18,
    0.7,
    0.08,
    blue,
    5
  );

topPanel.position.set(
  0,
  0.58,
  -0.02
);

head.add(
  topPanel
);


// ============================================================
// BLACK CURVED VISOR
// ============================================================

const visor =
  roundedBox(
    1.38,
    0.78,
    0.13,
    0.18,
    visorMaterial,
    8
  );

visor.position.set(
  0,
  0.02,
  0.61
);

head.add(
  visor
);


// ============================================================
// EYES
// ============================================================

const eyeGeometry =
  new THREE.SphereGeometry(
    0.16,
    18,
    18
  );


const leftEye =
  new THREE.Mesh(
    eyeGeometry,
    blueGlow
  );


const rightEye =
  new THREE.Mesh(
    eyeGeometry,
    blueGlow
  );


leftEye.position.set(
  -0.3,
  0.07,
  0.7
);

rightEye.position.set(
  0.3,
  0.07,
  0.7
);

head.add(
  leftEye,
  rightEye
);


// ============================================================
// EYE HIGHLIGHTS
// ============================================================

const highlight =
  new THREE.MeshBasicMaterial({
    color: 0xffffff
  });


const leftHighlight =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.045,
      8,
      8
    ),
    highlight
  );


const rightHighlight =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.045,
      8,
      8
    ),
    highlight
  );


leftHighlight.position.set(
  -0.34,
  0.13,
  0.78
);

rightHighlight.position.set(
  0.26,
  0.13,
  0.78
);

head.add(
  leftHighlight,
  rightHighlight
);


// ============================================================
// CUTE SMILE
// ============================================================

const smile =
  new THREE.Mesh(
    new THREE.TorusGeometry(
      0.12,
      0.025,
      8,
      20,
      Math.PI
    ),
    blueGlow
  );

smile.rotation.x =
  Math.PI;

smile.position.set(
  0,
  -0.15,
  0.72
);

head.add(
  smile
);


// ============================================================
// SIDE EAR BOXES
// ============================================================

const leftEar =
  roundedBox(
    0.16,
    0.55,
    0.55,
    0.12,
    blue,
    5
  );

const rightEar =
  roundedBox(
    0.16,
    0.55,
    0.55,
    0.12,
    blue,
    5
  );


leftEar.position.x =
  -0.88;

rightEar.position.x =
  0.88;

head.add(
  leftEar,
  rightEar
);


// ============================================================
// NECK
// ============================================================

const neck =
  roundedBox(
    0.45,
    0.22,
    0.42,
    0.08,
    black,
    5
  );

neck.position.y =
  0.28;

robot.add(neck);


// ============================================================
// ANTENNA
// ============================================================

const antenna =
  new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.025,
      0.035,
      0.3,
      8
    ),
    blue
  );

antenna.position.y =
  1.78;

robot.add(antenna);


const antennaTip =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.08,
      12,
      12
    ),
    blueGlow
  );

antennaTip.position.y =
  1.95;

robot.add(antennaTip);


// ============================================================
// ARMS
// ============================================================

const leftArm =
  new THREE.Group();

const rightArm =
  new THREE.Group();


leftArm.position.set(
  -0.82,
  -0.25,
  0
);

rightArm.position.set(
  0.82,
  -0.25,
  0
);

robot.add(
  leftArm,
  rightArm
);


// Upper arm

const upperArmL =
  roundedBox(
    0.28,
    0.58,
    0.32,
    0.12,
    white2,
    5
  );

const upperArmR =
  roundedBox(
    0.28,
    0.58,
    0.32,
    0.12,
    white2,
    5
  );


upperArmL.position.y =
  -0.25;

upperArmR.position.y =
  -0.25;

leftArm.add(
  upperArmL
);

rightArm.add(
  upperArmR
);


// Elbows

const elbowL =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.17,
      14,
      14
    ),
    blue
  );

const elbowR =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.17,
      14,
      14
    ),
    blue
  );


elbowL.position.y =
  -0.58;

elbowR.position.y =
  -0.58;

leftArm.add(
  elbowL
);

rightArm.add(
  elbowR
);


// Forearms

const forearmL =
  roundedBox(
    0.27,
    0.48,
    0.3,
    0.11,
    white,
    5
  );

const forearmR =
  roundedBox(
    0.27,
    0.48,
    0.3,
    0.11,
    white,
    5
  );


forearmL.position.y =
  -0.85;

forearmR.position.y =
  -0.85;

leftArm.add(
  forearmL
);

rightArm.add(
  forearmR
);


// Hands

const handL =
  roundedBox(
    0.3,
    0.28,
    0.32,
    0.1,
    black,
    5
  );

const handR =
  roundedBox(
    0.3,
    0.28,
    0.32,
    0.1,
    black,
    5
  );


handL.position.y =
  -1.16;

handR.position.y =
  -1.16;

leftArm.add(
  handL
);

rightArm.add(
  handR
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
  -1.35,
  0
);

rightLeg.position.set(
  0.32,
  -1.35,
  0
);

robot.add(
  leftLeg,
  rightLeg
);


// Upper legs

const upperLegL =
  roundedBox(
    0.38,
    0.48,
    0.42,
    0.13,
    white2,
    5
  );

const upperLegR =
  roundedBox(
    0.38,
    0.48,
    0.42,
    0.13,
    white2,
    5
  );


upperLegL.position.y =
  -0.22;

upperLegR.position.y =
  -0.22;

leftLeg.add(
  upperLegL
);

rightLeg.add(
  upperLegR
);


// Knees

const kneeL =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.18,
      14,
      14
    ),
    blue
  );

const kneeR =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.18,
      14,
      14
    ),
    blue
  );


kneeL.position.y =
  -0.53;

kneeR.position.y =
  -0.53;

leftLeg.add(
  kneeL
);

rightLeg.add(
  kneeR
);


// Lower legs

const lowerLegL =
  roundedBox(
    0.32,
    0.48,
    0.38,
    0.12,
    white,
    5
  );

const lowerLegR =
  roundedBox(
    0.32,
    0.48,
    0.38,
    0.12,
    white,
    5
  );


lowerLegL.position.y =
  -0.83;

lowerLegR.position.y =
  -0.83;

leftLeg.add(
  lowerLegL
);

rightLeg.add(
  lowerLegR
);


// ============================================================
// FEET
// ============================================================

const footL =
  roundedBox(
    0.5,
    0.28,
    0.65,
    0.13,
    white2,
    5
  );

const footR =
  roundedBox(
    0.5,
    0.28,
    0.65,
    0.13,
    white2,
    5
  );


footL.position.set(
  0,
  -1.13,
  0.12
);

footR.position.set(
  0,
  -1.13,
  0.12
);

leftLeg.add(
  footL
);

rightLeg.add(
  footR
);


// ============================================================
// MOUSE TARGET
// ============================================================

const pointer =
  new THREE.Vector2();

const target =
  new THREE.Vector3();


function updateTarget() {

  target.x =
    pointer.x * 4.4;

  target.z =
    pointer.y * 2.8 - 0.5;

  target.z =
    THREE.MathUtils.clamp(
      target.z,
      -4.2,
      2.3
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
    color: 0x39aaff,
    transparent: true,
    opacity: 0.35
  }),

  new THREE.MeshBasicMaterial({
    color: 0x784dff,
    transparent: true,
    opacity: 0.3
  }),

  new THREE.MeshBasicMaterial({
    color: 0xc46cff,
    transparent: true,
    opacity: 0.25
  })

];


const gasParticles = [];

const MAX_GAS = 38;


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
      0.3
    );

  p.position.y +=
    THREE.MathUtils.randFloat(
      -1.15,
      -0.4
    );

  p.position.z +=
    THREE.MathUtils.randFloat(
      -0.1,
      0.3
    );


  p.scale.setScalar(
    THREE.MathUtils.randFloat(
      0.45,
      0.9
    )
  );


  p.userData.life =
    THREE.MathUtils.randFloat(
      0.45,
      0.85
    );

  p.userData.maxLife =
    p.userData.life;


  p.userData.vx =
    THREE.MathUtils.randFloat(
      -0.2,
      0.2
    );

  p.userData.vy =
    THREE.MathUtils.randFloat(
      0.05,
      0.3
    );

  p.userData.vz =
    THREE.MathUtils.randFloat(
      0.2,
      0.65
    );


  scene.add(p);

  gasParticles.push(p);
}


// ============================================================
// CLICK FIRECRACKERS
// ============================================================

const firecrackerBursts = [];

const explosionGeometry =
  new THREE.SphereGeometry(
    0.022,
    6,
    6
  );


const explosionColors = [
  0x35cfff,
  0x6f70ff,
  0xffffff,
  0xff5eea,
  0xffd65c
];


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


      const p =
        new THREE.Mesh(
          explosionGeometry,
          material
        );


      p.position.copy(
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


      p.userData.vx =
        direction.x * speed;

      p.userData.vy =
        direction.y * speed;

      p.userData.vz =
        direction.z * speed;


      p.userData.life =
        THREE.MathUtils.randFloat(
          0.6,
          1.1
        );


      scene.add(p);

      particles.push(p);
    }


    firecrackerBursts.push({
      particles,
      age: 0
    });
  }
);


// ============================================================
// CURSOR
// ============================================================

const cursorDot =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.05,
      10,
      10
    ),
    new THREE.MeshBasicMaterial({
      color: 0xffffff
    })
  );

scene.add(
  cursorDot
);


const cursorRing =
  new THREE.Mesh(
    new THREE.TorusGeometry(
      0.14,
      0.018,
      8,
      24
    ),
    new THREE.MeshBasicMaterial({
      color: 0x35bfff
    })
  );

scene.add(
  cursorRing
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


  if (
    distance > 0.07
  ) {

    const dirX =
      dx / distance;

    const dirZ =
      dz / distance;


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


    // Face movement direction

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
    // CUTE RUN
    // ========================================================

    const run =
      Math.sin(
        time * 15
      );


    const oppositeRun =
      Math.sin(
        time * 15 +
        Math.PI
      );


    // Bounce

    robot.position.y =
      -0.55 +
      Math.abs(run) *
      0.075;


    // Little body tilt

    robot.rotation.z =
      run *
      0.035;


    // Arms

    leftArm.rotation.z =
      run * 0.55;

    rightArm.rotation.z =
      oppositeRun * 0.55;


    // Legs

    leftLeg.rotation.x =
      oppositeRun * 0.6;

    rightLeg.rotation.x =
      run * 0.6;


    // Gas

    gasTimer += dt;

    if (
      gasTimer > 0.045
    ) {

      spawnGas();

      gasTimer = 0;
    }

  } else {

    // ========================================================
    // IDLE
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
      ) * 0.01;
  }


  // ==========================================================
  // HEAD TRACKING
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
        headAngle * 0.5,
        -0.6,
        0.6
      ),
      8,
      dt
    );


  // ==========================================================
  // EYE TRACKING
  // ==========================================================

  const eyeMove =
    THREE.MathUtils.clamp(
      headDX * 0.025,
      -0.055,
      0.055
    );


  leftEye.position.x =
    -0.3 +
    eyeMove;


  rightEye.position.x =
    0.3 +
    eyeMove;


  // ==========================================================
  // CHEST PULSE
  // ==========================================================

  const pulse =
    1 +
    Math.sin(
      time * 5
    ) * 0.07;


  chestCore.scale.setScalar(
    pulse
  );


  antennaTip.scale.setScalar(
    1 +
    Math.sin(
      time * 6
    ) * 0.1
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


    p.material.opacity =
      Math.max(
        0,
        p.userData.life /
        p.userData.maxLife
      ) * 0.45;


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
      const p of
      burst.particles
    ) {

      p.userData.life -=
        dt;


      p.userData.vy -=
        3.5 * dt;


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
      burst.age > 1.15
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


  // ==========================================================
  // BLACK HOLE
  // ==========================================================

  blackRing.rotation.z +=
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
      1.2 +
      pointer.y * 0.08,
      2,
      dt
    );


  camera.lookAt(
    0,
    0.1,
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