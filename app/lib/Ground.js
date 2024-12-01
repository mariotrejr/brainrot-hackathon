export default class Ground {
  constructor(ctx, width, height, speed, scaleRatio) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.scaleRatio = scaleRatio;

    this.x = 0;
    this.y = ctx.canvas.height - this.height;

    this.groundImage = new Image();
    this.groundImage.src = "/dinogame/images/ground.png"; // Updated path
    this.imageLoaded = false;

    this.groundImage.onload = () => {
      this.imageLoaded = true;
    };

    this.groundImage.onerror = () => {
      console.error(`Failed to load ground image from ${this.groundImage.src}`);
    };
  }

  draw() {
    if (this.imageLoaded) {
      this.ctx.drawImage(
        this.groundImage,
        this.x,
        this.y,
        this.width,
        this.height
      );
      this.ctx.drawImage(
        this.groundImage,
        this.x + this.width - this.speed,
        this.y,
        this.width,
        this.height
      );
    }
  }

  update(gameSpeed, frameTimeDelta) {
    this.x -= gameSpeed * this.speed * frameTimeDelta * 0.01;

    if (this.x <= -this.width) {
      this.x = 0;
    }
  }

  reset() {
    this.x = 0;
  }
}

