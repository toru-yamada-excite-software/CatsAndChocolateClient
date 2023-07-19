"use client";

import { Item } from "@/models/Models";
import BackpackOutlinedIcon from "@mui/icons-material/BackpackOutlined";
import { Box, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import CommonCard from "../CommonCard";

function ItemFront(props: { item: Item }) {
  const boxRef = useRef<HTMLElement>();
  const [clientWidth, setClientWidth] = useState(0);
  useEffect(() => setClientWidth(boxRef.current?.clientWidth ?? 0));

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box
        sx={{
          width: "calc(100% - 16px)",
          height: "calc(100% - 16px)",
          boxSizing: "border-box",
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          backgroundColor: green[50],
          borderRadius: "8px",
        }}
        ref={boxRef}
      >
        {props.item.name == "猫" ? (
          <Typography component="span" sx={{ fontSize: clientWidth }}>
            🐈
          </Typography>
        ) : props.item.name == "チョコレート" ? (
          <Typography component="span" sx={{ fontSize: clientWidth }}>
            🍫
          </Typography>
        ) : (
          <Typography component="span" variant="body1">
            {props.item.name}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

const ItemBack = () => (
  <svg
    viewBox="0 0 80 80"
    style={{
      backgroundColor: green["A400"],
      width: "100%",
      height: "100%",
      display: "grid",
      placeItems: "center",
    }}
  >
    <BackpackOutlinedIcon
      sx={{
        fontSize: "80px",
      }}
    />
  </svg>
);

export default function ItemCard(props: { item: Item; width: string; isFront?: boolean; turn?: boolean }) {
  return <CommonCard front={<ItemFront item={props.item} />} back={<ItemBack />} {...props} />;
}
