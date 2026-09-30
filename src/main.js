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

renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

document.querySelector('#app').appendChild(renderer.domElement);


// ============================================================
// REMOVE OLD HUD / OVERLAYS
// ============================================================

const oldHudSelectors = [
  '#cursorReadout',
  '#distanceReadout',
  '#processReadout',
  '#hud',
  '.hud',
  '.overlay',
  '.readout',
  '.hint'
];

oldHudSelectors.forEach(selector => {
  document.querySelectorAll(selector).forEach(element => {
    element.remove();
  });
});


// ============================================================
// LIGHTING
// ============================================================

scene.add(
  new THREE.AmbientLight(
    0x8d65b5,
    2.2
  )
);

const purpleLight = new THREE.PointLight(
  0xc02cff,
  100,
  16,
  2
);

purpleLight.position.set(
  2,
  4,
  3
);

scene.add(purpleLight);


const blueLight = new THREE.PointLight(
  0x4f6cff,
  70,
  14,
  2
);

blueLight.position.set(
  -4,
  1,
  2
);

scene.add(blueLight);


const pinkLight = new THREE.PointLight(
  0xff55dd,
  60,
  12,
  2
);

pinkLight.position.set(
  3,
  0,
  -2
);

scene.add(pinkLight);


// ============================================================
// FLOOR
// ============================================================

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(
    24,
    24
  ),
  new THREE.MeshBasicMaterial({
    color: 0x100016,
    transparent: true,
    opacity: 0.9
  })
);

floor.rotation.x = -Math.PI / 2;
floor.position.y = -2.05;

scene.add(floor);


// ============================================================
// STAR FIELD
// ============================================================

const stars = new THREE.BufferGeometry();

const starCount = Math.min(
  3000,
  Math.max(
    900,
    Math.floor(
      (innerWidth * innerHeight) / 500
    )
  )
);

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

stars.setAttribute(
  'position',
  new THREE.BufferAttribute(
    starPositions,
    3
  )
);

const starMaterial =
  new THREE.PointsMaterial({
    color: 0xd7c7ff,
    size: 0.018,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });

scene.add(
  new THREE.Points(
    stars,
    starMaterial
  )
);


// ============================================================
// BLACK HOLE BACKGROUND
// ============================================================

const blackHole =
  new THREE.Group();

const blackHoleShadow =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      1.25,
      64,
      64
    ),
    new THREE.MeshBasicMaterial({
      color: 0x000000
    })
  );

blackHole.add(
  blackHoleShadow
);


const blackHoleRing =
  new THREE.Mesh(
    new THREE.TorusGeometry(
      1.65,
      0.085,
      20,
      180
    ),
    new THREE.MeshBasicMaterial({
      color: 0xa52cff,
      transparent: true,
      opacity: 0.38
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
// ROBOT MATERIALS
// ============================================================

const robotBodyMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x171524,
    metalness: 0.55,
    roughness: 0.3
  });


const robotLightMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x352052,
    metalness: 0.5,
    roughness: 0.25
  });


const purpleGlow =
  new THREE.MeshStandardMaterial({
    color: 0xc526ff,
    emissive: 0x9d00ff,
    emissiveIntensity: 3,
    metalness: 0.2,
    roughness: 0.25
  });


const eyeMaterial =
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x9f7cff,
    emissiveIntensity: 2.5,
    metalness: 0.1,
    roughness: 0.15
  });


const blackMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x05040a,
    metalness: 0.2,
    roughness: 0.4
  });


// ============================================================
// CUTE BODY
// ============================================================

const body =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      1,
      32,
      24
    ),
    robotBodyMaterial
  );

body.scale.set(
  1.0,
  1.15,
  0.82
);

body.position.y = -0.45;

robot.add(body);


// CHEST GLOW

const chestGlow =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.28,
      24,
      24
    ),
    purpleGlow
  );

chestGlow.scale.set(
  1.3,
  0.5,
  0.3
);

chestGlow.position.set(
  0,
  -0.45,
  0.77
);

robot.add(
  chestGlow
);


// ============================================================
// HEAD
// ============================================================

const head =
  new THREE.Group();

head.position.y =
  1.05;

robot.add(head);


// Cute rounded head

const headShell =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      1,
      40,
      32
    ),
    robotLightMaterial
  );

headShell.scale.set(
  1.05,
  0.85,
  0.85
);

head.add(
  headShell
);


// ============================================================
// FACE
// ============================================================

const face =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.82,
      32,
      24
    ),
    new THREE.MeshStandardMaterial({
      color: 0x160022,
      emissive: 0x28003d,
      emissiveIntensity: 1.4,
      roughness: 0.25,
      metalness: 0.3
    })
  );

face.scale.set(
  1,
  0.72,
  0.25
);

face.position.z =
  0.72;

head.add(
  face
);


// ============================================================
// BIG CUTE EYES
// ============================================================

const leftEye =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.24,
      32,
      32
    ),
    eyeMaterial
  );

const rightEye =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.24,
      32,
      32
    ),
    eyeMaterial
  );

leftEye.position.set(
  -0.35,
  0.12,
  0.82
);

rightEye.position.set(
  0.35,
  0.12,
  0.82
);

head.add(
  leftEye,
  rightEye
);


// Eye pupils

const pupilMaterial =
  new THREE.MeshBasicMaterial({
    color: 0x6b00ff
  });

const leftPupil =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.1,
      20,
      20
    ),
    pupilMaterial
  );

const rightPupil =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.1,
      20,
      20
    ),
    pupilMaterial
  );

leftPupil.position.set(
  -0.35,
  0.12,
  1.02
);

rightPupil.position.set(
  0.35,
  0.12,
  1.02
);

head.add(
  leftPupil,
  rightPupil
);


// ============================================================
// CUTE MOUTH
// ============================================================

const mouth =
  new THREE.Mesh(
    new THREE.TorusGeometry(
      0.17,
      0.045,
      10,
      32,
      Math.PI
    ),
    purpleGlow
  );

mouth.rotation.x =
  Math.PI;

mouth.position.set(
  0,
  -0.22,
  0.82
);

head.add(
  mouth
);


// ============================================================
// CUTE EARS
// ============================================================

const earMaterial =
  new THREE.MeshStandardMaterial({
    color: 0x27153d,
    metalness: 0.6,
    roughness: 0.25
  });


const leftEar =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.28,
      24,
      24
    ),
    earMaterial
  );

const rightEar =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.28,
      24,
      24
    ),
    earMaterial
  );

leftEar.position.set(
  -0.98,
  0.05,
  0
);

rightEar.position.set(
  0.98,
  0.05,
  0
);

head.add(
  leftEar,
  rightEar
);


// Ear lights

const earLightMaterial =
  new THREE.MeshBasicMaterial({
    color: 0xd435ff
  });

const leftEarLight =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.12,
      16,
      16
    ),
    earLightMaterial
  );

const rightEarLight =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.12,
      16,
      16
    ),
    earLightMaterial
  );

leftEarLight.position.set(
  -0.98,
  0.05,
  0.23
);

rightEarLight.position.set(
  0.98,
  0.05,
  0.23
);

head.add(
  leftEarLight,
  rightEarLight
);


// ============================================================
// ANTENNA
// ============================================================

const antenna =
  new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.035,
      0.055,
      0.42,
      16
    ),
    robotLightMaterial
  );

antenna.position.y =
  0.92;

head.add(
  antenna
);


const antennaBall =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.11,
      20,
      20
    ),
    purpleGlow
  );

antennaBall.position.y =
  1.14;

head.add(
  antennaBall
);


// ============================================================
// ARMS
// ============================================================

const leftArm =
  new THREE.Group();

const rightArm =
  new THREE.Group();

leftArm.position.set(
  -1.0,
  -0.35,
  0
);

rightArm.position.set(
  1.0,
  -0.35,
  0
);

robot.add(
  leftArm,
  rightArm
);


const armGeometry =
  new THREE.SphereGeometry(
    0.32,
    24,
    24
  );


const leftArmPart =
  new THREE.Mesh(
    armGeometry,
    robotLightMaterial
  );

leftArmPart.scale.set(
  0.7,
  1.45,
  0.7
);

leftArmPart.position.y =
  -0.3;

leftArm.add(
  leftArmPart
);


const rightArmPart =
  new THREE.Mesh(
    armGeometry,
    robotLightMaterial
  );

rightArmPart.scale.set(
  0.7,
  1.45,
  0.7
);

rightArmPart.position.y =
  -0.3;

rightArm.add(
  rightArmPart
);


// Hands

const handGeometry =
  new THREE.SphereGeometry(
    0.25,
    20,
    20
  );

const leftHand =
  new THREE.Mesh(
    handGeometry,
    purpleGlow
  );

const rightHand =
  new THREE.Mesh(
    handGeometry,
    purpleGlow
  );

leftHand.position.y =
  -0.75;

rightHand.position.y =
  -0.75;

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
  -0.38,
  -1.35,
  0
);

rightLeg.position.set(
  0.38,
  -1.35,
  0
);

robot.add(
  leftLeg,
  rightLeg
);


const legGeometry =
  new THREE.SphereGeometry(
    0.32,
    24,
    24
  );


const leftLegPart =
  new THREE.Mesh(
    legGeometry,
    robotBodyMaterial
  );

leftLegPart.scale.set(
  0.72,
  1.35,
  0.75
);

leftLegPart.position.y =
  -0.25;

leftLeg.add(
  leftLegPart
);


const rightLegPart =
  new THREE.Mesh(
    legGeometry,
    robotBodyMaterial
  );

rightLegPart.scale.set(
  0.72,
  1.35,
  0.75
);

rightLegPart.position.y =
  -0.25;

rightLeg.add(
  rightLegPart
);


// Feet

const footGeometry =
  new THREE.SphereGeometry(
    0.38,
    24,
    20
  );


const leftFoot =
  new THREE.Mesh(
    footGeometry,
    robotLightMaterial
  );

const rightFoot =
  new THREE.Mesh(
    footGeometry,
    robotLightMaterial
  );

leftFoot.scale.set(
  1.25,
  0.55,
  1.35
);

rightFoot.scale.set(
  1.25,
  0.55,
  1.35
);

leftFoot.position.set(
  0,
  -0.85,
  0.12
);

rightFoot.position.set(
  0,
  -0.85,
  0.12
);

leftLeg.add(
  leftFoot
);

rightLeg.add(
  rightFoot
);


// ============================================================
// CURSOR / WORLD POSITION
// ============================================================

const pointer =
  new THREE.Vector2();

const targetWorld =
  new THREE.Vector3();

const raycaster =
  new THREE.Raycaster();

const movementPlane =
  new THREE.Plane(
    new THREE.Vector3(
      0,
      1,
      0
    ),
    0.65
  );


// ============================================================
// CURSOR GLOW
// ============================================================

const cursorDot =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      0.07,
      20,
      20
    ),
    new THREE.MeshBasicMaterial({
      color: 0xffffff
    })
  );

scene.add(
  cursorDot
);


// Cursor ring

const cursorRing =
  new THREE.Mesh(
    new THREE.TorusGeometry(
      0.16,
      0.025,
      10,
      32
    ),
    new THREE.MeshBasicMaterial({
      color: 0xb72cff,
      transparent: true,
      opacity: 0.8
    })
  );

scene.add(
  cursorRing
);


// ============================================================
// MOUSE
// ============================================================

addEventListener(
  'pointermove',
  event => {

    pointer.x =
      (event.clientX / innerWidth) * 2 - 1;

    pointer.y =
      -(event.clientY / innerHeight) * 2 + 1;
  }
);


// ============================================================
// GET CURSOR WORLD POSITION
// ============================================================

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
      -4.5,
      4.5
    );

  targetWorld.z =
    THREE.MathUtils.clamp(
      targetWorld.z,
      -4.5,
      2.8
    );

  targetWorld.y =
    -0.65;
}


// ============================================================
// GAS TRAIL SYSTEM
// ============================================================

const gasParticles = [];

const gasColors = [
  0xc72cff,
  0x8c35ff,
  0xe05cff,
  0xffffff,
  0x6f54ff
];


function createGasParticle() {

  const material =
    new THREE.MeshBasicMaterial({
      color:
        gasColors[
          Math.floor(
            Math.random() *
            gasColors.length
          )
        ],
      transparent: true,
      opacity: 0.55
    });


  const particle =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        THREE.MathUtils.randFloat(
          0.07,
          0.16
        ),
        12,
        12
      ),
      material
    );


  particle.position.copy(
    robot.position
  );


  particle.position.x +=
    THREE.MathUtils.randFloatSpread(
      0.5
    );


  particle.position.y +=
    THREE.MathUtils.randFloat(
      -0.7,
      0.1
    );


  particle.position.z +=
    THREE.MathUtils.randFloatSpread(
      0.35
    );


  particle.userData.velocity =
    new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(
        0.35
      ),
      THREE.MathUtils.randFloat(
        -0.05,
        0.35
      ),
      THREE.MathUtils.randFloat(
        0.2,
        0.9
      )
    );


  particle.userData.life =
    THREE.MathUtils.randFloat(
      0.5,
      1.15
    );


  particle.userData.maxLife =
    particle.userData.life;


  particle.userData.growth =
    THREE.MathUtils.randFloat(
      1.2,
      2.4
    );


  scene.add(
    particle
  );

  gasParticles.push(
    particle
  );
}


// ============================================================
// BIG GAS PUFF
// ============================================================

function createGasPuff() {

  const material =
    new THREE.MeshBasicMaterial({
      color: 0x9d3cff,
      transparent: true,
      opacity: 0.25
    });


  const puff =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        THREE.MathUtils.randFloat(
          0.16,
          0.3
        ),
        16,
        16
      ),
      material
    );


  puff.position.copy(
    robot.position
  );


  puff.position.y +=
    THREE.MathUtils.randFloat(
      -0.7,
      0
    );


  puff.position.x +=
    THREE.MathUtils.randFloatSpread(
      0.45
    );


  puff.userData.life =
    0.8;


  puff.userData.maxLife =
    0.8;


  scene.add(
    puff
  );

  gasParticles.push(
    puff
  );
}


// ============================================================
// FIRECRACKER SYSTEM
// ============================================================

const firecrackerBursts =
  [];

const firecrackerColors = [
  0xff35ff,
  0x8c4dff,
  0x4da6ff,
  0xffffff,
  0xff7b35,
  0xffe45e
];


function createFirecracker(
  position
) {

  const burst = {
    particles: [],
    age: 0,
    lifetime: 1.4,
    flash: null
  };


  const particleCount = 100;


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
        THREE.MathUtils.randFloatSpread(
          2
        ),
        THREE.MathUtils.randFloatSpread(
          2
        ),
        THREE.MathUtils.randFloatSpread(
          2
        )
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

    scene.add(
      particle
    );
  }


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

  scene.add(
    flash
  );

  burst.flash =
    flash;

  firecrackerBursts.push(
    burst
  );
}


// ============================================================
// CLICK = FIRECRACKER
// ============================================================

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
        -4.5,
        4.5
      );


    clickPosition.z =
      THREE.MathUtils.clamp(
        clickPosition.z,
        -4.5,
        2.8
      );


    clickPosition.y =
      -0.65;


    createFirecracker(
      clickPosition
    );
  }
);


// ============================================================
// CLOCK
// ============================================================

const clock =
  new THREE.Clock();

let gasTimer = 0;
let puffTimer = 0;


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
      0.05
    );


  const time =
    clock.elapsedTime;


  updateTarget();


  // ========================================================
  // ROBOT MOVEMENT
  // ========================================================

  const robotTarget =
    new THREE.Vector3(
      targetWorld.x,
      -0.65,
      targetWorld.z
    );


  const movementDirection =
    new THREE.Vector3()
      .subVectors(
        robotTarget,
        robot.position
      );


  movementDirection.y = 0;


  const distance =
    movementDirection.length();


  const isRunning =
    distance > 0.12;


  if (isRunning) {

    movementDirection.normalize();


    // FAST RUSH
    const speed =
      THREE.MathUtils.clamp(
        2.8 +
        distance * 1.9,
        2.8,
        10
      );


    const movement =
      Math.min(
        speed * dt,
        distance
      );


    robot.position.addScaledVector(
      movementDirection,
      movement
    );


    // ======================================================
    // FACE MOVEMENT DIRECTION
    // ======================================================

    const targetRotation =
      Math.atan2(
        movementDirection.x,
        movementDirection.z
      );


    robot.rotation.y =
      THREE.MathUtils.damp(
        robot.rotation.y,
        targetRotation,
        12,
        dt
      );


    // ======================================================
    // RUNNING BOUNCE
    // ======================================================

    const runWave =
      Math.sin(
        time * 13
      );


    robot.position.y =
      -0.65 +
      Math.abs(
        runWave
      ) * 0.10;


    robot.rotation.z =
      runWave *
      0.035;


    // ======================================================
    // ARMS RUNNING
    // ======================================================

    leftArm.rotation.z =
      Math.sin(
        time * 14
      ) * 0.55;


    rightArm.rotation.z =
      Math.sin(
        time * 14 +
        Math.PI
      ) * 0.55;


    // ======================================================
    // LEGS RUNNING
    // ======================================================

    leftLeg.rotation.x =
      Math.sin(
        time * 14
      ) * 0.65;


    rightLeg.rotation.x =
      Math.sin(
        time * 14 +
        Math.PI
      ) * 0.65;


    // ======================================================
    // GAS TRAIL
    // ======================================================

    gasTimer += dt;

    puffTimer += dt;


    if (
      gasTimer > 0.035
    ) {

      createGasParticle();

      gasTimer = 0;
    }


    if (
      puffTimer > 0.12
    ) {

      createGasPuff();

      puffTimer = 0;
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


    // Cute idle arm movement

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
  }


  // ========================================================
  // HEAD FOLLOWS CURSOR
  // ========================================================

  const localTarget =
    targetWorld.clone();

  head.parent.worldToLocal(
    localTarget
  );


  const headYaw =
    Math.atan2(
      localTarget.x,
      Math.max(
        0.5,
        localTarget.z
      )
    );


  head.rotation.y =
    THREE.MathUtils.damp(
      head.rotation.y,
      THREE.MathUtils.clamp(
        headYaw * 0.7,
        -0.65,
        0.65
      ),
      8,
      dt
    );


  // ========================================================
  // EYES FOLLOW CURSOR
  // ========================================================

  const eyeTarget =
    targetWorld.clone();

  head.worldToLocal(
    eyeTarget
  );


  const eyeOffsetX =
    THREE.MathUtils.clamp(
      eyeTarget.x * 0.045,
      -0.07,
      0.07
    );


  const eyeOffsetY =
    THREE.MathUtils.clamp(
      eyeTarget.y * 0.045,
      -0.06,
      0.06
    );


  leftPupil.position.x =
    -0.35 +
    eyeOffsetX;


  rightPupil.position.x =
    0.35 +
    eyeOffsetX;


  leftPupil.position.y =
    0.12 +
    eyeOffsetY;


  rightPupil.position.y =
    0.12 +
    eyeOffsetY;


  // ========================================================
  // ANTENNA BOUNCE
  // ========================================================

  antennaBall.scale.setScalar(
    1 +
    Math.sin(
      time * 6
    ) * 0.12
  );


  // ========================================================
  // CUTE IDLE BOB
  // ========================================================

  if (!isRunning) {

    head.position.y =
      1.05 +
      Math.sin(
        time * 2.5
      ) * 0.025;
  }


  // ========================================================
  // CURSOR
  // ========================================================

  cursorDot.position.lerp(
    targetWorld,
    1 -
    Math.exp(
      -15 * dt
    )
  );


  cursorRing.position.copy(
    cursorDot.position
  );


  cursorRing.rotation.x =
    time * 2;


  cursorRing.rotation.y =
    time * 3;


  const cursorScale =
    1 +
    Math.sin(
      time * 7
    ) * 0.18;


  cursorRing.scale.setScalar(
    cursorScale
  );


  // ========================================================
  // BLACK HOLE
  // ========================================================

  blackHoleRing.rotation.z +=
    dt * 0.25;


  blackHole.rotation.y +=
    dt * 0.04;


  // ========================================================
  // GAS PARTICLES UPDATE
  // ========================================================

  for (
    let i =
      gasParticles.length - 1;
    i >= 0;
    i--
  ) {

    const particle =
      gasParticles[i];


    particle.userData.life -=
      dt;


    particle.position.addScaledVector(
      particle.userData.velocity,
      dt
    );


    // Gas slowly rises

    particle.position.y +=
      dt * 0.12;


    // Grow gas

    const growth =
      particle.userData.growth ||
      1.4;


    particle.scale.multiplyScalar(
      1 +
      dt * growth
    );


    const lifeRatio =
      Math.max(
        0,
        particle.userData.life /
        particle.userData.maxLife
      );


    particle.material.opacity =
      lifeRatio * 0.45;


    // Remove dead gas

    if (
      particle.userData.life <=
      0
    ) {

      scene.remove(
        particle
      );


      particle.geometry.dispose();
      particle.material.dispose();


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
      const particle of
      burst.particles
    ) {

      particle.userData.life -=
        dt;


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
        1 +
        dt * 1.2
      );
    }


    // Flash

    if (
      burst.flash
    ) {

      burst.flash.scale.multiplyScalar(
        1 +
        dt * 8
      );


      burst.flash.material.opacity =
        Math.max(
          0,
          1 -
          burst.age * 5
        );
    }


    // Remove finished explosion

    if (
      burst.age >=
      burst.lifetime
    ) {

      for (
        const particle of
        burst.particles
      ) {

        scene.remove(
          particle
        );


        particle.geometry.dispose();
        particle.material.dispose();
      }


      if (
        burst.flash
      ) {

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


  // ========================================================
  // CAMERA
  // ========================================================

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
      1.5 +
      pointer.y * 0.15,
      2,
      dt
    );


  camera.lookAt(
    0,
    0.2,
    -1.7
  );


  renderer.render(
    scene,
    camera
  );
}


// ============================================================
// START
// ============================================================

animate();


// ============================================================
// RESPONSIVE
// ============================================================

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