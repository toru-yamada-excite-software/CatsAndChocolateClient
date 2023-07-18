import { EvaluateSolutionResponse } from "@/apis/apis";
import Balloon from "@/components/Balloon/Balloon";
import { NowEvent, Player } from "@/models/Models";
import { Avatar, Box, SxProps, Typography } from "@mui/material";

export default function GPTComment(props: {
  player?: Player;
  nowEvent?: NowEvent;
  gptEvaluate?: EvaluateSolutionResponse;
  votedValue?: number;
  sx?: SxProps;
}) {
  return (
    <Box sx={{ ...props.sx, display: "flex", alignContent: "center" }}>
      <Avatar
        src="img/openai-white-logomark.svg"
        alt="ChatGPT"
        sx={{ bgcolor: props.player?.color, width: "64px", height: "64px" }}
      />
      <Balloon
        sx={{
          flexGrow: 1,
          marginLeft: "16px",
          display: "grid",
          alignContent: "center",
          gridTemplateColumns: "1fr 100px",
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "grid", alignContent: "center" }}>{props.nowEvent?.gptEvaluate?.comment}</Box>
        <Typography variant="h1" component="div" sx={{ fontSize: "64px" }}>
          {(props.nowEvent?.votedResult?.get(props.player?.id ?? 0) ?? 0) > 0 ? "👍" : "🤜"}
        </Typography>
      </Balloon>
    </Box>
  );
}
