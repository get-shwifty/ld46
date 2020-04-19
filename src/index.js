import Phaser from 'phaser';

import { preload as preloadAssets } from './assets';

import Hole from './objects/hole';

import Cloud from './objects/cloud';
import { Field, LeftField } from './objects/field'
import Sea from './objects/sea';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1200,
    height: 500,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload() {
    preloadAssets.call(this);
}

function create() {
    this.cameras.main.setBackgroundColor('#8DBFE0');
    this.cameras.main.setBounds(0, 0, 4000, 1000);
    this.cameras.main.setZoom(0.75);

    const s = new Sea(this, 150, 350)
    const f = new LeftField(this, 350, 350);
    const f2 = new Field(this, 550, 350)

}
