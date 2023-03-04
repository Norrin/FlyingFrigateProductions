import React, { useRef } from "react";

const Grid = ({ Cell, Height, Width, Radius }) => {
   const container = useRef(null);
   const points = [];

   const gridClick = (evt) => {
      // Get the x and y coordinates of the click relative to the grid
      const x = evt.nativeEvent.offsetX;
      const y = evt.nativeEvent.offsetY;

      // Calculate the row and column of the clicked cell
      const row = Math.floor(y / 50);
      const col = Math.floor(x / 50);

      // Create a new point element and position it within the clicked cell
      const point = document.createElement("div");
      point.classList.add(`point`);
      point.style.left = `${col * 50 + 20}px`;
      point.style.top = `${row * 50 + 20}px`;
      // point.style.left = `${x}px`;
      // point.style.top = `${y}px`;

      container.current.appendChild(point);
   };

   return (
      <div
         ref={container}
         id='grid'
         onClick={(evt) => {
            gridClick(evt);
         }}
      ></div>
   );
};

export default Grid;
