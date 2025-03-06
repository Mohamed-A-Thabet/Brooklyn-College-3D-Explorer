import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'
//import {} from ''
import Experience from '../Experience.js'

export default class Sidewalk
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        this.resource = this.resources.items.sidewalkModel
        this.texture = this.resources.items.sidewalkTexture

        this.setModel()
    }

    setModel()
    {
        this.texture.flipY = true;
        this.texture.colorSpace = THREE.SRGBColorSpace;

        this.material = new THREE.MeshBasicMaterial({
            map: this.texture,
            side: THREE.DoubleSide
        });

        const axesHelper = new THREE.AxesHelper(2)
        this.scene.add(axesHelper)

        this.resource.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material.map = this.texture;
                child.material = this.material;
            }
        });
        this.scene.add(this.resource.scene)
    }

    update()
    {
    }
}