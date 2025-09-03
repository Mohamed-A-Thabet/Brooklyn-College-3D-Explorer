import * as THREE from "three";
import Experience from "./Experience.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.speed = 15.0;

        this.controlMode = "orbit";

        this.walkPosition = new THREE.Vector3(0, 3, -15);

        this.orbitPosition = new THREE.Vector3(0, 60, -90);

        this.defaultLookAt = new THREE.Vector3(0, 3, 100);

        this.setInstance();
        this.setControls();
        this.setupEventListeners();
        this.createModeToggle();
        this.createControlsOverlay();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            45,
            this.sizes.width / this.sizes.height,
            0.1,
            1500,
        );

        this.instance.position.copy(this.orbitPosition);
        this.instance.lookAt(this.defaultLookAt);
        this.scene.add(this.instance);
    }

    setControls() {
        this.pointerControls = new PointerLockControls(this.instance, this.canvas);
        this.scene.add(this.pointerControls.getObject());

        this.orbitControls = new OrbitControls(this.instance, this.canvas);
        this.orbitControls.enableDamping = true;
        this.orbitControls.dampingFactor = 0.05;
        this.orbitControls.screenSpacePanning = false;
        this.orbitControls.maxPolarAngle = Math.PI / 2;
        this.orbitControls.minDistance = 1;
        this.orbitControls.maxDistance = 500;
        this.orbitControls.target.copy(this.defaultLookAt);

        this.setControlMode(this.controlMode);
    }

    setControlMode(mode) {
        const previousMode = this.controlMode;
        this.controlMode = mode;

        if (mode === "walk") {
            if (previousMode === "orbit") {
                this.orbitPosition.copy(this.instance.position);
            }

            this.orbitControls.enabled = false;
            this.pointerControls.enabled = true;

            this.pointerControls.getObject().position.copy(this.walkPosition);

            const direction = this.defaultLookAt
                .clone()
                .sub(this.walkPosition)
                .normalize();
            this.pointerControls.getObject().lookAt(this.defaultLookAt);

            this.pointerControls.lock();

            this.updateToggleButton();
            this.showControlsOverlay(true);
        } else if (mode === "orbit") {
            if (previousMode === "walk") {
                this.walkPosition.copy(this.pointerControls.getObject().position);
            }

            this.pointerControls.unlock();
            this.pointerControls.enabled = false;
            this.orbitControls.enabled = true;

            this.instance.position.copy(this.orbitPosition);

            this.orbitControls.target.copy(this.defaultLookAt);
            this.orbitControls.update();

            this.updateToggleButton();
            this.showControlsOverlay(false);
        }
    }

    toggleControlMode() {
        if (this.controlMode === "walk") {
            this.setControlMode("orbit");
        } else {
            this.setControlMode("walk");
        }
    }

    setupEventListeners() {
        this.canvas.addEventListener("click", () => {
            if (this.controlMode === "walk" && !this.pointerControls.isLocked) {
                this.pointerControls.lock();
            }
        });

        document.addEventListener("keydown", (event) => {
            switch (event.code) {
                case "Tab":
                    event.preventDefault();
                    this.toggleControlMode();
                    break;
                case "ShiftLeft":
                case "ShiftRight":
                    this.speed = 30;
                    break;
                case "KeyW":
                case "ArrowUp":
                    this.moveForward = true;
                    break;
                case "KeyA":
                case "ArrowLeft":
                    this.moveLeft = true;
                    break;
                case "KeyS":
                case "ArrowDown":
                    this.moveBackward = true;
                    break;
                case "KeyD":
                case "ArrowRight":
                    this.moveRight = true;
                    break;
            }
        });

        document.addEventListener("keyup", (event) => {
            switch (event.code) {
                case "ShiftLeft":
                case "ShiftRight":
                    this.speed = 15;
                    break;
                case "KeyW":
                case "ArrowUp":
                    this.moveForward = false;
                    break;
                case "KeyA":
                case "ArrowLeft":
                    this.moveLeft = false;
                    break;
                case "KeyS":
                case "ArrowDown":
                    this.moveBackward = false;
                    break;
                case "KeyD":
                case "ArrowRight":
                    this.moveRight = false;
                    break;
            }
        });
    }

    createModeToggle() {
        const toggleButton = document.createElement("button");
        toggleButton.id = "cameraToggle";
        toggleButton.style.position = "absolute";
        toggleButton.style.top = "10px";
        toggleButton.style.right = "10px";
        toggleButton.style.zIndex = "1000";
        toggleButton.style.padding = "8px 12px";
        toggleButton.style.backgroundColor = "#444";
        toggleButton.style.border = "none";
        toggleButton.style.borderRadius = "4px";
        toggleButton.style.color = "white";
        toggleButton.style.fontFamily = "Arial, sans-serif";
        toggleButton.style.cursor = "pointer";
        toggleButton.textContent = "Switch to Walk Mode";

        toggleButton.addEventListener("click", () => {
            this.toggleControlMode();
        });

        this.toggleButton = toggleButton;
        document.body.appendChild(toggleButton);

        this.updateToggleButton();
    }

    updateToggleButton() {
        if (!this.toggleButton) return;

        if (this.controlMode === "walk") {
            this.toggleButton.textContent = "Switch to Orbit Mode";
            this.toggleButton.style.backgroundColor = "#444";
        } else {
            this.toggleButton.textContent = "Switch to Walk Mode";
            this.toggleButton.style.backgroundColor = "#007BFF";
        }
    }

    createControlsOverlay() {
        const controlsOverlay = document.createElement("div");
        controlsOverlay.id = "controlsOverlay";
        controlsOverlay.style.position = "absolute";
        controlsOverlay.style.top = "60px";
        controlsOverlay.style.right = "10px";
        controlsOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        controlsOverlay.style.color = "white";
        controlsOverlay.style.padding = "15px";
        controlsOverlay.style.borderRadius = "5px";
        controlsOverlay.style.fontFamily = "Arial, sans-serif";
        controlsOverlay.style.zIndex = "1000";
        controlsOverlay.style.display = "none";
        controlsOverlay.style.textAlign = "left";

        controlsOverlay.innerHTML = `
            <div style="margin-bottom: 8px; font-weight: bold;">Walk Mode Controls</div>
            <div>Move: W, A, S, D or Arrow Keys</div>
            <div>Look Around: Mouse Movement</div>
            <div>Run: Hold Shift</div>
            <div>Exit Walk Mode: ESC</div>
            <div>Change to Orbit Mode: Tab</div>
        `;

        this.controlsOverlay = controlsOverlay;
        document.body.appendChild(controlsOverlay);

        document.addEventListener("pointerlockchange", () => {
            if (this.controlMode === "walk") {
                if (document.pointerLockElement) {
                    this.showControlsOverlay(true);
                } else {
                    this.showControlsOverlay(false);
                }
            }
        });
    }

    showControlsOverlay(show) {
        if (!this.controlsOverlay) return;

        if (show && this.controlMode === "walk") {
            this.controlsOverlay.style.display = "block";
        } else {
            this.controlsOverlay.style.display = "none";
        }
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update(deltaTime) {
        if (this.controlMode === "walk" && this.pointerControls.isLocked) {
            const timeFactor = deltaTime || 0.016;

            this.velocity.x = 0;
            this.velocity.z = 0;

            this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
            this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
            this.direction.normalize();

            if (this.moveForward || this.moveBackward) {
                this.velocity.z -= this.direction.z * this.speed * timeFactor;
            }
            if (this.moveLeft || this.moveRight) {
                this.velocity.x -= this.direction.x * this.speed * timeFactor;
            }

            this.pointerControls.moveRight(-this.velocity.x);
            this.pointerControls.moveForward(-this.velocity.z);
        } else if (this.controlMode === "orbit") {
            this.orbitControls.update();
        }
    }
}
