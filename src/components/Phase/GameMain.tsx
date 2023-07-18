import { Box } from "@mui/material";
import { ReactNode } from "react";
import EventCardDeck, { EventCardDeckProps } from "./GameScreen/EventCardDeck";
import PlayerFrame from "./GameScreen/PlayerFrame";
import TitleBar from "./GameScreen/TitleBar";

export default function GameMain(props: {
  eventCardProps?: EventCardDeckProps;
  information?: ReactNode;
  children?: ReactNode;
  playerControllers: ReactNode[];
}) {
  return (
    <>
      <TitleBar />
      <Box sx={{ p: 2 }}>{<EventCardDeck {...props.eventCardProps} />}</Box>
      <Box sx={{ width: "100%", height: "100px", display: "grid", alignContent: "center" }}>{props.information}</Box>
      {props.children}
      <Box sx={{ height: "88px" }} />
      <PlayerFrame>{props.playerControllers}</PlayerFrame>
    </>
  );
}
