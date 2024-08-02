import Phaser from "phaser";

import PlantKingdomScene from "./scene/PlantKingdomScene";

const config = {
  type: Phaser.AUTO,
  parent: "app",
  width: 1210,
  height: 700,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 2000 },
    },
  },
  scene: [PlantKingdomScene],
};

export default new Phaser.Game(config);
