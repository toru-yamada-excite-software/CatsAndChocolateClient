import { GameSettings, SessionSettings } from "@/models/Models";
import { green, lightBlue, red } from "@mui/material/colors";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const gameSettingsAtom = atomWithStorage<GameSettings>("gamesettings", {
  itemsCount: 31,
  maxTurn: 3,
  minTurn: 3,
  evaluateWith: "max",
  thresholdAvarage: 75,
  thresholdMax: 80,
  thresholdTension: 0,
});

export const sessionSettingsAtom = atom<SessionSettings>({
  title: "",
  players: [
    {
      id: -1,
      name: "ChatGPT",
      color: green["A700"],
      items: [],
      wonEvents: [],
      isGPT: true,
      order: 0,
    },
    {
      id: 1,
      name: "Player 1",
      color: red["A700"],
      items: [],
      wonEvents: [],
      isGPT: false,
      order: 0,
    },
    {
      id: 2,
      name: "Player 2",
      color: lightBlue["A700"],
      items: [],
      wonEvents: [],
      isGPT: false,
      order: 0,
    },
  ],
  items: [],
  discardItems: [],
  events: [],
  phase: {
    phase: "start",
    turn: 0,
    order: 0,
  },
});
