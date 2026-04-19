import type { FC } from "react";
import { useMainMenuActorRef } from "../context/MainMenuMachineContext";

export const PreGamePage: FC = () => {
  const { send } = useMainMenuActorRef();

  return (
    <div>
      <h1>Pre Game</h1>
      <button
        onClick={() => {
          send({ type: "START_GAME" });
        }}
      >
        Start Game
      </button>
    </div>
  );
};
