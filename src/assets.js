
import hole_0_green from './assets/grounds/hole_0_green.png';
import hole_1_green from './assets/grounds/hole_1_green.png';
import hole_2_green from './assets/grounds/hole_2_green.png';
import hole_3_green from './assets/grounds/hole_3_green.png';

import ground_green from './assets/grounds/ground_green.png'
import ground_left_green from './assets/grounds/ground_left_green.png';

import sea from './assets/grounds/sea.png';
import cloud_1 from './assets/clouds/cloud_1.png';
import cloud_2 from './assets/clouds/cloud_2.png';
import cloud_3 from './assets/clouds/cloud_3.png';
import cloud_4 from './assets/clouds/cloud_4.png';
import cloud_5 from './assets/clouds/cloud_5.png';
import cloud_6 from './assets/clouds/cloud_6.png';

import water from './assets/particules/water.png'

import lighthouse from './assets/deco/light_house.png'
import boat from './assets/deco/boat.png'

export function preload() {
    this.load.image('hole_0_green', hole_0_green);
    this.load.image('hole_1_green', hole_1_green);
    this.load.image('hole_2_green', hole_2_green);
    this.load.image('hole_3_green', hole_3_green);

    this.load.image('ground_green', ground_green);
    this.load.image('ground_left_green', ground_left_green);

    this.load.image('sea', sea)
    this.load.image('lighthouse', lighthouse)
    this.load.image('boat', boat)

    this.load.image('cloud_1', cloud_1);
    this.load.image('cloud_2', cloud_2);
    this.load.image('cloud_3', cloud_3);
    this.load.image('cloud_4', cloud_4);
    this.load.image('cloud_5', cloud_5);
    this.load.image('cloud_6', cloud_6);

    this.load.image('water', water);
}