import Phaser from 'phaser';
import arrows from './assets/arrows/Arrows.json';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1200,
  height: 600,
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);
var controls;
var marker;
var map;

function preload() {
  this.load.image('arrows', arrows);
}

function create() {

  map = this.make.tilemap({ tileWidth: 250, tileHeight: 200, width: 10, height: 4});
  
  var arrows = map.addTilesetImage('arrows');

  var layer = map.createDynamicLayer('wind', arrows);

  layer.randomize(0, 0, 10, 4, [6, 7, 8, 10]);

  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: 'Power2',
    yoyo: true,
    loop: -1
  });
}
