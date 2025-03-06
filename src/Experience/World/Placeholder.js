import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'
//import {} from ''
import Experience from '../Experience.js'

export default class Placeholder
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time

        this.resource = this.resources.items.placeholderModel

        this.setModel()
    }

    setModel()
    {

        this.material = new THREE.MeshBasicMaterial({
            color: '#964B00',
            side: THREE.DoubleSide
        });

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