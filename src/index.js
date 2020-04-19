import Phaser from 'phaser';

import { preload as preloadAssets } from './assets';

import Hole from './hole';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 5000,
  height: 2000,
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);
// let map;

function preload() {
  preloadAssets.call(this);
}

function create() {
  this.cameras.main.setBackgroundColor('#ffffff');
  this.cameras.main.setBounds(0, 0, 4000, 1000);

  const hole = new Hole(this, 400, 500);
  setInterval(() => {
    hole.setData({
      water: Math.floor(Math.random() * 101)
    });
  }, 500);
}
