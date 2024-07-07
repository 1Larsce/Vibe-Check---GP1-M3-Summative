class PauseScene extends Phaser.Scene {
    constructor() {
        super("PauseScene");
    }

    create(data) {
        this.parentScene = data.parentScene;

        const { width, height } = this.cameras.main;

        const pauseText = this.createGradientText(width / 2, height / 2 - 100, 'YOU PAUSED THE GAME', 32);
        const continueButton = this.createGradientText(width / 2, height / 2, 'Continue', 24).setInteractive();
        const retryButton = this.createGradientText(width / 2, height / 2 + 50, 'Retry', 24).setInteractive();
        const quitButton = this.createGradientText(width / 2, height / 2 + 100, 'Quit', 24).setInteractive();

        continueButton.on('pointerdown', () => {
            this.scene.stop();
            this.parentScene.scene.resume();
        });

        retryButton.on('pointerdown', () => {
            this.scene.stop();
            this.parentScene.scene.restart();
        });

        quitButton.on('pointerdown', () => {
            this.scene.stop();
            this.parentScene.scene.stop();
            this.scene.start('MainMenuScene');
        });
    }

    createGradientText(x, y, text, fontSize) {
        const titleText = this.add.text(x, y, text, {
            fontSize: `${fontSize}px`,
            fontStyle: 'bold',
            fontFamily: 'Tahoma',
            fill: '#FF5F1F',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 8,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#FF5F1F',
                blur: 1,
                stroke: true,
                fill: true
            }
        });
        titleText.setOrigin(0.5);

        // Create custom gradient color
        const gradient = titleText.context.createLinearGradient(0, 0, 0, titleText.height);
        gradient.addColorStop(0.5, '#FF10F0');
        gradient.addColorStop(1, '#00fefc');
        gradient.addColorStop(0.5, '#FF5F1F');

        // Apply the gradient to the text
        titleText.setFill(gradient);

        // Adding a glow effect by repeating the shadow with different offsets (simulating glow)
        titleText.setShadow(8, 8, '#FFD700', 15, true, true);
        titleText.setShadow(-8, -8, '#FFD700', 15, true, true);
        titleText.setShadow(8, -8, '#FFD700', 15, true, true);
        titleText.setShadow(-8, 8, '#FFD700', 15, true, true);

        return titleText;
    }
}

