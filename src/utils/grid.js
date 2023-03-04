const Grid = (container) => {
   console.log(container);
   container?.addEventListener("click", (evt) => {
      // Get the x and y coordinates of the click relative to the grid
      const x = evt.offsetX;
      const y = evt.offsetY;

      // Calculate the row and column of the clicked cell
      const row = Math.floor(y / 50);
      const col = Math.floor(x / 50);

      // Create a new point element and position it within the clicked cell
      const point = document.createElement("div");
      point.classList.add("point");
      point.style.left = `${col * 50 + 20}px`;
      point.style.top = `${row * 50 + 20}px`;

      container.appendChild(point);
   });
};

export default Grid;
