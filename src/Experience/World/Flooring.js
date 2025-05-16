import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Flooring
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.renderer = this.experience.renderer

        // road
        this.roadModel = this.resources.items.roadModel
        this.roadTexture = this.resources.items.roadTexture
        this.setModel(this.roadModel, this.roadTexture)

        // road intersection
        this.intersectionModel = this.resources.items.intersectionModel
        this.intersectionTexture = this.resources.items.intersectionTexture
        this.setModel(this.intersectionModel, this.intersectionTexture)

        // crosswalk
        this.crosswalkModel = this.resources.items.crosswalkModel
        this.crosswalkTexture = this.resources.items.crosswalkTexture
        this.setModel(this.crosswalkModel, this.crosswalkTexture)

        // sidewalk
        this.sidewalkModel = this.resources.items.sidewalkModel
        this.sidewalkTexture = this.resources.items.sidewalkTexture
        this.setModel(this.sidewalkModel, this.sidewalkTexture)

        this.curbModel = this.resources.items.curbModel
        this.setModelWithColor(this.curbModel, '#67655F')

        // grass base
        this.grassFloorModel = this.resources.items.grassFloorModel
        this.grassFloorTexture = this.resources.items.grassFloorTexture
        this.setModel(this.grassFloorModel, this.grassFloorTexture)

        // stone pathway
        this.stonePathModel = this.resources.items.stonePathModel
        this.stonePathTexture = this.resources.items.stonePathTexture
        this.setModel(this.stonePathModel, this.stonePathTexture)

        // fence
        this.fenceModel = this.resources.items.fenceModel
        this.fenceTexture = this.resources.items.fenceTexture
        this.setModelWithColor(this.fenceModel, '#0F1012')

        // pondWall
        this.pondWallModel = this.resources.items.pondWallModel
        this.setModelWithColor(this.pondWallModel, '#0F1012')

        // pond
        this.pondModel = this.resources.items.pondModel
        this.setModelWithColor(this.pondModel, '#1807E7')
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