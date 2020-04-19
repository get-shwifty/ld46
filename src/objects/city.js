import { Ground } from './ground'
import Phaser from 'phaser';

import { LifeStates } from './ground'

export class City extends Ground {
    constructor(scene, x, y, children) {
        // TODO: rajouter du random pour la couleur du field ? 
        super(scene, x, y, 'ground_green', children)
        this.decorationsSprites = ['tree', 'sheep', 'paysan', 'paysanne', 'house', 'house', 'house_tall', 'windmill', 'church']
        this._addDecorations()
    }
}
