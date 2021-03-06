gameObj.Game = function (game) {
    // Declare game variables
    var player;
    var facing = 'right';
    var jumpTimer = 0;
    var cursors;
    var boost;

    var map;
    var layer;
    var door;
    var crystals;
    var fuelPacks;
    var airPacks;
    var treasure;
    var timer, timerEvent;
    var min;
    var sec;
    var rocketReady;
    var rFuel;
    var doubleJump;
    var maxSpeedY;


    var crystalFx;
    var aircapsuleFx;
    var fuelpodFx;
    var doorFx;
    var jetpackFx;

    var doorFxPlay;

    var radian;

    var music;
    var alarm;
    
    
    var prevX;
    var prevY;
    var tilesprite;

    var group;

};

gameObj.Game.prototype = {

    create: function () {
        console.log("State - Game");



        this.game.input.mouse.capture = true;

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.physics.arcade.setBoundsToWorld();

        this.stage.backgroundColor = '#2d2d2d';

        star_tilesprite = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'starField');
        star_tilesprite.fixedToCamera = true;

        tilesprite = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'spaceShip');
        tilesprite.fixedToCamera = true;

        
        map = this.add.tilemap('map');

        map.addTilesetImage('Alien_Ship_Tileset');
        
        layer = map.createLayer('Tile Layer 1');

        layer.resizeWorld();

        map.setCollisionBetween(1, 200);


        facing = 'right';
        jumpTimer = 0;

        door = this.add.sprite(1300, 182, 'door');
        door.animations.add('open', [1, 2, 3, 4, 4, 5, 5, 6], 8, false);
        door.animations.add('stay', [6, 6, 6, 6, 6, 6], 10, false);
        this.game.physics.arcade.enable(door);
        door.body.setSize(20, 20, 30, 30);
        door.body.collideWorldBounds = true;

        //door = this.game.add.group();
        //door.enableBody = true;
        //door.physicsBodyType = Phaser.Physics.ARCADE;


        player = this.add.sprite(100, 550, 'Aria', 7);
        player.animations.add('left', [5, 4, 3, 2, 1, 0], 12, true);
        player.animations.add('right', [8, 9, 10, 11, 12, 13], 12, true);

        this.game.physics.arcade.enable(player);
        this.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        

        //Set some physics on the sprite
        player.body.bounce.y = 0;
        player.body.gravity.y = 1500;
        player.body.collideWorldBounds = true;
        player.anchor.setTo(0.5, 0.5);

        player.body.maxSpeed = 450;
        maxSpeedY = 920;
        player.body.acceleration = 40;
        player.body.aerialAcceleration = 4 / 7;
        player.body.friction = 40;
        player.body.rocketJump = true;
        // player.body.friction = 0.5;

        var xCryPositions = [350, 585, 875, 875, 1100];//, 325, 350, 375];
        var yCryPositions = [400, 300, 425, 75, 125];//, 300, 225, 200];
        
        //HUD
        HUDTime = this.add.image(20, 20, 'timeInd');
        HUDTime.fixedToCamera = true;
        HUDTreasure = this.add.image(20, 60, 'treasInd');
        HUDTreasure.fixedToCamera = true;
        HUDFuel = this.add.sprite(120, 30, 'Fuel_Ind', 1);
        HUDFuel.fixedToCamera = true;
        



        // player.body.fixedRotation = true;
        // player.body.setMaterial(characterMaterial);
        crystals = this.game.add.group();
        crystals.enableBody = true;
        crystals.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < xCryPositions.length; i++) {
            var c = crystals.create(xCryPositions[i], yCryPositions[i], 'crystal');
            c.name = "crys" + i;
            c.body.velocity[1] = 0;
            c.body.immovable = true;
        }

        var xAirPositions = [350, 585];
        var yAirPositions = [225, 200];
        airPacks = this.game.add.group();
        airPacks.enableBody = true;
        airPacks.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < xAirPositions.length; i++) {
            var f = airPacks.create(xAirPositions[i], yAirPositions[i], 'air');
            f.name = "air" + i;
            f.body.velocity[1] = 0;
            f.body.immovable = true;
            f.body.gravity.y = 1750;
        }

        var fuelXPositions = [875];//, 900, 630];
        var fuelYPositions = [450];//750, 850];

        fuelPacks = this.game.add.group();
        fuelPacks.enableBody = true;
        fuelPacks.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < fuelXPositions.length; i++) {
            var e = fuelPacks.create(fuelXPositions[i], fuelYPositions[i], 'fuel');
            e.name = "fuel" + i;
            e.body.velocity[1] = 0;
            e.body.gravity.y = 1750;


            e.body.immovable = true;
        }
        //crystals = this.add.sprite(300, 300, 'crystal');
        //crystals.anchor.setTo(0.5, 0.5);
        //this.physics.arcade.enable(crystals);


        //crystals.body.onCollide = new Phaser.Signal();
        //crystals.body.onCollide.add(this.collect, this);

        emitter = this.game.add.emitter(0, 0, 50);
        emitter.gravity = 0;
        emitter.bounce.setTo(0.5, 0.5);

        emitter.makeParticles('rocketParticles');
        // emitter.bounce.setTo(0.5, 0.5);

        emitter.forEach(function (particle) {
            particle.body.allowGravity = false;
            particle.animations.add('smoke', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 28);
        }, this);

        cursors = this.input.keyboard.createCursorKeys();
        a = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        w = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        d = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        score = 0;

        treasure = this.add.text(40, 69, + score.toString(), { font: "20px VT323", fill: "#333", align: "left" });
        treasure.fixedToCamera = true;
        //treasure.cameraOffset.setTo(10, 550);

        rocketReady = false;
        rFuel = 0;
        doubleJump = false;

        crystalFx = this.add.audio('crystalFx');
        aircapsuleFx = this.add.audio('aircapsuleFx');
        doorFx = this.add.audio('doorFx');
        fuelpodFx = this.add.audio('fuelpodFx');
        jetpackFx = this.add.audio('jetpackFx');

        doorFxPlay = 0;

        music = this.add.audio('musicInGame');
        music.loopFull();
        music.volume = 0.5;
        alarm = this.add.audio('alarm');
        alarm.loopFull();
        alarm.volume = 0.35;

        // Create the timer
        timer = this.game.time.create();

        min = 0;
        sec = 10;

        // Set the length of the timer
        timerEvent = timer.add(Phaser.Timer.MINUTE * min + Phaser.Timer.SECOND * sec, this.endTimer, this);

        // Start the timer
        timer.start();

        
        prevX = player.body.x;
        prevY = player.body.y;
        // console.log(tilesprite.width);
        // console.log(tilesprite.height);
        // tilesprite.x = player.body.x - (tilesprite.width/2);
        // tilesprite.y = player.body.y - (tilesprite.height/2);

    },

    update: function () {

        this.game.physics.arcade.collide(player, layer);
        this.game.physics.arcade.collide(door, layer);
        this.game.physics.arcade.collide(crystals, layer);
        this.game.physics.arcade.collide(fuelPacks, layer);
        this.game.physics.arcade.collide(airPacks, layer);
        this.game.physics.arcade.collide(emitter, layer);


        star_tilesprite.tilePosition.x -=2;
        star_tilesprite.tilePosition.y -=0.5;

        if(player.body.x != prevX){
            tilesprite.tilePosition.x += (player.body.x - prevX)*-0.2;
        }

        
        if(player.body.y != prevY){
            tilesprite.tilePosition.y += (player.body.y - prevY)*-0.2;
        }


        //Rocket Jump
        if ((player.body.rocketJump || rocketReady) && !player.body.onFloor() && (cursors.up.isDown || cursors.right.isDown || cursors.down.isDown || cursors.left.isDown)) {
            
            boost = true;

            if (cursors.up.isDown && cursors.right.isDown) {
                radian = 3 / 4 * Math.PI;
                this.jumpDirection(player, radian);
                this.emitParticle(emitter, radian);
            } else if (cursors.up.isDown && cursors.left.isDown) {
                radian = 1 / 4 * Math.PI;
                this.jumpDirection(player, radian);
                this.emitParticle(emitter, radian);
            } else if (cursors.down.isDown && cursors.right.isDown) {
                radian = 5 / 4 * Math.PI;
                this.jumpDirection(player, radian);
                this.emitParticle(emitter, radian);
            } else if (cursors.down.isDown && cursors.left.isDown) {
                radian = 7 / 4 * Math.PI;
                this.jumpDirection(player, radian);
                this.emitParticle(emitter, radian);
            } else if (cursors.up.isDown) {
                radian = 1 / 2 * Math.PI;
                this.jumpDirection(player, radian);
                this.emitParticle(emitter, radian);
            } else if (cursors.right.isDown) {
                radian = .9 * Math.PI;
                this.jumpDirection(player, radian);
                this.emitParticle(emitter, radian);
            } else if (cursors.left.isDown) {
                radian = 0.1 * Math.PI;
                this.jumpDirection(player, radian);
                this.emitParticle(emitter, radian);
            } else if (cursors.down.isDown) {
                console.log(cursors);
                radian = 3 / 2 * Math.PI;
                this.jumpDirection(player, radian);
                this.emitParticle(emitter, radian);
            }
            
            if (rFuel == 1) {
                rFuel = 0;
            }
            else if ((rFuel == 0) && (rocketReady == true)) {
                rocketReady = false;
            }
            jetpackFx.play();
        }
        else if (!player.body.onFloor() && !(cursors.up.isDown || cursors.right.isDown || cursors.down.isDown || cursors.left.isDown)) {
            boost = false;
        }
        
        if(!rocketReady) {
            HUDFuel.frame = 1;
        }
        if (player.body.onFloor()) {
            player.body.rocketJump = true;
        }
        
        
        //Movement
        if (a.isDown && player.body.onFloor()) {
            
            facing = 'left';
            
            if (player.body.velocity.x > -player.body.maxSpeed) {
                player.body.velocity.x -= player.body.acceleration;
            } else {
                player.body.velocity.x = -player.body.maxSpeed
            }
        }
        else if (d.isDown && player.body.onFloor()) {
            
            facing = 'right';
            
            if (player.body.velocity.x < player.body.maxSpeed) {
                player.body.velocity.x += player.body.acceleration;
            } else {
                player.body.velocity.x = player.body.maxSpeed
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
        else if (a.isDown && !boost) {

            facing = 'left';
            
            if (player.body.velocity.x > -player.body.maxSpeed) {
                player.body.velocity.x -= player.body.acceleration * player.body.aerialAcceleration;
            } else {
                player.body.velocity.x = -player.body.maxSpeed
            }

        }
        else if (d.isDown && !boost) {
            /*Gives player opportunity to change directions, even in air*/
            
            facing = 'right';
            
            if (player.body.velocity.x < player.body.maxSpeed) {
                player.body.velocity.x += player.body.acceleration * player.body.aerialAcceleration;
            } else {
                player.body.velocity.x = player.body.maxSpeed
            }
        }
        
        if (Math.abs(player.body.velocity.y) > maxSpeedY) {
            if (player.body.velocity.y > 0) {
                player.body.velocity.y = maxSpeedY;
            } else if(player.body.velocity.y < 0) {
                player.body.velocity.y = -maxSpeedY;
            }
        }

        if (w.isDown && player.body.onFloor()) {
            player.body.velocity.y = -600;
        }
        
        if (player.body.onFloor()) {
            if (facing == 'left') {
                player.animations.play('left');
            }
            if (facing == 'right') {
                player.animations.play('right');
            }
        }
        
        if (!player.body.onFloor() || w.isDown) {
            if (player.body.velocity.y <= 0 && (facing == 'right') | (player.frame == 7)) {
                player.frame = 14;
            }
            if (player.body.velocity.y > 0 && (facing == 'right') | (player.frame == 14)) {
                player.frame = 9;
            }
            if (player.body.velocity.y <= 0 && (facing == 'left') | (player.frame == 6)) {
                player.frame = 15;
            }
            if (player.body.velocity.y > 0 && (facing == 'left') | (player.frame == 15)){
                player.frame = 4;
            }
        }
        if (player.body.onFloor() && player.frame == 9 && facing == 'idle') {
            player.frame = 7;
        }
        if (player.body.onFloor() && player.frame == 4 && facing == 'idle') {
            player.frame = 6;
        }
                

        // if (space.isDown) && this.time.now > jumpTimer && this.checkIfCanJump()) {
        //     player.body.moveUp(500);
        //     jumpTimer = this.time.now + 750;
        // }

        this.physics.arcade.overlap(player, crystals, this.collectCrystal, null, this);
        this.physics.arcade.overlap(player, airPacks, this.collectAir, null, this);
        this.physics.arcade.overlap(player, fuelPacks, this.collectFuel, null, this);
        this.physics.arcade.overlap(player, door, this.Win, null, this);
        //this.physics.arcade.collide(player, crystals, this.collect, null, this);
        //crystals.imovable = true;

        
        prevX = player.body.x;
        prevY = player.body.y;



    },
    jumpDirection: function (player, radian) {
        if(Math.round(Math.cos(radian) * 700) !== 0){
            player.body.velocity.x = -Math.cos(radian) * 700;
        }
        
        // player.body.velocity.x = -Math.cos(radian) * 700;
        
        player.body.velocity.y = -Math.sin(radian) * 700;
        player.body.rocketJump = false;
    },
    emitParticle: function (emitter, radian) {
        //particle effect
        emitter.x = player.x;
        emitter.y = player.y;
        var t = this;
        emitter.forEach(function (singleParticle) {
            if (!singleParticle.animations.isPlaying) {
                singleParticle.animations.play('smoke', 28, false, true);
            }
        });

        emitter.setXSpeed(Math.cos(radian) * 50 + (Math.random() - 0.5) * 200, Math.cos(radian) * 350 + (Math.random() - 0.5) * 600)
        emitter.setYSpeed(Math.sin(radian) * 150 + (Math.random() - 0.5) * 600, Math.sin(radian) * 250 + (Math.random() - 0.5) * 600)

        emitter.start(true, 0, null, 15);
        rocketReady = false;
    },
    collectCrystal: function (player, crystals) {
        console.log("Treasure!");
        score++
        crystalFx.play();
        console.log("Treasure! = " + score);
        treasure.setText(score);
        //remove sprite
        crystals.destroy();
    },
    collectAir: function (player, airPacks) {
        console.log("Air!");
        sec = (timerEvent.delay - timer.ms) / 1000 + 5;
        timer.stop();
        aircapsuleFx.play();
        console.log(sec);
        //timer.remove(timerEvent);
        timerEvent = timer.add(Phaser.Timer.MINUTE * min + Phaser.Timer.SECOND * sec, this.endTimer, this);
        timer.start();

        //remove sprite
        airPacks.destroy();
    },
    collectFuel: function (player, fuelPacks) {
        console.log("Fuel!");
        rocketReady = true;
        HUDFuel.frame = 0;
        rFuel = 1;
        fuelpodFx.play();
        //remove sprite
        fuelPacks.destroy();
    },
    render: function () {
        // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
        if (timer.running) {
            this.game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 42, 46, "#333");
        }
        else {
            this.game.debug.text("Done!", 2, 14, "#0f0");
            shutdown();
        }
    },
    endTimer: function () {
        this.gameOver();
        // Stop the timer when the delayed event triggers
        timer.stop();
    },
    formatTime: function (s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    },
    gameOver: function () {
    	alarm.stop();
        this.game.state.start('Loser');
    },
    //Nuetralizes all input from the player
    shutdown: function () {
        this.cursor = null;
        if (this.player) {
            this.player.destroy();
            this.player = null;
        }

    },
    Win: function () {

        if (doorFxPlay == 0) {
            doorFx.play();
            doorFxPlay++;
        }
        if (door.frame != 6) {
            door.animations.play('open');
        }
        if (door.frame = 6 && player.body.onFloor()) {
            player.destroy();
            alarm.stop();
            this.game.state.start('Winner');
        }
    }

};



