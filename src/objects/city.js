import Ground from './ground'
import { LifeStates } from './ground'

export class City extends Ground {
    constructor(scene) {
        // TODO: rajouter du random pour la couleur du field ? 
        super(scene, 'field_center_green')
        this.decorationsSprites = ['house', 'church', 'tree_small', 'tree_big']
    }

    _addDecorations() {
        // ajouter moutons 
    }
}
