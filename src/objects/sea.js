import { Ground } from './ground'

export class Sea extends Ground {
    /**
     * The sea tile, only for decoration purpose
     */
    constructor(scene) {
        super(scene, 'sea')
        this._addDecorations()
        this.up = 1
        setInterval(() => {
            for(let deco of this.decorations){
                deco.setY(deco.y + 5 * this.up)
            }
            this.up = -this.up
        }, 1500)
    }

    _addDecorations() {
        this._addDecoration('sea_top', -100, 25)
        this._addDecoration('boat', 0, 20)
    }

    set life(value) {
        // cannot change the life of this one
        return
    }
}