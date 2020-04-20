
import { Field, LeftField } from './objects/field'
import { Ground, GroundTypes } from './objects/ground'
import { Sea } from './objects/sea'
import { City } from './objects/city'
import { Wind, WIND_X_Y_TO_DIR } from './objects/wind'

const TILE_W = 200
const TILE_H = 200
const OFF_W = 100
const OFF_H = 100

export default class World {
    constructor(scene, width=10, height=5) {
        this.scene = scene
        this.width = width
        this.height = height
    
        // Create first world
        this.environment = [
            new Sea(this.scene),
            new LeftField(this.scene),
            new Field(this.scene),
            new City(this.scene),
            new Ground(this.scene, GroundTypes.FOREST[0], GroundTypes.FOREST[1], 3),
            new Field(this.scene),
            new City(this.scene),
            new City(this.scene),
        ]
        this._createWindGrid()
        
        this.updateAllPos()
    }

    getSizeInPixels() {
        return new Phaser.Math.Vector2(this.width * TILE_W, this.height * TILE_H)
    }

    tileToWorld(x, y) {
        return new Phaser.Math.Vector2(x * TILE_W + OFF_W, (this.height - (y + 1)) * TILE_H + OFF_H)
    }

    worldToTile(x, y) {
        return new Phaser.Math.Vector2(Math.floor(x / TILE_W), this.height - 1 - Math.floor(y / TILE_H))
    }

    updateAllPos() {
        this.environment.forEach((obj, i) => {
            const pos = this.tileToWorld(i, obj.height - 1)
            obj.setPosition(pos.x, pos.y)
        })
        this.windGrid.forEach((col, i) => {
            col.forEach((wind, j) => {
                if(wind) {
                    const pos = this.tileToWorld(i, j + 1)
                    wind.setPosition(pos.x, pos.y)
                }
            })
        })
    }

    _createWindGrid() {
        this.windGrid = []
        this.environment.forEach((obj, i) => {
            const col = []
            
            for(let i = 1; i < this.height; i++) {
                if (i < obj.height) {
                    col.push(null)
                } else {
                    col.push(new Wind(this.scene))
                }
            }

            this.windGrid.push(col)
        })
    }

    getWindAt(pos) {
        if (pos.x < 0 || pos.x >= this.windGrid.length) {
            return null;
        }
        if (pos.y - 1 < 0 || pos.y - 1 > this.windGrid[pos.x].length) {
            return null;
        }
        return this.windGrid[pos.x][pos.y - 1]
    }

    update (time, delta)
    {
        // controls.update(delta);

        var worldPoint = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main);
        var pointer = this.worldToTile(worldPoint.x, worldPoint.y);
        
        if (this.scene.input.manager.activePointer.isDown) {
            if(this.currentPointerTile) {
                const diff = pointer.clone().subtract(this.currentPointerTile);
                const newDir = WIND_X_Y_TO_DIR[diff.x] && WIND_X_Y_TO_DIR[diff.x][diff.y]
                if (newDir !== undefined) {
                    const wind = this.getWindAt(this.currentPointerTile)
                    if (wind) {
                        wind.setData('dir', newDir)
                    }
                }
            }
            this.currentPointerTile = pointer;
        } else {
            this.currentPointerTile = null;
        }

    }
}