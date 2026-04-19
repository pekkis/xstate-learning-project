import type { FC } from "react";
import { useMainMenuActorRef } from "../context/MainMenuMachineContext";

export const PostGamePage: FC = () => {
  const { send } = useMainMenuActorRef();

  return (
    <div>
      <h1>Post Game</h1>

      <p>Some statistics here!</p>
      <button
        onClick={() => {
          send({ type: "CONTINUE" });
        }}
      >
        Back to main menu
      </button>
    </div>
  );
};
