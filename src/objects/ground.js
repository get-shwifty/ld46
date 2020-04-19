import Phaser from 'phaser';

export const LifeStates = {
    FULL: 'full',
    MIDDLE: 'middle',
    LOW: 'low',
    DEAD: 'dead'
}

export default class Ground extends Phaser.GameObjects.Container {
    constructor(scene, x, y, sprite, children) {
        super(scene, x, y, children);
        scene.add.existing(this);

        this.sprite = sprite;
        this.image = new Phaser.GameObjects.Image(this.scene, 0, 0, this.sprite);
        this.add(this.image);

        this.setData({
            life: 20
        });
        this.on('changedata-life', this.updateVue, this);
    }

    _addDecoration(decoration) {
        // add the specified decoration at the top of the field and save it as child
        // how to do ? 
    }

    _addDecorations() {
        // reimplement in child classes
    }

    updateVue() {
        this._addDecoration()
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