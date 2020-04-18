class Rain {

  constructor(game){
    var particles = game.add.particles('water');

    this.emitter = particles.createEmitter({
      x: { min: 200, max: 600 }, //Permet de faire tomber les gouttes sur une ligne horizontale
      y: 0,
      angle: { min: 60, max: 120 }, 
      speed: { min: 100, max: 300 },
      frequency: 200,
      lifespan: 8000,
      quantity: 2,
      scale: { start: 0.1, end: 0 }
    });

    this.stopRaining(); //On ne veut pas que la pluie démarre à la construction de l'objet
  }

  startRaining(){
    console.log(this.emitter)
    this.emitter.start();
  }

  stopRaining(){
    console.log(this.emitter)
    this.emitter.stop();
  }
}

module.exports = {
  Rain: Rain
}
