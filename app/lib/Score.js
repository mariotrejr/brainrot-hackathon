export default class Score {
  score = 0;
  HIGH_SCORE_KEY = "highScore";
  nextScoreThreshold = 100; // Next milestone to trigger the sound

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;

    // Load and preload score-reached sound
    this.scoreReachedSound = new Audio();
    this.scoreReachedSound.src = "/dinogame/sounds/score-reached.mp3";
    this.scoreReachedSound.preload = "auto";
    this.scoreReachedSound.volume = 0.5; // Adjust the volume
  }

  update(frameTimeDelta) {
    this.score += frameTimeDelta * 0.01;

    // Check if the score has reached the next threshold
    if (Math.floor(this.score) >= this.nextScoreThreshold) {
      this.playScoreReachedSound();
      this.nextScoreThreshold += 100; // Set the next threshold
    }
  }

  playScoreReachedSound() {
    try {
      this.scoreReachedSound.currentTime = 0; // Reset to the start
      this.scoreReachedSound.play();
    } catch (error) {
      console.error("Error playing score-reached sound:", error);
    }
  }

  reset() {
    this.score = 0;
    this.nextScoreThreshold = 100; // Reset threshold
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = "#525250";
    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}
