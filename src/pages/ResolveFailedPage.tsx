import type { FC } from "react";
import { useMainMenuActorRef } from "../context/MainMenuMachineContext";

export const ResolveFailedPage: FC = () => {
  const { send } = useMainMenuActorRef();

  return (
    <div>
      <h1>TURN RESOLVATION FAILED!</h1>

      <h2>Summarize</h2>

      <button
        onClick={() => {
          send({ type: "RETRY" });
        }}
      >
        RETRY
      </button>
    </div>
  );
};
