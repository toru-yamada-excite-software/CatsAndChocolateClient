import ValidTextField from "@/components/ValidTextField/ValidTextField";
import { gameSettingsAtom } from "@/states/states";
import {
  Box,
  Button,
  Dialog,
  DialogProps,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function SettingDialog(props: DialogProps) {
  const [gameSetting, setGameSetting] = useAtom(gameSettingsAtom);

  const [turnHasRange, setTurnHasRange] = useState(gameSetting.minTurn == gameSetting.maxTurn ? "0" : "1");
  const [turnCount, setTurnCount] = useState(
    gameSetting.minTurn == gameSetting.maxTurn ? gameSetting.minTurn.toFixed() : "",
  );
  const [minTurnCount, setMinTurnCount] = useState(
    gameSetting.minTurn != gameSetting.maxTurn ? gameSetting.minTurn.toFixed() : "",
  );
  const [maxTurnCount, setMaxTurnCount] = useState(
    gameSetting.minTurn != gameSetting.maxTurn ? gameSetting.maxTurn.toFixed() : "",
  );
  const [itemsCount, setItemsCount] = useState((gameSetting.itemsCount + 2).toFixed());
  const [evaluateWith, setEvaluateWith] = useState(gameSetting.evaluateWith);
  const [thresholdAvarage, setThresholdAvarage] = useState(gameSetting.thresholdAvarage.toFixed());
  const [thresholdMax, setThresholdMax] = useState(gameSetting.thresholdMax.toFixed());
  const [thresholdTension, setThresholdTension] = useState(gameSetting.thresholdTension.toFixed());

  useEffect(() => {
    setTurnHasRange(gameSetting.minTurn == gameSetting.maxTurn ? "0" : "1");
    setTurnCount(gameSetting.minTurn == gameSetting.maxTurn ? gameSetting.minTurn.toFixed() : "");
    setMinTurnCount(gameSetting.minTurn != gameSetting.maxTurn ? gameSetting.minTurn.toFixed() : "");
    setMaxTurnCount(gameSetting.minTurn != gameSetting.maxTurn ? gameSetting.maxTurn.toFixed() : "");
    setItemsCount((gameSetting.itemsCount + 2).toFixed());
    setEvaluateWith(gameSetting.evaluateWith);
    setThresholdAvarage(gameSetting.thresholdAvarage.toFixed());
    setThresholdMax(gameSetting.thresholdMax.toFixed());
    setThresholdTension(gameSetting.thresholdTension.toFixed());
  }, [props.open]);

  function onSet() {
    setGameSetting({
      minTurn: Number(turnHasRange == "0" ? turnCount : minTurnCount),
      maxTurn: Number(turnHasRange == "0" ? turnCount : maxTurnCount),
      itemsCount: Number(itemsCount) - 2,
      evaluateWith: evaluateWith,
      thresholdAvarage: Number(thresholdAvarage),
      thresholdMax: Number(thresholdMax),
      thresholdTension: Number(thresholdTension),
    });
    props.onClose?.("OK", "backdropClick");
  }

  return (
    <Dialog {...props}>
      <FormControl sx={{ p: 2 }}>
        <Typography id="turnCount">ターン数：</Typography>
        <RadioGroup
          aria-labelledby="turnCount"
          value={turnHasRange}
          onChange={(e) => setTurnHasRange(e.target.value)}
          sx={{ mb: 2 }}
        >
          <FormControlLabel
            value="0"
            control={<Radio />}
            label={
              <FormControl
                sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
                disabled={turnHasRange != "0"}
              >
                <ValidTextField
                  type="number"
                  size="small"
                  inputProps={{ min: 1, max: 10 }}
                  value={turnCount}
                  onChange={(e) => setTurnCount(e.target.value)}
                  disabled={turnHasRange != "0"}
                />
                <Typography>ターンで固定</Typography>
              </FormControl>
            }
          />
          <FormControlLabel
            value="1"
            control={<Radio />}
            label={
              <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <ValidTextField
                  type="number"
                  size="small"
                  inputProps={{ min: 1, max: 10 }}
                  value={minTurnCount}
                  onChange={(e) => setMinTurnCount(e.target.value)}
                  disabled={turnHasRange != "1"}
                />
                <Typography>〜</Typography>
                <ValidTextField
                  type="number"
                  size="small"
                  inputProps={{ min: 1, max: 10 }}
                  value={maxTurnCount}
                  onChange={(e) => setMaxTurnCount(e.target.value)}
                  disabled={turnHasRange != "1"}
                />
                <Typography sx={{ whiteSpace: "nowrap" }}>ターンの間でランダム</Typography>
              </FormControl>
            }
          />
        </RadioGroup>
        <Typography id="itemsCount">アイテム数：</Typography>
        <ValidTextField
          aria-labelledby="itemsCount"
          type="number"
          size="small"
          inputProps={{ min: 3, max: 99 }}
          value={itemsCount}
          onChange={(e) => setItemsCount(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Typography id="evaluateWith">GPT採点基準：</Typography>
        <Select
          aria-labelledby="evaluateWith"
          value={evaluateWith}
          onChange={(e) => setEvaluateWith(e.target.value as "tension" | "avarage" | "max")}
          sx={{ mb: 1 }}
          size="small"
        >
          <MenuItem value="tension">コメントのテンション値</MenuItem>
          <MenuItem value="avarage">妥当性と面白さの平均値</MenuItem>
          <MenuItem value="max">妥当性と面白さの最大値</MenuItem>
        </Select>
        <Box sx={{ display: evaluateWith == "tension" ? "flex" : "none", mb: 2 }}>
          <ValidTextField
            type="number"
            size="small"
            inputProps={{ min: -100, max: 100 }}
            value={thresholdTension}
            onChange={(e) => setThresholdTension(e.target.value)}
          />
          <Typography>以上</Typography>
        </Box>
        <Box sx={{ display: evaluateWith == "avarage" ? "flex" : "none", mb: 2 }}>
          <ValidTextField
            type="number"
            size="small"
            inputProps={{ min: 0, max: 100 }}
            value={thresholdAvarage}
            onChange={(e) => setThresholdAvarage(e.target.value)}
          />
          <Typography>点以上</Typography>
        </Box>
        <Box sx={{ display: evaluateWith == "max" ? "flex" : "none", mb: 2 }}>
          <ValidTextField
            type="number"
            size="small"
            inputProps={{ min: 0, max: 100 }}
            value={thresholdMax}
            onChange={(e) => setThresholdMax(e.target.value)}
          />
          <Typography>点以上</Typography>
        </Box>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "end", mb: 2 }}>
          <Button variant="contained" sx={{ mr: 1 }} onClick={onSet}>
            OK
          </Button>
          <Button variant="outlined" onClick={(e) => props.onClose?.("cancel", "backdropClick")}>
            キャンセル
          </Button>
        </Box>
      </FormControl>
    </Dialog>
  );
}
