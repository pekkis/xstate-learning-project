import type { FC } from "react";
import {
  useMainMenuActorRef,
  useMainMenuSelector
} from "../context/MainMenuMachineContext";

export const PlayerEditingPage: FC = () => {
  const name = useMainMenuSelector(({ context }) => context.name);
  const { send } = useMainMenuActorRef();

  return (
    <>
      <h2>Create player</h2>
      <input
        value={name || ""}
        type="text"
        onChange={(e) => {
          send({
            type: "UPDATE_NAME",
            payload: e.currentTarget.value
          });
        }}
      />
      <button
        onClick={() => {
          send({ type: "CANCEL" });
        }}
      >
        cancel
      </button>

      <button
        onClick={() => {
          send({ type: "CONTINUE" });
        }}
      >
        continue
      </button>
    </>
  );
};
