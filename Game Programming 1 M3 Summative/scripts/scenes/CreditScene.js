class CreditScene extends Phaser.Scene {
    
    constructor() {
        super("CreditScene");
        this.backButton;
    }

    create() {
        // SOUNDS
        const iconSounds = {
            'icon1': this.sound.add('icon1Sound'),
            'icon3': this.sound.add('icon2Sound'),
            'icon2': this.sound.add('icon4Sound'),
            'icon4': this.sound.add('icon3Sound')
        };

        // BACKGROUND VIDEO
        let backgroundVideo = this.add.video(config.width / 2, config.height / 2, 'background');
        backgroundVideo.play(true);

        // SFX
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

        // Icons setup
        const iconData = [
            { key: 'icon1', name: 'Lars', role: ' Leader, Programmer' },
            { key: 'icon3', name: 'Seb', role: 'Art & Design' },
            { key: 'icon2', name: 'Jules', role: 'Art & Design' },
            { key: 'icon4', name: 'Jhelloh', role: 'Audio & SFX' }
        ];

        const startX = config.width / 4;
        const startY = config.height / 1.8 - 100;
        const iconSpacing = config.width / 6;

        iconData.forEach((data, index) => {
            const x = startX + index * iconSpacing;
            const icon = this.add.image(x, startY, data.key);
            icon.setScale(0.5);
            icon.setInteractive();

            // Create text style with gradient
            const nameText = this.createGradientText(x, startY + 100, data.name, 24);
            const roleText = this.createGradientText(x, startY + 130, data.role, 18);

            // Hover and press effects
            icon.on('pointerover', () => {
                icon.setScale(0.55);
            });
            icon.on('pointerout', () => {
                icon.setScale(0.5);
            });
            icon.on('pointerdown', () => {
                icon.setScale(0.5);
                iconSounds[data.key].play(); // Play the specific sound for the icon
            });
            icon.on('pointerup', () => {
                icon.setScale(0.5);
                // Add any specific action for each icon here if needed
            });
        });

        // Back button
        this.backButton = this.add.image(config.width * 0.05, config.height * 0.1, 'uiButtonBack');
        this.backButton.setScale(2);
        this.backButton.setInteractive();

        this.backButton.on("pointerup", () => {
            declineSFX.play();
            this.spiralOutTransition(() => {
                this.scene.start('MainMenuScene');
            });
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
