import { expect, it, describe } from "vitest";
import { mainMenuMachine } from "./main-menu";
import { createActor } from "xstate";

describe("Main Menu Machine", () => {
  it("transitions from main menu to player creation and back", () => {
    const actor = createActor(mainMenuMachine).start();

    expect(actor.getSnapshot().matches("main_menu")).toBe(true);

    actor.send({ type: "NEW_GAME" });

    expect(actor.getSnapshot().matches("player_creation")).toBe(true);

    actor.send({ type: "CANCEL" });

    expect(actor.getSnapshot().matches("main_menu")).toBe(true);
  });

  it("does not allow empty name", () => {
    const actor = createActor(mainMenuMachine, {}).start();

    expect(actor.getSnapshot().matches("main_menu")).toBe(true);

    actor.send({ type: "NEW_GAME" });

    expect(actor.getSnapshot().matches({ player_creation: "editing" })).toBe(
      true,
    );

    actor.send({ type: "CONTINUE" });

    expect(actor.getSnapshot().matches({ player_creation: "editing" })).toBe(
      true,
    );

    actor.send({ type: "UPDATE_NAME", payload: "Pier Paolo Pasolini" });

    expect(actor.getSnapshot().context.name).toBe("Pier Paolo Pasolini");

    expect(actor.getSnapshot().matches({ player_creation: "editing" })).toBe(
      true,
    );

    actor.send({ type: "CONTINUE" });

    expect(actor.getSnapshot().matches({ player_creation: "reviewing" })).toBe(
      true,
    );

    actor.send({ type: "BACK" });

    expect(actor.getSnapshot().matches({ player_creation: "editing" })).toBe(
      true,
    );

    actor.send({ type: "CONTINUE" });
  });

  it("transitions from main menu to load game and back", () => {
    const actor = createActor(mainMenuMachine).start();

    expect(actor.getSnapshot().matches("main_menu")).toBe(true);

    actor.send({ type: "LOAD_GAME" });

    expect(actor.getSnapshot().matches("load_game")).toBe(true);

    actor.send({ type: "BACK_TO_MENU" });

    expect(actor.getSnapshot().matches("main_menu")).toBe(true);
  });

  it("starts a new game", () => {
    const actor = createActor(mainMenuMachine).start();

    expect(actor.getSnapshot().matches("main_menu")).toBe(true);

    actor.send({ type: "NEW_GAME" });

    actor.send({ type: "UPDATE_NAME", payload: "Gaylord Louhiposki" });
    expect(actor.getSnapshot().matches("player_creation")).toBe(true);

    actor.send({ type: "CONTINUE" });

    expect(actor.getSnapshot().matches({ player_creation: "reviewing" })).toBe(
      true,
    );

    actor.send({ type: "CONFIRM" });

    expect(actor.getSnapshot().matches("game_initialized")).toBe(true);
  });
});
