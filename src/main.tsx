import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { MainMenuMachineProvider } from "./context/MainMenuMachineContext.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainMenuMachineProvider>
      <App />
    </MainMenuMachineProvider>
  </StrictMode>
);
