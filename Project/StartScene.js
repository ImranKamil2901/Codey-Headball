class StartScene extends Phaser.Scene {
    constructor() {
      super({ key: 'StartScene' })
    }
  
    preload() {
      this.load.image('bg', 'images/bg.png');
      this.load.image('bg2', 'images/bg2.png');
      this.load.image('bghome', 'images/bghome.png');
      this.load.image('play', 'images/playbutton.png');
      this.load.image('day', 'images/day.png');
      this.load.image('night', 'images/night.png');
      this.load.image('p1c', 'images/player1controls.png');
      this.load.image('p2c', 'images/player2controls.png');
    }
  
    create() {
      screen = this.add.image(0, 0, 'bghome').setOrigin(0);
      this.add.image(300, 580, 'p1c');
      this.add.image(1310, 580, 'p2c');
      var sprite = this.add.sprite(805,350,'play')
      sprite.setInteractive();
      sprite.on('pointerdown', () => {
        this.scene.stop('StartScene');
        this.scene.start('GameScene');
      })
      this.bginput = 1;
    }

    background() {
      this.bginput = 1;
    }
  }