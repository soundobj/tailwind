import { createMachine, assign } from "xstate";

const mineSweeperMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QFsCWA7MBlA7mMADmAE4B0AcgKIDqA+gOICCAspQMQQD2mpGAbpwDWYUmky58RMlTpNWCfpwDGAQwAuqbgG0ADAF1dexKAKdYqDd2MgAHogBMATnukALPYCMADgDsAVgAaEABPRFcvP1JHAGZXH18vewA2dw9onwBfDKCxbDxCElI5SlosABVGACUyygARNkrKcqqyw2tTc0t0azsEex9XUmiPe0CQxD9XSNdY+Pjk1NcsnIw8yULi0orqurZKclqGFko2pBAOi01us97+weHRoNCEJJ0fKNmEhc8l7JBciQFMibADyADVKJUGk1tq19O0zJcrDcwo4dKQktEYv4vNF7E4dNEnogfISMbFhu4dPj+l5lv9VoCpKQAJK1AAy7EazWqpxMiK6PQc9i8GN8Y2e0WibkcsscSS8EXirje9IB+WZ3MoZSOrFIWp1ACEQVV6lweIphKJGRrCgbdZR9U1tbRjaaFOgBKouoY+ecBVchX0fEkon4BokdIrXo5JsSENE-C4YuEdH4vI4Q0lRmqbesyPbivqAKrkUqUACKxf2AGF2OaRJaROr806sC6i5VS+Wq7XKB6veorr74WcLoKUQg0tKY9FFbF+gMieMEF4PDK5QqlV4VZl6ehOBA4NYW0CEZ1A5OALTheNXyakHRP6lJnRJOY6Dx+XPiW3SGgOueSLXKAvQ6PGcQuDMcRfCknjpD+axAkUxxbC0dRAROoGIOBK5JH40opnMiRwR4vwrL+raghClSYZe2EILhzzxKK0HEd8ZGIUyhRspydHIgx7jxl4oZRlK-TOPMpIeFxf5th2xz8SBtgOI4GJOLEZEjHM+HLs89gqh8cTYl4T6TLismtoWxzyUaJqVLUSlBj47zZimWm0iGEqIHirGfPMpEIX8p6as6Oqdt27a9uQdZOZOUyDKMMx+CMhIePh3kJiKbj+SRqRBVkQA */
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
    GAME_STARTED: {
      on: {
        RESTART: 'RESET_GAME',
        END_GAME: {
          target: "GAME_OVER",
        },
      },
    },
    GAME_OVER: {
      invoke: {
        src: "gameOver",
        // onDone: [ 
          // {
          //   target: 'IDLE',
          // }
        // ],
      },
      on: {
        RESTART: 'RESET_GAME'
      },
    },
    IDLE: {
      on: {
        RESTART: 'RESET_GAME'
      },
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