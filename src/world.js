
import { Field, LeftField } from './objects/field'
import { Ground, GroundTypes } from './objects/ground'
import { Sea } from './objects/sea';
import { City } from './objects/city'

const TILE_W = 200
const TILE_H = 200
const OFF_W = 100
const OFF_H = 100

class Environment {
    constructor(scene, width) {
        this.scene = scene

        this.data = [
            // Create first world
            new Sea(this.scene),
            new LeftField(this.scene),
            new Field(this.scene),
            new City(this.scene),
            new Ground(this.scene, GroundTypes.FOREST[0], GroundTypes.FOREST[1], 3),
            new Field(this.scene),
            new City(this.scene),
            new City(this.scene),
        ];
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
            const pos = this.tileToWorld(i, obj.height - 1)
            obj.setPosition(pos.x, pos.y)
        })
    }
}