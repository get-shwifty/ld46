
import hole_0_green from './assets/grounds/hole_0_green.png';
import hole_1_green from './assets/grounds/hole_1_green.png';
import hole_2_green from './assets/grounds/hole_2_green.png';
import hole_3_green from './assets/grounds/hole_3_green.png';

import ground_green from './assets/grounds/ground_green.png'
import ground_left_green from './assets/grounds/ground_left_green.png';

import ground_greener from './assets/grounds/ground_greener.png'
import ground_left_greener from './assets/grounds/ground_left_greener.png';

import sea from './assets/grounds/sea.png';

import cloud_1 from './assets/clouds/cloud_1.png';
import cloud_2 from './assets/clouds/cloud_2.png';
import cloud_3 from './assets/clouds/cloud_3.png';
import cloud_4 from './assets/clouds/cloud_4.png';
import cloud_5 from './assets/clouds/cloud_5.png';
import cloud_6 from './assets/clouds/cloud_6.png';
import thunder_1 from './assets/clouds/orage_1.png';
import thunder_2 from './assets/clouds/orage_2.png';
import thunder_3 from './assets/clouds/orage_3.png';


import water from './assets/particules/goute.png'

import lighthouse from './assets/deco/light_house.png'
import boat from './assets/deco/boat.png'
import sheep from './assets/deco/sheep.png'
import tree from './assets/deco/tree.png'
import paysan from './assets/deco/paysan.png'
import paysanne from './assets/deco/paysanne.png'
import church from './assets/deco/church.png'
import house from './assets/deco/house.png'
import house_tall from './assets/deco/house_tall.png'
import house_large from './assets/deco/house_large.png'
import windmill from './assets/deco/windmill.png'

import arrow_weak from './assets/grounds/arrow_weak.png'


import music from './assets/audio/music/music.ogg'

export function preload() {

    // Image

    this.load.image('hole_0_green', hole_0_green);
    this.load.image('hole_1_green', hole_1_green);
    this.load.image('hole_2_green', hole_2_green);
    this.load.image('hole_3_green', hole_3_green);

    this.load.image('ground_green', ground_green);
    this.load.image('ground_left_green', ground_left_green);
    this.load.image('ground_greener', ground_greener);
    this.load.image('ground_left_greener', ground_left_greener);

    this.load.image('sea', sea)
    this.load.image('lighthouse', lighthouse)
    this.load.image('boat', boat)
    this.load.image('sheep', sheep)
    this.load.image('tree', tree)
    this.load.image('paysan', paysan)
    this.load.image('paysanne', paysanne)
    this.load.image('church', church)
    this.load.image('house', house)
    this.load.image('house_tall', house_tall)
    this.load.image('house_large', house_large)
    this.load.image('windmill', windmill)

    this.load.image('cloud_1', cloud_1);
    this.load.image('cloud_2', cloud_2);
    this.load.image('cloud_3', cloud_3);
    this.load.image('cloud_4', cloud_4);
    this.load.image('cloud_5', cloud_5);
    this.load.image('cloud_6', cloud_6);
    this.load.image('thunder_1', thunder_1);
    this.load.image('thunder_2', thunder_2);
    this.load.image('thunder_3', thunder_3);

    this.load.image('water', water);

    this.load.image('arrow_weak', arrow_weak);

    // Audio

    this.load.audio('music', music);
}