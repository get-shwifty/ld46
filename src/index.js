import Phaser from 'phaser';

import { preload as preloadAssets } from './assets';

import Hole from './objects/hole';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1500,
  height: 1000,
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

var menu = {};

function preload() {
  preloadAssets.call(this);
}

function create() {
  create_menu(this)

  this.cameras.main.setBackgroundColor('#ffffff');
  this.cameras.main.setBounds(0, 0, 4000, 1000);

  const hole = new Hole(this, 400, 500);
  setInterval(() => {
    hole.setData({
      water: Math.floor(Math.random() * 101)
    });
  }, 500);
}

function create_menu(game)
{
  menu.GameTitle = game.add.text(config.width /2 , 16, 'GAME TITLE', { fontSize: '32px', fill: '#000' });
  menu.PlayButton = game.add.text(config.width /2, 60, 'PLAY', { fontSize: '20px', fill: '#000' });
  menu.CreditsButton = game.add.text(config.width /2, 90, 'CREDITS', { fontSize: '20px', fill: '#000' });
}