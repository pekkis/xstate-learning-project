import { createActorContext } from "@xstate/react";
import { mainMenuMachine } from "../machines/main-menu";

export const MainMenuMachineContext = createActorContext(mainMenuMachine, {
  id: "mainMenu",
});

export const MainMenuMachineProvider = MainMenuMachineContext.Provider;

export const useMainMenuSelector = MainMenuMachineContext.useSelector;

export const useMainMenuActorRef = MainMenuMachineContext.useActorRef;
