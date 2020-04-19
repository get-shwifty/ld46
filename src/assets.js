
import hole_0_green from './assets/grounds/hole_0_green.png';
import hole_1_green from './assets/grounds/hole_1_green.png';
import hole_2_green from './assets/grounds/hole_2_green.png';
import hole_3_green from './assets/grounds/hole_3_green.png';

import ground_green from './assets/grounds/ground_green.png'
import ground_left_green from './assets/grounds/ground_left_green.png';

import sea from './assets/grounds/sea.png';

export function preload() {
    this.load.image('hole_0_green', hole_0_green);
    this.load.image('hole_1_green', hole_1_green);
    this.load.image('hole_2_green', hole_2_green);
    this.load.image('hole_3_green', hole_3_green);

    this.load_image('ground_green', ground_green);
    this.load_image('ground_left_green', ground_left_green);

    this.load_image('sea', sea)

}