import Ground from './ground'
import { LifeStates } from './ground'

export class Field extends Ground {
    constructor(scene, x, y, children) {
        // TODO: rajouter du random pour la couleur du field ? 
        super(scene, x, y, 'ground_green', children)
        this.decorations = ['sheeps']
    }

    _add_decoration() {
        // ajouter moutons 
    }
}

export class LeftField extends Ground {
    /**
     * The first tile after the sea, only for decoration purpose
     */
    constructor(scene, x, y, children) {
        super(scene, x, y, 'ground_green_left', children)
        this.decorations = ['lighthouse']
        this._add_decoration()
    }

    _add_decoration() {
        // add le phare
    }

    set life(value) {
        // cannot change the life of this one
        return
    }
}