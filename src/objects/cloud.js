import Phaser from 'phaser'

import AbstractObject from './abstractObject'

export class Cloud extends AbstractObject {

	constructor(scene){
		super(scene);
		
		this.image = new Phaser.GameObjects.Image(this.scene, 0, 0, 'cloud');
		this.add(this.image);

		this.setData({
			size: 1
		});

		this.on('changedata-size', this.onSizeChange, this);

		this.particles = scene.add.particles('water');
		this.emitter = this.particles.createEmitter({
			// x: { min: 200, max: 600 }, //Permet de faire tomber les gouttes sur une ligne horizontale
			//y: 0,
			angle: { min: 60, max: 120 }, 
			speed: { min: 100, max: 300 },
			frequency: 200,
			lifespan: 5000,
			quantity: 2,
			scale: { start: 0.1, end: 0 }
		});

		this.emitter.startFollow(this);
		this.stopRaining()
		this.updateVue()
	}

	destroy(fromScene) {
		super.destroy(fromScene)
		this.stopRaining()

		setTimeout(() => {
			this.particles.destroy()
		}, 5000)
	}

	updateVue() { 
		this.image.setTexture(`cloud_${this.getData('size')}`);
	}

	onSizeChange(){
		// console.log("oh my size changed!")
		const size = this.getData('size');
		this.updateVue();

		if(size >= 3){
			this.startRaining();
		}else if(size <3){
			this.stopRaining();
		}
	}

	startRaining(){
		this.emitter.start();
	}

	stopRaining(){
		this.emitter.stop();
	}

	get size(){
		return this.getData('size')
	}

	set size(newValue){
		// console.log("NewValue: " + newValue)
		newValue = Math.min(Math.max(newValue, 0), 6)
		if(this.size !== newValue){
			this.setData({
				size: newValue
			});
		}
	}

}
