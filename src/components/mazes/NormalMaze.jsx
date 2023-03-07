import React, { useEffect } from "react";
import { MazeGrid } from "@utils";

const NormalMaze = () => {
   let canvas = undefined;
   let ctx = undefined;

   useEffect(() => {
      const handleGenerateEvent = (event) => {
         maze(event.detail.cellSize ?? 20);
      };

      document.addEventListener("generateMaze", handleGenerateEvent);

      return () => {
         document.removeEventListener("generateMaze", handleGenerateEvent);
      };
   }, []);

   const maze = (height, width, cellSize) => {
      const viewport = {
         height: window.innerHeight - 260,
         width: window.innerWidth - 100,
      };

      canvas = document.getElementById("myCanvas");
      ctx = canvas.getContext("2d");

      const grid = new MazeGrid(canvas, cellSize, viewport);
      grid.Render(ctx);
   };

   return (
      <div className='flex flex-col gap-2 justify-center items-center pb-4'>
         <div>
            <h1>Normal Maze</h1>
         </div>
         <div>
            <canvas id='myCanvas'></canvas>
         </div>
      </div>
   );
};

export default NormalMaze;
