import type { ReactNode } from "react";

export type Route<TSnapshot extends { matches: (arg: any) => boolean }> = {
  when: Parameters<TSnapshot["matches"]>[0];
  render: (state: TSnapshot) => ReactNode;
};

export type MachineRouterProps<
  TSnapshot extends { matches: (arg: any) => boolean }
> = {
  state: TSnapshot;
  routes: Route<TSnapshot>[];
  fallback?: ReactNode;
};

export const MachineRouter = <
  TSnapshot extends { matches: (arg: any) => boolean }
>({
  state,
  routes,
  fallback = null
}: MachineRouterProps<TSnapshot>) => {
  const route = routes.find((r) => state.matches(r.when));
  return route ? route.render(state) : fallback;
};
