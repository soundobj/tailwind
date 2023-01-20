import { createMachine, assign } from "xstate";

const mineSweeperMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QFsCWA7MBlA7mMADmAE4B0AcgKIDqA+gOICCAspQMQQD2mpGAbpwDWYUmky58RMlTpNWCfpwDGAQwAuqbgG0ADAF1dexKAKdYqDd2MgAHogBM9gIykAzAE4dANlcAWAKwBvva+vl4ANCAAnogAHC7+OklOOgDs7qk6Tl5OAL65kWLYeIQkpHKUtNQA8uRsAEqUWAAqjPXNhtam5pbo1nYI-vZepGnxvk5Owdn+sZExCPZJpKmJSTq+7l6pvjqB+YUYxZJlFbQtbc2UACINTa3tnUgg3Raafc8DIS4e3n6BgRCYXmiFczlIm3cUNiOlcsKh7gOICKElKZDOF3aNzYZxq5CeJjMbysnwcrh+nh8QUBoQi0Qcy1W6w2Wx2e18SJRJSk5RYlUxV1ulHI1wYfIJLyJvX6Dgmbkp-yCQLpCzC-lI9jWaVcmS8vlisS8nKOqJ5Z2qADVKPU7gKJa9paTBjDSO5-OTXK5YptHEMQQg1Rqtakdd59YbjeJuWVGlhKM0xaxSLH47QAELVNq3Lg8RTCUQm6NkFMJirJpqpjNZhToASqXqGe1S94yhDuXau70eHWxds9-1+WJB5JDDazHX+SPHNHluOlvnJgCq5HOlAAiovhQBhdg5kR5kRck7FivzpP1Zerjfbyg1uvqd6N-RdZsk0ADP30hCxfzuFZrKYgX8fwQ3yAoQHQTgIDgawjzRF8ehbJ0AFoVUQVDRmZLD1l8Vwp1NMoZETSgEOJD531lexXS8WJUi8JYmVWexXH9WJwViT1PW2HRaNSVI8nAuCzT5KpalIx0KIQL1XA1Pwe31HQoV-f0lhcTVmU2bZdn2QTC2PXlWHOB5BXEpDJOCf0AhkpZ1gNRIrLw3So3080rXqUy31sUEf1IWi1niew2KGYDLOCDVITdfw9T2dx7HwotSAASWuAAZEjngdMyvIDewB3bFZ1icHsPTCDknOnHkS2IjzyOyrx3BkrwouGKKYVceinBU9rwuhXw6MyXCBMOZyZyqssqqreprhq1sdhcJr6IWtqOoHZiVgi4Dot-TV4v0saFwvFc42vcgdxmp1JicIdAqcTUAhCOjPwWMEZJ2BFNu02LJzAoA */
createMachine({
  tsTypes: {} as import("./mineSweeperMachine.typegen").Typegen0,
  id: 'mineSweeper',
  initial: 'NEW_GAME',
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
      newGame: {
        data: void
      },
      gameOver: {
        data: void
      },
    },
    events: {} as {
      type: "END_GAME";
      data: {
        i: number;
        j: number;
      };
    } | {
      type: "RESTART";
    } | {
      type: "GAME_WON";
    },
  },
  context: {
  },
  states: {
    NEW_GAME: {
      id: 'NEW_GAME',
      invoke: {
        src: "newGame",
        onDone: [
          {
            target: 'GAME_STARTED',
          },
        ],
      },
    },
    GAME_WON: {
      on: {
        RESTART: 'RESET_GAME',
      }
    },
    GAME_STARTED: {
      on: {
        RESTART: 'RESET_GAME',
        GAME_WON: 'GAME_WON',
        END_GAME: {
          target: "GAME_OVER",
        },
      },
    },
    GAME_OVER: {
      invoke: {
        src: "gameOver",
      },
      on: {
        RESTART: 'RESET_GAME'
      },
    },
    IDLE: {
      id: 'IDLE',
    },
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
                target: '#NEW_GAME',
              }
            ],
          },
        },
      },
    },
  },
});

export default mineSweeperMachine