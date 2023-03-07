import { Grid, Cell } from "@utils";

export default class ImageMazeGrid extends Grid {
   image = undefined;
   imagePath = "";
   viewport = undefined;

   constructor(canvas, cellSize, viewport, imagePath) {
      super(canvas, cellSize, viewport);

      this.viewport = viewport;
      this.imagePath = imagePath;
      this.image = new Image();
   }

   async Start() {
      return new Promise((resolve, reject) => {
         this.image.src = this.imagePath;
         this.image.onload = () => {
            this.#ConstructImageGrid();
            resolve();
         };

         this.image.onerror = (error) => {
            reject(error);
         };
      });
   }

   #ConstructImageGrid() {
      const ctx = this.canvas.getContext("2d");

      //get Aspect Rations
      const imageAspectRatio = this.image.width / this.image.height;
      const canvasAspectRatio = this.canvas.width / this.canvas.height;

      //Scale
      let scale = 1;
      if (imageAspectRatio > canvasAspectRatio) {
         scale = this.canvas.width / this.image.width;
      } else {
         scale = this.canvas.height / this.image.height;
      }

      const imgWidth = this.image.width * scale;
      const imgHeight = this.image.height * scale;
      const x = (this.canvas.width - imgWidth) / 2;
      const y = 0;

      ctx.drawImage(this.image, x, y, imgWidth, imgHeight);
      const imageData = ctx.getImageData(
         0,
         0,
         this.canvas.width,
         this.canvas.height
      );
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // ctx.fillStyle = "lightgrey";
      // ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.grid = this.#ProcessImageData(imageData.data);
      this.#GetAllNeighbors();
      this.#GenerateMaze();
   }

   #ProcessImageData(data) {
      let yIndex = 0;
      let xIndex = 0;
      const mappings = [];
      const ctx = this.canvas.getContext("2d");

      for (let y = 0; y < this.canvas.height; y += this.cellSize) {
         mappings[yIndex] = [];

         for (let x = 0; x < this.canvas.width; x += this.cellSize) {
            const i = (y * this.canvas.width + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            const shouldFill = a > 0;

            const neighbors = {
               top: undefined,
               right: undefined,
               bottom: undefined,
               left: undefined,
            };

            const cell = new Cell(yIndex, xIndex, neighbors);
            cell.visible = shouldFill;
            cell.visited = !shouldFill;
            cell.rgba = `${r}:${g}:${b}:${a}`;

            mappings[yIndex][xIndex] = cell;

            if (shouldFill && false) {
               ctx.fillStyle = "white";
               ctx.strokeStyle = "black";
               ctx.fillRect(x, y, this.cellSize, this.cellSize);
               ctx.strokeRect(x, y, this.cellSize, this.cellSize);
            }

            xIndex += 1;
         }

         yIndex += 1;
         xIndex = 0;
      }

      return mappings;
   }

   #GenerateMaze() {
      // Initialize the maze as a grid of cells
      // Start visiting cells from the random starting cell
      const startingCell = this.GetStart();

      this.VisitCell(startingCell.x, startingCell.y);
   }

   GetStart() {
      // Choose a random starting cell
      let startX = Math.floor(Math.random() * this.width);
      let startY = Math.floor(Math.random() * this.height);
      let endX = Math.floor(Math.random() * this.width);

      //Start in the middle
      startY = Math.floor(this.height / 2);

      for (let x = 0; x < this.width; x++) {
         startX = x;

         //Get a starting place that is part of the actual maze
         let startCell = this.grid[startY][startX];

         if (startCell.visible) {
            return { y: startY, x: startX };
         }
      }

      return { y: startY, x: startX };
   }

   VisitCell(x, y) {
      const cell = this.grid[y][x];
      cell.xPos = x;
      cell.yPos = y;

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

      // if (cell.visited === false) {
      //    if (cell.yPos === 0 && cell.xPos === startX) cell.start = true;

      //    if (cell.yPos === height - 1 && cell.xPos === endX) cell.end = true;
      // }

      cell.visited = true;

      // Define an array of neighboring cells
      const neighbors = [];

      if (y > 0 && !this.grid[y - 1][x].visited)
         neighbors.push({ x: x, y: y - 1, direction: "top" });

      if (x < this.width - 1 && !this.grid[y][x + 1].visited)
         neighbors.push({ x: x + 1, y: y, direction: "right" });

      if (y < this.height - 1 && !this.grid[y + 1][x].visited)
         neighbors.push({ x: x, y: y + 1, direction: "bottom" });

      if (x > 0 && !this.grid[y][x - 1].visited)
         neighbors.push({ x: x - 1, y: y, direction: "left" });

      // Shuffle the array of neighboring cells
      neighbors.sort(() => Math.random() - 0.5);

      // Recursively visit each neighboring cell
      for (const neighbor of neighbors) {
         const nx = neighbor.x;
         const ny = neighbor.y;
         const direction = neighbor.direction;
         const neighborCell = this.grid[ny][nx];

         if (!neighborCell.visited) {
            const shouldClose = false;

            //Check to see if this is a fringe cell that needs closing
            cell[direction] = shouldClose;
            neighborCell[getOppositeDirection(direction)] = shouldClose;

            this.VisitCell(nx, ny);
         }
      }
   }

   #GetAllNeighbors() {
      for (let y = 0; y < this.height; y++) {
         for (let x = 0; x < this.height; x++) {
            const cell = this.grid[y][x];
            this.#GetNeighbors(cell);
         }
      }
   }

   #GetNeighbors(cell) {
      const neighbors = {
         top: undefined,
         right: undefined,
         bottom: undefined,
         left: undefined,
      };

      if (cell.yPos > 0) neighbors.top = this.grid[cell.yPos - 1][cell.xPos];

      if (cell.yPos < this.height - 1)
         neighbors.bottom = this.grid[cell.yPos + 1][cell.xPos];

      if (cell.xPos > 0) neighbors.left = this.grid[cell.yPos][cell.xPos - 1];

      if (cell.xPos < this.width - 1)
         neighbors.right = this.grid[cell.yPos][cell.xPos + 1];

      cell.neighbors = neighbors;
   }
}
