import type { FC } from "react";
import { useMainMenuActorRef } from "../../context/MainMenuMachineContext";

export const ManagementDecision: FC = () => {
  const { send } = useMainMenuActorRef();
  return (
    <div>
      <button
        onClick={() => {
          send({ type: "MAKE_DECISION", payload: "A great decision!" });
        }}
      >
        make a decision
      </button>
    </div>
  );
};
