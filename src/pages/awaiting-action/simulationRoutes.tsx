import type { SnapshotFrom } from "xstate";
import type { mainMenuMachine } from "../../machines/main-menu";
import type { Route } from "../../components/MachineRouter";
import { ManagementDecision } from "./ManagementDecision";

type MainMenuSnapshot = SnapshotFrom<typeof mainMenuMachine>;

export const simulationRoutes: Route<MainMenuSnapshot>[] = [
  {
    when: {
      game_day: {
        in_game: { management: "idle", simulation: "awaiting_action" }
      }
    },
    render: () => <ManagementDecision />
  }
];
