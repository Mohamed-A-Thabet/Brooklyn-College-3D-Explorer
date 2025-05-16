import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Doors
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.renderer = this.experience.renderer

        // door handles
        this.doorHandleModel = this.resources.items.doorHandleModel
        this.doorHandleTexture = this.resources.items.buildingRoofWhiteTexture
        this.setModel(this.doorHandleModel, this.doorHandleTexture)

        // door wood
        this.doorWoodModel = this.resources.items.doorWoodModel
        this.doorWoodTexture = this.resources.items.doorWoodTexture
        this.setModel(this.doorWoodModel, this.doorWoodTexture)

        // door frame
        this.doorFrameModel = this.resources.items.doorFrameModel
        this.doorFrameTexture = this.resources.items.doorFrameTexture
        this.setModel(this.doorFrameModel, this.doorFrameTexture)

        // stairs
        this.stairsModel = this.resources.items.stairsModel
        this.doorFrameTexture = this.resources.items.buildingRoofWhiteTexture
        this.setModel(this.stairsModel, this.doorFrameTexture)

        // pole light stone
        this.poleLightStoneModel = this.resources.items.poleLightStoneModel
        this.setModelWithColor(this.poleLightStoneModel, '#0F1012')

        // pole light pillar
        this.poleLightPillarModel = this.resources.items.poleLightPillarModel
        this.setModelWithColor(this.poleLightPillarModel, '#0F1012')

        // pole light bulb
        this.poleLightBulbModel = this.resources.items.poleLightBulbModel
        this.setModelWithColor(this.poleLightBulbModel, '#E6E7DB')
    }

    setModel(model, texture)
    {
        texture.flipY = true;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        

        this.material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        });

        model.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material.map = texture;
                child.material = this.material;
            }
        });
        this.scene.add(model.scene)
    }

    setModelWithColor(model, color)
    {
        this.material = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide
        });

        model.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = this.material;
            }
        });
        this.scene.add(model.scene)
    }

    update(){}
}