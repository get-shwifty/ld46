import Phaser from 'phaser';

export default class AbstractObject extends Phaser.GameObjects.Container {

    constructor(scene, alt = 1) {
        super(scene);
        scene.add.existing(this);

        this.setDepth(1)

        this.setData({
            alt
        })
    }

    get alt() {
        return this.getData('alt')
    }

    set alt(value) {
        this.setData('alt', value)
    }
}