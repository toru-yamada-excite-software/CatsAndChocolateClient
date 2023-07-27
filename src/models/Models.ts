import { EvaluateSolutionResponse } from "@/apis/apis";
import { shuffle, takenFromEnd } from "@/utils/utils";
import { brown, green, indigo, lightBlue, orange, purple, red, teal, yellow } from "@mui/material/colors";

export interface NowEvent {
  playerID: number;
  event: PinchEvent;
  solveWith: number;
  useItems?: Item[];
  solution?: string;
  votedResult?: Map<number, number>;
  gptEvaluate?: EvaluateSolutionResponse;
}

export interface Player {
  id: number;
  name: string;
  color: string;
  items: Item[];
  wonEvents: NowEvent[];
  isGPT: boolean;
  order: number;
}

export const playerColors = [
  ["赤", red["A700"]],
  ["青", lightBlue["A700"]],
  ["緑", green["A700"]],
  ["紫", purple["A700"]],
  ["黄", yellow["A700"]],
  ["翠", teal["A700"]],
  ["橙", orange["A700"]],
  ["茶", brown["A700"]],
  ["紺", indigo[900]],
];

export interface Item {
  id: number;
  name: string;
}

export interface PinchEvent {
  id: number;
  summary: string;
  event: string;
}

export interface Phase {
  phase: "start" | "ready" | "solving" | "judging" | "result" | "end";
  turn: number;
  order: number;
}

export interface SessionSettings {
  title: string;
  players: Player[];
  items: Item[];
  discardItems: Item[];
  events: PinchEvent[];
  nowEvent?: NowEvent;
  phase: Phase;
}

export function nowPlayer(settings: SessionSettings) {
  return settings.players.find((e) => e.order == settings.phase.order);
}

export function nextOrder(settings: SessionSettings) {
  const order = settings.phase.order + 1;
  return order < settings.players.length ? order : 0;
}

export function nextPlayer(settings: SessionSettings) {
  return settings.players.find((e) => e.order == nextOrder(settings));
}

export function replenishItems(settings: SessionSettings) {
  let items = [...settings.items];
  let discardItems = shuffle(settings.discardItems);

  const players = settings.players.map((e) => {
    if (e.items.length >= 3) return e;
    const taken = takenFromEnd(items, 3 - e.items.length);
    return taken.length == 3 - e.items.length
      ? { ...e, items: [...e.items, ...taken] }
      : { ...e, items: [...e.items, ...taken, ...takenFromEnd(discardItems, 3 - e.items.length - taken.length)] };
  });

  return {
    ...settings,
    players: players,
    items: items.length > 0 ? items : discardItems,
    discardItems: items.length > 0 ? discardItems : [],
  };
}

export interface GameSettings {
  itemsCount: number;
  nonRelatedItemsCount: number;
  minTurn: number;
  maxTurn: number;
  evaluateWith: "tension" | "avarage" | "max";
  thresholdTension: number;
  thresholdAvarage: number;
  thresholdMax: number;
}
