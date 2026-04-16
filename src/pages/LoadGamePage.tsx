import type { FC } from "react";
import { useMainMenuActorRef } from "../context/MainMenuMachineContext";

export const LoadGamePage: FC = () => {
  const { send } = useMainMenuActorRef();

  return (
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
  );
};
