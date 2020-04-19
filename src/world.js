
import Sea from './objects/sea'
import { Field, LeftField } from './objects/field'

const TILE_W = 200
const TILE_H = 200
const OFF_W = 100
const OFF_H = 100

class Environment {
    constructor(scene, width) {
        this.scene = scene

        this.data = [];

        // Create first world
        this.data.push(new Sea(scene))
        this.data.push(new LeftField(scene))
        for(let i = 2; i < width; i++) {
            this.data.push(new Field(scene))
        }
    }
}

export default class World {
    constructor(scene, width=10, height=5) {
        this.scene = scene
        this.width = width
        this.height = height
    
        this.environment = new Environment(scene, width)
        
        this.updateAllPos()
    }

    getSizeInPixels() {
        return new Phaser.Math.Vector2(this.width * TILE_W, this.height * TILE_H)
    }

    tileToWorld(x, y) {
        return new Phaser.Math.Vector2(x * TILE_W + OFF_W, (this.height - (y + 1)) * TILE_H + OFF_H)
    }

    updateAllPos() {
        this.environment.data.forEach((obj, i) => {
            console.log(i, obj.height - 1)
            const pos = this.tileToWorld(i, obj.height - 1)
            console.log(pos)
            obj.setPosition(pos.x, pos.y)
        })
    }
}