import { nowPlayer } from "@/models/Models";
import { sessionSettingsAtom } from "@/states/states";
import { Button, Typography } from "@mui/material";
import { useAtom } from "jotai";
import GameMain from "./GameMain";
import PlayerController from "./GameScreen/PlayerController";

export default function ReadyScreen() {
  const [sessionSetting, setSessionSetting] = useAtom(sessionSettingsAtom);

  const playerControllers = sessionSetting.players
    .sort((a, b) => a.order - b.order)
    .map((e) => <PlayerController key={e.id} player={e} canControll={e.order == sessionSetting.phase.order} />);

  const player = nowPlayer(sessionSetting);

  function startGame() {
    setSessionSetting({
      ...sessionSetting,
      phase: {
        ...sessionSetting.phase,
        phase: "solving",
      },
    });
  }

  return (
    <GameMain
      information={
        <>
          <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: "#fff", textAlign: "center" }}>
            次は {player?.name} の番です。
          </Typography>
          <Button variant="contained" size="large" sx={{ display: "block", mx: "auto" }} onClick={startGame}>
            準備OK!
          </Button>
        </>
      }
      playerControllers={playerControllers}
    ></GameMain>
  );
}
