import React from "react";

const ImageMaze = () => {
   return (
      <div className='flex flex-col gap-2 justify-center items-center pb-4'>
         <div>
            <h1>Image Maze</h1>
         </div>

         <div>
            <canvas id='myCanvas'></canvas>
         </div>
      </div>
   );
};

export default ImageMaze;
