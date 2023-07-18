import { sessionSettingsAtom } from "@/states/states";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import { useState } from "react";

export default function TitleBar() {
  const [sessionSetting, setSessionSetting] = useAtom(sessionSettingsAtom);
  const [dialog, setDialog] = useState(false);

  function cancel() {
    setDialog(false);
  }

  function abortSession() {
    setDialog(false);
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
    <AppBar position="sticky" sx={{ bgcolor: "rgba(0, 0, 0, 0.3)" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
          🐈🍫 お題：{sessionSetting.title}
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700, mr: 2 }}>
          ターン：{sessionSetting.phase.turn}
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<CancelIcon />}
          onClick={() => setDialog(true)}
          sx={{ color: "#fff" }}
        >
          セッションを中止する
        </Button>
      </Toolbar>
      <Dialog open={dialog} onClose={cancel}>
        <DialogContent>
          <DialogContentText>セッションを中止して初期画面に戻りますか?</DialogContentText>
          <DialogActions>
            <Button onClick={abortSession}>はい</Button>
            <Button onClick={cancel} autoFocus>
              いいえ
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}
