import type { SnapshotFrom } from "xstate";
import type { Route } from "../components/MachineRouter";
import type { mainMenuMachine } from "../machines/main-menu";

type MainMenuSnapshot = SnapshotFrom<typeof mainMenuMachine>;

const routes: Route<MainMenuSnapshot>[] = [
  { when: "main_menu", render: () => <MainMenuView /> },
  { when: "load_game", render: () => <LoadGameView /> },
  { when: { player_creation: "editing" }, render: () => <PlayerEditingView /> },
  {
    when: { player_creation: "reviewing" },
    render: () => <PlayerReviewingView />,
  },
];
