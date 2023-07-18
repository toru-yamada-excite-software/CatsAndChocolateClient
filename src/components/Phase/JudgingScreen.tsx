import { EvaluateSolutionResponse, evaluateSolution } from "@/apis/apis";
import { Player, nowPlayer } from "@/models/Models";
import { gameSettingsAtom, sessionSettingsAtom } from "@/states/states";
import { Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import GameMain from "./GameMain";
import PlayerController from "./GameScreen/PlayerController";
import SolutionInput from "./GameScreen/SolutionInput";

export default function JudgingScreen() {
  const [gameSetting] = useAtom(gameSettingsAtom);
  const [sessionSetting, setSessionSetting] = useAtom(sessionSettingsAtom);
  const [votedResult, setVotedResult] = useState(new Map<number, number>());
  const [gptEvaluate, setGPTEvaluate] = useState<EvaluateSolutionResponse>();

  const playerControllers = sessionSetting.players
    .sort((a, b) => a.order - b.order)
    .map((e) => (
      <PlayerController
        key={e.id}
        player={e}
        canControll={e.order != sessionSetting.phase.order}
        showVoteButton={e.order != sessionSetting.phase.order}
        onVote={onVote}
        evaluateSolution={evaluateFacade}
      />
    ));

  const player = nowPlayer(sessionSetting)!;

  const information = (
    <>
      <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: "#fff", textAlign: "center" }}>
        {player.name} の解決策はアリ? ナシ?
      </Typography>
      <Typography variant="h4" component="div" sx={{ fontWeight: 700, color: "#fff", textAlign: "center" }}>
        投票してください!
      </Typography>
    </>
  );

  async function evaluateFacade() {
    const resp = await evaluateSolution({
      title: sessionSetting.title,
      event: sessionSetting.nowEvent!.event.event,
      solution: sessionSetting.nowEvent?.solution ?? "",
    });
    setGPTEvaluate(resp.data);

    switch (gameSetting.evaluateWith) {
      case "tension":
        return resp.data.tension >= gameSetting.thresholdTension ? 1 : -1;
      case "avarage":
        return resp.data.appropriate_score + resp.data.humorous_score >= gameSetting.thresholdAvarage * 2 ? 1 : -1;
      case "max":
        return Math.max(resp.data.appropriate_score, resp.data.humorous_score) >= gameSetting.thresholdMax ? 1 : -1;
    }
  }

  function onVote(votedPlayer: Player, value: number) {
    const result = new Map(votedResult);
    result.set(votedPlayer.id, value);
    setVotedResult(result);
  }

  useEffect(() => {
    if (votedResult.size < sessionSetting.players.length - 1 || sessionSetting.phase.phase != "judging") return;
    setSessionSetting({
      ...sessionSetting,
      nowEvent: {
        ...sessionSetting.nowEvent!,
        votedResult: votedResult,
        gptEvaluate: gptEvaluate,
      },
      phase: {
        ...sessionSetting.phase,
        phase: "result",
      },
    });
  }, [votedResult]);

  return (
    <GameMain
      eventCardProps={{
        count: sessionSetting.events.length - 1,
        nowEvent: sessionSetting.nowEvent,
      }}
      information={information}
      playerControllers={playerControllers}
    >
      <SolutionInput
        player={player}
        nowEvent={sessionSetting.nowEvent!}
        sx={{ width: "calc(100% - 16px)", mx: "auto" }}
      />
    </GameMain>
  );
}
