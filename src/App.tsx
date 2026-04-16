import { type FC } from "react";

import { MachineRouter } from "./components/MachineRouter";
import { routes } from "./services/routes";
import { useMainMenuSnapshot } from "./context/MainMenuMachineContext";

export const App: FC = () => {
  const state = useMainMenuSnapshot();

  return <MachineRouter routes={routes} state={state} />;
};
