class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
        // Tilemaps
        this.load.tilemapTiledJSON('map1', './assets/tilemaps/map1.json'); // Adjust the path as necessary

        // Tilesets and Objects
        this.load.image('ground', './assets/tilemaps/ground.png');
        this.load.image('platform', './assets/tilemaps/platform.png');
        this.load.image('decor', './assets/tilemaps/decor.png');
        this.load.image('decor1', './assets/tilemaps/decor1.png');
        this.load.image('decor2', './assets/tilemaps/decor2.png');
        this.load.image('decor3', './assets/tilemaps/decor3.png');
        this.load.image('decor4', './assets/tilemaps/decor4.png');
        this.load.image('alien1', './assets/tilemaps/alien1.png');
        this.load.image('alien2', './assets/tilemaps/alien2.png');
        this.load.image('alien3', './assets/tilemaps/alien3.png');
        this.load.image('alien4', './assets/tilemaps/alien4.png');
        this.load.image('antenna', './assets/tilemaps/antenna.png');
        this.load.image('barrel', './assets/tilemaps/barrel.png');
        this.load.image('eye', './assets/tilemaps/eye.png');
        this.load.image('moon', './assets/tilemaps/moon.png');
        this.load.image('movingplatform', './assets/tilemaps/movingplatform.png');
        this.load.image('sign', './assets/tilemaps/sign.png');
        this.load.image('sign2', './assets/tilemaps/sign2.png');
        this.load.image('sign3', './assets/tilemaps/sign3.png');
        
        this.load.spritesheet('coin', './assets/tilemaps/coin.png', { frameWidth: 16, frameHeight: 16 }); // Collectible
        this.load.spritesheet('timestone', './assets/tilemaps/timestone.png', { frameWidth: 16, frameHeight: 16 }); // Extra Time

        // Background Layers
        this.load.image('bgstars', './assets/tilemaps/bgstars.png');
        this.load.image('bg1', './assets/tilemaps/bg1.png');
        this.load.image('bg2', './assets/tilemaps/bg2.png');
        this.load.image('bg3', './assets/tilemaps/bg3.png');
        this.load.image('bg4', './assets/tilemaps/bg4.png');

        // Player Sprite
        this.load.spritesheet('playerIdle', './assets/player/idle.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerRun', './assets/player/run.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerJump', './assets/player/jump.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerDoubleJump', './assets/player/doublejump.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerClimb', './assets/player/climb.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerDeath', './assets/player/death.png', { frameWidth: 48, frameHeight: 48 });

        // Audio
        this.load.audio('coincollect', './assets/audio/coincollect.mp3');
        this.load.audio('timecollect', './assets/audio/timecollect.mp3');
        this.load.audio('jumpSound', './assets/audio/jumpSound.mp3');
        this.load.audio('ingamebgm', './assets/audio/ingamebgm.mp3');
        this.load.audio('introVoice', './assets/audio/introVoice.mp3');
        this.load.audio('toasty', './assets/audio/toasty.mp3');

        // Toasty Image
        this.load.image('toastyImage', './assets/misc/toasty.png');
    }

    create() {
        // Fade in effect
        this.cameras.main.fadeIn(2000);

        // Stop the main BGM if playing
        this.sound.stopAll();

        // Background video
        this.backgroundVideo = this.add.video(600, 300, 'background');
        this.backgroundVideo.play(true);

        // Create animations for collectibles
        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'glow',
            frames: this.anims.generateFrameNumbers('timestone', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        // Create the tilemap
        const map = this.make.tilemap({ key: 'map1' });

        // Add the tilesets
        const groundTileset = map.addTilesetImage('ground', 'ground');
        const platformTileset = map.addTilesetImage('platform', 'platform');
        const decorTileset = map.addTilesetImage('decor', 'decor');
        const decor1Tileset = map.addTilesetImage('decor1', 'decor1');
        const decor2Tileset = map.addTilesetImage('decor2', 'decor2');
        const decor3Tileset = map.addTilesetImage('decor3', 'decor3');
        const decor4Tileset = map.addTilesetImage('decor4', 'decor4');
        const alien1Tileset = map.addTilesetImage('alien1', 'alien1');
        const alien2Tileset = map.addTilesetImage('alien2', 'alien2');
        const alien3Tileset = map.addTilesetImage('alien3', 'alien3');
        const alien4Tileset = map.addTilesetImage('alien4', 'alien4');
        const antennaTileset = map.addTilesetImage('antenna', 'antenna');
        const barrelTileset = map.addTilesetImage('barrel', 'barrel');
        const coinTileset = map.addTilesetImage('coin', 'coin');
        const eyeTileset = map.addTilesetImage('eye', 'eye');
        const moonTileset = map.addTilesetImage('moon', 'moon');
        const movingPlatformTileset = map.addTilesetImage('movingplatform', 'movingplatform');
        const signTileset = map.addTilesetImage('sign', 'sign');
        const sign2Tileset = map.addTilesetImage('sign2', 'sign2');
        const sign3Tileset = map.addTilesetImage('sign3', 'sign3');
        const timeStoneTileset = map.addTilesetImage('timestone', 'timestone');
        const bgStarsTileset = map.addTilesetImage('bgstars', 'bgstars');
        const bg1Tileset = map.addTilesetImage('bg1', 'bg1');
        const bg2Tileset = map.addTilesetImage('bg2', 'bg2');
        const bg3Tileset = map.addTilesetImage('bg3', 'bg3');
        const bg4Tileset = map.addTilesetImage('bg4', 'bg4');

        // Create the layers in the correct order
        const backgroundStarsLayer = map.createLayer('BackgroundStars', [
            groundTileset, platformTileset, decorTileset, decor1Tileset, decor2Tileset, decor3Tileset, decor4Tileset, 
            alien1Tileset, alien2Tileset, alien3Tileset, alien4Tileset, antennaTileset, barrelTileset, coinTileset, 
            eyeTileset, moonTileset, movingPlatformTileset, signTileset, sign2Tileset, sign3Tileset, timeStoneTileset,
            bgStarsTileset, bg1Tileset, bg2Tileset, bg3Tileset, bg4Tileset
        ], 0, 0);

        const background1Layer = map.createLayer('Background1', [
            groundTileset, platformTileset, decorTileset, decor1Tileset, decor2Tileset, decor3Tileset, decor4Tileset, 
            alien1Tileset, alien2Tileset, alien3Tileset, alien4Tileset, antennaTileset, barrelTileset, coinTileset, 
            eyeTileset, moonTileset, movingPlatformTileset, signTileset, sign2Tileset, sign3Tileset, timeStoneTileset,
            bgStarsTileset, bg1Tileset, bg2Tileset, bg3Tileset, bg4Tileset
        ], 0, 0);

        const background2Layer = map.createLayer('Background2', [
            groundTileset, platformTileset, decorTileset, decor1Tileset, decor2Tileset, decor3Tileset, decor4Tileset, 
            alien1Tileset, alien2Tileset, alien3Tileset, alien4Tileset, antennaTileset, barrelTileset, coinTileset, 
            eyeTileset, moonTileset, movingPlatformTileset, signTileset, sign2Tileset, sign3Tileset, timeStoneTileset,
            bgStarsTileset, bg1Tileset, bg2Tileset, bg3Tileset, bg4Tileset
        ], 0, 0);

        const background3Layer = map.createLayer('Background3', [
            groundTileset, platformTileset, decorTileset, decor1Tileset, decor2Tileset, decor3Tileset, decor4Tileset, 
            alien1Tileset, alien2Tileset, alien3Tileset, alien4Tileset, antennaTileset, barrelTileset, coinTileset, 
            eyeTileset, moonTileset, movingPlatformTileset, signTileset, sign2Tileset, sign3Tileset, timeStoneTileset,
            bgStarsTileset, bg1Tileset, bg2Tileset, bg3Tileset, bg4Tileset
        ], 0, 0);

        const background4Layer = map.createLayer('Background4', [
            groundTileset, platformTileset, decorTileset, decor1Tileset, decor2Tileset, decor3Tileset, decor4Tileset, 
            alien1Tileset, alien2Tileset, alien3Tileset, alien4Tileset, antennaTileset, barrelTileset, coinTileset, 
            eyeTileset, moonTileset, movingPlatformTileset, signTileset, sign2Tileset, sign3Tileset, timeStoneTileset,
            bgStarsTileset, bg1Tileset, bg2Tileset, bg3Tileset, bg4Tileset
        ], 0, 0);

        const platformLayer = map.createLayer('Platform', [
            groundTileset, platformTileset, decorTileset, decor1Tileset, decor2Tileset, decor3Tileset, decor4Tileset, 
            alien1Tileset, alien2Tileset, alien3Tileset, alien4Tileset, antennaTileset, barrelTileset, coinTileset, 
            eyeTileset, moonTileset, movingPlatformTileset, signTileset, sign2Tileset, sign3Tileset, timeStoneTileset,
            bgStarsTileset, bg1Tileset, bg2Tileset, bg3Tileset, bg4Tileset
        ], 0, 0);

        const ladderLayer = map.createLayer('Ladder', [
            platformTileset, decorTileset, decor1Tileset, decor2Tileset, decor3Tileset, decor4Tileset, alien1Tileset, 
            alien2Tileset, alien3Tileset, alien4Tileset, antennaTileset, barrelTileset, coinTileset, eyeTileset, 
            moonTileset, movingPlatformTileset, signTileset, sign2Tileset, sign3Tileset, timeStoneTileset, bgStarsTileset, 
            bg1Tileset, bg2Tileset, bg3Tileset, bg4Tileset
        ], 0, 0);

        const decorsLayer = map.createLayer('Decors', [
            decorTileset, decor1Tileset, decor2Tileset, decor3Tileset, decor4Tileset, alien1Tileset, alien2Tileset, 
            alien3Tileset, alien4Tileset, antennaTileset, barrelTileset, coinTileset, eyeTileset, moonTileset, 
            movingPlatformTileset, signTileset, sign2Tileset, sign3Tileset, timeStoneTileset, bgStarsTileset, bg1Tileset, 
            bg2Tileset, bg3Tileset, bg4Tileset
        ], 0, 0);

        const npcsLayer = map.createLayer('NPCs', [
            alien1Tileset, alien2Tileset, alien3Tileset, alien4Tileset, antennaTileset, barrelTileset, coinTileset, 
            eyeTileset, moonTileset, movingPlatformTileset, signTileset, sign2Tileset, sign3Tileset, timeStoneTileset, 
            bgStarsTileset, bg1Tileset, bg2Tileset, bg3Tileset, bg4Tileset
        ], 0, 0);

        // Enable collisions for the platform layer
        platformLayer.setCollisionByExclusion([-1]);

        // Find the player spawn point
        const spawnPoint = map.findObject('Spawnpoint', obj => obj.type === 'spawn');

        // Add player sprite and animations
        this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'playerIdle');
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(18, 18); // Adjust the hitbox size to 18x18
        this.player.body.setOffset(16, 32); // Adjust the hitbox offset to center it

        // Player animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('playerRun', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('playerIdle', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('playerRun', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('playerJump', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'doublejump',
            frames: this.anims.generateFrameNumbers('playerDoubleJump', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'climb',
            frames: this.anims.generateFrameNumbers('playerClimb', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('playerDeath', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        // Enable collision between the player and the platform layer
        this.physics.add.collider(this.player, platformLayer);

        // Set world bounds to match the map size
        this.physics.world.setBounds(0, 0, 3200, 608);
        this.cameras.main.setBounds(0, 0, 3200, 608);
        this.cameras.main.startFollow(this.player);

        // Input controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // Double jump logic
        this.jumps = 0;
        this.jumpTimer = 0;

        // Create collectibles and other objects
        this.createCollectibles();
        this.createTimeStones();

        // Add timer
        this.initialTime = 60; // 1:00 minute
        this.timeText = this.add.text(16, 16, 'Time: 1:00', { fontSize: '32px', fill: '#ffffff' });
        this.timeText.setScrollFactor(0);

        // Add coin count text
        this.coinsCollected = 0;
        this.coinText = this.add.text(16, 50, 'Coins: 0', { fontSize: '32px', fill: '#ffffff' });
        this.coinText.setScrollFactor(0);

        // Add sound effects
        this.coinCollectSound = this.sound.add('coincollect');
        this.timeCollectSound = this.sound.add('timecollect');
        this.jumpSound = this.sound.add('jumpSound');

        // Play in-game background music
        this.ingamebgm = this.sound.add('ingamebgm');
        this.ingamebgm.play({ loop: true });

        // Set the total number of coins
        this.totalCoins = 78; // Adjust this value to match the total number of coins in your game

        // Intro voice
        this.introVoice = this.sound.add('introVoice');
        this.introVoice.play();

        // Add intro text
        this.introText = "Hey there, champ! Welcome to the game!\n\n It's me Lars!\n\nThe only voice speaking inside your head.\n\nNow, The rules are simple: collect all the coins before the time runs out to win.\n\nHere's a tip: time gems give you an extra 10 seconds.\n\nYou have 1 minute to complete the game.\n\nSo, Do you have what it takes?\n\nOh yeah?\n\nThen let's get started and do some vibe check!\n\n\n\n [You can also Press P to Pause the Game.";
        this.introTextObj = this.add.text(config.width / 2, config.height / 2, "", { fontSize: '18px', fill: '#ffffff', align: 'center', wordWrap: { width: config.width - 40 } }).setOrigin(0.5);
        
        this.typewriterText(this.introText, this.introTextObj);

        // Receiving Transmission text
        this.transmissionText = this.add.text(config.width / 2, config.height - 50, "Receiving Transmission...", { fontSize: '32px', fill: '#FF69B4' }).setOrigin(0.5);
        
        // Disable player control and hide HUD until intro voice finishes
        this.playerControlEnabled = false;
        this.timeText.setVisible(false);
        this.coinText.setVisible(false);

        this.introVoice.on('complete', () => {
            this.transmissionText.setVisible(false);
            this.introTextObj.setVisible(false);
            this.playerControlEnabled = true;
            this.timeEvent = this.time.addEvent({ delay: 1000, callback: this.updateTimer, callbackScope: this, loop: true });
            this.timeText.setVisible(true);
            this.coinText.setVisible(true);
        });

        // Add toasty image but make it invisible initially
        this.toastyImage = this.add.image(config.width - 100, config.height - 100, 'toastyImage');
        this.toastyImage.setScale(0.5);
        this.toastyImage.setVisible(false);

        // Add pink fog overlay
        this.addFogOverlay();
    }

    addFogOverlay() {
        const fogOverlay = this.add.graphics();
        fogOverlay.fillStyle(0xff69b4, 0.11); // Adjust the color and alpha for intensity
        fogOverlay.fillRect(0, 0, 3200, 608); // Cover the entire map

        // Adjust the blend mode to give a retro synthwave effect
        fogOverlay.setBlendMode(Phaser.BlendModes.ADD);
    }

    typewriterText(text, textObj) {
        const length = text.length;
        let i = 0;
        this.time.addEvent({
            callback: () => {
                textObj.text += text[i];
                ++i;
            },
            repeat: length - 1,
            delay: 50
        });
    }

    createCollectibles() {
        // Create coins manually at specified positions
        const coinPositions = [
            [176, 384], [176, 480], [352, 480], [400, 480], [448, 480], [528, 480], [576, 480], [624, 480],
            [672, 480], [928, 480], [976, 480], [1024, 480], [1072, 480], [816, 336], [864, 336], [912, 336],
            [960, 336], [1008, 336], [1056, 336], [816, 288], [864, 288], [912, 288], [960, 288], [1008, 288],
            [1056, 288], [816, 240], [864, 240], [912, 240], [960, 240], [1008, 240], [1056, 240], [816, 192],
            [864, 192], [912, 192], [960, 192], [1008, 192], [1056, 192],
            [1200, 480], [1248, 480], [1296, 480], [1344, 480], [1392, 480], [1440, 480], [1488, 480], [1536, 480],
            [1584, 480], [1632, 480], [2128, 400], [2000, 368], [1728, 368], [1504, 368], [1312, 368], [1296, 272],
            [1216, 208], [1216, 128], [1440, 192], [1504, 192], [1568, 192], [1632, 192], [1696, 192], [1760, 192],
            [1824, 192], [1888, 192], [1952, 192], [2016, 192], [2080, 192], [2144, 192], [2208, 192], [2288, 192],
            [2768, 96], [3056, 96], [2400, 256], [2384, 320], [2400, 384], [2688, 192], [2864, 192], [3104, 224],
            [3168, 256]
        ];

        this.coinsGroup = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        coinPositions.forEach(position => {
            const coinSprite = this.coinsGroup.create(position[0], position[1], 'coin');
            coinSprite.setOrigin(0, 1);
            coinSprite.anims.play('spin'); // Play the coin animation
        });

        // Add overlap with the player
        this.physics.add.overlap(this.player, this.coinsGroup, this.collectCoin, null, this);
    }

    createTimeStones() {
        // Create the time stone manually at the specified position
        const timeStonePositions = [
            [1120, 464], [1360, 192], [1728, 288], [2464, 96], [2640, 448], [2976, 320], [1872, 368]
        ];

        this.timeStonesGroup = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        timeStonePositions.forEach(position => {
            const timeStoneSprite = this.timeStonesGroup.create(position[0], position[1], 'timestone');
            timeStoneSprite.setOrigin(0, 1);
            timeStoneSprite.anims.play('glow'); // Play the time stone animation
        });

        // Add overlap with the player
        this.physics.add.overlap(this.player, this.timeStonesGroup, this.collectTimeStone, null, this);
    }

    collectCoin(player, coin) {
        coin.disableBody(true, true);
        this.coinsCollected += 1;
        this.coinText.setText('Coins: ' + this.coinsCollected);
        this.coinCollectSound.play(); // Play coin collect sound
    
        // Check if all coins are collected
        if (this.coinsCollected === this.totalCoins) {
            this.scene.start('GameWinScene', { remainingTime: this.initialTime });
        }

        // Show toasty image and play toasty sound every 20 coins
        if (this.coinsCollected % 20 === 0) {
            this.showToasty();
        }
    }
    

    collectTimeStone(player, timeStone) {
        // Show +10 Seconds text above the time stone
        const text = this.add.text(timeStone.x, timeStone.y - 20, '+10 Seconds!', { fontSize: '18px', fill: '#FFFF00' }).setOrigin(0.5);
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                text.destroy();
            }
        });

        timeStone.disableBody(true, true);
        this.initialTime += 10;
        this.updateTimerText();
        this.timeCollectSound.play(); // Play time stone collect sound
    }

    update(time, delta) {
        if (!this.playerControlEnabled) return; // Disable player control if intro is not finished

        const isRunning = this.shiftKey.isDown;
        const speed = isRunning ? 125 : 90;
        const jumpSpeed = 125;
        const doubleJumpSpeed = 160;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            this.player.anims.play('left', true);
            this.player.setFlipX(true); // Flip the sprite horizontally when moving left
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.anims.play('right', true);
            this.player.setFlipX(false); // Unflip the sprite when moving right
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            if (this.player.body.onFloor()) {
                this.player.setVelocityY(-jumpSpeed);
                this.jumps = 1;
                this.player.anims.play('jump');
                this.jumpSound.play(); // Play jump sound
            } else if (this.jumps < 2) {
                this.player.setVelocityY(-doubleJumpSpeed);
                this.jumps++;
                this.player.anims.play('doublejump');
                this.jumpSound.play(); // Play double jump sound
            }
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-jumpSpeed);
            this.player.anims.play('climb');
        }

        if (this.cursors.down.isDown && this.player.body.touching.up) {
            this.player.setVelocityY(jumpSpeed);
        }

        if (this.initialTime <= 0 && !this.player.anims.currentAnim.key === 'death') {
            this.player.anims.play('death');
            this.player.setVelocityX(0);
            this.scene.start('GameOverScene');
        }

        // Handle pause functionality
        if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
            this.scene.launch('PauseScene', { parentScene: this });
            this.scene.pause();
        }
    }

    updateTimer() {
        if (this.initialTime > 0) {
            this.initialTime -= 1;
            this.updateTimerText();
        } else {
            this.timeEvent.remove();
            // End game logic here
            this.scene.start('GameOverScene');
        }
    }

    updateTimerText() {
        const minutes = Math.floor(this.initialTime / 60);
        const seconds = this.initialTime % 60;
        this.timeText.setText('Time: ' + minutes + ':' + (seconds < 10 ? '0' + seconds : seconds));
    }

    showToasty() {
        const cameraX = this.cameras.main.scrollX;
        const cameraY = this.cameras.main.scrollY;
        this.toastyImage.setPosition(cameraX + config.width - 100, cameraY + config.height - 100);
        this.toastyImage.setVisible(true);
        this.sound.play('toasty');
        this.time.delayedCall(1000, () => {
            this.toastyImage.setVisible(false);
        });
    }
}
