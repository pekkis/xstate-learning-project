import { assign, setup } from "xstate";

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
  | { type: "RESOLVE_ACTION" }
  | { type: "NEXT_TURN" };

export const mainMenuMachine = setup({
  guards: {
    hasName: ({ context }) => {
      if (!context.name) {
        return false;
      }

      return context.name.length > 0;
    },
  },
  types: {
    context: {} as {
      name: string | undefined;
    },
    events: {} as MainMenuEvent,
  },
}).createMachine({
  context: {
    name: undefined,
  },
  initial: "main_menu",
  states: {
    main_menu: {
      on: {
        LOAD_GAME: {
          target: "load_game",
        },
        NEW_GAME: {
          target: "player_creation.editing",
        },
      },
    },
    player_creation: {
      initial: "editing",
      on: {
        CANCEL: {
          actions: assign({
            name: () => undefined,
          }),

          target: "main_menu",
        },
        CONFIRM: {
          target: "game_ready",
        },
      },
      states: {
        editing: {
          on: {
            UPDATE_NAME: {
              actions: assign({
                name: ({ event }) => event.payload,
              }),
            },
            CONTINUE: {
              target: "reviewing",
              guard: "hasName",
            },
          },
        },
        reviewing: {
          on: {
            BACK: {
              target: "editing",
            },
          },
        },
      },
    },
    load_game: {
      on: {
        BACK_TO_MENU: {
          target: "main_menu",
        },
      },
    },
    game_ready: {
      initial: "awaiting_action",
      states: {
        awaiting_action: {
          on: {
            SELECT_ACTION: {
              target: "resolving_turn",
            },
          },
        },
        resolving_turn: {
          on: {
            RESOLVE_ACTION: {
              target: "turn_summary",
            },
          },
        },
        turn_summary: {
          on: {
            NEXT_TURN: {
              target: "awaiting_action",
            },
          },
        },
      },
    },
  },
});
