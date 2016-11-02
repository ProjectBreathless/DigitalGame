gameObj.Preloader = function(game) {};

gameObj.Preloader.prototype = {
	preload: function() {
		console.log("State - preload");
		this.game.stage.backgroundColor = '#1F1814';

		// Preloader bar animation code
		this.preloadBg = this.add.sprite((720-297)/2, (960-145)/2, 'preloaderBg'); // Use the canvas sizing and image sizing
		this.preloadBar = this.add.sprite((720-158)/2, (960-50)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		//
//		this.load.spritesheet('playButton', 'imgs/play_button.png', 180, 90);

		// Load ALL GAME images into memory
        
        //TEMPORARY
        this.load.image('btn_bg', 'imgs/temp-btn_bg.png');
        this.load.spritesheet('btn_winner', 'imgs/temp-btn-win.png', 70, 30);
        this.load.spritesheet('btn_loser', 'imgs/temp-btn-lose.png', 70, 30);
        this.load.spritesheet('btn_point', 'imgs/temp-btn-point.png', 70, 30);
        
        // Main Screen Assets
        this.load.image('logo', 'imgs/logo.png');
        this.load.image('mouse', 'imgs/mouse.png');
        this.load.image('character', 'imgs/character.png');
        this.load.image('snake', 'imgs/snake.png');
        this.load.spritesheet('playBtn', 'imgs/playBtn.png', 90, 50);
        this.load.spritesheet('infoBtn', 'imgs/infoBtn.png', 90, 50);
        
        // Game Screen Assets
        this.load.image('bg', 'imgs/Bg.png');
        this.load.image('sideWall', 'imgs/sideWall.png');
        this.load.image('wall', 'imgs/wall.png');
        
        this.load.image('time', 'imgs/time.png');
        this.load.image('score', 'imgs/score.png');
        
        this.load.image('gameCharacter', 'imgs/gameCharacter.png');
        this.load.spritesheet('gameSnake', 'imgs/gameSnake.png', 49, 15);
        this.load.image('gameTorch', 'imgs/gameTorch.png');
        
        this.load.spritesheet('gameCoin', 'imgs/gameCoin.png', 30, 30);
        
        // End Game Assets
        this.load.image('winBg', 'imgs/winBg.png');
        this.load.image('winImg', 'imgs/winImg.png');
        this.load.image('loseBg', 'imgs/loseBg.png');
        this.load.image('loseImg', 'imgs/loseImg.png');
        
        this.load.spritesheet('againBtn', 'imgs/againBtn.png', 300, 105);
        this.load.spritesheet('closeBtn', 'imgs/closeBtn.png', 105, 105);

        this.load.image('scoreDisp', 'imgs/scoreDisp.png');
        this.load.image('timeDisp', 'imgs/timeDisp.png');
	},
	create: function() {
		// Comment out the line below to check preloader animation
		this.game.state.start('MainMenu');
	}
};