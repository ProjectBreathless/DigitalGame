gameObj.Preloader = function(game) {};

gameObj.Preloader.prototype = {
	preload: function() {
		console.log("State - preload");
		
        //Main Menu
        this.load.image('mainBG', 'imgs/titleScreen.png');
        this.load.spritesheet('playBtn', 'imgs/titlePlay.png', 224, 100);
        
        //Level 1
        this.load.tilemap('map', 'levels/tiled_ninja_test.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('Alien_Ship_Tileset', 'levels/Alien_Ship_Tileset_2.png');
        //this.load.image('walls_1x2', 'levels/walls_1x2.png');
        //this.load.image('tiles2', 'levels/tiles2.png');
        
        this.load.spritesheet('Aria', 'levels/Aria_Spritesheet.png', 46, 72);
        this.load.image('door', 'levels/Door_locked.png');
        this.load.image('crystal', 'levels/Crystal_Sprite_Small.png')
        
	},
	create: function() {
		// Comment out the line below to check preloader animation
		this.game.state.start('MainMenu');
	}
};