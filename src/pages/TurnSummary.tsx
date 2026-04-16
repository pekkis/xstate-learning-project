import type { FC } from "react";
import { useMainMenuActorRef } from "../context/MainMenuMachineContext";

export const TurnSummary: FC = () => {
  const { send } = useMainMenuActorRef();

  return (
    <div>
      <h1>TURN SUMMARY</h1>
      <button
        onClick={() => {
          send({ type: "NEXT_TURN" });
        }}
      >
        NEXT TURN
      </button>
    </div>
  );
};
