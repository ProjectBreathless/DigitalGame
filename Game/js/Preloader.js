gameObj.Preloader = function(game) {};

gameObj.Preloader.prototype = {
	preload: function() {
		console.log("State - preload");
		
        //Main Menu
        this.load.image('mainBG', 'imgs/title/titleScreen.png');
        this.load.image('titleLogo', 'imgs/title/titleLogo.png');
        
        this.load.spritesheet('playBtn', 'imgs/title/titlePlay.png', 224, 100);
        this.load.spritesheet('titleShip', 'imgs/title/titleShip.png', 200, 82);
        this.load.spritesheet('titleText', 'imgs/title/titleText.png', 200, 100);
        
        //HUD
        this.load.image('timeInd', 'imgs/Time.png');
        this.load.image('treasInd', 'imgs/Treasure.png');
        this.load.spritesheet('Fuel_Ind', 'imgs/Fuel_Ind.png', 55, 55);
        
        //Levels
        this.load.tilemap('l1map', 'levels/IntroduceAir.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('l2map', 'levels/IntroduceCrystals.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('l3map', 'levels/IntroduceRocket.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('l4map', 'levels/CombineElements.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('Alien_Ship_Tileset', 'levels/32x32_tiles.png');
        //this.load.image('walls_1x2', 'levels/walls_1x2.png');
        //this.load.image('tiles2', 'levels/tiles2.png');
        
        this.load.spritesheet('Aria', 'levels/Aria_Spritesheet.png', 46, 72);
        //this.load.image('door', 'levels/Door_Locked.png', 80, 80);
        this.load.spritesheet('door', 'levels/door.png', 80, 80);
        this.load.image('crystal', 'levels/Crystal_Sprite_Small.png');
		this.load.image('air', 'levels/Air_Capsule.png');
        this.load.image('fuel', 'levels/Fuel_Pod.png');
        
        this.load.spritesheet('rocketParticles', 'levels/rocketParticle_spritesheet.png', 8, 8);
        
        this.load.audio('musicInGame', 'sound/RoccoW_-_06_-_Pumped.mp3');
        this.load.audio('musicMainMenu', 'sound/Visager_-_15_-_Epilogue.mp3');
        this.load.audio('crystalFx', 'sound/Cut Audio Files/27568__suonho__memorymoon-space-blaster-plays_cut_cut.wav');
        this.load.audio('aircapsuleFx', 'sound/Cut Audio Files/6110__twistedlemon__cola-bottle_cut_cut.wav');
        this.load.audio('doorFx', 'sound/Cut Audio Files/123253__skullsmasha__mechanicalclamp_cut.wav');
        this.load.audio('alarm', 'sound/39514__syna-max__alarm-of-d00m_silence.wav');
        this.load.audio('fuelpodFx', 'sound/30935__aust-paul__possiblelazer.wav');
        this.load.audio('jetpackFx', 'sound/Cut Audio Files/36847__ecodtr__laserrocket2_cut_cut.wav');
        
        //Win Screen
        this.load.image('successSprite', 'imgs/Success_sprite.png');
        this.load.image('replayBtn', 'imgs/Replay_button.png');
        this.load.image('menuBtn', 'imgs/Menu_button.png');
        this.load.image('tinystar', 'imgs/star2.png');

        
	},
	create: function() {
		// Comment out the line below to check preloader animation
		this.game.state.start('MainMenu');
	}
};