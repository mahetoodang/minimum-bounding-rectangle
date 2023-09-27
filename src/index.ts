import ConvexHull from 'hull.js';
import {
  matrix,
  transpose,
  multiply,
} from './mathUtil';

type Point = [number, number];

const findRotationsToTry = (hull: number[][]): [number, number][][] => {
  const edges = [];
  for (let i=0; i < hull.length-1; i++) {
    edges.push([
      hull[i+1][0] - hull[i][0],
      hull[i+1][1] - hull[i][1]
    ]);
  }
  const angles = [...new Set(
      edges.map(edge =>
          Math.abs(
              Math.atan2(edge[1], edge[0]) % (Math.PI / 2)
          )
      )
  )];
  const rotations = angles.map((angle): [number, number][] => {
    return [
      [ Math.cos(angle), Math.cos(angle - Math.PI/2) ],
      [ Math.cos(angle + Math.PI/2), Math.cos(angle) ]
    ]
  });

  return rotations;
}

const findMinBoundingRect = (points: Point[]) => {
  // Convex hull for the points
  const hullPoints = ConvexHull(points, Infinity) as number[][];
  // Find the rotations so that for each rotation a single edge is parallel to x-axis
  const rotations = findRotationsToTry(hullPoints);

  // Apply rotations to the hull
  const rotPoints = rotations.map(rotation => {
    const rotatedMatrix = matrix(rotation);
    const transposedHull = transpose(matrix(hullPoints));
    return multiply(
        rotatedMatrix,
        transposedHull
    ).toArray()
  });

  const minXY = rotPoints.map((pMat): Point => {
    const mat = pMat as number[][];
    const minX = Math.min(...mat[0]);
    const minY = Math.min(...mat[1]);
    return [minX, minY];
  });
  const maxXY = rotPoints.map((pMat): Point => {
    const mat = pMat as number[][];
    const minX = Math.max(...mat[0]);
    const minY = Math.max(...mat[1]);
    return [minX, minY];
  });
  const minX = minXY.map(m => m[0]);
  const minY = minXY.map(m => m[1]);
  const maxX = maxXY.map(m => m[0]);
  const maxY = maxXY.map(m => m[1]);

  // Find the box with the smallest area
  const areas = minX.map((_, i) =>
    (maxX[i] - minX[i]) * (maxY[i] - minY[i])
  );
  const bestIdx = areas.reduce(
    (iMax, x, i, arr) => x < arr[iMax] ? i : iMax,
    0
  );

  // Return the smallest box
  const [x1, y1] = [maxX[bestIdx], maxY[bestIdx]];
  const [x2, y2] = [minX[bestIdx], minY[bestIdx]];
  const r = rotations[bestIdx];

  const minRect = [
    multiply([x1, y2], r),
    multiply([x2, y2], r),
    multiply([x2, y1], r),
    multiply([x1, y1], r),
    multiply([x1, y2], r),
  ];

  return minRect;
}

export {
    findMinBoundingRect
}
