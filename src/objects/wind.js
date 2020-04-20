import Phaser from 'phaser';

import AbstractObject from './abstractObject'

const DIR = {
    RIGHT: 0,
    DOWN: 90,
    LEFT: 180,
    UP: 270,
}
export const WIND_X_Y_TO_DIR = {
    "1": { "0": DIR.RIGHT },
    "-1": { "0": DIR.LEFT },
    "0": { "1": DIR.UP, "-1": DIR.DOWN },
}

export class Wind extends AbstractObject {
    constructor(scene) {
        super(scene);

        this.image = new Phaser.GameObjects.Image(this.scene, 0, 0, 'arrow_weak');
        this.add(this.image);

        this.on('changedata-dir', this.updateVue, this);
        this.setData({
            dir: DIR.RIGHT
        });
    }

    updateVue() {
        const dir = this.getData('dir');
        this.image.setAngle(dir)
    }
}