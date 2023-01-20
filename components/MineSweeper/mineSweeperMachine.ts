import { createMachine, assign } from "xstate";

const mineSweeperMachine = createMachine({
  tsTypes: {} as import("./mineSweeperMachine.typegen").Typegen0,
  id: 'mineSweeper',
  initial: 'IDLE',
  schema: {
    context: {} as {
    },
    services: {} as {
      runSequence: {
        data: void
      },
      resetBoard: {
        data: void
      },
    }
  },
  context: {
  },
  states: {
    IDLE: {
      on: {
        START: 'RESET_GAME'
      },
      id: 'IDLE',
    },
    // GAME_OVER: {
    //   on: {
    //     OVER: {
    //       actions: (context) => {
    //         context.isGameOver = true
    //       }
    //     },
    //   },
    // },
    RESET_GAME: {
      initial: 'RESET_BOARD',
      states: {
        RESET_BOARD: {
          invoke: {
            src: "resetBoard",
            onDone: [
              {
                target: 'RUN_SEQUENCE',
              }
            ],
          },
        },
        RUN_SEQUENCE: {
          invoke: {
            src: "runSequence",
            onDone: [
              {
                target: '#IDLE',
              }
            ],
          },
        },
      },
    },
  },
});

export default mineSweeperMachine