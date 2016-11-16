gameObj.Game = function (game) {
    // Declare game variables
    var player;
    var facing = 'right';
    var jumpTimer = 0;
    var cursors;

    var map;
    var layer;

    var door;
    var crystals;
    var treasure;
    var score;
};

gameObj.Game.prototype = {

    create: function () {
        console.log("State - Game");

        this.game.input.mouse.capture = true;

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.physics.arcade.setBoundsToWorld();

        this.stage.backgroundColor = '#2d2d2d';

        map = this.add.tilemap('map');

        map.addTilesetImage('Alien_Ship_Tileset');

        layer = map.createLayer('Tile Layer 1');

        layer.resizeWorld();


        map.setCollisionBetween(1, 200);

        crystals = this.add.sprite(100, 500, 'crystal');

        facing = 'right';
        jumpTimer = 0;

        door = this.add.sprite(1050, 270, 'door');

        player = this.add.sprite(100, 300, 'Aria');
        player.animations.add('left', [0, 1, 2, 3, 4, 5], 18, true);
        //player.animations.add('turn', [4], 20, true);
        player.animations.add('right', [8, 9, 10, 11, 12, 13], 18, true);

        this.game.physics.arcade.enable(player);

        //Set some physics on the sprite
        player.body.bounce.y = 0;
        this.game.physics.arcade.gravity.y = 1750;
        player.body.collideWorldBounds = true;
        player.anchor.setTo(0.5, 0.5);

        player.body.maxSpeed = 400;
        player.body.acceleration = 40;
        player.body.aerialAcceleration = 4 / 7;
        player.body.friction = 40;
        player.body.rocketJump = true;
        // player.body.friction = 0.5;

        // player.body.fixedRotation = true;
        // player.body.setMaterial(characterMaterial);

        emitter = this.game.add.emitter(0, 0, 50);
        emitter.gravity = 0;
        emitter.bounce.setTo(0.5, 0.5);

        emitter.makeParticles('rocketParticles');
        // emitter.bounce.setTo(0.5, 0.5);

        emitter.forEach(function (particle) {
            particle.body.allowGravity = false;
            particle.animations.add('smoke', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 28);
        }, this);

        this.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        cursors = this.input.keyboard.createCursorKeys();
        a = this.game.input.keyboard.addKey(Phaser.Keyboard.A)
        d = this.game.input.keyboard.addKey(Phaser.Keyboard.D)
        w = this.game.input.keyboard.addKey(Phaser.Keyboard.W)
        score = 0;
        treasure = this.add.text(32, 575, 'Treasure: ' + score.toString(), { font: "20px Arial", fill: "#ffffff", align: "left" });

    },

    update: function () {

        this.game.physics.arcade.collide(player, layer);
        this.game.physics.arcade.collide(emitter, layer);

        if (this.game.input.activePointer.leftButton.isDown && !player.body.onFloor() && player.body.rocketJump) {
            console.log(this.game.physics.arcade.angleToPointer(player));
            console.log(this.game.physics.arcade.distanceToPointer(player));
            player.body.velocity.x -= Math.cos(this.game.physics.arcade.angleToPointer(player)) * 500;
            player.body.velocity.y = 0;
            player.body.velocity.y -= Math.sin(this.game.physics.arcade.angleToPointer(player)) * 650;
            // player.body.velocity.y = -600;
            player.body.rocketJump = false;



            /*particle effect */
            emitter.x = player.x;
            emitter.y = player.y;
            var t = this;
            emitter.forEach(function (singleParticle) {
                if(!singleParticle.animations.isPlaying){
                    singleParticle.animations.play('smoke', 28, false, true);
                }

                // console.log(singleParticle);
                // singleParticle.body.velocity.x = Math.cos(t.game.physics.arcade.angleToPointer(player)) * 1000w;
                // singleParticle.body.velocity.y = Math.sin(t.game.physics.arcade.angleToPointer(player)) * 1000;
            });

            emitter.setXSpeed(Math.cos(this.game.physics.arcade.angleToPointer(player))*50 + (Math.random()-0.5)*600, Math.cos(this.game.physics.arcade.angleToPointer(player))*350 + (Math.random()-0.5)*600) 
            
            emitter.setYSpeed(Math.sin(this.game.physics.arcade.angleToPointer(player))*150 + (Math.random()-0.5)*600, Math.sin(this.game.physics.arcade.angleToPointer(player))*250 + (Math.random()-0.5)*600)
            
            emitter.start(true, 0, null, 15);
        }
        

        if (a.isDown && player.body.onFloor()) {
            if (player.body.velocity.x > -player.body.maxSpeed) {
                player.body.velocity.x -= player.body.acceleration;
            } else {
                player.body.velocity.x = -player.body.maxSpeed
            }
            if (facing != 'left') {
                player.animations.play('left');
                facing = 'left';
            }
        }
        else if (d.isDown && player.body.onFloor()) {
            if (player.body.velocity.x < player.body.maxSpeed) {
                player.body.velocity.x += player.body.acceleration;
            } else {
                player.body.velocity.x = player.body.maxSpeed
            }

            if (facing != 'right') {
                player.animations.play('right');
                facing = 'right';
            }
        }
        else if (player.body.onFloor()) {
            /*friction */
            if (player.body.velocity.x > -player.body.friction && player.body.velocity.x < player.body.friction) {
                player.body.velocity.x = 0;
            } else if (player.body.velocity.x < 0) {
                player.body.velocity.x += player.body.friction;
            } else if (player.body.velocity.x > 0) {
                player.body.velocity.x -= player.body.friction;
            }

            if (facing != 'idle') {
                player.animations.stop();

                if (facing == 'left') {
                    player.frame = 6;
                }
                else {
                    player.frame = 7;
                }

                facing = 'idle';
            }
        }
        /* if in air: */
        else if (a.isDown) {

            if (player.body.velocity.x > -player.body.maxSpeed) {
                player.body.velocity.x -= player.body.acceleration * player.body.aerialAcceleration;
            } else {
                player.body.velocity.x = -player.body.maxSpeed
            }

            if (facing != 'left') {
                player.animations.play('left');
                facing = 'left';
            }
        }
        else if (d.isDown) {
            /*Gives player opportunity to change directions, even in air*/
            if (player.body.velocity.x < player.body.maxSpeed) {
                player.body.velocity.x += player.body.acceleration * player.body.aerialAcceleration;
            } else {
                player.body.velocity.x = player.body.maxSpeed
            }

            if (facing != 'right') {
                player.animations.play('right');
                facing = 'right';
            }
        }

        if (w.isDown && player.body.onFloor()) {
            player.body.velocity.y = -600;
        }

        // if (w.isDown) && this.time.now > jumpTimer && this.checkIfCanJump()) {
        //     player.body.moveUp(500);
        //     jumpTimer = this.time.now + 750;
        // }

        if (((player.x < 310) && (player.x > 300)) && ((player.y > 200) && (player.y < 210))) {
            crystals.kill();
            //if(player.x < 364)
            //{
            //   crystals.kill();
            //score += 10;
            //}
        }

        if (player.body.onFloor()) {
            player.body.rocketJump = true;
        }

    }

};



