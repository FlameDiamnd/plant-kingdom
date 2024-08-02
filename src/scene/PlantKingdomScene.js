import Phaser from "phaser";
import ZombieRun from "../ui/ZombieRun";

export default class PlantKingdomScene extends Phaser.Scene {
  constructor() {
    super("plant-kingdom-scene");
  }
  Init() {
    this.player = undefined;
    this.speed = 50;
    this.chomper2 = undefined;
    this.zombie = undefined;
    this.speed = 70;
    this.platform = [];
    this.cursor = undefined;
  }
  preload() {
    this.load.image("forest", "images/background.png");
    this.load.image("platform", "images/platform.png");
    this.load.spritesheet("zombie", "images/zombierun.png", {
      frameWidth: 672 / 7,
      frameHeight: 96,
    });
    this.load.spritesheet("ghost", "images/ghost.png", {
      frameWidth: 224 / 7,
      frameHeight: 32,
    });
  }
  create() {
    this.add.image(580, 360, "forest").setScale(0.69);

    //platforms yang jumlahnya lebih dari 1
    this.platforms = this.physics.add.staticGroup(); //kelas static

    this.platforms.create(400, 720, "platform").setScale(4).refreshBody();

    this.player = this.physics.add.sprite(100, 500, "ghost").setScale(4);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platform);

    this.zombie = this.physics.add.sprite(1000, 400, "zombie").setScale(2);
    this.zombie.setCollideWorldBounds(true);
    this.physics.add.collider(this.zombie, this.platform);

    this.cursor = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "left", //--->nama animasi
      frames: this.anims.generateFrameNumbers("ghost", { start: 0, end: 2 }), //--->frame yang digunakan
      frameRate: 10, //--->kecepatan berpindah antar frame
      repeat: -1, //--->mengulangi animasi terus menerus
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "ghost", frame: 3 }],
      frameRate: 20,
    });
    //animation to the right
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("ghost", { start: 5, end: 6 }),
      frameRate: 10,
      repeat: -1,
    });
    // this.anims.create({
    //   key: "left", //--->nama animasi
    //   frames: this.anims.generateFrameNumbers("zombie", { start: 6, end: 0 }), //--->frame yang digunakan
    //   frameRate: 10, //--->kecepatan berpindah antar frame
    //   repeat: -1, //--->mengulangi animasi terus menerus
    // });
    this.enemies = this.physics.add.group({
      classType: ZombieRun,
      maxSize: 10, //-----> banyaknya enemy dalam satu grup
      runChildUpdate: true,
    });

    // TODO : memunculkan enemy dari kanan ke kiri
    this.time.addEvent({
      delay: Phaser.Math.Between(1000, 5000), //--------> Delay random  rentang 1-5 detik
      callback: this.spawnEnemy,
      callbackScope: this, //--------------------> Memanggil method bernama spawnEnemy
      loop: true,
    });
  }
  update() {
    if (this.cursor.left.isDown) {
      //Jika keyboard panah kiri ditekan
      this.player.setVelocity(-200, 200);
      //Kecepatan x : -200
      //Kecepatan y : 200
      //(bergerak ke kiri dan turun kebawah seolah terkena gaya gravitasi)
      this.player.anims.play("left", true);
    } else if (this.cursor.right.isDown) {
      this.player.setVelocity(200, 200);
      this.player.anims.play("right", true);
      //Memanggil nama animasi.True artinya animasi forever looping
    } else {
      this.player.setVelocity(0, 0);
      this.player.anims.play("turn");
    }
    if (this.cursor.up.isDown) {
      this.player.setVelocity(0, -200);
      this.player.anims.play("turn");
    }
  }
  spawnEnemy() {
    const config = {
      speed: 40, //-----------> Mengatur kecepatan dan besar rotasi dari enemy
    };
    // @ts-ignore
    const enemy = this.zombie.get(0, 0, "zombie", config);
    const positionY = Phaser.Math.Between(350, 50); //-----> Mengambil angka acak dari 50-350
    if (enemy) {
      enemy.spawn(positionY); //--------------> Memanggil method spawn dengan parameter nilai posisi sumbux
    }
  }
}
