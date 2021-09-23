/*Please note although this the main branch of Kingdom's End it 
does not have many features due to the code not 100% working.
Once a feature has been confirmed to work repeatedly, it will be  added to this ongoing project.*/

const gameState = {
 
}

function preload() {
  this.load.image('bg','assets/share2.png');
  this.load.spritesheet('Main','assets/mainSheet.png', { frameWidth: 45, frameHeight: 87 });
  this.load.image('enemy', 'assets/zombie.png');
   
}
//Sprites
function create() {
  gameState.active = true;
  this.add.image(0,0,'bg').setOrigin(0,0);
  player = this.physics.add.sprite(100, 100, 'Main');
  enemy1 = this.physics.add.sprite(700,400, 'enemy')
  enemy2 = this.physics.add.sprite(500,200, 'enemy')
  enemy3 = this.physics.add.sprite(300,300, 'enemy')
  enemy4 = this.physics.add.sprite(350,400, 'enemy')

  player.setScale(1);

//this code is used for controls
  gameState.cursors = this.input.keyboard.createCursorKeys();
  gameState.cursors.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  gameState.cursors.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  gameState.cursors.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  gameState.cursors.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  gameState.cursors.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

//collisions (zombies merge for some reason)
  player.setCollideWorldBounds(true);
  enemy1.setCollideWorldBounds(true);
  enemy2.setCollideWorldBounds(true);
  enemy3.setCollideWorldBounds(true);
  enemy4.setCollideWorldBounds(true);

  this.physics.add.collider(player, enemy1, function(){
     if (gameState.cursors.keySpace.isDown){
       
     }
  });
  this.physics.add.collider(player, enemy2, function(){
    if (gameState.cursors.keySpace.isDown){
       
     }
  });
  this.physics.add.collider(player, enemy3, function(){
    if (gameState.cursors.keySpace.isDown){
       
     }
  });
  this.physics.add.collider(player, enemy4, function(){
    if (gameState.cursors.keySpace.isDown){
       
     }
  });

  this.physics.add.collider(enemy1, enemy2);
  this.physics.add.collider(enemy1, enemy3);
  this.physics.add.collider(enemy1, enemy4);

  this.physics.add.collider(enemy2, enemy1);
  this.physics.add.collider(enemy2, enemy3);
  this.physics.add.collider(enemy2, enemy4);

  this.physics.add.collider(enemy3, enemy1);
  this.physics.add.collider(enemy3, enemy2);
  this.physics.add.collider(enemy3, enemy4);

  this.physics.add.collider(enemy4, enemy1);
  this.physics.add.collider(enemy4, enemy2);
  this.physics.add.collider(enemy4, enemy3);

//animations
  this.anims.create({
  key: 'right',
  frames: this.anims.generateFrameNumbers('Main', { start: 6, end: 7}),
      frameRate: 3,
      repeat: -1
});

this.anims.create({
  key: 'left',
  frames: this.anims.generateFrameNumbers('Main', { start: 8, end: 9}),
      frameRate: 3,
      repeat: -1
});

this.anims.create({
  key:'idle',
  frames: this.anims.generateFrameNumbers('Main', { start:0, end: 1}),
      frameRate: 3,
      repeat: -1
});

this.anims.create({
  key:'up',
  frames: this.anims.generateFrameNumbers('Main', { start:2, end: 3}),
      frameRate: 3,
      repeat: -1
});

this.anims.create({
  key:'down',
  frames: this.anims.generateFrameNumbers('Main', { start:4, end: 5}),
      frameRate: 3,
      repeat: -1
});

//enemy spawning  
enemyGroup = this.physics.add.group();
  for (var i = 0; i < 16; i++)
    {
        var enemy = enemyGroup.create(360 + Math.random() * 999, 100 + Math.random() * 500, 'enemy');
        //enemyGroup.create(360 + Math.random() * 999, 100 + Math.random() * 500, 'enemy');
    }
  this.physics.add.collider(player, enemyGroup );
  this.physics.add.collider(enemyGroup, enemyGroup );

//Camera

/*NOTE startFollow makes the camera follow the player, the true makes the function work, and the 2 values sets the camera's origin.
*/

this.cameras.main.setSize(700, 500);
this.cameras.main.startFollow(player, true, 0.05, 0.05);
this.cameras.main.setZoom(1)

}


function update() {
//controls
 if (gameState.active){
 }
if (gameState.cursors.keyA.isDown) {
    player.setVelocityX(-150);
    player.anims.play('left',true);
  } else if (gameState.cursors.keyD.isDown) {
    player.setVelocityX(150);
    player.anims.play('right',true);
  } else {
    player.setVelocityX(0);
    player.anims.play('idle',true);
  }

if (gameState.cursors.keyW.isDown) {
    player.setVelocityY(-150);
    player.anims.play('up',true);
     
  } else if (gameState.cursors.keyS.isDown) {
    player.setVelocityY(150);
    player.anims.play('down',true);
  } else {
    player.setVelocityY(0);
    player.anims.play('idle',true);
  }

 //example of enemy tracking 
this.physics.moveToObject(enemy1, player, 100);
this.physics.moveToObject(enemy2, player, 100);
this.physics.moveToObject(enemy3, player, 100);
this.physics.moveToObject(enemy4, player, 100);

}


const config ={
  type: Phaser.AUTO,
  width: 1500,
  height: 1500,
  backgroundColor: '#f9f9f9',
  scene:
  {
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      enableBody: true,
      debug: true
    },
  }
};

const game = new Phaser.Game(config);