import Experience from '../Experience.js'
import Buildings from './Buildings.js'
import Flooring from './Flooring.js'
import Doors from './Doors.js'
import Grass from './Grass.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('ready', () =>
        {
            this.flooring = new Flooring()
            this.buildings = new Buildings()
            this.doors = new Doors()
            this.grass = new Grass()
        })
    }

    update()
    {
        if(this.grass)
            this.grass.update()
    }
}