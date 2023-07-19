"use client";

import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { CSSProperties, ReactNode } from "react";

export default function CommonCard(props: {
  front: ReactNode;
  back: ReactNode;
  width: string;
  isFront?: boolean;
  turn?: boolean;
}) {
  const commonStyle: CSSProperties = {
    borderRadius: "8px",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
    color: "rgba(0, 0, 0, 0.87)",
    backfaceVisibility: "hidden",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    perspective: "1000px",
    overflow: "hidden",
  };

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        width: props.width,
        aspectRatio: 0.7071,
        perspective: "1000px",
      }}
    >
      <motion.div
        style={{
          ...commonStyle,
        }}
        initial={{ rotateY: (props.turn ? !props.isFront : props.isFront) ? "0" : "-180deg" }}
        animate={{ rotateY: props.isFront ? "0" : "-180deg" }}
        transition={{ duration: 0.6 }}
      >
        {props.front}
      </motion.div>
      <motion.div
        style={{
          ...commonStyle,
        }}
        initial={{ rotateY: (props.turn ? !props.isFront : props.isFront) ? "-180deg" : "0" }}
        animate={{ rotateY: props.isFront ? "-180deg" : "0" }}
        transition={{ duration: 0.6 }}
      >
        {props.back}
      </motion.div>
    </Box>
  );
}
