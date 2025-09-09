# [Brooklyn College 3D Explorer](https://staging.d36c0p0va6gui2.amplifyapp.com/)

An interactive 3D environment of the Brooklyn College Campus built with Three.js that lets you explore the East Quad with two different camera modes and features a custom procedural grass system. You can walk around in first-person mode or switch to an orbital camera to get a bird's eye view of the scene. The grass system renders over 100k individual blades that sway in the wind.

All the 3D models (buildings, doors, grass blades, floors) were designed and modeled in Blender, then exported as GLTF files for web optimization.

## Features

**Two Camera Modes:**
- Orbit mode for birds-eye view 
- Walk mode for exploring on foot with mouse look controls
- Hit Tab to switch between them anytime

**Grass System:**
- 128,000 individual grass blades placed using surface sampling
- Each blade moves independently with a wind shader
- Color gradients from dark at the base to lighter at the tips
- All rendered efficiently using instancing

**3D Environment:**
- Custom buildings and architectural elements
- Various floor surfaces
- Everything modeled from scratch in Blender

## Controls

**Orbit Mode:**
- Drag to rotate the camera
- Scroll to zoom in/out
- Tab to switch to walk mode

**Walk Mode:**
- WASD or arrow keys to move
- Mouse to look around (click to lock cursor)
- Hold Shift to run
- Escape to unlock cursor
- Tab to go back to orbit mode

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```

## How It's Built

The project uses a modular architecture where each major component is its own class:

```
src/Experience/
├── Camera.js          # Handles both camera modes and switching
├── Experience.js      # Main app singleton that ties everything together  
├── Renderer.js        # WebGL renderer setup
├── World/
│   ├── Grass.js       # The instanced grass system with shaders
│   ├── Buildings.js   # Loads and positions building models
│   ├── Doors.js       # Loads and positions door models
│   └── Flooring.js    # Ground/floor meshes
└── Utils/
    ├── Resources.js   # Handles loading GLTF models and textures
    ├── Time.js        # Animation loop and delta time
    └── Sizes.js       # Viewport management
```

The grass system uses `MeshSurfaceSampler` to scatter grass blades across a floor mesh, then renders them all as instances with a custom shader that makes them sway.

## Debug Mode

Add `#debug` to the URL to get a GUI with various controls and performance stats. Useful for tweaking values or seeing FPS.

## Technical Notes

- Uses DRACO compression for smaller model files
- Grass positioning is based on vertex colors in the floor mesh
- Camera positions are preserved when switching modes

The whole thing runs pretty smoothly on desktop browsers. Mobile might struggle a bit due to the high grass count, but you could easily dial that down in `Grass.js`.

## Dependencies

- **three.js** - The 3D engine
- **lil-gui** - Debug interface  
- **stats.js** - FPS monitoring

## Models & Assets

All 3D models were created in Blender and exported as GLTF files. This includes:
- Building architecture and details
- Grass blade geometry
- Door and floor meshes

The models are stored in the `static/` directory and loaded at runtime through the Resources system.
