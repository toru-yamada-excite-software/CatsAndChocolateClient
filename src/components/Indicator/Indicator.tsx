import { Backdrop, CircularProgress } from "@mui/material";

export default function Indicator(props: { open: boolean; message?: string }) {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={props.open}>
      <div>
        <CircularProgress thickness={5} />
      </div>
      <div>{props.message}</div>
    </Backdrop>
  );
}
