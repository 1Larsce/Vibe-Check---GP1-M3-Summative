class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("MainMenuScene");
        this.playBtn;
        this.creditsBtn;
        this.quitBtn;
        this.backgroundVideo;
    }

    create() {
        this.sound.pauseOnBlur = false; // disabled audio pause when window is out of focus

        // 🎥 BACKGROUND VIDEO AND SETTING UP SFX 🎶
        this.backgroundVideo = this.add.video(config.width / 2, config.height / 2, 'background');
        this.backgroundVideo.play(true);
        let confirmSFX = this.sound.add('confirmSFX');
        let declineSFX = this.sound.add('declineSFX');

        // Check if background music is already playing
        if (!this.sound.get('bgm')) {
            // Background music audio set to loop and volume
            this.sound.play('bgm', {
                loop: true,
                volume: .3,
                key: 'bgm'
            });
        }

        // MENU DISPLAY - BUTTONS

        // BUTTONS
        this.playBtn = this.add.image(config.width / 2, config.height * .6, 'uiStart');
        this.playBtn.setScale(1.5);

        this.creditsBtn = this.add.image(config.width / 2, config.height * .72, 'uiCredits');
        this.creditsBtn.setScale(1);

        this.quitBtn = this.add.image(config.width / 2, config.height * .82, 'uiQuit');
        this.quitBtn.setScale(1);

        this.playBtn.setInteractive();
        this.creditsBtn.setInteractive();
        this.quitBtn.setInteractive();

        // Event listeners for button clicks
        this.playBtn.on('pointerdown', () => {
            this.sound.play('confirmSFX');
            this.spiralOutTransition(() => {
                this.scene.start('GameScene');
            });
        });

        this.creditsBtn.on('pointerdown', () => {
            this.sound.play('confirmSFX');
            this.spiralOutTransition(() => {
                this.scene.start('CreditScene');
            });
        });

        this.quitBtn.on('pointerdown', () => {
            this.sound.play('declineSFX');
            window.close(); // Attempt to close the browser tab
        });
    }

    spiralOutTransition(onComplete) {
        this.tweens.add({
            targets: this.cameras.main,
            zoom: 2,
            rotation: { from: 0, to: 6.28 }, // 360 degrees in radians
            duration: 1000,
            ease: 'Cubic.easeInOut',
            onComplete: () => {
                this.cameras.main.zoom = 1;
                this.cameras.main.rotation = 0;
                onComplete();
            }
        });
    }
}
