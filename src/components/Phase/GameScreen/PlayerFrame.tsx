import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function PlayerFrame(props: { children?: ReactNode[] }) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "grid",
        gridTemplateColumns: `repeat(${props.children?.length ?? 0}, 1fr)`,
      }}
    >
      {props.children}
    </Box>
  );
}
