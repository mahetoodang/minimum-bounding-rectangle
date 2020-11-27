const ConvexHull = require('hull.js');
const {
  matrix,
  transpose,
  multiply,
  min,
  max
} = require('mathjs');

const findMinBoundingRect = points => {
  // Convex hull for the points
  const hullPoints = ConvexHull(points, Infinity);

  const edges = [];
  for (let i=0; i < hullPoints.length-1; i++) {
    edges.push([
      hullPoints[i+1][0] - hullPoints[i][0],
      hullPoints[i+1][1] - hullPoints[i][1]
    ]);
  }
  const angles = [...new Set(
    edges.map(edge =>
      Math.abs(
        Math.atan2(edge[1], edge[0]) % (Math.PI / 2)
      )
    )
  )];
  const rotations = angles.map(angle => {
    return [
      [ Math.cos(angle), Math.cos(angle - Math.PI/2) ],
      [ Math.cos(angle + Math.PI/2), Math.cos(angle) ]
    ]
  });

  // Apply rotations to the hull
  const rotPoints = rotations.map(rotation =>
    multiply(
      matrix(rotation),
      transpose(matrix(hullPoints))
    ).toArray()
  );

  const minXY = rotPoints.map(pMat => {
    const minValues = min(pMat, 1);
    return [minValues[0], minValues[1]];
  });
  const maxXY = rotPoints.map(pMat => {
    const minValues = max(pMat, 1);
    return [minValues[0], minValues[1]];
  });
  const minX = minXY.map(m => m[0]);
  const minY = minXY.map(m => m[1]);
  const maxX = maxXY.map(m => m[0]);
  const maxY = maxXY.map(m => m[1]);

  // Find the box with the best area
  const areas = minX.map((_, i) =>
    (maxX[i] - minX[i]) * (maxY[i] - minY[i])
  );
  const bestIdx = areas.reduce(
    (iMax, x, i, arr) => x < arr[iMax] ? i : iMax,
    0
  );

  // Return the best box
  const x1 = maxX[bestIdx];
  const x2 = minX[bestIdx];
  const y1 = maxY[bestIdx];
  const y2 = minY[bestIdx];
  const r = rotations[bestIdx];
  const minRect = [];
  minRect.push(multiply([x1, y2], r));
  minRect.push(multiply([x2, y2], r));
  minRect.push(multiply([x2, y1], r));
  minRect.push(multiply([x1, y1], r));
  minRect.push(multiply([x1, y2], r));

  return minRect;
}

module.exports = findMinBoundingRect;