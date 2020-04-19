import Ground from './ground'
import { LifeStates } from './ground'

export class Field extends Ground {
    constructor(scene, x, y, children) {
        // TODO: rajouter du random pour la couleur du field ? 
        super(scene, x, y, 'ground_green', children)
        this.decorationsSprites = ['sheep', 'tree']
        this._addDecorations()
    }

    _addDecorations() {
        for (let i = 0; i < 21; i += 3) {
            let elem = this.decorationsSprites[Math.floor(Math.random() * this.decorationsSprites.length)];
            console.log(elem)
            console.log(i * 10 - 100)
            this._addDecoration(elem, i * 10 - 100, undefined, true)
        }
    }
}

export class LeftField extends Ground {
    /**
     * The first tile after the sea, only for decoration purpose
     */
    constructor(scene, x, y, children) {
        super(scene, x, y, 'ground_left_green', children)
        this._addDecorations()
    }

    _addDecorations() {
        this._addDecoration('lighthouse', -25)
    }

    set life(value) {
        // cannot change the life of this one
        return
    }
}