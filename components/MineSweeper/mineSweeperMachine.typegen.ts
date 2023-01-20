
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.mineSweeper.RESET_GAME.RESET_BOARD:invocation[0]": { type: "done.invoke.mineSweeper.RESET_GAME.RESET_BOARD:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "resetBoard": "done.invoke.mineSweeper.RESET_GAME.RESET_BOARD:invocation[0]";
"runSequence": "done.invoke.mineSweeper.RESET_GAME.RUN_SEQUENCE:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "resetBoard" | "runSequence";
        };
        eventsCausingActions: {
          
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "resetBoard": "START";
"runSequence": "done.invoke.mineSweeper.RESET_GAME.RESET_BOARD:invocation[0]";
        };
        matchesStates: "IDLE" | "RESET_GAME" | "RESET_GAME.RESET_BOARD" | "RESET_GAME.RUN_SEQUENCE" | { "RESET_GAME"?: "RESET_BOARD" | "RUN_SEQUENCE"; };
        tags: never;
      }
  