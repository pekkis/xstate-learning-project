import type { SnapshotFrom } from "xstate";
import type { Route } from "../components/MachineRouter";
import type { mainMenuMachine } from "../machines/main-menu";
import { MainMenuPage } from "../pages/MainMenuPage";
import { LoadGamePage } from "../pages/LoadGamePage";
import { PlayerEditingPage } from "../pages/PlayerEditingPage";
import { PlayerReviewingPage } from "../pages/PlayerReviewingPage";
import { AwaitingActionPage } from "../pages/AwaitingActionPage";
import { ResolvingTurnPage } from "../pages/ResolvingTurnPage";
import { TurnSummaryPage } from "../pages/TurnSummaryPage";
import { ResolveFailedPage } from "../pages/ResolveFailedPage";
import { PreGamePage } from "../pages/PreGamePage";
import { PostGamePage } from "../pages/PostGame";

type MainMenuSnapshot = SnapshotFrom<typeof mainMenuMachine>;

export const routes: Route<MainMenuSnapshot>[] = [
  { when: "main_menu", render: () => <MainMenuPage /> },
  { when: "load_game", render: () => <LoadGamePage /> },
  { when: { player_creation: "editing" }, render: () => <PlayerEditingPage /> },
  {
    when: { player_creation: "reviewing" },
    render: () => <PlayerReviewingPage />
  },
  {
    when: { game_day: "pre_game" },
    render: () => <PreGamePage />
  },
  {
    when: { game_day: "post_game" },
    render: () => <PostGamePage />
  },

  {
    when: { game_day: { in_game: "awaiting_action" } },
    render: () => <AwaitingActionPage />
  },
  {
    when: { game_day: { in_game: "resolving_turn" } },
    render: () => <ResolvingTurnPage />
  },
  {
    when: { game_day: { in_game: "resolve_failed" } },
    render: () => <ResolveFailedPage />
  },

  {
    when: { game_day: { in_game: "turn_summary" } },
    render: () => <TurnSummaryPage />
  }
];
