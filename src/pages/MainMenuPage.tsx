import type { FC } from "react";
import { useMainMenuActorRef } from "../context/MainMenuMachineContext";

export const MainMenuPage: FC = () => {
  const { send } = useMainMenuActorRef();

  return (
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
  );
};
