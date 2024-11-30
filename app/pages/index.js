import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        import("../../lib/index.js");
      }, []);
      

  return (
    <div>
      <canvas id="game"></canvas>
    </div>
  );
}
