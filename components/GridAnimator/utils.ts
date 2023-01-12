export const isValidMove = (board: any[][], coord: number[]): boolean => {
  const [x, y] = coord
  return (x >= 0 && x < board.length && y >= 0 && y < board[x].length)
}

export const bottomCornerToTopCornerSequence = (board: any[][]) => {
  const sequence = [];
  for (let i = board.length - 1; i >= 0; i--) {
    for (let j = board[i].length - 1; j >= 0; j--) {
      sequence.push([i, j]);
    }
  }
  return sequence;
}

export const bottomToTopSequence = (
  board: any[][],
  lastSequence: number[][] = [getLastIndex2D(board)],
  sequence: any[][] =  [[getLastIndex2D(board)]],
  visited: Map<string, boolean> = new Map<string, boolean>([[getLastIndex2D(board).toString(), true]])
): any[][] => {
  
  if (visited.has('0,0')) {
    return sequence
  }

  const nextSequence = []
  for (let i = 0; i < lastSequence.length; i++) {
    const pos = lastSequence[i];
    // do I have something on my left?
    const left = [pos[0], pos[1] - 1]
    if (isValidMove(board, left) && !visited.get(left.toString())) {
      visited.set(left.toString(), true)
      nextSequence.push(left)
    }
    // do I have something above me?
    const top = [pos[0] - 1, pos[1]]
    if (isValidMove(board, top) && !visited.get(top.toString())) {
      visited.set(top.toString(), true)
      nextSequence.push(top)
    }
  }
  sequence.push(nextSequence)
  return bottomToTopSequence(board, nextSequence, sequence, visited)
}

export const middleOfTwoDimensionalArray = (grid: any[][]) => {
  const row = Math.floor(grid.length / 2)
  const col = Math.floor(grid[0].length / 2)
  return [row, col];
}

export const outwardSpiralSequence = (
  grid: any[][],
  coordStart: number[] = middleOfTwoDimensionalArray(grid),
  sequence: any[] = [],
  visited: Set<string> = new Set(),
) => {
  sequence.push([...coordStart]);
  visited.add(coordStart.toString())

  let lap = 0;
  const lapIncrement = 2
  let pattern = [
    [-1, 0], // top
    [0, -2], // left   
    [2, 0], // bottom
    [0, 2], // right
  ]

  const addToSequence = (coord: number[]) => {
    if (isValidMove(grid, coord)) {
      sequence.push([...coord])
      visited.add(coord.toString())
    }
  }

  while (visited.size < grid.length * grid[0].length) {
    // at the beginning of each lap move once to the right
    coordStart[1] += 1
    addToSequence(coordStart)

    for (let j = 0; j < pattern.length; j++) {
      const currentPattern = pattern[j]
      const [x, y] = currentPattern
      // add lap increment to x and y
      if (lap > 0) {
        pattern[j][0] = x < 0 ? x + -lapIncrement : x !== 0 ? x + lapIncrement : x
        pattern[j][1] = y < 0 ? y + -lapIncrement : y  !== 0 ? y + lapIncrement : y
      }
      const [x2, y2] = pattern[j]

      if (x2 < 0) {
        for (let k = 0; k > x2; k--) {
          coordStart[0] += -1
          addToSequence(coordStart)
        }
      } else {
        for (let k = 0; k < x2; k++) {
          coordStart[0] += 1
          addToSequence(coordStart)
        }
      }

      if (y2 < 0) {
        for (let k = 0; k > y2; k--) {
          coordStart[1] += -1
          addToSequence(coordStart)
        }
      } else {
        for (let k = 0; k < y2; k++) {
          coordStart[1] += 1
          addToSequence(coordStart)
        }
      }
    }
    lap++
  }
  return sequence
}


export const sequencer = (
  sequence: any[],
  rate: number,
  callback: (sequenceItem: number[]) => void) => {
  let i = 0;
  const interval = setInterval(() => {
    if (i < sequence.length) {
      callback(sequence[i])
      i++;
    } else {
      clearInterval(interval)
    }
  }, rate);
}

export const filterCoordinates = (
  coordinates: [number, number][],
  objects: Record<string, any>[][],
  filterObject: { [key: string]: any }
): [number, number][] => {
  return coordinates.filter((coordinate) => {
    const [x, y] = coordinate;
    const object = objects[x][y];
    return Object.entries(filterObject).every(([key, value]) => object[key] === value);
  });
}

export const getLastIndex2D = (array: any[][]) => [array.length - 1, array[array.length - 1].length - 1];

