import Phaser from 'phaser';

import AbstractObject from './abstractObject'

export default class Hole extends AbstractObject {
    constructor(scene) {
        super(scene);

        this.image = new Phaser.GameObjects.Image(this.scene, 0, 0, 'hole_0_green');
        this.add(this.image);

        this.setData({
            water: 0,
            maxWater: 100
        });
        this.on('changedata-water', this.updateVue, this);
    }

    updateVue() {
        const [water, maxWater] = this.getData(['water', 'maxWater']);
        const ratioWater = water / maxWater;

        if (water === 0) {
            this.image.setTexture('hole_0_green');
        } else if (ratioWater < 0.33) {
            this.image.setTexture('hole_1_green');
        } else if (ratioWater < 0.66) {
            this.image.setTexture('hole_2_green');
        } else {
            this.image.setTexture('hole_3_green');
        }
    }
}