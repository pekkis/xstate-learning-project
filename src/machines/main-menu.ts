import { assign, fromPromise, setup } from "xstate";

type MainMenuEvent =
  | { type: "NEW_GAME" }
  | { type: "BACK_TO_MENU" }
  | { type: "LOAD_GAME" }
  | { type: "UPDATE_NAME"; payload: string }
  | { type: "CONTINUE" }
  | { type: "BACK" }
  | { type: "CANCEL" }
  | { type: "CONFIRM" }
  | { type: "SELECT_ACTION" }
  | { type: "NEXT_TURN" };

type MainMenuState = {
  name: string;
  turn: number;

  summary?: {
    moraleDelta: number;
    fatigueDelta: number;
  };
};

export const mainMenuMachine = setup({
  actors: {
    resolveTurn: fromPromise(async () => {
      const ret = await new Promise<MainMenuState["summary"]>((resolve) => {
        setTimeout(() => {
          resolve({ moraleDelta: -1, fatigueDelta: 1 });
        }, 300);
      });

      return ret;
    })
  },
  guards: {
    hasName: ({ context }) => {
      return context.name.length > 0;
    }
  },
  types: {
    context: {
      name: ""
    } as MainMenuState,
    events: {} as MainMenuEvent
  }
}).createMachine({
  context: {
    name: "",
    turn: 0
  },
  initial: "main_menu",
  states: {
    main_menu: {
      on: {
        LOAD_GAME: {
          target: "load_game"
        },
        NEW_GAME: {
          target: "player_creation.editing"
        }
      }
    },
    player_creation: {
      initial: "editing",
      on: {
        CANCEL: {
          actions: assign({
            name: () => ""
          }),

          target: "main_menu"
        },
        CONFIRM: {
          target: "game_ready"
        }
      },
      states: {
        editing: {
          on: {
            UPDATE_NAME: {
              actions: assign({
                name: ({ event }) => event.payload
              })
            },
            CONTINUE: {
              target: "reviewing",
              guard: "hasName"
            }
          }
        },
        reviewing: {
          on: {
            BACK: {
              target: "editing"
            }
          }
        }
      }
    },
    load_game: {
      on: {
        BACK_TO_MENU: {
          target: "main_menu"
        }
      }
    },
    game_ready: {
      initial: "ready",

      states: {
        ready: {
          entry: assign({
            turn: ({ context }) => context.turn + 1
          }),
          always: {
            target: "awaiting_action"
          }
        },

        awaiting_action: {
          on: {
            SELECT_ACTION: {
              target: "resolving_turn"
            }
          }
        },
        resolving_turn: {
          invoke: {
            src: "resolveTurn",
            onDone: {
              actions: [
                assign({
                  summary: ({ event }) => event.output
                })
              ],
              target: "turn_summary"
            },
            onError: {
              target: "awaiting_action"
            }
          }
        },
        turn_summary: {
          on: {
            NEXT_TURN: {
              target: "ready"
            }
          }
        }
      }
    }
  }
});
