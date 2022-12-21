import { isValidMove } from "../MineSweeper/utils";

export const bottomCornerToTopCornerSequence = (board: any[][]) => {
  const sequence = [];
  for (let i = board.length - 1; i >= 0; i--) {
    for (let j = board[i].length - 1; j >= 0; j--) {
      sequence.push([i, j]);
    }
  }
  return sequence;
}


export const BottomToTop = (
  board: any[][],
  lastSequence: number[][],
  sequence: any[][] = [[]],
  visited: Map<string, boolean>
) => {

  if (visited.has('0,0')) {
    return
  }
  
  const nextSequence = []
  for (let i = 0; i < lastSequence.length; i++) {
    const pos = lastSequence[i];
    // do I have something on my left?
    const left = [pos[0], pos[1] - 1];
    if (isValidMove(board, left[0], left[1]) && !visited.get(left.toString())) {
      visited.set(left.toString(), true);
      nextSequence.push(left)
    }
    // do I have something above me?
    const top = [pos[0] - 1, pos[1]];
    if (isValidMove(board, top[0], top[1]) && !visited.get(top.toString())) {
      visited.set(top.toString(), true);
      nextSequence.push(top)
    }
  }
  sequence.push(nextSequence)
  BottomToTop(board, nextSequence, sequence, visited)
}


export const sequencer = (
  sequence: any[][],
  rate: number,
  callback: (sequenceItem: number[][]) => void) => {
  let i = 0;
  const interval = setInterval(() => {
    if (i < sequence.length) {
      callback(sequence[i]);
      i++;
    } else {
      clearInterval(interval);
    }
  }, rate);
}