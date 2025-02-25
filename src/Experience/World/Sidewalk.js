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

        /*
        this.resource.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = this.material;
                child.material.map = this.texture;
                
            }
        });

        //console.log(this.resource.scene)
        //console.log(this.resource.scene.children[0].geometry)
        //this.resource.scene.children[0].geometry
        const geometryTest = this.resource.scene.children[0].geometry

        //const mesh = new THREE.Mesh(geometryTest, this.material)
        */
        //
        const geometries = []
        for(let i = 0; i < 2; i++)
        {
            for(let j = -20; j < 20; j++){
                const geometry = this.resource.scene.children[0].geometry.clone()
        
                //geometry.translate(i * 2 + Math.random() - 0.5, 0, j * 2 + Math.random() - 0.5)
                geometry.center()
                geometry.rotateY(Math.floor(Math.random() * 4) * (Math.PI/2))
                geometry.translate(i , 0, j )
                geometries.push(geometry)

                const geometry2 = this.resource.scene.children[0].geometry.clone()
                geometry2.translate(i , 3, j )
                geometries.push(geometry2)
            }
        }
        
        const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries)        
        const mesh = new THREE.Mesh(mergedGeometry, this.material)
        this.scene.add(mesh)
        const axesHelper = new THREE.AxesHelper(2)
        this.scene.add(axesHelper)

        //

        //this.scene.add(mesh)
    }

    update()
    {
    }
}