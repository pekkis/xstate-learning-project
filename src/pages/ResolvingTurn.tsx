import type { FC } from "react";
import { useMainMenuActorRef } from "../context/MainMenuMachineContext";

export const ResolvingTurn: FC = () => {
  const { send } = useMainMenuActorRef();

  return (
    <div>
      <h1>RESOLVE ACTION</h1>
      <button
        onClick={() => {
          send({ type: "RESOLVE_ACTION" });
        }}
      >
        RESOLVE ACTION
      </button>
    </div>
  );
};
