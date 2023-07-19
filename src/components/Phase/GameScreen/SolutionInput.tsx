import ItemCard from "@/components/Cards/ItemCard/ItemCard";
import ValidTextField from "@/components/ValidTextField/ValidTextField";
import { Item, NowEvent, Player } from "@/models/Models";
import { Box, Button, Checkbox, CircularProgress, Paper, SxProps, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { ChangeEvent, useEffect, useState } from "react";
import { PlayerName } from "./PlayerController";

function InputItem(props: { item: Item; disabled?: boolean; onChange?: (item: Item, checked: boolean) => void }) {
  const [checked, setChecked] = useState(false);

  const itemCard = <ItemCard width="100px" item={props.item} isFront turn={!props.disabled} />;

  function handleCheck(e: ChangeEvent<HTMLInputElement>) {
    if (props.disabled) return;
    const c = e.target.checked;
    setChecked(c);
    props.onChange?.(props.item, c);
  }

  return (
    <Checkbox
      checked={checked}
      onChange={handleCheck}
      disabled={props.disabled}
      sx={{ p: "4px" }}
      icon={<Box sx={{ border: "4px solid transparent", p: "2px" }}>{itemCard}</Box>}
      checkedIcon={<Box sx={{ border: `4px solid ${red[500]}`, p: "2px" }}>{itemCard}</Box>}
    />
  );
}

export default function SolutionInput(props: {
  sx?: SxProps;
  player: Player;
  nowEvent: NowEvent;
  isInput?: boolean;
  onSolved?: (solution: NowEvent) => void;
}) {
  const [solution, setSolution] = useState(props.nowEvent?.solution ?? "");
  const [validationError, setValidationError] = useState("");
  const [useItems, setUseItems] = useState<Item[]>([]);

  useEffect(() =>
    setValidationError(() => {
      if (useItems.length != props.nowEvent.solveWith) return "指示された枚数だけアイテムを使用してください";
      if (!solution.trim()) return "解決策を入力してください";
      return "";
    }),
  );

  const items = (props.isInput ? props.player.items : props.nowEvent.useItems ?? []).map((e) => (
    <InputItem key={e.id} item={e} onChange={changeItem} disabled={!props.isInput} />
  ));

  function changeItem(item: Item, checked: boolean) {
    setUseItems(checked ? [...useItems, item] : useItems.filter((e) => e.id != item.id));
  }

  function handleSolve() {
    props.onSolved?.({ ...props.nowEvent, useItems: useItems, solution: solution });
  }

  const inputButton = props.isInput && (
    <>
      <Button
        variant="contained"
        disabled={!!validationError}
        sx={{ display: "block", width: "100%", height: "80px", fontWeight: 700, fontSize: "x-large" }}
        onClick={handleSolve}
      >
        回答する!
      </Button>
      <Typography
        variant="body1"
        component="div"
        sx={{ fontWeight: 700, color: "#fff", textAlign: "center", height: "2em" }}
      >
        {validationError}
      </Typography>
    </>
  );

  const solutionInput =
    props.isInput && props.player.isGPT ? (
      <Box sx={{ display: "grid", justifyContent: "center", width: "100%", height: "298px", px: 1, pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CircularProgress thickness={5} size={100} />
          <Typography variant="h2" component="span" sx={{ fontWeight: 700, color: "#fff" }}>
            回答作成中…
          </Typography>
        </Box>
      </Box>
    ) : (
      <Box
        sx={{
          display: "grid",
          gridTemplate: "repeat(2, max-content) / max-content 1fr 300px",
          gap: "8px",
          alignItems: "center",
          px: 1,
          pb: 1,
        }}
      >
        <Typography
          variant="body1"
          component="div"
          sx={{ fontWeight: 700, color: "#fff", flexShrink: 0, textAlign: "right" }}
        >
          アイテム：
        </Typography>
        <Box sx={{ display: "flex", bgcolor: "#fff", borderRadius: 2 }}>{items}</Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>{inputButton}</Box>
        <Typography
          variant="body1"
          component="div"
          sx={{ fontWeight: 700, color: "#fff", flexShrink: 0, textAlign: "right" }}
        >
          解決策：
        </Typography>
        <ValidTextField
          required
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          value={solution}
          sx={{ gridColumn: "2/4" }}
          InputProps={{
            readOnly: !props.isInput,
            style: { backgroundColor: "#fff", padding: "4px", fontSize: "14px" },
          }}
          onChange={(e) => setSolution(e.target.value)}
        />
      </Box>
    );

  return (
    <Paper
      sx={{
        borderRadius: 2,
        bgcolor: props.player.color,
        ...props.sx,
      }}
    >
      <PlayerName player={props.player} />
      {solutionInput}
    </Paper>
  );
}
