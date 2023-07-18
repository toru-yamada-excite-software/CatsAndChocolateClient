"use client";

import { Box, SxProps } from "@mui/material";
import { ReactNode } from "react";

export default function Balloon(props: { sx?: SxProps; children?: ReactNode }) {
  return (
    <Box
      sx={{
        background: "#FFFFFF",
        border: "1px solid #000000",
        color: "#000000",
        borderRadius: "8px",
        position: "relative",
        "&:after,&:before": {
          border: "solid transparent",
          content: "''",
          position: "absolute",
          top: "50%",
        },
        "&:before": {
          borderWidth: "11px",
          left: "-22px",
          marginTop: "-11px",
          marginRight: "1px",
          borderRightColor: "#000000",
        },
        "&:after": {
          left: "-20px",
          borderWidth: "10px",
          marginTop: "-10px",
          borderRightColor: "#FFFFFF",
        },
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
}
