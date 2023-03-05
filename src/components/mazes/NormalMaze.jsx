import React, { useEffect } from "react";

const NormalMaze = () => {
   let canvas = undefined;
   let ctx = undefined;

   useEffect(() => {
      const handleGenerateEvent = (event) => {
         maze(
            event.detail.height ?? 10,
            event.detail.width ?? 10,
            event.detail.cellSize ?? 20
         );
      };

      document.addEventListener("generateMaze", handleGenerateEvent);

      return () => {
         document.removeEventListener("generateMaze", handleGenerateEvent);
      };
   }, []);

   function generateEmptyMaze(height, width) {
      // Create an empty maze with all walls intact
      const maze = [];
      for (let y = 0; y < height; y++) {
         maze[y] = [];
         for (let x = 0; x < width; x++) {
            maze[y][x] = {
               top: true,
               right: true,
               bottom: true,
               left: true,
               visited: false,
               start: false,
               end: false,
               xPos: 0,
               yPos: 0,
            };
         }
      }

      return maze;
   }

   const generateMaze = (height, width) => {
      // Initialize the maze as a grid of cells
      const maze = generateEmptyMaze(height, width);
      let start = [];
      let end = [];

      // Choose a random starting cell
      const startX = Math.floor(Math.random() * width);
      const startY = Math.floor(Math.random() * height);
      const endX = Math.floor(Math.random() * width);

      // Recursively visit cells in the maze
      function visit(x, y) {
         const cell = maze[y][x];
         cell.xPos = x;
         cell.yPos = y;

         if (cell.visited === false) {
            if (cell.yPos === 0 && cell.xPos === startX) cell.start = true;

            if (cell.yPos === height - 1 && cell.xPos === endX) cell.end = true;
         }

         cell.visited = true;

         // Define an array of neighboring cells
         const neighbors = [];
         if (y > 0 && !maze[y - 1][x].visited)
            neighbors.push({ x: x, y: y - 1, direction: "top" });
         if (x < width - 1 && !maze[y][x + 1].visited)
            neighbors.push({ x: x + 1, y: y, direction: "right" });
         if (y < height - 1 && !maze[y + 1][x].visited)
            neighbors.push({ x: x, y: y + 1, direction: "bottom" });
         if (x > 0 && !maze[y][x - 1].visited)
            neighbors.push({ x: x - 1, y: y, direction: "left" });

         // Shuffle the array of neighboring cells
         neighbors.sort(() => Math.random() - 0.5);

         // Recursively visit each neighboring cell
         for (const neighbor of neighbors) {
            const nx = neighbor.x;
            const ny = neighbor.y;
            const direction = neighbor.direction;
            const neighborCell = maze[ny][nx];

            if (!neighborCell.visited) {
               cell[direction] = false;
               neighborCell[getOppositeDirection(direction)] = false;
               visit(nx, ny);
            }
         }
      }

      // Start visiting cells from the random starting cell
      visit(startX, startY);

      // Helper function to get the opposite direction of a given direction
      function getOppositeDirection(direction) {
         switch (direction) {
            case "top":
               return "bottom";
            case "right":
               return "left";
            case "bottom":
               return "top";
            case "left":
               return "right";
         }
      }

      // Return the generated maze
      return maze;
   };

   const renderMaze = (
      maze,
      mazeHeight,
      mazeWidth,
      cellHeight,
      cellWidth,
      startX,
      startY
   ) => {
      //Colors and Stuff
      ctx.strokeStyle = "black";

      // Define the maze as a series of paths
      for (let y = 0; y < mazeHeight; y++) {
         for (let x = 0; x < mazeWidth; x++) {
            if (maze[y][x].top && !maze[y][x].start) {
               ctx.beginPath();
               ctx.moveTo(startX + x * cellWidth, startY + y * cellHeight);
               ctx.lineTo(
                  startX + (x + 1) * cellWidth,
                  startY + y * cellHeight
               );
               ctx.stroke();
            }
            if (maze[y][x].right) {
               ctx.beginPath();
               ctx.moveTo(
                  startX + (x + 1) * cellWidth,
                  startY + y * cellHeight
               );
               ctx.lineTo(
                  startX + (x + 1) * cellWidth,
                  startY + (y + 1) * cellHeight
               );
               ctx.stroke();
            }
            if (maze[y][x].bottom && !maze[y][x].end) {
               ctx.beginPath();
               ctx.moveTo(
                  startX + x * cellWidth,
                  startY + (y + 1) * cellHeight
               );
               ctx.lineTo(
                  startX + (x + 1) * cellWidth,
                  startY + (y + 1) * cellHeight
               );
               ctx.stroke();
            }
            if (maze[y][x].left) {
               ctx.beginPath();
               ctx.moveTo(startX + x * cellWidth, startY + y * cellHeight);
               ctx.lineTo(
                  startX + x * cellWidth,
                  startY + (y + 1) * cellHeight
               );
               ctx.stroke();
            }
         }
      }
   };

   const maze = (height, width, cellSize) => {
      canvas = document.getElementById("myCanvas");
      ctx = canvas.getContext("2d");

      // Set the size of each cell in the maze
      const cellWidth = cellSize;
      const cellHeight = cellSize;

      // Set the starting position of the maze
      const startX = 0;
      const startY = 0;

      canvas.height = height * cellHeight;
      canvas.width = width * cellWidth;

      ctx.fillStyle = "#f1f1f1";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Generate the maze using the recursive backtracking algorithm
      const maze = generateMaze(height, width);

      // Define the maze as a series of paths
      renderMaze(maze, height, width, cellHeight, cellWidth, startX, startY);
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
