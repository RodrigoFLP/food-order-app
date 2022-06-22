const isMarkerInsidePolygon = (marker: number[], polyPoints: number[][]) => {
  let x = marker[0];
  let y = marker[1];

  var inside = false;
  for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
    var xi = polyPoints[i][0],
      yi = polyPoints[i][1];
    var xj = polyPoints[j][0],
      yj = polyPoints[j][1];

    var intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};

export default isMarkerInsidePolygon;
