import Cactus from "../Cactus.js";

export default class CactiController {
  CACTUS_INTERVAL_MIN = 500;
  CACTUS_INTERVAL_MAX = 2000;

  nextCactusInterval = null;
  cacti = [];

  constructor(ctx, cactiImages, scaleRatio, speed) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.cactiImages = cactiImages;
    this.scaleRatio = scaleRatio;
    this.speed = speed;

    this.hitSound = new Audio("/dinogame/sounds/hit.mp3"); // Load collision sound

    this.setNextCactusTime();
  }

  setNextCactusTime() {
    const num = this.getRandomNumber(
      this.CACTUS_INTERVAL_MIN,
      this.CACTUS_INTERVAL_MAX
    );
    this.nextCactusInterval = num;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  createCactus() {
    const index = this.getRandomNumber(0, this.cactiImages.length - 1);
    const cactusImage = this.cactiImages[index];
    const x = this.canvas.width * 1.5;
    const y = this.canvas.height - cactusImage.height;
    const cactus = new Cactus(
      this.ctx,
      x,
      y,
      cactusImage.width,
      cactusImage.height,
      cactusImage.image
    );

    this.cacti.push(cactus);
  }

  update(gameSpeed, frameTimeDelta) {
    if (this.nextCactusInterval <= 0) {
      this.createCactus();
      this.setNextCactusTime();
    }
    this.nextCactusInterval -= frameTimeDelta;

    this.cacti.forEach((cactus) => {
      cactus.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
    });

    // Remove off-screen cacti
    this.cacti = this.cacti.filter((cactus) => cactus.x > -cactus.width);
  }

  draw() {
    this.cacti.forEach((cactus) => cactus.draw());
  }

  collideWith(sprite) {
    // Iterate over cacti to detect collision with the sprite
    let collisionDetected = false;

    this.cacti.forEach((cactus) => {
      if (cactus.collideWith(sprite)) {
        if (!collisionDetected) {
          this.playHitSound(); // Play sound only on first collision in this frame
        }
        collisionDetected = true; // Mark that a collision happened
      }
    });

    return collisionDetected;
  }

  playHitSound() {
    try {
      this.hitSound.pause(); // Pause any ongoing playback
      this.hitSound.currentTime = 0; // Reset to the start
      this.hitSound.play(); // Play sound
    } catch (error) {
      console.error("Error playing hit sound:", error);
    }
  }

  reset() {
    this.cacti = [];
  }
}
