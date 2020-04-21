
import { Field, LeftField } from './objects/field'
import { Ground, GroundTypes } from './objects/ground'
import { Sea } from './objects/sea'
import { City } from './objects/city'
import { Wind, WIND_X_Y_TO_DIR } from './objects/wind'
import { Cloud } from './objects/cloud'

const TILE_W = 200
const TILE_H = 200
const OFF_W = 100
const OFF_H = 100

export default class World {
    constructor(scene, width = 10, height = 5) {
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
        this.createWindGrid()
        
        this.updateAllPos()
        this.startGame()
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
        this.environment.forEach((obj, x) => {
            const pos = this.tileToWorld(x, obj.alt - 1)
            obj.setPosition(pos.x, pos.y)
        })
        this.windGrid.forEach((col, x) => {
            col.forEach((wind, y) => {
                if(wind) {
                    const pos = this.tileToWorld(x, y)
                    wind.setPosition(pos.x, pos.y)
                }
            })
        })
    }

    createWindGrid() {
        this.windGrid = []
        this.cloudGrid = []
        this.environment.forEach((obj, i) => {
            const col = []
            const clouds = []
            
            for(let i = 0; i < this.height; i++) {
                if (i < obj.alt) {
                    col.push(null)
                } else {
                    col.push(new Wind(this.scene))
                }
                clouds.push(null)
            }

            this.windGrid.push(col)
            this.cloudGrid.push(clouds)
        })
    }

    getWindAt(x, y) {
        if (x < 0 || x >= this.windGrid.length) {
            return null;
        }
        if (y < 0 || y >= this.windGrid[x].length) {
            return null;
        }
        return this.windGrid[x][y]
    }

    getCloudAt(x, y) {
        if (x < 0 || x >= this.cloudGrid.length) {
            return null;
        }
        if (y < 0 || y >= this.cloudGrid[x].length) {
            return null;
        }
        return this.cloudGrid[x][y]
    }

    setCloudAt(x, y, cloud) {
        if (x < 0 || x >= this.cloudGrid.length) {
            return null;
        }
        if (y < 0 || y >= this.cloudGrid[x].length) {
            return null;
        }
        this.cloudGrid[x][y] = cloud
        if (cloud) {
            const pos = this.tileToWorld(x, y)
            cloud.setPosition(pos.x, pos.y)
            cloud.alt = y
        }
        return cloud
    }

    update(time, delta) {
        // controls.update(delta);

        var worldPoint = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main);
        var pointer = this.worldToTile(worldPoint.x, worldPoint.y);

        if (this.scene.input.manager.activePointer.isDown) {
            if (this.currentPointerTile) {
                const diff = pointer.clone().subtract(this.currentPointerTile);
                const newDir = WIND_X_Y_TO_DIR[diff.x] && WIND_X_Y_TO_DIR[diff.x][diff.y]
                if (newDir !== undefined) {
                    const wind = this.getWindAt(this.currentPointerTile.x, this.currentPointerTile.y)
                    if (wind) {
                        wind.dir = newDir
                    }
                }
            }
            this.currentPointerTile = pointer;
        } else {
            this.currentPointerTile = null;
        }
    }

    startGame() {
        this.tick = 0
        setInterval(() => this.gameLoop(), 500)
    }

    gameLoop() {
        this.cloudFuturePos = []

        // Creation
        this.environment.forEach((obj, x) => {
            if (obj instanceof Sea) {
                this.cloudFuturePos.push({
                    cloud: new Cloud(this.scene),
                    from: { x, y: 0 },
                    to: { x, y: 1 }
                })
            }
        })

        // Move
        for(let x = this.cloudGrid.length - 1; x >= 0; x--) {
            for(let y = this.height - 1; y >= 0; y--) {
                this.moveCloudAt(x, y)
            }
        }

        this.resolveFutureCloudPos()
    }

    moveCloudAt(x, y) {
        // Get cloud
        const cloud = this.getCloudAt(x, y)
        if(!cloud || cloud.hasAlreadyMoved) {
            // No cloud to move
            return;
        }

        // Get wind
        const wind = this.getWindAt(x, y)
        if (!wind) {
            // Not possible
            throw new Exception('cloud not on a wind????')
        }

        // Compute new pos
        const newX = x + wind.dir.delta.x
        const newY = y + wind.dir.delta.y

        // Get future wind to see if the cloud is allowed to move
        const otherWind = this.getWindAt(newX, newY)
        if (!otherWind) {
            // No wind no cloud
            return;
        }

        this.cloudFuturePos.push({
            cloud,
            from: { x, y },
            to: { x: newX, y: newY }
        })
    }

    resolveFutureCloudPos() {
        const mapCloudNewPos = new Map()
        const mapCloudsToSamePos = {}
        for(let i = 0; i < this.cloudFuturePos.length; i++) {
            const obj = this.cloudFuturePos[i]
            mapCloudNewPos.set(obj.cloud, obj)
            const id = obj.to.x + "_" + obj.to.y
            mapCloudsToSamePos[id] = mapCloudsToSamePos[id] || []
            mapCloudsToSamePos[id].push(obj)
        }

        for(const clouds of Object.values(mapCloudsToSamePos)) {
            if(clouds.length === 0) {
                continue
            }
            const otherCloud = this.getCloudAt(clouds[0].to.x, clouds[0].to.y)
            if (otherCloud) {
                const otherCloudMove = mapCloudNewPos.get(otherCloud)
                if (otherCloudMove) {
                    for (const cloudMove of clouds) {
                        if (cloudMove.from.x === otherCloudMove.to.x && cloudMove.from.y === otherCloudMove.to.y) {
                            // Merge with prority to bottom right
                            let priorityCloud, cloudToDestroy
                            if (cloudMove.from.x < otherCloudMove.from.x || cloudMove.from.y > otherCloudMove.from.y) {
                                priorityCloud = cloudMove
                                cloudToDestroy = otherCloudMove
                            } else {
                                priorityCloud = otherCloudMove
                                cloudToDestroy = cloudMove
                            }

                            priorityCloud.cloud.size = priorityCloud.cloud.size + cloudToDestroy.cloud.size
                            cloudToDestroy.cloud.destroy()
                            if (this.getCloudAt(cloudToDestroy.from.x, cloudToDestroy.from.y) === cloudToDestroy.cloud) {
                                this.setCloudAt(cloudToDestroy.from.x, cloudToDestroy.from.y, null)
                            }
                            const cloudToDestroyId = cloudToDestroy.to.x + "_" + cloudToDestroy.to.y
                            if(mapCloudsToSamePos[cloudToDestroyId]) {
                                const cloudToDestroyIndex = mapCloudsToSamePos[cloudToDestroyId].indexOf(cloudToDestroy)
                                mapCloudsToSamePos[cloudToDestroyId].splice(cloudToDestroyIndex, 1)
                            }
                            break
                        }
                    }
                } else {
                    clouds.push({
                        cloud: otherCloud,
                        from: clouds[0].to,
                        to: clouds[0].to,
                    })
                }
            }

            // Merge at destination
            if (clouds.length > 0) {
                for(let i = 1; i < clouds.length; i++) {
                    clouds[0].cloud.size = clouds[0].cloud.size + clouds[i].cloud.size

                    // Destroy clouds[i]
                    if (this.getCloudAt(clouds[i].from.x, clouds[i].from.y) === clouds[i].cloud) {
                        this.setCloudAt(clouds[i].from.x, clouds[i].from.y, null)
                    }
                    clouds[i].cloud.destroy()
                }

                if (this.getCloudAt(clouds[0].from.x, clouds[0].from.y) === clouds[0].cloud) {
                    this.setCloudAt(clouds[0].from.x, clouds[0].from.y, null)
                }
                this.setCloudAt(clouds[0].to.x, clouds[0].to.y, clouds[0].cloud)
            }
        }
    }
}