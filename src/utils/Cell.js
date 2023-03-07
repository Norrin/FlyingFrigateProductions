class Cell {
   top = true;
   right = true;
   bottom = true;
   left = true;
   visited = false;
   visible = true;
   start = false;
   end = false;
   xPos = 0;
   yPos = 0;
   fill = false;
   rgba = "";

   styles = {
      stroke: "black",
      fill: "lightgray",
   };

   neighbors = {
      top: undefined,
      right: undefined,
      bottom: undefined,
      left: undefined,
   };

   constructor(x, y, neighbors = undefined) {
      this.xPos = x;
      this.yPos = y;

      if (neighbors) this.neighbors = neighbors;
   }
}

export default Cell;
