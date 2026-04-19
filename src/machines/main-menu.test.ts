import { expect, it, describe } from "vitest";
import { mainMenuMachine } from "./main-menu";
import { createActor, waitFor } from "xstate";

describe("Main Menu Machine", () => {
  it("transitions from main menu to player creation and back", () => {
    const actor = createActor(mainMenuMachine, {
      input: { invalidParameter: false }
    }).start();

    expect(actor.getSnapshot().matches("main_menu")).toBe(true);

    actor.send({ type: "NEW_GAME" });

    expect(actor.getSnapshot().matches("player_creation")).toBe(true);

    actor.send({ type: "CANCEL" });

    expect(actor.getSnapshot().matches("main_menu")).toBe(true);
  });

  it("does not allow empty name", () => {
    const actor = createActor(mainMenuMachine, {
      input: { invalidParameter: false }
    }).start();

    expect(actor.getSnapshot().matches("main_menu")).toBe(true);

    actor.send({ type: "NEW_GAME" });

    expect(actor.getSnapshot().matches({ player_creation: "editing" })).toBe(
      true
    );

    actor.send({ type: "CONTINUE" });

    expect(actor.getSnapshot().matches({ player_creation: "editing" })).toBe(
      true
    );

    actor.send({ type: "UPDATE_NAME", payload: "Pier Paolo Pasolini" });

    expect(actor.getSnapshot().context.name).toBe("Pier Paolo Pasolini");

    expect(actor.getSnapshot().matches({ player_creation: "editing" })).toBe(
      true
    );

    actor.send({ type: "CONTINUE" });

    expect(actor.getSnapshot().matches({ player_creation: "reviewing" })).toBe(
      true
    );

    actor.send({ type: "BACK" });

    expect(actor.getSnapshot().matches({ player_creation: "editing" })).toBe(
      true
    );

    actor.send({ type: "CONTINUE" });
  });

  it("transitions from main menu to load game and back", () => {
    const actor = createActor(mainMenuMachine, {
      input: { invalidParameter: false }
    }).start();

    expect(actor.getSnapshot().matches("main_menu")).toBe(true);

    actor.send({ type: "LOAD_GAME" });

    expect(actor.getSnapshot().matches("load_game")).toBe(true);

    actor.send({ type: "BACK_TO_MENU" });

    expect(actor.getSnapshot().matches("main_menu")).toBe(true);
  });

  it("starts a new game", () => {
    const actor = createActor(mainMenuMachine, {
      input: { invalidParameter: false }
    }).start();

    expect(actor.getSnapshot().matches("main_menu")).toBe(true);

    actor.send({ type: "NEW_GAME" });

    actor.send({ type: "UPDATE_NAME", payload: "Gaylord Louhiposki" });
    expect(actor.getSnapshot().matches("player_creation")).toBe(true);

    actor.send({ type: "CONTINUE" });

    expect(actor.getSnapshot().matches({ player_creation: "reviewing" })).toBe(
      true
    );

    actor.send({ type: "CONFIRM" });

    expect(actor.getSnapshot().matches({ game_day: "pre_game" })).toBe(true);
  });

  it("goes through a round", async () => {
    const actor = createActor(mainMenuMachine, {
      input: { invalidParameter: false, resolveDelayMs: 10 }
    }).start();

    expect(actor.getSnapshot().matches("main_menu")).toBe(true);

    actor.send({ type: "NEW_GAME" });

    actor.send({ type: "UPDATE_NAME", payload: "Gaylord Louhiposki" });
    expect(actor.getSnapshot().matches("player_creation")).toBe(true);

    actor.send({ type: "CONTINUE" });

    expect(actor.getSnapshot().matches({ player_creation: "reviewing" })).toBe(
      true
    );

    actor.send({ type: "CONFIRM" });

    expect(actor.getSnapshot().matches({ game_day: "pre_game" })).toBe(true);

    actor.send({ type: "START_GAME" });

    expect(
      actor.getSnapshot().matches({ game_day: { in_game: "awaiting_action" } })
    ).toBe(true);

    expect(actor.getSnapshot().context.turn).toBe(1);

    actor.send({ type: "SELECT_ACTION" });

    expect(
      actor.getSnapshot().matches({ game_day: { in_game: "resolving_turn" } })
    ).toBe(true);

    await waitFor(actor, (state) => {
      return state.matches({ game_day: { in_game: "turn_summary" } });
    });

    expect(actor.getSnapshot().context.summary).toEqual({
      fatigueDelta: 1,
      moraleDelta: -1
    });

    actor.send({ type: "NEXT_TURN" });

    expect(
      actor.getSnapshot().matches({ game_day: { in_game: "awaiting_action" } })
    ).toBe(true);

    expect(actor.getSnapshot().context.turn).toBe(2);
  });

  it("goes to retry when turn resolution fails", async () => {
    const actor = createActor(mainMenuMachine, {
      input: { invalidParameter: true, resolveDelayMs: 10 }
    }).start();

    expect(actor.getSnapshot().matches("main_menu")).toBe(true);

    actor.send({ type: "NEW_GAME" });

    actor.send({ type: "UPDATE_NAME", payload: "Gaylord Louhiposki" });
    expect(actor.getSnapshot().matches("player_creation")).toBe(true);

    actor.send({ type: "CONTINUE" });

    expect(actor.getSnapshot().matches({ player_creation: "reviewing" })).toBe(
      true
    );

    actor.send({ type: "CONFIRM" });

    expect(actor.getSnapshot().matches({ game_day: "pre_game" })).toBe(true);

    actor.send({ type: "START_GAME" });

    expect(
      actor.getSnapshot().matches({ game_day: { in_game: "awaiting_action" } })
    ).toBe(true);

    expect(actor.getSnapshot().context.turn).toBe(1);

    actor.send({ type: "SELECT_ACTION" });

    expect(
      actor.getSnapshot().matches({ game_day: { in_game: "resolving_turn" } })
    ).toBe(true);

    await waitFor(actor, (state) => {
      return state.matches({ game_day: { in_game: "resolve_failed" } });
    });

    actor.send({ type: "RETRY" });

    await waitFor(actor, (state) => {
      return state.matches({ game_day: { in_game: "turn_summary" } });
    });

    expect(actor.getSnapshot().context.summary).toEqual({
      fatigueDelta: 1,
      moraleDelta: -1
    });

    actor.send({ type: "NEXT_TURN" });

    expect(
      actor.getSnapshot().matches({ game_day: { in_game: "awaiting_action" } })
    ).toBe(true);

    expect(actor.getSnapshot().context.turn).toBe(2);
  });

  it("goes to end of game when rounds end", async () => {
    const actor = createActor(mainMenuMachine, {
      input: { invalidParameter: false, resolveDelayMs: 10, gameRounds: 1 }
    }).start();

    expect(actor.getSnapshot().matches("main_menu")).toBe(true);

    actor.send({ type: "NEW_GAME" });

    actor.send({ type: "UPDATE_NAME", payload: "Gaylord Louhiposki" });
    expect(actor.getSnapshot().matches("player_creation")).toBe(true);

    actor.send({ type: "CONTINUE" });

    expect(actor.getSnapshot().matches({ player_creation: "reviewing" })).toBe(
      true
    );

    actor.send({ type: "CONFIRM" });

    expect(actor.getSnapshot().matches({ game_day: "pre_game" })).toBe(true);

    actor.send({ type: "START_GAME" });

    expect(
      actor.getSnapshot().matches({ game_day: { in_game: "awaiting_action" } })
    ).toBe(true);

    expect(actor.getSnapshot().context.turn).toBe(1);

    actor.send({ type: "SELECT_ACTION" });

    expect(
      actor.getSnapshot().matches({ game_day: { in_game: "resolving_turn" } })
    ).toBe(true);

    await waitFor(actor, (state) => {
      return state.matches({ game_day: { in_game: "turn_summary" } });
    });

    expect(actor.getSnapshot().context.summary).toEqual({
      fatigueDelta: 1,
      moraleDelta: -1
    });

    actor.send({ type: "NEXT_TURN" });

    expect(actor.getSnapshot().matches({ game_day: "post_game" })).toBe(true);

    expect(actor.getSnapshot().context.turn).toBe(1);

    actor.send({ type: "CONTINUE" });

    expect(actor.getSnapshot().matches("main_menu")).toBe(true);
  });
});
