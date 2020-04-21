import Phaser from 'phaser';

import AbstractObject from './abstractObject'

const DIR = {
    RIGHT: {
        angle: 0,
        delta: new Phaser.Math.Vector2(1, 0)
    },
    DOWN: {
        angle: 90,
        delta: new Phaser.Math.Vector2(0, -1)
    },
    LEFT: {
        angle: 180,
        delta: new Phaser.Math.Vector2(-1, 0)
    },
    UP: {
        angle: 270,
        delta: new Phaser.Math.Vector2(0, 1)
    },
}
export const WIND_X_Y_TO_DIR = {
    "1": { "0": DIR.RIGHT },
    "-1": { "0": DIR.LEFT },
    "0": { "1": DIR.UP, "-1": DIR.DOWN },
}

export class Wind extends AbstractObject {
    constructor(scene) {
        super(scene);

        this.setDepth(10)

        this.image = new Phaser.GameObjects.Image(this.scene, 0, 0, 'arrow_weak');
        this.image.setDepth(10);
        this.add(this.image);

        this.on('changedata-dir', this.updateVue, this);
        this.setData({
            dir: DIR.RIGHT
        });
    }

    updateVue() {
        const dir = this.getData('dir');
        this.image.setAngle(dir.angle)
    }

    set dir(value) {
        this.setData('dir', value)
    }

    get dir() {
        return this.getData('dir')
    }
}