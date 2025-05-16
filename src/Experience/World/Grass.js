import * as THREE from 'three';
import Experience from '../Experience.js';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';

export default class Grass {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;

        this.areaForGrassModel = this.resources.items.grassFloorModel;
        this.grassBladeModel = this.resources.items.grassModel;

        this.grassCount = 128000;

        this.setModel();
    }

    setModel() {
        const grassBladeGltf = this.grassBladeModel;
        const grassBladeMesh = grassBladeGltf.scene.children[0];

        const grassMaterial = new GrassMaterial({ side: THREE.DoubleSide });

        this.instanceMesh = new THREE.InstancedMesh(
            grassBladeMesh.geometry,
            grassMaterial,
            this.grassCount
        );
        this.scene.add(this.instanceMesh);

        this.positionGrassInstances();
    }

    positionGrassInstances() {
        if (!this.instanceMesh || !this.areaForGrassModel) return;

        const areaMesh = this.areaForGrassModel.scene.children[0];
        const sampler = new MeshSurfaceSampler(areaMesh)
            .setWeightAttribute('color') 
            .build();

        const dummy = new THREE.Object3D();
        const position = new THREE.Vector3();
        const normal = new THREE.Vector3();
        const up = new THREE.Vector3(0, 1, 0);
        const scale = new THREE.Vector3().setScalar(Math.random() * 0.12 + 0.2);

        for (let i = 0; i < this.grassCount; i++) {
            sampler.sample(position, normal);

            dummy.position.copy(position);

            
            dummy.quaternion.setFromUnitVectors(up, normal);

            
            dummy.rotation.y += Math.random() * Math.PI * 2;
            dummy.position.y = 0.1

            dummy.scale.copy(scale);
            dummy.updateMatrix();

            this.instanceMesh.setMatrixAt(i, dummy.matrix);
            this.instanceMesh.setColorAt(i, new THREE.Color(Math.random() * 0xffffff));
        }

        this.instanceMesh.instanceMatrix.needsUpdate = true;
        this.instanceMesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(this.grassCount * 3), 3);
        this.instanceMesh.instanceColor.needsUpdate = true;
    }

    update() {
        if (this.instanceMesh) {
            this.instanceMesh.material.uniforms.fTime.value = this.time.elapsed * 0.001;
        }
    }
}

class GrassMaterial extends THREE.ShaderMaterial {
    uniforms = {
        fTime: { value: 0.0 },
        vPlayerPosition: { value: new THREE.Vector3(0.0, -1.0, 0.0) },
        fPlayerColliderRadius: { value: 1.1 },
    };

    vertexShader = `
        uniform float fTime;

        varying float fDistanceFromGround;
        varying vec3 vInstanceColor;

        float rand(float n){return fract(sin(n) * 43758.5453123);}
        float rand(vec2 n) {
            return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float createNoise(vec2 n) {
            vec2 d = vec2(0.0, 1.0);
            vec2 b = floor(n);
            vec2 f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
            return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
        }

        vec3 localToWorld(vec3 target) {
            return (modelMatrix * instanceMatrix * vec4(target, 1.0)).xyz;
        }

        void main() {
            fDistanceFromGround = max(0.0, position.y);
            vInstanceColor = instanceColor;

            vec3 worldPosition = localToWorld(position);
            float noise = createNoise(vec2(position.x, position.z)) * 0.6 + 0.4;

            vec3 sway = 0.1 * vec3(
                cos(fTime) * noise * fDistanceFromGround,
                0.0,
                0.0
            );

            worldPosition += sway; 

            gl_Position = projectionMatrix * viewMatrix * vec4(worldPosition, 1.0);
        }
    `;

    fragmentShader = `
        varying float fDistanceFromGround;
        varying vec3 vInstanceColor;

        void main() {
            vec3 colorDarkest = vec3(24.0 / 255.0, 30.0 / 255.0, 41.0 / 255.0);
            vec3 colorBrightest = vec3(88.0 / 255.0, 176.0 / 255.0, 110.0 / 255.0);
            vec3 color = mix(colorDarkest, colorBrightest, fDistanceFromGround / 2.0);
            color = clamp(color, 0.0, 1.0);
            gl_FragColor = vec4(color, 1.);
        }
    `;

    constructor(props) {
        super(props);
        this.uniforms = {
            ...this.uniforms,
        };
    }
}