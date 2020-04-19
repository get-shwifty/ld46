import Phaser from 'phaser';

export default class Cloud extends Phaser.GameObjects.Container {

	constructor(scene, x, y){
		super(scene, x, y, children);
		scene.add.existing(this);
		
		this.cloud = new Phaser.GameObjects.Image(this.scene, 0, 0, 'cloud');
		this.add(this.cloud);

		var particles = scene.add.particles('water');
	
		this.setData({
			size: 1
		});

		this.on('changedata-size', this.updateVue, this);

		this.emitter = particles.createEmitter({
			//x: { min: 200, max: 600 }, //Permet de faire tomber les gouttes sur une ligne horizontale
			//y: 0,
			angle: { min: 60, max: 120 }, 
			speed: { min: 100, max: 300 },
			frequency: 200,
			lifespan: 8000,
			quantity: 2,
			scale: { start: 0.1, end: 0 }
		});

		this.emitter.startFollow(this);
		this.emitter.stopRaining();
	}

	updateVue() {
    const size = this.getData('size');
    
    this.image.setTexture(`cloud_${size}`);
  }

  startRaining(){
  	this.emitter.start();
  }

  stopRaining(){
		this.emitter.stop();
	}

}
