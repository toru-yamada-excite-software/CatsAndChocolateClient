"use client";

import EndScreen from "@/components/Phase/EndScreen";
import JudgingScreen from "@/components/Phase/JudgingScreen";
import ReadyScreen from "@/components/Phase/ReadyScreen";
import ResultScreen from "@/components/Phase/ResultScreen";
import SolvingScreen from "@/components/Phase/SolvingScreen";
import StartScreen from "@/components/Phase/StartScreen";
import { sessionSettingsAtom } from "@/states/states";
import { useAtom } from "jotai";

export default function Home() {
  const [sessionSetting] = useAtom(sessionSettingsAtom);

  const phase = () => {
    switch (sessionSetting.phase.phase) {
      case "start":
        return <StartScreen />;
      case "ready":
        return <ReadyScreen />;
      case "solving":
        return <SolvingScreen />;
      case "judging":
        return <JudgingScreen />;
      case "result":
        return <ResultScreen />;
      case "end":
        return <EndScreen />;
    }
  };

  return (
    <main
      style={{
        background: "center/cover url('img/wood-texture_00008.jpg')",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      {phase()}
    </main>
  );
}
