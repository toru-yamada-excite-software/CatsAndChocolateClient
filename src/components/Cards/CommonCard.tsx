"use client";

import { Box, Card, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

export default function CommonCard(props: { front: ReactNode; back: ReactNode; width: string; isBack?: boolean }) {
  const commonStyle: SxProps<Theme> = {
    borderRadius: 2,
    backfaceVisibility: "hidden",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    transition: "transform 0.6s",
    transformStyle: "preserve-3d",
    perspective: "1000px",
  };

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        width: props.width,
        aspectRatio: 0.7071,
        perspective: "1000px;",
      }}
    >
      <>
        <Card
          raised
          sx={{
            ...commonStyle,
            transform: `rotateY(${!props.isBack ? "0" : "-180deg"})`,
          }}
        >
          {props.front}
        </Card>
        <Card
          raised
          sx={{
            ...commonStyle,
            transform: `rotateY(${props.isBack ? "0" : "-180deg"})`,
          }}
        >
          {props.back}
        </Card>
      </>
    </Box>
  );
}
