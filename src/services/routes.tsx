import type { SnapshotFrom } from "xstate";
import type { Route } from "../components/MachineRouter";
import type { mainMenuMachine } from "../machines/main-menu";
import { MainMenuPage } from "../pages/MainMenuPage";
import { LoadGamePage } from "../pages/LoadGamePage";
import { PlayerEditingPage } from "../pages/PlayerEditingPage";
import { PlayerReviewingPage } from "../pages/PlayerReviewingPage";
import { AwaitingAction } from "../pages/AwaitingAction";
import { ResolvingTurn } from "../pages/ResolvingTurn";
import { TurnSummary } from "../pages/TurnSummary";

type MainMenuSnapshot = SnapshotFrom<typeof mainMenuMachine>;

export const routes: Route<MainMenuSnapshot>[] = [
  { when: "main_menu", render: () => <MainMenuPage /> },
  { when: "load_game", render: () => <LoadGamePage /> },
  { when: { player_creation: "editing" }, render: () => <PlayerEditingPage /> },
  {
    when: { player_creation: "reviewing" },
    render: () => <PlayerReviewingPage />,
  },
  { when: { game_ready: "awaiting_action" }, render: () => <AwaitingAction /> },
  { when: { game_ready: "resolving_turn" }, render: () => <ResolvingTurn /> },
  { when: { game_ready: "turn_summary" }, render: () => <TurnSummary /> },
];
