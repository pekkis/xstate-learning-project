# AGENTS.md

This repository is an **XState learning playground**.

If you are an AI coding agent working here, optimize for teaching and clarity first, speed second.

## Mission

Help the user learn XState by building small, explainable examples in a React + TypeScript app.

## Learning target

The long-term product goal is a **turn-based hockey manager game**.

All learning tasks should move one baby step toward this target by modeling game flow with explicit states and events.

## Primary goals

1. Introduce one XState concept at a time.
2. Prefer tiny, working examples over large abstractions.
3. Keep code readable for a beginner/intermediate learner.
4. Explain trade-offs and "why", not only "what".
5. Verify behavior with lightweight tests when practical.

## Project context

- Stack: React + TypeScript + Vite
- Current scripts in `package.json`:
  - `pnpm dev`
  - `pnpm build`
  - `pnpm lint`
  - `pnpm format`
  - `pnpm preview`

## XState-first workflow

When implementing anything state-related:

1. Start with a **statechart sketch** (states, events, transitions).
2. Define explicit event types and context types.
3. Build the machine in small steps.
4. Connect machine to UI only after transitions are clear.
5. Add minimal assertions/tests for key transitions.
6. Summarize what was learned in plain language.

## Teaching style requirements

- Use consistent naming:
  - States: nouns/adjectives (`idle`, `loading`, `success`, `failure`)
  - Events: SCREAMING_SNAKE_CASE (`FETCH`, `RETRY`, `CANCEL`)
- Keep each example focused on one concept, such as:
  - finite states
  - guards
  - actions
  - invoked async services
  - parallel states
  - hierarchical states
- Avoid introducing multiple advanced concepts in one PR unless requested.
- When adding complexity, include a brief “Before vs After” explanation.

## Preferred structure for learning examples

- Small machine module near the feature/component.
- Clear event and context typing.
- UI should expose transitions (buttons/selectors) so behavior is observable.
- Include comments only where they teach an XState concept.

## Decision rules

- Prefer explicit transitions over implicit side effects.
- Prefer deterministic behavior over clever shortcuts.
- Prefer readability over DRY when learning value is higher.
- If two approaches are valid, pick the one easier to reason about from the statechart.

## Output expectations for agent responses

When you finish a change, include:

1. What XState concept was implemented.
2. Why this approach was chosen.
3. How to run and observe behavior.
4. Optional next exercise to deepen understanding.

## Guardrails

- Do not refactor unrelated files aggressively.
- Do not add heavy dependencies without clear learning value.
- Do not hide transitions in opaque helper layers.
- Ask for confirmation before major architectural changes.

## Suggested progression path (turn-based hockey manager)

1. **Main menu bootstrap (finite states + branching)**

- Machine: `main_menu` → `player_creation` | `load_game`
- Events: `NEW_GAME`, `LOAD_GAME`, `BACK_TO_MENU`
- Goal: practice explicit branching transitions from one hub state.

2. **Single turn loop (explicit turn lifecycle)**

- Machine: `awaiting_action` → `resolving_turn` → `turn_summary`
- Events: `SELECT_ACTION`, `RESOLVE`, `NEXT_TURN`
- Goal: model one deterministic game turn.

3. **Action validation with guards**

- Add guard checks (e.g., cannot train if `energy` too low).
- Events: `SELECT_ACTION`, `CANCEL_ACTION`
- Goal: learn guards and rejected transitions.

4. **Roster decision actions (context updates)**

- Add actions that update context (line changes, morale, fatigue).
- Events: `SET_LINEUP`, `BENCH_PLAYER`, `APPLY_DECISION`
- Goal: practice pure, predictable context updates.

5. **Match simulation request (async invoke)**

- Machine: `idle` → `simulating` → `success|failure`
- Events: `SIMULATE_MATCH`, `RETRY`
- Goal: learn invoked async services and failure handling.

6. **Game day flow (nested states)**

- Parent: `game_day`
- Children: `pregame`, `in_game`, `postgame`
- Goal: learn hierarchical states for game phases.

7. **Front office + game ops (parallel states)**

- Parallel regions: `management` + `match_engine`
- Goal: run independent concerns simultaneously.

8. **Weekly cycle orchestration**

- Flow: `planning` → `training` → `matchday` → `recovery`
- Goal: combine prior concepts into a reusable weekly loop.

9. **Season progression and checkpoints**

- Add explicit milestone states (trade window, playoffs, offseason).
- Goal: model long-running progression without hidden logic.

## Baby-step default (use this unless user asks otherwise)

Start with Step 1 only: build a tiny `main_menu` machine where:

- `NEW_GAME` moves to `player_creation`
- `LOAD_GAME` moves to `load_game`
- `BACK_TO_MENU` returns to `main_menu`

- Keep UI minimal.
- No async logic yet.
- Add one small test that asserts all three transitions.

## Definition of done for learning tasks

A task is complete when:

- The machine behavior can be explained with a simple statechart.
- The UI visibly demonstrates the key transitions.
- Types are clear and events are explicit.
- The user can run the example and understand the concept in under 5 minutes.
