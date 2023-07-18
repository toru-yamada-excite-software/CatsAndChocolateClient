import { findSolution } from "@/apis/apis";
import { NowEvent, nowPlayer } from "@/models/Models";
import { sessionSettingsAtom } from "@/states/states";
import { Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import GameMain from "./GameMain";
import PlayerController from "./GameScreen/PlayerController";
import SolutionInput from "./GameScreen/SolutionInput";

export default function SolvingScreen() {
  const [sessionSetting, setSessionSetting] = useAtom(sessionSettingsAtom);
  const player = nowPlayer(sessionSetting)!;
  const [nowEvent, setNowEvent] = useState<NowEvent>({
    event: sessionSetting.events[0],
    playerID: player.id,
    solveWith: Math.floor(Math.random() * 3) + 1,
  });
  const [setup, setSetup] = useState(false);

  const playerControllers = sessionSetting.players
    .sort((a, b) => a.order - b.order)
    .map((e) => <PlayerController key={e.id} player={e} canControll={e.order == sessionSetting.phase.order} />);

  const information = player?.isGPT ? (
    <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: "#fff", textAlign: "center" }}>
      ChatGPT回答中!
    </Typography>
  ) : (
    <>
      <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: "#fff", textAlign: "center" }}>
        問題発生!!
      </Typography>
      <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: "#fff", textAlign: "center" }}>
        アイテムカードを{nowEvent.solveWith}枚数使って、なんとかピンチを切り抜けましょう!
      </Typography>
    </>
  );

  useEffect(() => {
    if (setup) return;
    setSetup(true);
    if (player.isGPT) {
      findSolution({
        title: sessionSetting.title,
        event: nowEvent.event.event,
        items: player.items.map((e) => e.name),
        number_to_use: nowEvent.solveWith,
      }).then((resp) =>
        setNowEvent({
          ...nowEvent,
          useItems: resp.data.used_items.flatMap((e) => player.items.find((f) => f.name == e) ?? []),
          solution: resp.data.solution,
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (!nowEvent.solution || sessionSetting.phase.phase != "solving") return;
    setSessionSetting({
      ...sessionSetting,
      nowEvent: nowEvent,
      phase: {
        ...sessionSetting.phase,
        phase: "judging",
      },
    });
  }, [nowEvent]);

  return (
    <GameMain
      eventCardProps={{
        count: sessionSetting.events.length - 1,
        nowEvent: nowEvent,
      }}
      information={information}
      playerControllers={playerControllers}
    >
      <SolutionInput
        isInput
        player={player}
        nowEvent={nowEvent}
        onSolved={setNowEvent}
        sx={{ width: "calc(100% - 16px)", mx: "auto" }}
      />
    </GameMain>
  );
}
