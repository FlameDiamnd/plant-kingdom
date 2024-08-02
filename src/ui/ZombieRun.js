import Phaser from 'phaser'
export default class ZombieRun extends 
Phaser.Physics.Arcade.Sprite{
constructor(scene, x, y, texture, config)
{
  super(scene, x, y, texture);
  this.setScale(2);
  this.speed = 200;

}
spawn(positionY){  
    this.setPosition(positionY, 10); //------> Nilai positionX akan diatur ketika method ini dipanggil

    this.setActive(true);
    
    this.setVisible(true);
   }                          

}