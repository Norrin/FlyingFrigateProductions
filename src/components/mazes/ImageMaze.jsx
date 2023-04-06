import React, { useEffect } from "react";
import { ImageMazeGrid } from "@utils";

const ImageMaze = () => {
   let canvas = undefined;
   let ctx = undefined;
   let image = undefined;

   useEffect(() => {
      const handleGenerateEvent = (event) => {
         start(event.detail.imagePath, event.detail.cellSize ?? 20);
      };

      document.addEventListener("generateMaze", handleGenerateEvent);

      return () => {
         document.removeEventListener("generateMaze", handleGenerateEvent);
      };
   }, []);

   const start = async (imgPath, cellSize) => {
      const viewport = {
         height: window.innerHeight - 260,
         width: window.innerWidth - 100,
      };

      canvas = document.getElementById("myCanvas");
      ctx = canvas.getContext("2d");

      const imageGrid = new ImageMazeGrid(canvas, cellSize, viewport, imgPath);
      await imageGrid.Start();
      imageGrid.Render(ctx);

      // canvas.onclick = (evt) => {
      //    const gx = Math.floor(evt.offsetX / cellSize);
      //    const gy = Math.floor(evt.offsetY / cellSize);
      //    const cell = imageGrid.grid[gy][gx];
      //    console.log({
      //       Text: "Maze",
      //       Cell: cell,
      //    });
      // };

      return true;
   };

   return (
      <div className='flex flex-col gap-2 justify-center items-center pb-4'>
         <div>
            <h1>Image Maze</h1>
         </div>

         <div className='border border-zinc-500'>
            <canvas id='myCanvas'></canvas>
         </div>
      </div>
   );
};

export default ImageMaze;
