import ValidTextField from "@/components/ValidTextField/ValidTextField";
import { Player, playerColors } from "@/models/Models";
import { Delete } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  SxProps,
} from "@mui/material";
import { useState } from "react";

export default function PlayerItem(props: {
  player: Player;
  onDelete?: (player: Player) => void;
  onChange?: (player: Player) => void;
}) {
  const [player, setPlayer] = useState(props.player);

  const avatarSx: SxProps = { bgcolor: player.color, width: "32px", height: "32px" };
  const avatar = player.isGPT ? (
    <Avatar src="img/openai-white-logomark.svg" alt="ChatGPT" sx={avatarSx} />
  ) : (
    <Avatar sx={avatarSx}>
      <PersonIcon />
    </Avatar>
  );

  const colorItems = playerColors.map((e) => (
    <MenuItem value={e[1]} key={e[1]}>
      <ListItemText sx={{ m: 0 }}>
        <span style={{ color: e[1] }}>◼︎</span>
        {e[0]}
      </ListItemText>
    </MenuItem>
  ));

  const deleteIcon = player.isGPT ? (
    <Box sx={{ width: "32px" }} />
  ) : (
    <IconButton aria-label="delete" size="small" onClick={() => props.onDelete?.(player)}>
      <Delete />
    </IconButton>
  );

  function changeColor(color: string) {
    const newPlayer = { ...player };
    newPlayer.color = color;
    setPlayer(newPlayer);
    props.onChange?.(newPlayer);
  }

  function changeName(name: string) {
    const newPlayer = { ...player };
    newPlayer.name = name;
    setPlayer(newPlayer);
    props.onChange?.(newPlayer);
  }

  return (
    <ListItem sx={{ alignItems: "center", justifyContent: "center" }}>
      <ListItemAvatar>{avatar}</ListItemAvatar>
      <ValidTextField required variant="standard" value={player.name} onChange={(e) => changeName(e.target.value)} />
      <FormControl variant="standard" sx={{ mx: 2 }}>
        <Select label="色" value={player.color} onChange={(e) => changeColor(e.target.value)}>
          {colorItems}
        </Select>
      </FormControl>
      {deleteIcon}
    </ListItem>
  );
}
