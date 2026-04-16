import type { FC } from "react";
import {
  useMainMenuActorRef,
  useMainMenuSelector
} from "../context/MainMenuMachineContext";

export const TurnSummary: FC = () => {
  const { send } = useMainMenuActorRef();

  const summary = useMainMenuSelector(({ context }) => context.summary!);

  return (
    <div>
      <h1>TURN SUMMARY</h1>

      <h2>Summarize</h2>
      <pre>{JSON.stringify(summary)}</pre>

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
