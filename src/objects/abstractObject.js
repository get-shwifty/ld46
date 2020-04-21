import Phaser from 'phaser';

export default class AbstractObject extends Phaser.GameObjects.Container {

    constructor(scene, height=1) {
        super(scene);
        scene.add.existing(this);

        this.setDepth(1)

        this.height = height;
    }
}