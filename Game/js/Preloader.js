gameObj.Preloader = function(game) {};

gameObj.Preloader.prototype = {
	preload: function() {
		console.log("State - preload");
		
        this.load.tilemap('map', 'assets/tilemaps/maps/collision_test.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
        this.load.image('walls_1x2', 'assets/tilemaps/tiles/walls_1x2.png');
        this.load.image('tiles2', 'assets/tilemaps/tiles/tiles2.png');
        this.load.spritesheet('dude', 'assets/games/starstruck/dude.png', 32, 48);
        
        
	},
	create: function() {
		// Comment out the line below to check preloader animation
		this.game.state.start('MainMenu');
	}
};