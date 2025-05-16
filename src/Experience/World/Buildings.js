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

        const cubeTextureLoader = new THREE.CubeTextureLoader();
        const cubemap = cubeTextureLoader.load([
        "https://i.ibb.co/cKWVNbsx/px.png",
        "https://i.ibb.co/R4GbRxRF/nx.png",
        "https://i.ibb.co/nqf6SzqP/py.png",
        "https://i.ibb.co/TD6jb79w/ny.png",
        "https://i.ibb.co/MkbCNrxp/pz.png",
        "https://i.ibb.co/s9dXT51h/nz.png"
        ]);
        this.scene.background = cubemap;
        this.scene.environment = cubemap;

        // building brick
        this.buildingBrickModel = this.resources.items.buildingBrickModel
        this.buildingBrickTexture = this.resources.items.buildingBrickTexture
        this.setModel(this.buildingBrickModel, this.buildingBrickTexture)

        // building black roof
        this.buildingRoofBlackModel = this.resources.items.buildingRoofBlackModel
        this.setModelWithColor(this.buildingRoofBlackModel, '#5D5D5D')

        // building white roof
        this.buildingRoofWhiteModel = this.resources.items.buildingRoofWhiteModel
        this.buildingRoofWhiteTexture = this.resources.items.buildingRoofWhiteTexture
        this.setModel(this.buildingRoofWhiteModel, this.buildingRoofWhiteTexture)

        // dome
        this.domeModel = this.resources.items.domeModel
        this.domeTexture = this.resources.items.domeTexture
        this.setModel(this.domeModel, this.domeTexture)

        // clock
        this.clockModel = this.resources.items.clockModel
        this.setModelWithColor(this.clockModel, '#FFDF00')

        // chimney roof
        this.chimneyRoofModel = this.resources.items.chimneyRoofModel
        this.setModelWithColor(this.chimneyRoofModel, '#585858')

        // chimney brick
        this.chimneyBrickModel = this.resources.items.chimneyBrickModel
        this.chimneyBrickTexture = this.resources.items.chimneyBrickTexture
        this.setModel(this.chimneyBrickModel, this.chimneyBrickTexture)

        // window glass
        this.windowGlassModel = this.resources.items.windowGlassModel
        this.windowGlassTexture = this.resources.items.windowGlassTexture
        this.setModel(this.windowGlassModel, this.windowGlassTexture)

        // window glass
        this.windowFrameModel = this.resources.items.windowFrameModel
        this.setModelWithColor(this.windowFrameModel, '#FFFFFF')
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