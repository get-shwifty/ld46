import Phaser from 'phaser';
import { MAX_LIFE } from '../constants/constants';

import AbstractObject from './abstractObject'

export const LifeStates = {
    FULL: 'full',
    MIDDLE: 'middle',
    LOW: 'low',
    DEAD: 'dead'
}
// dict of tuples ([sprite] | sprite, [decorations])
// can be used to generate easily new biomes with default behaviours
export const GroundTypes = {
    FOREST: ['ground_green', ['tree']],
    CITY: ['ground_green', ['tree', 'sheep', 'paysan', 'paysanne', 'house', 'house', 'house_tall', 'windmill', 'church']],
    FIELD: ['ground_green', ['sheep', 'tree', 'sheep', 'paysan', 'paysanne', 'sheep', 'tree']]
}

export class Ground extends AbstractObject {
    constructor(scene, sprite, decorations = [], density = 1) {
        super(scene);
        scene.add.existing(this);

        // handle multiple grounds sprites
        if (Array.isArray(sprite)) {
            this.sprite = sprite[Phaser.Math.Between(0, sprite.length - 1)]
        }
        else {
            this.sprite = sprite;
        }
        this.image = new Phaser.GameObjects.Image(this.scene, 0, 0, this.sprite);
        this.add(this.image);

        this.setData({
            life: 20
        });
        this.on('changedata-life', this.updateVue, this);

        this.decorationsSprites = decorations
        this.decorations = [];
        // density of decorations
        this.density = 5 - density

        if (this.decorationsSprites.length > 0) {
            this._addDecorations()
        }
    }

    _addDecorations() {
        for (let i = 0; i < MAX_LIFE; i += this.density) {
            let elem = this.decorationsSprites[Math.floor(Math.random() * this.decorationsSprites.length)];
            this._addDecoration(elem, i * 10 - 100, undefined, true)
        }
    }

    _addDecoration(decoration, x, y, scale = false) {
        if (y === undefined) {
            y = 10
        }
        let deco = new Phaser.GameObjects.Sprite(this.scene, x, y, decoration);
        const realY = y - deco.displayHeight / 2
        const realX = x + deco.displayWidth / 2
        deco.setY(realY);
        deco.setX(realX)
        if (scale) {
            const rnd = Phaser.Math.RND;
            const randFloat = rnd.realInRange(0.7, 1.3);
            deco.scale = randFloat
        }

        deco.scaleX *= Phaser.Math.Between(0, 1) === 0 ? 1 : -1
        this.add(deco);
        this.decorations.push(deco);
    }

    _updateDecorations() {
        let displayed = this.decorations.filter(e => e.alpha === 1)
        let hidden = this.decorations.filter(e => e.alpha === 0)
        const nbToDisplay = Math.round(this.life / this.density)
        const nbToHide = displayed.length - nbToDisplay
        console.log("Current life: " + this.life, "Current displayed: " + displayed.length, "Current hidden: " + hidden.length)
        console.log(`Should have displayed: ${Math.round(this.life / this.density)}`, `Should have hidden: ${nbToHide}`)
        // if need to display more
        while (displayed.length < nbToDisplay) {
            console.log("we're about to display!")
            // take a random sprite and set alpha to 100
            let randIndex = Phaser.Math.Between(0, hidden.length - 1)
            // console.log(hidden, randIndex)
            hidden[randIndex].setAlpha(1)
            displayed = this.decorations.filter(e => e.alpha === 1)
            hidden = this.decorations.filter(e => e.alpha === 0)
        }
        // if need to display less
        for (let i = 0; i < nbToHide; i++) {
            console.log(`we're about to hide! currently hiddens: ${hidden.length}, we should hide: ${nbToHide}`)
            // take a random sprite and set alpha to 100
            let randIndex = Phaser.Math.Between(0, displayed.length - 1)
            displayed[randIndex].setAlpha(0)
            displayed = this.decorations.filter(e => e.alpha === 1)
            hidden = this.decorations.filter(e => e.alpha === 0)
        }
    }

    updateVue() {
        this._updateDecorations()
    }

    set life(newValue) {
        if (newValue >= 0 && newValue <= 20) {
            this.setData({
                life: newValue
            })
        }
        else {
            throw new Error('Life must be between 0 and 20')
        }
        console.log("life changed, new value: " + newValue)
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