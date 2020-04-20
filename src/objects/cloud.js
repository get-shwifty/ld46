import Phaser from 'phaser'

import AbstractObject from './abstractObject'

export default class Cloud extends AbstractObject {

	constructor(scene) {
		super(scene);

		this.image = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'cloud_1');
		this.add(this.image);
		this.setDepth(5)
		this.setData({
			size: 1
		});

		this.on('changedata-size', this.onSizeChange, this);

		const particles = scene.add.particles('water');
		this.emitter = particles.createEmitter({
			x: { min: this.x - this.image.displayWidth / 2 + 40, max: this.x - this.image.displayWidth / 2 + 140 }, //Permet de faire tomber les gouttes sur une ligne horizontale
			//y: 0,
			angle: { min: 90, max: 90 },
			speed: { min: 100, max: 300 },
			frequency: 100,
			lifespan: 5000,
			quantity: 1,
			scale: { start: 1, end: 0.5 }
		});
		particles.setDepth(1)

		this.emitter.startFollow(this);
		this.stopRaining();
		this.thunderSprites = []
		for (let index in [1, 2, 3]) {
			let thunder = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'thunder_' + index);
			const realY = 0 + thunder.displayHeight / 2
			thunder.setY(realY);
			thunder.setAlpha(0)
			thunder.setDepth(1)
			this.add(thunder)
			this.sendToBack(thunder)
			this.thunderSprites.push(thunder)
		}
	}

	updateVue(size) {
		this.image.setTexture(`cloud_${size}`);
	}

	onSizeChange() {
		console.log("oh my size changed!")
		const size = this.size
		this.updateVue(size);

		if (size >= 3) {
			this.startRaining();
		} else if (size < 3) {
			this.stopRaining();
		}
		if (size == 6) {
			this.startThunder();
		}
		else if (size < 6) {
			this.stopThunder();
		}
	}

	startThunder() {
		this.thunderInterval = setInterval(() => {
			this.thunderSprites[this.alt].setAlpha(1)
			this.scene.cameras.main.shake(500, 0.005)
			setTimeout(() => {
				this.thunderSprites[this.alt].setAlpha(0)
			}, 500)
		}, 2000)
	}

	stopThunder() {
		clearInterval(this.thunderInterval)
		this.thunderSprites[this.alt].setAlpha(0)
	}

	startRaining() {
		this.emitter.start();
	}

	stopRaining() {
		this.emitter.stop();
	}

	get size() {
		return this.getData('size')
	}

	set size(newValue) {
		console.log("NewValue: " + newValue)
		if (newValue > 0 && newValue <= 6) {
			this.setData({
				size: newValue
			});
		}
	}

}
