gameObj.Game = function(game) {
    // Declare game variables
    var player;
    var facing = 'left';
    var jumpTimer = 0;
    var cursors;
    var jumpButton;

    var map;
    var layer;
    
    var door;
    var crystals;
    var treasure;
    var score;
};

gameObj.Game.prototype = {
    
	create: function() {
		console.log("State - Game");
		
        this.physics.startSystem(Phaser.Physics.P2JS);

        this.stage.backgroundColor = '#2d2d2d';

        map = this.add.tilemap('map');

        map.addTilesetImage('ground_1x1');
        map.addTilesetImage('walls_1x2');
        map.addTilesetImage('tiles2');

        layer = map.createLayer('Tile Layer 1');

        layer.resizeWorld();

        //  Set the tiles for collision.
        //  Do this BEFORE generating the p2 bodies below.
        map.setCollisionBetween(1, 12);

        //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
        //  This call returns an array of body objects which you can perform addition actions on if
        //  required. There is also a parameter to control optimising the map build.
        this.physics.p2.convertTilemap(map, layer);

        this.physics.p2.restitution = 0.2;
        this.physics.p2.gravity.y = 400;
        
        crystals = this.add.sprite(300, 200, 'crystal');
        
        
        //crystals.enableBody = true;
        //crystals.physicBodyType = Phaser.Physics.P2JS;
        
        //this.physics.p2.enable(cyrstals);
        //this.physics.p2.enable(player);
        
        facing = 'left';
        jumpTimer = 0;
        
        door = this.add.sprite(1450, 370, 'door');

        player = this.add.sprite(100, 200, 'dude');
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('turn', [4], 20, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        this.physics.p2.enable(player);

        player.body.fixedRotation = true;
        // player.body.setMaterial(characterMaterial);

        this.camera.follow(player);

        cursors = this.input.keyboard.createCursorKeys();
        jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        score = 0;
        treasure = this.add.text(32, 575, 'Treasure: ' + score.toString(), {font: "20px Arial", fill: "#ffffff", align: "left"});
        
	},
    
    update: function() {    
        
        if (cursors.left.isDown){
            player.body.moveLeft(200);

            if (facing != 'left'){
                player.animations.play('left');
                facing = 'left';
            }
        }
        else if (cursors.right.isDown){
            player.body.moveRight(200);

            if (facing != 'right'){
                player.animations.play('right');
                facing = 'right';
            }
        }
        else{
            player.body.velocity.x = 0;

            if (facing != 'idle'){
                player.animations.stop();

                if (facing == 'left'){
                    player.frame = 0;
                }
                else{
                    player.frame = 5;
                }

                facing = 'idle';
            }
        }

        if (jumpButton.isDown && this.time.now > jumpTimer && this.checkIfCanJump())
        {
            player.body.moveUp(300);
            jumpTimer = this.time.now + 750;
        }
        
        if (((player.x < 310) && (player.x > 300)) && ((player.y > 200) && (player.y < 210S)))
        {
            crystals.kill();
            //if(player.x < 364)
            //{
            //   crystals.kill();
                //score += 10;
            //}
            
            
        }
    
},
    checkIfCanJump: function() {
        
        var yAxis = p2.vec2.fromValues(0, 1);
        var result = false;

        for (var i = 0; i < this.physics.p2.world.narrowphase.contactEquations.length; i++)
        {
            var c = this.physics.p2.world.narrowphase.contactEquations[i];

            if (c.bodyA === player.body.data || c.bodyB === player.body.data)
            {
                var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
                if (c.bodyA === player.body.data) d *= -1;
                if (d > 0.5) result = true;
            }
        }

        return result;
        
    },

};



