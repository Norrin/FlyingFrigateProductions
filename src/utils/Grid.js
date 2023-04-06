import { Cell } from "@utils";

class Grid {
   height = 0;
   width = 0;
   cellSize = 20;
   grid = undefined;
   canvas = undefined;
   canvasHeight = 0;
   canvasWidth = 0;

   constructor(canvas, cellSize, viewport) {
      //Make sure the canvas evenly divisible by the cell size
      canvas.height = viewport.height - (viewport.height % cellSize);
      canvas.width = viewport.width - (viewport.width % cellSize);

      this.height = canvas.height / cellSize;
      this.width = canvas.width / cellSize;

      this.canvas = canvas;
      this.canvasHeight = canvas.height;
      this.canvasWidth = canvas.width;

      this.cellSize = cellSize;

      this.grid = this.#GenerateEmptyGrid(this.height, this.width);

      this.canvas.onclick = (evt) => {
         console.log("Grid");
         // const gx = Math.floor(evt.offsetX / this.cellSize);
         // const gy = Math.floor(evt.offsetY / this.cellSize);
         // const cell = this.grid[gy][gx];
         // console.log({
         //    Cell: cell,
         // });
      };
   }

   #GenerateEmptyGrid(height, width) {
      // Create an empty maze with all walls intact
      this.grid = [];
      for (let y = 0; y < height; y++) {
         this.grid[y] = [];
         for (let x = 0; x < width; x++) {
            this.grid[y][x] = new Cell(x, y);
         }
      }

      return this.grid;
   }

   Render = (ctx) => {
      const startX = 0;
      const startY = 0;

      // Define the maze as a series of paths
      for (let y = 0; y < this.height; y++) {
         for (let x = 0; x < this.width; x++) {
            const cell = this.grid[y][x];

            if (!cell.visible) continue;

            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";

            if (cell.top && !cell.start) {
               if (cell.neighbors.top?.visible === false) {
                  //ctx.lineWidth = 2;
                  ctx.strokeStyle = "red";
               }

               ctx.beginPath();
               ctx.moveTo(
                  startX + x * this.cellSize,
                  startY + y * this.cellSize
               );
               ctx.lineTo(
                  startX + (x + 1) * this.cellSize,
                  startY + y * this.cellSize
               );
               ctx.stroke();
            }
            if (cell.right) {
               ctx.beginPath();
               ctx.moveTo(
                  startX + (x + 1) * this.cellSize,
                  startY + y * this.cellSize
               );
               ctx.lineTo(
                  startX + (x + 1) * this.cellSize,
                  startY + (y + 1) * this.cellSize
               );
               ctx.stroke();
            }
            if (cell.bottom && !cell.end) {
               ctx.beginPath();
               ctx.moveTo(
                  startX + x * this.cellSize,
                  startY + (y + 1) * this.cellSize
               );
               ctx.lineTo(
                  startX + (x + 1) * this.cellSize,
                  startY + (y + 1) * this.cellSize
               );
               ctx.stroke();
            }
            if (cell.left) {
               ctx.beginPath();
               ctx.moveTo(
                  startX + x * this.cellSize,
                  startY + y * this.cellSize
               );
               ctx.lineTo(
                  startX + x * this.cellSize,
                  startY + (y + 1) * this.cellSize
               );
               ctx.stroke();
            }
         }
      }
   };
}

export default Grid;
