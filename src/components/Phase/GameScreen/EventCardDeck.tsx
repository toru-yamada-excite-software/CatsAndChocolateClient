import Balloon from "@/components/Balloon/Balloon";
import EventCard from "@/components/Cards/EventCard/EventCard";
import { NowEvent } from "@/models/Models";
import { Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

export interface EventCardDeckProps {
  count?: number;
  nowEvent?: NowEvent;
}

export default function EventCardDeck(props: EventCardDeckProps) {
  const openCard = props.nowEvent && (
    <>
      <EventCard width="100px" event={props.nowEvent.event} />
      {!props.nowEvent.votedResult && (
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
          <Box sx={{ display: "grid", alignContent: "center" }}>{props.nowEvent?.event.event}</Box>
          <Box>
            <Typography variant="h2" component="span" color={red[500]}>
              {props.nowEvent?.solveWith}
            </Typography>
            <Typography component="span">枚で</Typography>
            <Typography>解決!</Typography>
          </Box>
        </Balloon>
      )}
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <EventCard width="100px" isBack />
      <Box sx={{ width: "16px" }} />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {openCard}
      </Box>
    </Box>
  );
}
