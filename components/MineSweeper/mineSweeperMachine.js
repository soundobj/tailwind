// const mineSweeperMachine = {
//   id: 'mineSweeper',
//   initial: 'IDLE',
//   states: {
//     IDLE: {
//       on: { START: { target: 'RESETING_BOARD' } }
//     },
//     RESETING_BOARD: {
//       on: { BOARD_RESET: { target: 'RUNNING_SEQUENCE' } }
//     },
//     RUNNING_SEQUENCE: {
//       on: { SEQUENCE_FINISHED: { target: 'IDLE' } },
//     }
//   }
// }


const mineSweeperMachine = {
  id: 'mineSweeper',
  initial: 'IDLE',
  context: {
    isSquenceStarted: false,
    // isGameOver: false,
    // isGameWon: false,
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
          on: {
            BOARD_RESET: {
              target: 'RUN_SEQUENCE',
              actions: (context) => {
                setTimeout(() => {
                context.isSquenceStarted = true
                }, 10)
              }
            }
          },
        },
        RUN_SEQUENCE: {
          on: {
            SEQUENCE_FINISHED: {
              type: 'final',
              target: '#IDLE',
              actions: (context, event) => {
                context.isSquenceStarted = false
                context.isGameOver = false
                context.isGameWon = false
              }
            }
          }
        }
      },
    },
  },
};

export default mineSweeperMachine