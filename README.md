# 🤖 Cursor Processing Robot

An interactive **3D cursor-aware robot** built with **Three.js** and **Vite**.

The robot responds to the user's mouse movement, tracks the cursor with its head and eyes, and creates a futuristic processing experience using 3D graphics, glowing materials, particles, and a space-themed environment.

---

## ✨ Features

- 🤖 **3D Futuristic Robot**
  - Metallic black and purple design
  - Custom 3D geometry created with Three.js

- 🖱️ **Cursor Tracking**
  - Detects the mouse position in real time
  - Robot head smoothly follows the cursor

- 👀 **Interactive Eyes**
  - Eyes and head respond to cursor movement
  - Creates a more natural interactive experience

- ⚡ **Processing System**
  - Dynamically switches between:
    - `IDLE`
    - `SCANNING`
    - `PROCESSING`

- ✨ **Particle Effects**
  - Generates glowing particles around the cursor
  - Creates a visual processing trail

- 🌌 **Space Environment**
  - Dynamic star field
  - Black-hole-inspired background effects

- 📐 **Responsive Rendering**
  - Adapts automatically to different screen sizes
  - Resolution-aware particle density

- 🎞️ **Smooth Animation**
  - Frame-rate-independent movement
  - Delta-time based animation

- 🎨 **Futuristic Interface**
  - Minimal sci-fi visual design
  - Glowing purple lighting and effects

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Three.js** | 3D rendering and animation |
| **JavaScript** | Application logic |
| **Vite** | Development server and build tool |
| **WebGL** | Hardware-accelerated 3D graphics |
| **HTML5** | Application structure |
| **CSS3** | Styling and responsive design |

---

## 📂 Project Structure

```text
cursor-processing-robot/
│
├── public/
│   └── robot-reference.png
│
├── src/
│   ├── main.js
│   └── style.css
│
├── index.html
├── package.json
└── README.md