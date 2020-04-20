import { Ground, GroundTypes } from './ground'
import { LifeStates } from './ground'

export class Field extends Ground {
    constructor(scene) {
        // TODO: rajouter du random pour la couleur du field ? 
        super(scene, 'ground_green')
        this.decorationsSprites = ['sheep', 'tree', 'sheep', 'paysan', 'paysanne', 'sheep', 'tree']
        this._addDecorations()
    }
}

export class LeftField extends Ground {
    /**
     * The first tile after the sea, only for decoration purpose
     */
    constructor(scene) {
        super(scene, 'ground_left_green')
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

export class Forest extends Ground {
    constructor(scene, x, y, children) {
        // TODO: rajouter du random pour la couleur du field ? 
        super(scene, x, y, 'ground_green', children)
        this.decorationsSprites = ['tree']
        this._addDecorations()
    }
}