import Phaser from 'phaser';

import { preload as preloadAssets } from './assets';

import World from './world';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 2000,
    height: 1000,
    scene: {
        preload,
        create,
        update
    }
};

const game = new Phaser.Game(config);
let world;

function preload() {
    preloadAssets.call(this);
}

function create() {
    this.cameras.main.setBackgroundColor('#fbc05d');
    this.cameras.main.setZoom(1.0);
    
    world = new World(this, 10, 5);
    const { x, y } = world.getSizeInPixels()
    this.cameras.main.setBounds(0, 0, x, y);

}

function update(time, delta) {
    world.update(time, delta)
}