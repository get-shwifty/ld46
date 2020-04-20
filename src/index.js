import Phaser from 'phaser';

import { preload as preloadAssets } from './assets';

import World from './world';

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 2000,
    height: 1000,
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
    this.cameras.main.setZoom(1.0);
    
    this.world = new World(this, 10, 5);
    const { x, y } = this.world.getSizeInPixels()
    this.cameras.main.setBounds(0, 0, x, y);

}
