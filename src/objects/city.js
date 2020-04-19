import Ground from './ground'
import { LifeStates } from './ground'

export class City extends Ground {
    constructor(scene, x, y, children) {
        // TODO: rajouter du random pour la couleur du field ? 
        super(scene, x, y, 'field_center_green', children)
        this.decorations = ['house', 'church', 'tree_small', 'tree_big']
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
        super(scene, x, y, 'field_left_green', children)
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