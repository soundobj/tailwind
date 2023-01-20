import { createMachine, assign } from "xstate";

const mineSweeperMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QFsCWA7MBlA7mMADmAE4B0AcgKIDqA+gOICCAspQMQQD2mpGAbpwDWYUmky58RMlTpNWCfpwDGAQwAuqbgG0ADAF1dexKAKdYqDd2MgAHoh0AaEAE97AXzdOx2PIRKk5SlpqAHlyNgAlSiwAFUYImMNrU3NLdGs7BABWACYANlIdAHYADgBGABYyypyyvKySp1cEHJ0dUiKstraKgE48ooqdLIqPLwwfSX9A2lj4mMoAEUjouISkpBAUi010zcycgGYy0grDo7aS3pLS0oqmxGPD0l66vLyKioaKkoqcsZA3gkfjIMzmCSWbBmoXIGxMZh2Vn2iCOJ0OvR0eUOXxxOU+eQeLTaHS63T6AyGIwBQN8UgCLCC4IWy0o5EWDAZcK2CLSGRR2NOvSFvTxdV6WQ+hPe7Q+3zyJSylTKOSK1ImwLpMxCADVKBEVkyudteciEEUdCVCrkdP0yuUVUcpXVSGVDjocq0vhabr01eJaf4olhKDEOaxSEGQ7QAEIheLLLg8RTCUTqgNkSOhwIR6JR2PxhToASqNKGI083Z8hC9IYvX7ow6lGuNxouR4-Ug5Ulla1fEqNrJ+yYgnPBrMMiMAVXIs0oAEVJ6yAMLsRMiZMiGlTDO58fhiLT2cL5eUQvF9S7Mv6ZIVpGgTK5QkK3okto1T5ZLJFQ4eTwgdCcBAcDWFuII3qklamgAtK6zxVO85oDFkjZ5DohyElBNykKSb54g6eTVEOGr+DIYaUOBiJ7PeKJ-C88pFHkrSdMUuToW2CAlLUpD9ocvEDBaRSCWURHpvSrDBGEFEmtRCCHP2nbYi2Pw2uKvSEq0Jxdt0OjkoMwyjH+oGagysxrMyUmQTJmFZKcbyIZ0KFoYS8GkG6vRyfkVycXaInbmJQQ6nqFl3rYjwKtxzEWsqnG5J+zm0Xiwqfh8wwir5I6ZmRwVUaFCB5O5pD1IxRUlGhjFlOphwFIlQpnLUvFPOldKZdmmX5hEizZVWgwnEV+QSqVVW1IS5zPIMSUSpSIqDoZaZ+S1E4HjOwbHuQK5daa1R2p29ojLkFQMY+7GjR0fRCslU1dr+bhAA */
createMachine({
  tsTypes: {} as import("./mineSweeperMachine.typegen").Typegen0,
  id: 'mineSweeper',
  initial: 'NEW_GAME',
  schema: {
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
        END_GAME:  "GAME_OVER",
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