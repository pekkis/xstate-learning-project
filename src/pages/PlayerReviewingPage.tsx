import type { FC } from "react";
import {
  useMainMenuActorRef,
  useMainMenuSelector
} from "../context/MainMenuMachineContext";

export const PlayerReviewingPage: FC = () => {
  const name = useMainMenuSelector(({ context }) => context.name);
  const { send } = useMainMenuActorRef();

  return (
    <>
      <h2>Confirm player</h2>

      <p>{name}</p>

      <button
        onClick={() => {
          send({ type: "BACK" });
        }}
      >
        back
      </button>

      <button
        onClick={() => {
          send({ type: "CONFIRM" });
        }}
      >
        continue
      </button>
    </>
  );
};
