
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.mineSweeper.RESET_GAME.RESET_BOARD:invocation[0]": { type: "done.invoke.mineSweeper.RESET_GAME.RESET_BOARD:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.mineSweeper.RESET_GAME.RUN_SEQUENCE:invocation[0]": { type: "done.invoke.mineSweeper.RESET_GAME.RUN_SEQUENCE:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "gameOver": "done.invoke.mineSweeper.GAME_OVER:invocation[0]";
"newGame": "done.invoke.NEW_GAME:invocation[0]";
"resetBoard": "done.invoke.mineSweeper.RESET_GAME.RESET_BOARD:invocation[0]";
"runSequence": "done.invoke.mineSweeper.RESET_GAME.RUN_SEQUENCE:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "gameOver" | "newGame" | "resetBoard" | "runSequence";
        };
        eventsCausingActions: {
          
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "gameOver": "END_GAME";
"newGame": "done.invoke.mineSweeper.RESET_GAME.RUN_SEQUENCE:invocation[0]" | "xstate.init";
"resetBoard": "RESTART";
"runSequence": "done.invoke.mineSweeper.RESET_GAME.RESET_BOARD:invocation[0]";
        };
        matchesStates: "GAME_OVER" | "GAME_STARTED" | "GAME_WON" | "IDLE" | "NEW_GAME" | "RESET_GAME" | "RESET_GAME.RESET_BOARD" | "RESET_GAME.RUN_SEQUENCE" | { "RESET_GAME"?: "RESET_BOARD" | "RUN_SEQUENCE"; };
        tags: never;
      }
  