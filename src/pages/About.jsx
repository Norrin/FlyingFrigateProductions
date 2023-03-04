import React from "react";
import { Page } from "@components";
import * as d3 from "d3";

/*
  How to find the slop of two points (x1,y1) and (x2, y2)
  slope = (y2-y1)/(x2-x1)

  take the slopes of three points to find clockwiseness

  or: (y3-y2)(x2-x1)-(y2-y3)(x3-x2)

  if first slope is smaller than second than its counter
  if first slope is greater than its clockwise
  if same then collinear

*/
const getOrientation = (p1, p2, p3) => {
   const { x: x1, y: y1 } = p1;
   const { x: x2, y: y2 } = p2;
   const { x: x3, y: y3 } = p3;

   const d = (y3 - y2) * (x2 - x1) - (y2 - y1) * (x3 - x2);

   if (d > 0) return 1;
   else if (d < 0) return -1;
   else return 0;
};

const getMinPoint = (points) => {
   let minX = Infinity;
   let minY = Infinity;
   let minPoint = null;

   for (let i = 0; i < points.length; i++) {
      const [x, y] = points[i];

      if (x < minX || (x === minX && y < minY)) {
         minX = x;
         minY = y;
         minPoint = points[i];
      }
   }

   return minPoint;
};

const getDistance = (point1, point2) => {
   const [x1, y1] = point1;
   const [x2, y2] = point2;

   const dx = x2 - x1;
   const dy = y2 - y1;

   const distance = Math.sqrt(dx * dx + dy * dy);

   return distance;
};

const checkForNextPoint = (on_hull, next_point, point) => {
   const orientation = getOrientation(on_hull, next_point, point);

   if (next_point == on_hull || orientation == 1) {
      return point;
   }

   if (
      orientation == 0 &&
      getDistance(on_hull, point) > getDistance(on_hull, next_point)
   )
      return point;

   return next_point;
};

const wrap = (points) => {
   const hull = [];
   let on_hull = getMinPoint(points);
   let next_point = null;
   let orientation = null;

   while (true) {
      hull.push(on_hull);
      next_point = points[0];

      for (point of points) {
         next_point = checkForNextPoint(on_hull, next_point, point);
      }

      on_hull = next_point;

      if (on_hull == hull[0]) break;
   }

   return hull;
};

const testGetOrientation = () => {
   //CW
   let p1 = { x: 2, y: 1 };
   let p2 = { x: 1, y: 2 };
   let p3 = { x: 1, y: 1 };
   const cw = getOrientation(p1, p2, p3);
   console.log(`CW:${cw}`); //output 1

   //Counter CW
   p1 = { x: 1, y: 1 };
   p2 = { x: 1, y: 2 };
   p3 = { x: 2, y: 1 };
   const ccw = getOrientation(p1, p2, p3);
   console.log(`CCW:${ccw}`); //output -1

   //Collinear
   p1 = { x: 1, y: 1 };
   p2 = { x: 2, y: 2 };
   p3 = { x: 3, y: 3 };
   const cl = getOrientation(p1, p2, p3);
   console.log(`CL:${cl}`); //output 0
};

const testGetMinPoint = () => {
   const points = [
      [2, 3],
      [1, 5],
      [4, 2],
      [3, 4],
   ];
   const minPoint = getMinPoint(points);

   console.log(minPoint); // Output: [1, 5]
};

const testDistance = () => {
   const point1 = [1, 2];
   const point2 = [4, 6];

   const distance = getDistance(point1, point2);

   console.log(distance); // Output: 5
};

const createMaze = () => {
   // Create a set of points within the shape
   var mazePts = d3.range(50).map(function () {
      return [Math.random() * width, Math.random() * height];
   });

   // Create the Delaunay triangulation of the points
   const delaunay = d3.Delaunay.from(mazePts);
   const { triangles } = delaunay;

   // Remove some of the triangles to create the maze
   var mazeTriangles = [];

   for (var i = 0; i < triangles.length; i += 3) {
      var triangle = triangles.slice(i, i + 3);
      var random = Math.random();

      // Remove the triangle based on some probability
      if (random > 0.5) {
         mazeTriangles = mazeTriangles.concat(triangle);
      }
   }

   // Render the maze
   //  var svg = d3
   //     .select("body")
   //     .append("svg")
   //     .attr("width", width)
   //     .attr("height", height);

   //  svg.selectAll("path")
   //     .data(mazeTriangles)
   //     .enter()
   //     .append("path")
   //     .attr("d", (point) => {
   //        const M = `M${delaunay.points[point[0]]}`;
   //        const L1 = `L${delaunay.points[point[1]]}`;
   //        const L2 = `L${delaunay.points[point[2]]}`;
   //        const pData = M + L1 + L2 + "Z";

   //        return pData;
   //     });
};

const About = () => {
   return (
      <Page>
         <div>About</div>
      </Page>
   );
};

export default About;
