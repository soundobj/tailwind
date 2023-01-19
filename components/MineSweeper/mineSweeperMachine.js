const mineSweeperMachine = {
  id: 'mineSweeper',
  initial: 'idle',
  states: {
    idle: {
      on: { START: { target: 'ResetingGame' } }
    },
    ResetingGame: {
      on: { DONE: { target: 'ResetingBoard' } }
    },
    ResetingBoard: {
      on: { DONE: { target: 'RunningSequence' } }
    },
    RunningSequence: {
      type: 'final'
    }
  }
}

export default mineSweeperMachine