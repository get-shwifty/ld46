import Phaser from 'phaser';

import { preload as preloadAssets } from './assets';

import Hole from './objects/hole';

import Cloud from './objects/cloud';
import { Field, LeftField } from './objects/field'
import { Ground, GroundTypes } from './objects/ground'
import { Sea } from './objects/sea';
import { City } from './objects/city'

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 2000,
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
    let grounds = []

    const s = new Sea(this, 100, 600)
    const f = new LeftField(this, 300, 600);
    const f2 = new Field(this, 500, 600)
    const c = new City(this, 700, 600);
    const forest = new Ground(this, 900, 600, GroundTypes.FOREST[0], GroundTypes.FOREST[1], 3)
    // const f3 = new Field(this, 900, 600);
    const c2 = new City(this, 1100, 600);
    const c3 = new City(this, 1300, 600)

    c.life = c.life - 1
    let growing = false;
    setInterval(() => {
        if (!growing) {
            c.life = c.life - 1
        }
        else {
            c.life = c.life + 1
        }
        if (c.life === 0) {
            growing = true
        }
        if (c.life === 20) {
            growing = false
        }
    }, 1000)

}
