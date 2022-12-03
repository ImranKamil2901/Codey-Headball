
/**
 * @type {Phaser.Types.GameObjects.Text.TextStyle}
 */
const textStyle = {
  fontFamily: 'Arial',
  fontSize: 36,
  color: '#ffffff'
};

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('oribg', 'images/oribg.png');
    this.load.image('bg', 'images/bg.png');
    this.load.image('bg2', 'images/bg2.png');
    this.load.image('bg3', 'images/bg3.png');
    this.load.image('bg4', 'images/bg4.png');
    this.load.image('pickamap', 'images/pickamap.png');
    this.load.image('town', 'images/town.png');
    this.load.image('desert', 'images/desert.png');
    this.load.image('space', 'images/space.png');
    this.load.image('player1wins', 'images/player1wins.png');
    this.load.image('player2wins', 'images/player2wins.png');
    this.load.image('platform', 'images/road.png');
    this.load.image('goal', 'images/goal.png');
    this.load.image('goal2', 'images/goal2.png');
    this.load.spritesheet('codey', 'images/codey_sprite.png', { frameWidth: 72, frameHeight: 90 });
    this.load.spritesheet('codey2', 'images/codey_sprite2.png', { frameWidth: 72, frameHeight: 90 });
    this.load.image('ball', 'images/ball.png');
    this.load.image('goalframe', 'images/goalframe.png');
    this.load.image('goalpost', 'images/goalpost.png');
    this.load.image('goalsensor','images/goal sensor.png');
    this.load.image('goalpost2','images/goalpost2.png');
    this.load.image('player1score', 'images/player1score.png');
    this.load.image('player2score', 'images/player2score.png');
    this.load.image('score5towin', 'images/score5towin.png');
    this.load.image('exitgame', 'images/exitgame.png');
    this.load.image('codeystopper', 'images/codeystopper.png');

  }

  create() {
    this.active = true;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors2 = this.input.keyboard.addKeys(
      {up:Phaser.Input.Keyboard.KeyCodes.W,
      down:Phaser.Input.Keyboard.KeyCodes.S,
      left:Phaser.Input.Keyboard.KeyCodes.A,
      right:Phaser.Input.Keyboard.KeyCodes.D});
    
    this.bg = this.add.image(0, 0, 'oribg').setOrigin(0, 0);
    
    this.pickamap = this.add.image(805,150, 'pickamap')

    var town = this.add.sprite(455, 400,'town')
    town.setInteractive();
    town.on('pointerdown', () => {
      this.bg.setTexture('bg');
      town.destroy();
      desert.destroy();
      space.destroy();
      this.pickamap.destroy();
      this.physics.world.removeCollider(playercollide1);
      this.physics.world.removeCollider(playercollide2);
      this.topboard = this.add.image(805, 60, 'score5towin');
    })

    var desert = this.add.sprite(805, 400,'desert')
    desert.setInteractive();
    desert.on('pointerdown', () => {
      this.bg.setTexture('bg3');
      town.destroy();
      desert.destroy();
      space.destroy();
      this.pickamap.destroy();
      this.physics.world.removeCollider(playercollide1);
      this.physics.world.removeCollider(playercollide2);
      this.topboard = this.add.image(805, 60, 'score5towin');
    })

    var space = this.add.sprite(1155, 400,'space')
    space.setInteractive();
    space.on('pointerdown', () => {
      this.bg.setTexture('bg4');
      town.destroy();
      desert.destroy();
      space.destroy();
      this.pickamap.destroy();
      this.physics.world.removeCollider(playercollide1);
      this.physics.world.removeCollider(playercollide2);
      this.topboard = this.add.image(805, 60, 'score5towin');
    })

    this.add.image(70, 170, 'player1score');
    this.add.image(1540, 170, 'player2score');
    

    
    this.score1 = 0;
    this.score2 = 0;
    let scoreText1 = this.add.text(55, 149, this.score1, { fontFamily: 'calibri', fontSize: '45px', fill: '#ffffff' });
    let scoreText2 = this.add.text(1535, 149, this.score2, { fontFamily: 'calibri', fontSize: '45px', fill: '#ffffff' });

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(805, 700, 'platform')
  
    this.player = this.physics.add.sprite(300, 500, 'codey')
    this.physics.add.collider(this.player, this.platforms)

    this.player2 = this.physics.add.sprite(1310, 500, 'codey2')
    this.physics.add.collider(this.player2, this.platforms)
    
    this.physics.add.collider(this.player, this.player2)

    this.codeystopper = this.physics.add.staticGroup();
    this.codeystopper.create(240, 550, 'codeystopper')
    this.codeystopper.create(360, 550, 'codeystopper')
    this.codeystopper.create(1370, 550, 'codeystopper')
    this.codeystopper.create(1250, 550, 'codeystopper')

    var playercollide1 = this.physics.add.collider(this.player,this.codeystopper)
    var playercollide2 = this.physics.add.collider(this.player2,this.codeystopper)    
    
    this.goalframe = this.physics.add.staticGroup();
    this.goalframe.create(25, 555, 'goalframe');
    this.goalframe.create(1585, 555, 'goalframe'); 

    this.goalsensor1 = this.physics.add.sprite(115, 500, 'goalsensor');
    this.physics.add.collider(this.goalsensor1, this.platforms)

    this.goalsensor2 = this.physics.add.sprite(1495, 500, 'goalsensor');
    this.physics.add.collider(this.goalsensor2, this.platforms)

    this.goalpost = this.physics.add.staticGroup();
    this.goalpost.create(90, 440, 'goalpost');
    this.goalpost.create(1520, 440, 'goalpost');
    this.goalpost.create(115, 470, 'goalpost2');
    this.goalpost.create(1495, 470, 'goalpost2');

    this.createball();
    this.physics.add.overlap(this.ball, this.goalsensor2, () =>{
      this.score1 += 1
      scoreText1.setText(this.score1)
      this.ball.setPosition(805,200)
      this.ball.setVelocity(0,0)
    })

    this.physics.add.overlap(this.ball, this.goalsensor1, () =>{
      this.score2 += 1
      scoreText2.setText(this.score2)
      this.ball.setPosition(805,200)
      this.ball.setVelocity(0,0)
    })

    this.goal = this.physics.add.staticGroup();
    this.goal.create(120, 550, 'goal');

    this.goal2 = this.physics.add.staticGroup();
    this.goal2.create(1495, 550, 'goal2');

    
    this.player.setCollideWorldBounds(true)
    this.player2.setCollideWorldBounds(true)
    

    this.physics.add.collider(this.player, this.goal)
    this.physics.add.collider(this.player, this.goal2)
    this.physics.add.collider(this.player2, this.goal)
    this.physics.add.collider(this.player2, this.goal2)
    this.physics.add.collider(this.player, this.goalframe)
    this.physics.add.collider(this.player, this.goalpost)
    this.physics.add.collider(this.player2, this.goalframe)
    this.physics.add.collider(this.player2, this.goalpost)

    

    this.anims.create({

      // TASK: Create the animation with the key 'run' here
      key: 'run',
      frames: this.anims.generateFrameNumbers('codey',
        { start: 0, end: 3 }
      ),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('codey',
        { start: 4, end: 5 }
      ),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('codey',
        { start: 4, end: 5 }
      ),
      frameRate: 5,
      repeat: -1
    });







    this.anims.create({

      // TASK: Create the animation with the key 'run' here
      key: 'run2',
      frames: this.anims.generateFrameNumbers('codey2',
        { start: 5, end: 1 }
      ),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'idle2',
      frames: this.anims.generateFrameNumbers('codey2',
        { start: 0, end: 1 }
      ),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'jump2',
      frames: this.anims.generateFrameNumbers('codey2',
        { start: 0, end: 1 }
      ),
      frameRate: 5,
      repeat: -1
    });

    
    
  }
    update() {
      if (this.active) {
        if (this.cursors2.right.isDown) {
          this.player.setVelocityX(350);
          this.player.anims.play('run', true);
          this.player.flipX = false;
        } else if (this.cursors2.left.isDown) {
          //TASK: set player's velocity to move to the left
          //TASK: play the animation with the key 'run'
          //TASK: flip the sprite so the player looking at the left
          this.player.setVelocityX(-350);
          this.player.anims.play('run', true);
          this.player.flipX = true;
        } else {
          this.player.setVelocityX(0);
          this.player.anims.play('idle', true);
        }
  
        if ((this.cursors2.up.isDown)
          && this.player.body.touching.down) {
          //TASK: play the animation with the key 'jump
          //TASK: set the player's velocity to jump up
          this.player.anims.play('jump',true)
          this.player.setVelocityY(-600);
        }
      }

      if (this.active) {
        if (this.cursors.right.isDown) {
          this.player2.setVelocityX(350);
          this.player2.anims.play('run2', true);
          this.player2.flipX = true;
        } else if (this.cursors.left.isDown) {
          //TASK: set player's velocity to move to the left
          //TASK: play the animation with the key 'run'
          //TASK: flip the sprite so the player looking at the left
          this.player2.setVelocityX(-350);
          this.player2.anims.play('run2', true);
          this.player2.flipX = false;
        } else {
          this.player2.setVelocityX(0);
          this.player2.anims.play('idle2', true);
        }
  
        if ((this.cursors.up.isDown)
          && this.player2.body.touching.down) {
          //TASK: play the animation with the key 'jump
          //TASK: set the player's velocity to jump up
          this.player2.anims.play('jump2',true)
          this.player2.setVelocityY(-600);
        }
      }

      this.physics.add.collider(
        this.ball,
        this.player,
        this.ballHitPlayer,
        null,
        this
      )
      this.physics.add.collider(
        this.ball,
        this.player2,
        this.ballHitPlayer2,
        null,
        this
      )
      this.physics.add.collider(
        this.ball,
        this.platforms,
        this.ballHitPlatform,
        null,
        this
      )
      if (this.score1 == 5){
        this.scene.pause();
        this.scene.resume();
        this.topboard.destroy();
        this.add.image(805, 300, 'player1wins');
        var exit = this.add.sprite(805, 450,'exitgame')
        exit.setInteractive();
        exit.on('pointerdown', () => {
        this.scene.stop('StartScene');
        this.scene.start('StartScene');
      })
        
      }
      else if (this.score2 == 5){
        this.scene.pause();
        this.scene.resume();
        this.topboard.destroy();
        this.add.image(805, 300, 'player2wins');
        var exit = this.add.sprite(805, 450,'exitgame')
        exit.setInteractive();
        exit.on('pointerdown', () => {
        this.scene.stop('StartScene');
        this.scene.start('StartScene');
      })
    }
    }

    ballHitPlayer(){
      let diff = 0

      if (this.ball.x < this.player.x) {
        diff = this.player.x - this.ball.x
        this.ball.body.velocity.x = (-10 * diff)
        if (this.ball.y > (this.player.y + 35)){
          this.ball.body.velocity.y = 0
        } else {
          this.ball.body.velocity.y = -500
        }
        return
      }
      if (this.ball.x > this.player.x) {
        diff = this.ball.x - this.player.x 
        this.ball.body.velocity.x = (10 * diff)
        if (this.ball.y > (this.player.y + 35)){
          this.ball.body.velocity.y = 0
        } else {
          this.ball.body.velocity.y = -500
        }
        return
      }
    }

    ballHitPlayer2(){
      let diff = 0

      if (this.ball.x < this.player2.x) {
        diff = this.player2.x - this.ball.x
        this.ball.body.velocity.x = (-10 * diff)
        if (this.ball.y > (this.player2.y + 35)){
          this.ball.body.velocity.y = 0
        } else {
          this.ball.body.velocity.y = -500
        }
        return
      }
      if (this.ball.x > this.player2.x) {
        diff = this.ball.x - this.player2.x 
        this.ball.body.velocity.x = (10 * diff)
        if (this.ball.y > (this.player2.y + 35)){
          this.ball.body.velocity.y = 0
        } else {
          this.ball.body.velocity.y = -500
        }
        return
      }
    }

    createball(){
      this.ball = this.physics.add.sprite(805, 200, 'ball');
      this.ball.setBounce(0.7);
      this.ball.setDragX(100);
      this.ball.setCollideWorldBounds(true)
      this.physics.add.collider(this.ball, this.platforms)
      this.physics.add.collider(this.ball, this.goalframe)
      this.physics.add.collider(this.ball, this.goalpost)
    }

  }




