// Directions viable moves can take
const direction = [
  [-1, 2],
  [1, 2],
  [-1, -2],
  [1, -2],
  [-2, 1],
  [-2, -1],
  [2, 1],
  [2, -1],
];

const knightMoves = (startX, startY, targetX, targetY) => {
  // set target as x,y string for map key
  const target = `${targetX},${targetY}`;

  // add starting point to queue as 2D array
  let queue = [[startX, startY]];

  // set initial visited with value being previous point, initially null
  const visited = new Map().set(`${startX},${startY}`, null);

  // set number of steps taken to 0
  let steps = 0;

  while (queue.length) {
    if (visited.has(target)) {
      // Reconstruct path
      let point = [targetX, targetY];
      const path = [];
      while (point) {
        // path constructed backwards from target point until initial point is reached with null value
        path.push(point);
        // point.join to get string key of map
        point = visited.get(point.join(","));
      }
      return [path.reverse(), steps];
    }
    const next = [];
    for (const [currentX, currentY] of queue) {
      const viableMoves = direction
        .map(([dx, dy]) => [currentX + dx, currentY + dy]) // add current points next viable points in direction knight can take
        .filter(
          // filter out x y key pair that is legal on chess board and hasnt been visisted
          ([x, y]) =>
            x >= 0 &&
            y >= 0 &&
            !visited.has(`${x},${y}`) &&
            visited.set(`${x},${y}`, [currentX, currentY]) // set current next point with previous point being currentX, currentY
        );
      next.push(...viableMoves);
    }
    steps++;
    queue = next;
  }
};
const pathSteps = knightMoves(3, 3, 4, 3);
console.log(`You made it in ${pathSteps[1]} moves! Here's your path:`);
pathSteps[0].forEach((point) => console.log(point));
