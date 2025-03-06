import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
//import Fox from './Fox.js'
import Sidewalk from './Sidewalk.js'
import Curb from './Curb.js'
import Road from './Road.js'
import Fence from './Fence.js'
import CampusFloor from './CampusFloor.js'
import Placeholder from './Placeholder.js'

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
            //this.sidewalkLeft = new SidewalkLeft()
            this.curb = new Curb()
            this.road = new Road()
            this.fence = new Fence()
            this.campusFloor = new CampusFloor()
            this.placeholder = new Placeholder()
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