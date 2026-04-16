import { type FC } from "react";

import { useActor } from "@xstate/react";
import {
  useMainMenuActorRef,
  useMainMenuSelector,
} from "./context/MainMenuMachineContext";
import { mainMenuMachine } from "./machines/main-menu";

export const App: FC = () => {
  const tussi = useMainMenuSelector((ctx) => ctx.matches("main_menu"));

  const loso = useMainMenuActorRef();

  return (
    <div>
      {state.matches("main_menu") && (
        <>
          <h1>MAIN MENU</h1>

          <button
            onClick={() => {
              send({ type: "NEW_GAME" });
            }}
          >
            new game
          </button>
          <button
            onClick={() => {
              send({ type: "LOAD_GAME" });
            }}
          >
            load game
          </button>
        </>
      )}
      {state.matches("load_game") && (
        <>
          <h1>SELECT GAME TO LOAD</h1>

          <button
            onClick={() => {
              send({ type: "BACK_TO_MENU" });
            }}
          >
            back
          </button>
        </>
      )}
      {state.matches("player_creation") && (
        <>
          <h1>NEW GAME</h1>

          {state.matches({ player_creation: "editing" }) && (
            <>
              <h2>Create player</h2>
              <input
                value={state.context.name || ""}
                type="text"
                onChange={(e) => {
                  send({
                    type: "UPDATE_NAME",
                    payload: e.currentTarget.value,
                  });
                }}
              />
              <button
                onClick={() => {
                  send({ type: "CANCEL" });
                }}
              >
                cancel
              </button>

              <button
                onClick={() => {
                  send({ type: "CONTINUE" });
                }}
              >
                continue
              </button>
            </>
          )}

          {state.matches({ player_creation: "reviewing" }) && (
            <>
              <h2>Confirm player</h2>

              <p>{state.context.name}</p>

              <button
                onClick={() => {
                  send({ type: "BACK" });
                }}
              >
                back
              </button>

              <button
                onClick={() => {
                  send({ type: "CONTINUE" });
                }}
              >
                continue
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};
