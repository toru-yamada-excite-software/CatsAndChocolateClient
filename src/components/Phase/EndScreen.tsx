import { Player } from "@/models/Models";
import { sessionSettingsAtom } from "@/states/states";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, Paper, SxProps, Typography } from "@mui/material";
import { useAtom } from "jotai";

function PlayerItem(props: { player: Player; rank: number }) {
  const avatarSx: SxProps = { bgcolor: props.player.color, width: "32px", height: "32px" };
  const avatar = props.player.isGPT ? (
    <Avatar src="img/openai-white-logomark.svg" alt="ChatGPT" sx={avatarSx} />
  ) : (
    <Avatar sx={avatarSx}>
      <PersonIcon />
    </Avatar>
  );

  return (
    <ListItem sx={{ alignItems: "center", fontSize: "24px", width: "100%" }}>
      <ListItemAvatar sx={{ textAlign: "right", mr: 1 }}>{props.rank == 1 ? "👑1" : props.rank}</ListItemAvatar>
      <ListItemAvatar>{avatar}</ListItemAvatar>
      <Typography sx={{ mr: 1, fontSize: "24px" }}>{props.player.name}</Typography>
      <Box sx={{ flexGrow: 1 }}></Box>
      <Typography sx={{ fontSize: "24px" }}>{props.player.wonEvents.length}枚</Typography>
    </ListItem>
  );
}

export default function EndScreen() {
  const [sessionSetting, setSessionSetting] = useAtom(sessionSettingsAtom);
  let rank = 0;
  let tmpScore = -1;
  const players = sessionSetting.players
    .sort((a, b) => b.wonEvents.length - a.wonEvents.length)
    .map((e, i) => {
      if (e.wonEvents.length != tmpScore) {
        rank = i + 1;
        tmpScore = e.wonEvents.length;
      }
      return <PlayerItem key={e.id} player={e} rank={rank} />;
    });

  function restartSession() {
    setSessionSetting({
      ...sessionSetting,
      nowEvent: undefined,
      phase: {
        phase: "start",
        turn: 0,
        order: 0,
      },
    });
  }

  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          結果発表
        </Typography>
        <List>{players}</List>
        <Button variant="contained" onClick={restartSession} sx={{ display: "block", mx: "auto" }}>
          もう一回プレイ
        </Button>
      </Paper>
    </Box>
  );
}
