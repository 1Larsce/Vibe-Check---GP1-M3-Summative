class PreLoadScene extends Phaser.Scene {
    constructor() {
        super("PreLoadScene");
    }

    preload() {
        // BACKGROUND
        this.load.video('background', './assets/background/background1.mp4');

        // UI BUTTONS
        this.load.image('uiStart', './assets/misc/uiStart.png');
        this.load.image('uiCredits', './assets/misc/uiCredits.png');
        this.load.image('uiQuit', './assets/misc/uiQuit.png');
        this.load.image('uiButtonBack', './assets/misc/UI_ButtonBack.png');
        this.load.image('uiButtonNext', './assets/misc/UI_ButtonNext.png');

        // CREDITS ICONS
        this.load.image('icon1', './assets/misc/lars.png');
        this.load.image('icon2', './assets/misc/jules.png');
        this.load.image('icon3', './assets/misc/seb.png');
        this.load.image('icon4', './assets/misc/jeh.png');

        // AUDIO
        // Buttons SFX
        this.load.audio('confirmSFX', './assets/audio/select.mp3');
        this.load.audio('declineSFX', './assets/audio/back.mp3');

        // Background Music
        this.load.audio('bgm', './assets/audio/mainbgm.mp3');

        // Icon SFX
        this.load.audio('logoSound', './assets/audio/breakitdown.mp3');
        this.load.audio('icon1Sound', './assets/audio/icon1Sound.mp3');
        this.load.audio('icon3Sound', './assets/audio/icon3Sound.mp3');
        this.load.audio('icon2Sound', './assets/audio/icon2Sound.mp3');
        this.load.audio('icon4Sound', './assets/audio/icon4Sound.mp3');

        // PLAYER
        // Movement
        this.load.audio('jumpSFX', './assets/audio/jumpSound.mp3');
        this.load.audio('walkSFX', './assets/audio/walkSound.mp3');
        this.load.audio('deathSFX', './assets/audio/deathSound.mp3');

        this.load.on("progress", (percent) => {
            console.log("loading: " + percent);
        });

        // LOADING
        this.load.image('logo', './assets/misc/icon.png'); // Load your logo image

        this.load.on("progress", (percent) => {
            console.log("loading: " + percent);
        });
    }

    create() {
        // Add the logo image
        let logo = this.add.image(600, 300, 'logo');
        logo.setOrigin(0.5);
        logo.setScale(0.65);
        logo.setAlpha(0); // Start with the logo invisible

        // Load the reveal sound
        let revealSound = this.sound.add('logoSound');

        // Create the fade-in and fade-out effect
        let timeline = this.tweens.timeline({
            targets: logo,
            ease: 'Linear',
            loop: 0,
            tweens: [
                {
                    alpha: 1, // Fade in
                    duration: 2500, // 2.5 seconds
                    onStart: () => {
                        revealSound.play(); // Play the sound when the logo starts to fade in
                    }
                },
                {
                    alpha: 0, // Fade out
                    duration: 2500, // 2.5 seconds
                    delay: 500 // 0.5 second delay before starting fade out
                }
            ],
            onComplete: () => {
                // Transition to the main menu scene after the fade-out effect
                this.scene.start('MainMenuScene');
            }
        });

        // Add input for skipping the intro
        this.input.keyboard.on('keydown-ENTER', () => {
            // Stop the tween animation
            timeline.stop();
            // Transition to the main menu scene immediately
            this.scene.start('MainMenuScene');
        });
    }
}
