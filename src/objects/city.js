import Phaser from 'phaser';

import { Ground, LifeStates } from './ground'

export class City extends Ground {
    constructor(scene) {
        // TODO: rajouter du random pour la couleur du field ? 
        super(scene, 'ground_green')
        this.decorationsSprites = ['tree', 'sheep', 'paysan', 'paysanne', 'house', 'house', 'house_tall', 'windmill', 'church']
        this._addDecorations()
    }
}
