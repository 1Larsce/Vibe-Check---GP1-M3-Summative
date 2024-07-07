var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false // Enable debug mode
        }
    },
    scene: [PreLoadScene, MainMenuScene, GameScene, CreditScene, GameOverScene, GameWinScene, PauseScene ],
    render: {
        pixelArt: true
    },
};

const game = new Phaser.Game(config);
