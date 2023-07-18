import { nextOrder, nextPlayer, nowPlayer, replenishItems } from "@/models/Models";
import { sessionSettingsAtom } from "@/states/states";
import { Button, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useState } from "react";
import GameMain from "./GameMain";
import GPTComment from "./GameScreen/GPTComment";
import PlayerController from "./GameScreen/PlayerController";

export default function ResultScreen() {
  const [sessionSetting, setSessionSetting] = useAtom(sessionSettingsAtom);
  const [score] = useState(Array.from(sessionSetting.nowEvent?.votedResult?.values() ?? []).reduce((r, e) => r + e));

  const player = nowPlayer(sessionSetting);
  const nextp = nextPlayer(sessionSetting);
  const gptPlayer = sessionSetting.players.find((e) => e.isGPT);

  const playerControllers = sessionSetting.players
    .sort((a, b) => a.order - b.order)
    .map((e) => (
      <PlayerController
        key={e.id}
        player={e}
        canControll={e.order != sessionSetting.phase.order}
        showVoteButton={e.order != sessionSetting.phase.order}
        votedValue={sessionSetting.nowEvent?.votedResult?.get(e.id)}
      />
    ));

  function nextGame() {
    setSessionSetting(
      replenishItems({
        ...sessionSetting,
        events: sessionSetting.events.slice(1, sessionSetting.events.length),
        players: sessionSetting.players.map((e) =>
          e.id == player?.id
            ? {
                ...e,
                items: e.items.filter((e) => !sessionSetting.nowEvent?.useItems?.find((f) => f.id == e.id)),
                wonEvents:
                  score < 0 || !sessionSetting.nowEvent ? e.wonEvents : [...e.wonEvents, sessionSetting.nowEvent],
              }
            : e,
        ),
        discardItems: [...sessionSetting.discardItems, ...(sessionSetting.nowEvent?.useItems ?? [])],
        nowEvent: undefined,
        phase: {
          phase: sessionSetting.events.length > 1 ? "solving" : "end",
          order: nextOrder(sessionSetting),
          turn: sessionSetting.phase.turn + (nextOrder(sessionSetting) < sessionSetting.phase.order ? 1 : 0),
        },
      }),
    );
  }

  const information = (
    <>
      <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: "#fff", textAlign: "center" }}>
        {score >= 0 ? `${player?.name} イベントカードGET!` : `${player?.name} イベントカード取得ならず…`}
      </Typography>
      <Typography variant="h4" component="span" sx={{ fontWeight: 700, color: "#fff", textAlign: "center" }}>
        {sessionSetting.events.length > 1 ? (
          <>
            次は {nextp?.name} の番です。
            <Button variant="contained" size="large" sx={{ display: "inline-block" }} onClick={nextGame}>
              準備OK!
            </Button>
          </>
        ) : (
          <Button variant="contained" size="large" sx={{ display: "block", mx: "auto" }} onClick={nextGame}>
            結果発表へ
          </Button>
        )}
      </Typography>
    </>
  );

  return (
    <GameMain
      eventCardProps={{
        count: sessionSetting.events.length - 1,
        nowEvent: sessionSetting.nowEvent,
      }}
      information={information}
      playerControllers={playerControllers}
    >
      {!player?.isGPT && <GPTComment player={gptPlayer} nowEvent={sessionSetting.nowEvent} sx={{ m: 1 }} />}
    </GameMain>
  );
}
