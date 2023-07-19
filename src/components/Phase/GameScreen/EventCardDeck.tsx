"use client";

import Balloon from "@/components/Balloon/Balloon";
import EventCard from "@/components/Cards/EventCard/EventCard";
import { NowEvent } from "@/models/Models";
import { Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { motion } from "framer-motion";

export interface EventCardDeckProps {
  count?: number;
  nowEvent?: NowEvent;
}

export default function EventCardDeck(props: EventCardDeckProps) {
  const openCard = props.nowEvent && (
    <EventCard width="100px" event={props.nowEvent.event} isFront turn={!props.nowEvent.solution} />
  );

  const balloon = props.nowEvent && !props.nowEvent?.votedResult && (
    <motion.div
      style={{ flexGrow: 1, marginLeft: "16px" }}
      initial={props.nowEvent.solution ? { scaleY: 1 } : { scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay: 0.6, duration: 0.3 }}
    >
      <Balloon
        sx={{
          display: "grid",
          alignContent: "center",
          gridTemplateColumns: "1fr 100px",
          textAlign: "center",
          height: "100%",
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
    </motion.div>
  );

  const deck = props.count ? <EventCard width="100px" /> : <div style={{ width: "100px" }} />;

  const cards = (
    <Box sx={{ position: "relative", width: "216px" }}>
      <Box sx={{ position: "absolute", left: 0, top: 0, width: "100px" }}>
        {props.count ? <EventCard width="100px" /> : <Box sx={{ width: "100px" }} />}
      </Box>
      {props.nowEvent && (
        <Box sx={{ position: "absolute", left: 0, top: 0, width: "100%" }}>
          <motion.div
            initial={props.nowEvent.solution ? { x: 116 } : { x: 0 }}
            animate={{ x: 116 }}
            transition={{ duration: 0.6 }}
          >
            <EventCard width="100px" event={props.nowEvent.event} isFront turn={!props.nowEvent.solution} />
          </motion.div>
        </Box>
      )}
      {props.nowEvent?.votedResult && Array.from(props.nowEvent.votedResult.values()).reduce((r, e) => r + e) >= 0 && (
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "calc(58px + 50%)",
            mixBlendMode: "darken",
          }}
          initial={{ scaleX: 2, scaleY: 2, translateX: "-50%", translateY: "-50%", rotate: "-30deg", opacity: 0 }}
          animate={{ scaleX: 1, scaleY: 1, translateX: "-50%", translateY: "-50%", rotate: "-30deg", opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeIn" }}
        >
          <div
            style={{
              border: `5px ${red[500]} solid`,
              color: red[500],
              fontWeight: 700,
              fontSize: "18px",
              borderRadius: "8px",
              padding: "4px",
              transform: "scaleX(150%)",
            }}
          >
            GET
          </div>
        </motion.div>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: "flex", perspective: "1000px", height: "142px" }}>
      {cards}
      {balloon}
    </Box>
  );
}
