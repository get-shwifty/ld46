import Ground from './ground'
import { LifeStates } from './ground'

export class City extends Ground {
    constructor(scene, x, y, children) {
        // TODO: rajouter du random pour la couleur du field ? 
        super(scene, x, y, 'field_center_green', children)
        this.decorationsSprites = ['house', 'church', 'tree_small', 'tree_big']
    }

    _addDecorations() {
        // ajouter moutons 
    }
}
