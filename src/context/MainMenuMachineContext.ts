import { createActorContext } from "@xstate/react";
import { mainMenuMachine } from "../machines/main-menu";
import { createBrowserInspector } from "@statelyai/inspect";

const inspector = createBrowserInspector({
  autoStart: true,
});

export const MainMenuMachineContext = createActorContext(mainMenuMachine, {
  id: "mainMenu",
  inspect: inspector.inspect,
});

export const MainMenuMachineProvider = MainMenuMachineContext.Provider;

export const useMainMenuSelector = MainMenuMachineContext.useSelector;

export const useMainMenuActorRef = MainMenuMachineContext.useActorRef;

export const useMainMenuSnapshot = () => {
  return useMainMenuSelector((snap) => snap);
};
