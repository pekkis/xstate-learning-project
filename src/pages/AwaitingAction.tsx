import type { FC } from "react";
import { useMainMenuActorRef } from "../context/MainMenuMachineContext";

export const AwaitingAction: FC = () => {
  const { send } = useMainMenuActorRef();

  return (
    <div>
      <h1>TAKE ACTION</h1>
      <button
        onClick={() => {
          send({ type: "SELECT_ACTION" });
        }}
      >
        TAKE ACTION
      </button>
    </div>
  );
};
