import Phaser from 'phaser';

import AbstractObject from './abstractObject'

export const LifeStates = {
    FULL: 'full',
    MIDDLE: 'middle',
    LOW: 'low',
    DEAD: 'dead'
}

export default class Ground extends AbstractObject {
    constructor(scene, sprite) {
        super(scene);
        scene.add.existing(this);

        this.sprite = sprite;
        this.image = new Phaser.GameObjects.Image(this.scene, 0, 0, this.sprite);
        this.add(this.image);

        this.setData({
            life: 20
        });
        this.on('changedata-life', this.updateVue, this);
        this.decorationsSprites = []
        this.decorations = [];
    }

    _addDecoration(decoration, x, y, scale = false) {
        if (y === undefined) {
            y = 10
        }
        let deco = new Phaser.GameObjects.Sprite(this.scene, x, y, decoration);
        const realY = y - deco.displayHeight / 2
        deco.setY(realY);
        if (scale) {
            const rnd = Phaser.Math.RND;
            const randFloat = rnd.realInRange(0.7, 1.3);
            // console.log(deco)
            deco.scale = randFloat
        }

        deco.scaleX *= Phaser.Math.Between(0, 1) === 0 ? 1 : -1
        this.add(deco);
        this.decorations.push(deco);
    }

    _addDecorations() {
        // reimplement in child classes
    }

    _updateDecorations() {
        // for(let deco of this.decorations){
        //     deco.setAl
        // }
    }

    updateVue() {
        this._updateDecorations()
    }

    set life(newValue) {
        if (life >= 0 && life <= 20) {
            this.setData({
                life: newValue
            })
        }
        else {
            throw new Error('Life must be between 0 and 20')
        }
    }

    get life() {
        return this.getData('life');
    }

    get status() {
        if (life > 10) {
            return LifeStates.FULL
        }
        else if (life > 5) {
            return LifeStates.MIDDLE
        }
        else if (life > 0) {
            return LifeStates.LOW
        }
        else {
            return LifeStates.DEAD
        }
    }
}