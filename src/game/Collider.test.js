import { expect, test } from "vitest";
import { Collider } from "./Collider";

test("constructor", () => {
  const collider = new Collider({ x: 0, y: 0, w: 32, h: 32 });
  expect(collider.x).toBe(0);
  expect(collider.y).toBe(0);
  expect(collider.w).toBe(32);
  expect(collider.h).toBe(32);
});

test("no collision", () => {
  const tile = new Collider({ x: 0, y: 0, w: 32, h: 32 });
  const player = new Collider({ x: 32, y: 32, w: 20, h: 20 });
  const response = player.collides(tile);
  expect(response.x).toBe(0);
  expect(response.y).toBe(0);
});

test("collision", () => {
  const tile = new Collider({ x: 0, y: 0, w: 32, h: 32 });
  const player = new Collider({ x: 10, y: 10, w: 20, h: 20 });
  const response = player.collides(tile);
  expect(response.x).toBe(22);
  expect(response.y).toBe(22);
});

test("collision with other collider", () => {
  const tile = new Collider({ x: 0, y: 0, w: 32, h: 32 });
  const player = new Collider({ x: -10, y: -10, w: 20, h: 20 });
  const response = player.collides(tile);
  expect(response.x).toBe(-10);
  expect(response.y).toBe(-10);
});
