import React, { useEffect, useRef } from "react";
import initializeGame from "./index.js"; // Ensure this path is correct

const DinoGame = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      initializeGame(canvasRef.current); // Pass the canvas element to the game initializer
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="game"
      style={{
        width: "100%",
        height: "200px",
        border: "1px solid black", // Optional for debugging visibility
      }}
    />
  );
};

export default DinoGame;


