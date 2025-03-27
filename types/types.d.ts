type ActionKeyMap = {
  [key: string]: string;
};

type ActionState = {
  [key: string]: boolean;
};

type KeyboardEventSource = {
  addEventListener: (
    event: "keyup" | "keydown",
    cb: (event: KeyboardEvent) => void,
    useCapture: boolean
  ) => void;
  removeEventListener: (
    event: "keyup" | "keydown",
    cb: (event: KeyboardEvent) => void,
    useCapture: boolean
  ) => void;
};

type GravityObserver = {
  onGravityInversion: () => void;
};

type Bounds = {
  w: number;
  h: number;
};

type Vector = {
  x: number;
  y: number;
};

type EditorMode = "ADD" | "REMOVE";

type SpeedInfluencer = {
  applyTo: (speed: Vector) => void;
};
