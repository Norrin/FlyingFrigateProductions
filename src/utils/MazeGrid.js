import { Grid } from "@utils";

export default class MazeGrid extends Grid {
   constructor(canvas, cellSize = 20, viewport, height, width) {
      super(canvas, cellSize, viewport);

      //Build the actual maze based on the Grids grid
      this.GenerateMaze(this.height, this.width);
   }

   GenerateMaze = (height, width) => {
      // Initialize the maze as a grid of cells
      const grid = this.grid;
      let start = [];
      let end = [];

      // Choose a random starting cell
      const startX = Math.floor(Math.random() * width);
      const startY = Math.floor(Math.random() * height);
      const endX = Math.floor(Math.random() * width);

      // Recursively visit cells in the maze
      function visit(x, y) {
         const cell = grid[y][x];
         cell.xPos = x;
         cell.yPos = y;

         if (cell.visited === false) {
            if (cell.yPos === 0 && cell.xPos === startX) cell.start = true;

            if (cell.yPos === height - 1 && cell.xPos === endX) cell.end = true;
         }

         cell.visited = true;

         // Define an array of neighboring cells
         const neighbors = [];
         if (y > 0 && !grid[y - 1][x].visited)
            neighbors.push({ x: x, y: y - 1, direction: "top" });
         if (x < width - 1 && !grid[y][x + 1].visited)
            neighbors.push({ x: x + 1, y: y, direction: "right" });
         if (y < height - 1 && !grid[y + 1][x].visited)
            neighbors.push({ x: x, y: y + 1, direction: "bottom" });
         if (x > 0 && !grid[y][x - 1].visited)
            neighbors.push({ x: x - 1, y: y, direction: "left" });

         // Shuffle the array of neighboring cells
         neighbors.sort(() => Math.random() - 0.5);

         // Recursively visit each neighboring cell
         for (const neighbor of neighbors) {
            const nx = neighbor.x;
            const ny = neighbor.y;
            const direction = neighbor.direction;
            const neighborCell = grid[ny][nx];

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
      return grid;
   };
}
