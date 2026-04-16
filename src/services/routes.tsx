import type { SnapshotFrom } from "xstate";
import type { Route } from "../components/MachineRouter";
import type { mainMenuMachine } from "../machines/main-menu";
import { MainMenuPage } from "../pages/MainMenuPage";
import { LoadGamePage } from "../pages/LoadGamePage";
import { PlayerEditingPage } from "../pages/PlayerEditingPage";
import { GameInitializedPage } from "../pages/GameInitializedPage";
import { PlayerReviewingPage } from "../pages/PlayerReviewingPage";

type MainMenuSnapshot = SnapshotFrom<typeof mainMenuMachine>;

export const routes: Route<MainMenuSnapshot>[] = [
  { when: "main_menu", render: () => <MainMenuPage /> },
  { when: "load_game", render: () => <LoadGamePage /> },
  { when: { player_creation: "editing" }, render: () => <PlayerEditingPage /> },
  {
    when: { player_creation: "reviewing" },
    render: () => <PlayerReviewingPage />
  },
  { when: "game_initialized", render: () => <GameInitializedPage /> }
];
