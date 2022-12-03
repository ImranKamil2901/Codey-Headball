const config = {
    type: Phaser.AUTO,
    width: 1610,
    height: 735,
    backgroundColor: '#808080',
    scene: [StartScene, GameScene],
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 1000 },
        enableBody: true,
      }
    },
  };
  
  const game = new Phaser.Game(config);