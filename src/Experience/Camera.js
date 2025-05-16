import * as THREE from "three";
import Experience from "./Experience.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

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

        this.setInstance();
        this.setControls();
        this.setupEventListeners();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            45,
            this.sizes.width / this.sizes.height,
            0.1,
            1500,
        );
        this.instance.position.set(0, 3, -10);
        this.instance.lookAt(new THREE.Vector3(0, 3, 0));
        this.scene.add(this.instance);
    }

    setControls() {
        this.controls = new PointerLockControls(this.instance, this.canvas);
        this.scene.add(this.controls.getObject());

        this.canvas.addEventListener("click", () => {
            this.controls.lock();
        });
    }

    setupEventListeners() {
        document.addEventListener("keydown", (event) => {
            switch (event.code) {
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

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update(deltaTime) {
        if (this.controls.isLocked) {
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

            this.controls.moveRight(-this.velocity.x);
            this.controls.moveForward(-this.velocity.z);
        }
    }
}
