gameObj.Preloader = function(game) {};

gameObj.Preloader.prototype = {
	preload: function() {
		console.log("State - preload");
		
        this.load.tilemap('map', 'levels/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('ground_1x1', 'levels/ground_1x1.png');
        this.load.image('walls_1x2', 'levels/walls_1x2.png');
        this.load.image('tiles2', 'levels/tilemaps/tiles/tiles2.png');
        this.load.spritesheet('dude', 'levels/dude.png', 32, 48);
        
        
	},
	create: function() {
		// Comment out the line below to check preloader animation
		this.game.state.start('MainMenu');
	}
};