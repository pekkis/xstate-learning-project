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
  | { type: "NEXT_TURN" }
  | { type: "RETRY" };

type MainMenuState = {
  name: string;
  turn: number;

  invalidParameter: boolean;
  resolveDelayMs: number;

  summary?: {
    moraleDelta: number;
    fatigueDelta: number;
  };
};

type MainMenuInput = {
  invalidParameter?: boolean;
  resolveDelayMs?: number;
};

export const mainMenuMachine = setup({
  actors: {
    resolveTurn: fromPromise(
      async ({
        input
      }: {
        input: { fail: boolean; resolveDelayMs: number };
      }) => {
        const { fail = false, resolveDelayMs } = input;

        const ret = await new Promise<MainMenuState["summary"]>((resolve) => {
          setTimeout(() => {
            resolve({ moraleDelta: -1, fatigueDelta: 1 });
          }, resolveDelayMs);
        });

        if (fail) {
          throw new Error("Failed resolution");
        }

        return ret;
      }
    )
  },
  guards: {
    hasName: ({ context }) => {
      return context.name.length > 0;
    }
  },
  types: {} as {
    context: MainMenuState;
    events: MainMenuEvent;
    input: MainMenuInput;
  }
}).createMachine({
  context: ({ input }) => {
    const { invalidParameter = false, resolveDelayMs = 300 } = input;

    return {
      name: "",
      turn: 0,
      invalidParameter: invalidParameter,
      resolveDelayMs: resolveDelayMs
    };
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
            input: ({ context }) => {
              return {
                fail: context.invalidParameter,
                resolveDelayMs: context.resolveDelayMs
              };
            },
            onDone: {
              actions: [
                assign({
                  summary: ({ event }) => event.output
                })
              ],
              target: "turn_summary"
            },
            onError: {
              target: "resolve_failed",
              actions: assign({
                invalidParameter: false
              })
            }
          }
        },

        resolve_failed: {
          on: {
            RETRY: {
              target: "resolving_turn"
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
