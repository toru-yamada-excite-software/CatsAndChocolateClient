import { Box } from "@mui/material";

export default function Title() {
  return (
    <Box sx={{ alignItems: "center", fontWeight: "700" }}>
      <Box sx={{ fontSize: "40px" }}>ちょこっとキャッチョコ🐈🍫</Box>
      <Box
        sx={{
          fontSize: "40px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box style={{ marginRight: "16px" }}>with</Box>
        <img src="img/openai-lockup.svg" style={{ height: "1em" }} />
      </Box>
    </Box>
  );
}
