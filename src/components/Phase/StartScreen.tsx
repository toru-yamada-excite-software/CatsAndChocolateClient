import { generateEvents, generateItems } from "@/apis/apis";
import Indicator from "@/components/Indicator/Indicator";
import ValidTextField from "@/components/ValidTextField/ValidTextField";
import { Player, playerColors, replenishItems } from "@/models/Models";
import { gameSettingsAtom, sessionSettingsAtom } from "@/states/states";
import { shuffle } from "@/utils/utils";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Button, Dialog, Tooltip } from "@mui/material";
import { red } from "@mui/material/colors";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import PlayerItem from "./StartScreen/PlayerItem";
import SettingDialog from "./StartScreen/SettingDialog";
import Title from "./StartScreen/Title";

export default function StartScreen() {
  const [gameSetting] = useAtom(gameSettingsAtom);
  const [sessionSetting, setSessionSetting] = useAtom(sessionSettingsAtom);
  const [title, setTitle] = useState(sessionSetting.title);
  const [players, setPlayers] = useState(
    sessionSetting.players
      .map((e) => ({ ...e, items: [], solution: undefined, wonEvents: [] }))
      .sort((a, b) => a.id - b.id)
      .reduce((m, e) => m.set(e.id, e), new Map<number, Player>()),
  );
  const [playerID, setPlayerID] = useState(Math.max(...Array.from(players.keys())) + 1);
  const [validationError, setValidationError] = useState("");
  const [dialog, setDialog] = useState(true);
  const [indicator, setIndiecator] = useState(false);
  const [settingDialog, setSettingDialog] = useState(false);

  useEffect(() =>
    setValidationError(() => {
      if (!title) return "お題を入力してください。";
      if (players.size < 3) return "プレイヤーは3人以上必要です。";
      if (!Array.from(players.values()).every((e) => e.name)) return "プレイヤー全員の名前を入力してください。";
      return "";
    }),
  );

  function changePlayer(player: Player) {
    const newPlayers = new Map(players);
    newPlayers.set(player.id, player);
    setPlayers(newPlayers);
  }

  function deletePlayer(player: Player) {
    const newPlayers = new Map(players);
    newPlayers.delete(player.id);
    setPlayers(newPlayers);
  }

  function addNewPlayer() {
    const usedColor = new Set(Array.from(players.values()).map((e) => e.color));
    const unusedColor = playerColors.map((e) => e[1]).filter((e) => !usedColor.has(e));
    const newPlayer: Player = {
      id: playerID,
      name: `Player ${playerID}`,
      color: unusedColor.length ? unusedColor[0] : playerColors[0][1],
      items: [],
      wonEvents: [],
      isGPT: false,
      order: 0,
    };

    const newPlayers = new Map(players);
    newPlayers.set(playerID, newPlayer);
    setPlayers(newPlayers);
    setPlayerID(playerID + 1);
  }

  async function startNewGame() {
    if (validationError) return;

    setDialog(false);
    setIndiecator(true);

    const turn = Math.floor(Math.random() * (gameSetting.maxTurn - gameSetting.minTurn + 1)) + gameSetting.minTurn;
    const eventCardCount = players.size * turn;
    const itemCardCount = Math.max(gameSetting.itemsCount, players.size * 3 - 2);

    const [eventResp, itemResp] = await Promise.all([
      generateEvents({ title: title, count: eventCardCount }),
      generateItems({
        title: title,
        count: itemCardCount - gameSetting.nonRelatedItemsCount,
        nonrelated_count: gameSetting.nonRelatedItemsCount,
      }),
    ]);

    const events = shuffle(eventResp.data.events);
    const items = shuffle([
      ...itemResp.data.items,
      {
        id: -1,
        name: "猫",
      },
      {
        id: -2,
        name: "チョコレート",
      },
    ]);
    const order = shuffle([...Array(players.size)].map((_, i) => i));

    setSessionSetting(
      replenishItems({
        ...sessionSetting,
        title: title,
        players: Array.from(players.values())
          .sort((a, b) => a.id - b.id)
          .map((e, i) => ({
            ...e,
            order: order[i],
          })),
        items: items,
        discardItems: [],
        events: events,
        phase: {
          phase: "ready",
          turn: 1,
          order: 0,
        },
      }),
    );
  }

  return (
    <>
      <Indicator open={indicator} message="ただいまカード生成中…" />
      <Dialog open={dialog} slotProps={{ backdrop: { sx: { backgroundColor: "transparent" } } }}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ alignItems: "center" }}>
            <Title />
            <hr />
            <Box sx={{ display: "flex", fontSize: "20px", mb: 4 }}>
              <Box sx={{ flexGrow: 0, flexShrink: 0, fontWeight: "700" }}>お題：</Box>
              <ValidTextField
                required
                fullWidth
                variant="standard"
                value={title}
                inputProps={{ maxLength: 100 }}
                sx={{ mx: 2 }}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "grid", placeItems: "center", mb: 4 }}>
              <Box sx={{ width: "fit-content" }}>
                {Array.from(players.entries())
                  .sort((a, b) => a[0] - b[0])
                  .map((e) => (
                    <PlayerItem player={e[1]} key={e[0]} onChange={changePlayer} onDelete={deletePlayer} />
                  ))}
                <Button variant="text" startIcon={<AddIcon />} onClick={addNewPlayer}>
                  プレイヤーを追加
                </Button>
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{ display: "block", mx: "auto", fontSize: "20px", fontWeight: 700 }}
              disabled={!!validationError}
              onClick={startNewGame}
            >
              セッションを開始する
            </Button>
            <Box sx={{ mx: "auto", textAlign: "center", fontWeight: 700, color: red[500], height: "1em" }}>
              {validationError}
            </Box>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
              <Tooltip title="設定">
                <Button variant="outlined" onClick={() => setSettingDialog(true)}>
                  <SettingsIcon titleAccess="設定" />
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Dialog>
      <SettingDialog open={settingDialog} onClose={() => setSettingDialog(false)} />
    </>
  );
}
