import Phaser from 'phaser'

import AbstractObject from './abstractObject'

export default class Cloud extends AbstractObject {

	constructor(scene) {
		super(scene);

		this.image = new Phaser.GameObjects.Image(this.scene, 0, 0, 'cloud');
		this.add(this.image);

		this.setData({
			size: 1
		});

		this.on('changedata-size', this.onSizeChange, this);

		const particles = scene.add.particles('water');
		this.emitter = particles.createEmitter({
			// x: { min: 200, max: 600 }, //Permet de faire tomber les gouttes sur une ligne horizontale
			//y: 0,
			angle: { min: 60, max: 120 },
			speed: { min: 100, max: 300 },
			frequency: 200,
			lifespan: 5000,
			quantity: 2,
			scale: { start: 1, end: 0 }
		});

		this.emitter.startFollow(this);
		this.stopRaining();
		this.thunderSprites = []
		for (let index in [1, 2, 3]) {
			let thunder = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'thunder_' + index);
			const realY = y - thunder.displayHeight / 2
			thunder.setY(realY);
			thunder.setAlpha(0)
			this.add(thunder)
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
