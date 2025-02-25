import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
//import Fox from './Fox.js'
import Sidewalk from './Sidewalk.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            //this.floor = new Floor()
            this.sidewalk = new Sidewalk()
            //this.fox = new Fox()
            //this.environment = new Environment()
        })
    }

    update()
    {
        if(this.fox)
            this.fox.update()
    }
}