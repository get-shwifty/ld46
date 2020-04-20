import Phaser from 'phaser';

export default class AbstractObject extends Phaser.GameObjects.Container {

    constructor(scene, alt = 1) {
        super(scene);
        scene.add.existing(this);

        this.setData({
            alt: alt
        })
    }

    get alt() {
        return this.getData('alt')
    }
}