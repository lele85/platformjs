import { expect, test, describe } from "vitest";
import { PlayerState } from "./PlayerState";

test("constructor", () => {
  const player = new PlayerState({ player_id: "1" });
  expect(player.isOnGround()).toBe(false);
});

test("onJumpStart", () => {
  const player = new PlayerState({ player_id: "1" });
  player.onJumpStart();
  expect(player.isOnGround()).toBe(false);
});

test("onJumpEnd", () => {
  const player = new PlayerState({ player_id: "1" });
  player.onJumpEnd();
  expect(player.isOnGround()).toBe(false);
});

describe("normal gravity", () => {
  const player = new PlayerState({ player_id: "1" });

  test("update with no collision response", () => {
    const collisionResponse = { x: 0, y: 0 };
    player.update(collisionResponse);
    expect(player.isOnGround()).toBe(false);
  });

  test("update with positive vertical collision response", () => {
    const collisionResponse = { x: 0, y: 10 };
    player.update(collisionResponse);
    expect(player.isOnGround()).toBe(false);
  });

  test("update with negative vertical collision response", () => {
    const collisionResponse = { x: 0, y: -10 };
    player.update(collisionResponse);
    expect(player.isOnGround()).toBe(true);
  });
});

describe("inverted gravity", () => {
  const player = new PlayerState({ player_id: "1" });
  player.onGravityInversion();

  test("update with no collision response", () => {
    const collisionResponse = { x: 0, y: 0 };
    player.update(collisionResponse);
    expect(player.isOnGround()).toBe(false);
  });

  test("update with positive vertical collision response", () => {
    const collisionResponse = { x: 0, y: 10 };
    player.update(collisionResponse);
    expect(player.isOnGround()).toBe(true);
  });

  test("update with negative vertical collision response", () => {
    const collisionResponse = { x: 0, y: -10 };
    player.update(collisionResponse);
    expect(player.isOnGround()).toBe(false);
  });
});
