import EventEmitter from './EventEmitter.js'
import Stats from 'stats.js'

export default class StatsWrapper extends EventEmitter
{
    constructor()
    {
        super()

        // Setup
        this.stats = new Stats()
        this.stats.showPanel(0)
        document.body.appendChild(this.stats.dom)
    }

    begin(){
        this.stats.begin()
    }
    end(){
        this.stats.end()
    }
}