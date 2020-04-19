import Phaser from 'phaser';

import { preload as preloadAssets } from './assets';

import Hole from './objects/hole';

import Cloud from './objects/cloud';

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

var game = new Phaser.Game(config);

function preload() {
  preloadAssets.call(this);
}

function create() {
  this.cameras.main.setBackgroundColor('#ffffff');
  this.cameras.main.setBounds(0, 0, 4000, 1000);

 /* const hole = new Hole(this, 400, 500);
  setInterval(() => {
    hole.setData({
      water: Math.floor(Math.random() * 101)
    });
  }, 500);*/

  const cloud = new Cloud(this, 400, 400);
  const sizes = [1,2,3,4,5,6,5,4,3,2,1];
  let index = 0;

  setInterval(() => {
    if(index == sizes.length){
      index = 0
    }
    console.log(sizes[index])
    cloud.size = sizes[index++]
  }, 2000);
}
