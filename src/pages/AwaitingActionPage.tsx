import type { FC } from "react";
import {
  useMainMenuActorRef,
  useMainMenuSnapshot
} from "../context/MainMenuMachineContext";
import { MachineRouter } from "../components/MachineRouter";
import { simulationRoutes } from "./awaiting-action/simulationRoutes";

export const AwaitingActionPage: FC = () => {
  const { send } = useMainMenuActorRef();
  const snapshot = useMainMenuSnapshot();

  return (
    <div>
      <h1>TAKE ACTION</h1>

      <div>
        <MachineRouter routes={simulationRoutes} state={snapshot} />
      </div>

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
