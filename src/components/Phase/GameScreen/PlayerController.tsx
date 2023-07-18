import { Player } from "@/models/Models";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Box, Button, CircularProgress, SxProps, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export function PlayerName(props: { player: Player }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", color: "#fff" }}>
      <PlayerAvatar player={props.player} />
      <Typography variant="body1" component="div" sx={{ fontWeight: 700 }}>
        {props.player.name}
      </Typography>
    </Box>
  );
}

function PlayerAvatar(props: { player: Player }) {
  const avatarSx: SxProps = { width: "24px", height: "24px" };
  return props.player.isGPT ? (
    <Avatar src="img/openai-white-logomark.svg" alt="ChatGPT" sx={avatarSx} />
  ) : (
    <PersonIcon sx={avatarSx} />
  );
}

export default function PlayerController(props: {
  player: Player;
  canControll?: boolean;
  showVoteButton?: boolean;
  votedValue?: number;
  onVote?: (player: Player, value: number) => void;
  evaluateSolution?: () => Promise<number>;
}) {
  const [vote, setVote] = useState(props.votedValue ?? 0);
  const [setup, setSetup] = useState(false);

  useEffect(() => {
    if (vote != 0) props.onVote?.(props.player, vote);
  }, [vote]);

  const buttonSx: SxProps = {
    fontSize: "32px",
    width: "fit-content",
    mx: "auto",
  };

  const playersVoteControll = (
    <>
      <Button
        size="small"
        sx={{ ...buttonSx, "&:disabled": { color: vote == 1 ? "#000" : undefined } }}
        disabled={!!vote}
        onClick={() => setVote(1)}
      >
        👍
      </Button>
      <Button
        size="small"
        sx={{ ...buttonSx, "&:disabled": { color: vote == -1 ? "#000" : undefined } }}
        disabled={!!vote}
        onClick={() => setVote(-1)}
      >
        🤜
      </Button>
    </>
  );

  const gptsVoteControll = (
    <Box sx={{ gridColumn: "1/3", display: "flex", justifySelf: "center", alignItems: "center" }}>
      {vote ? (
        <>
          <Typography sx={{ fontSize: 32, color: "#fff", fontWeight: 700 }}>投票完了</Typography>
        </>
      ) : (
        <>
          <CircularProgress size={32} thickness={5} />
          <Typography sx={{ fontSize: 32, color: "#fff", fontWeight: 700 }}>投票中…</Typography>
        </>
      )}
    </Box>
  );

  useEffect(() => {
    if (setup) return;
    setSetup(true);
    if (!props.player.isGPT || !props.showVoteButton || !props.evaluateSolution) return;
    props.evaluateSolution().then((value) => setVote(value));
  }, []);

  return (
    <Box sx={{ bgcolor: props.canControll ? props.player.color : "#777" }}>
      <PlayerName player={props.player} />
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", height: "64px" }}>
        {props.showVoteButton && (props.player.isGPT && !props.votedValue ? gptsVoteControll : playersVoteControll)}
      </Box>
    </Box>
  );
}
