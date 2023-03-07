import React, { useState, useEffect } from "react";
import { NormalMaze, ImageMaze } from "@components";
import { Heart } from "@assets";

const Maze = () => {
   const [mazeType, setMazetype] = useState("image");
   const [viewportWidth, setViewportWidth] = useState(0);
   const [viewportHeight, setViewportHeight] = useState(0);

   const handleMazeTypeChange = (evt) => setMazetype(evt.target.value);

   useEffect(() => {
      setViewportHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);

      const handleResizeEvent = (evt) => {
         setViewportWidth(window.innerWidth);
         setViewportHeight(window.innerHeight);
      };

      window.addEventListener("resize", handleResizeEvent);

      return () => {
         window.removeEventListener("resize", handleResizeEvent);
      };
   }, []);

   const handleGenerateClick = (evt) => {
      const cellSize = 20;
      let height = 10;
      let width = 50;

      width = Math.floor((viewportWidth - 100) / cellSize);
      height = Math.floor((viewportHeight - 250) / cellSize);

      const cEvent = new CustomEvent("generateMaze", {
         detail: {
            height: height,
            width: width,
            cellSize: cellSize,
            imagePath: `${Heart}`,
         },
      });

      document.dispatchEvent(cEvent);
   };

   return (
      <div className='px-4'>
         <div className='mb-4 h-8 flex flex-row gap-6 items-center'>
            <div className=''>
               <label htmlFor='selectMazeType' className='mr-3'>
                  Select Maze Type
               </label>
               <select
                  id='selectMazeType'
                  value={mazeType}
                  onChange={handleMazeTypeChange}
               >
                  <option value='normal'>Normal</option>
                  <option value='image'>Image</option>
               </select>
            </div>

            <button
               className='text-black font-bold py-2 px-4 rounded-md border border-black hover:border-zinc-500'
               onClick={handleGenerateClick}
            >
               Generate
            </button>
         </div>

         <div>{mazeType == "image" ? <ImageMaze /> : <NormalMaze />}</div>
      </div>
   );
};

export default Maze;
