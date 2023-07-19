"use client";

import { PinchEvent } from "@/models/Models";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import { Box } from "@mui/material";
import { pink } from "@mui/material/colors";
import CommonCard from "../CommonCard";

const EventFront = (props: { event?: PinchEvent }) => (
  <Box
    sx={{
      backgroundColor: "white",
      width: "100%",
      height: "100%",
      display: "grid",
      placeItems: "center",
    }}
  >
    <Box
      sx={{
        width: "calc(100% - 16px)",
        height: "calc(100% - 16px)",
        boxSizing: "border-box",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        backgroundColor: pink[50],
        borderRadius: "8px",
      }}
    >
      {props.event?.summary}
    </Box>
  </Box>
);

const EventBack = () => (
  <svg
    viewBox="0 0 80 80"
    style={{
      backgroundColor: pink["A200"],
      width: "100%",
      height: "100%",
      display: "grid",
      placeItems: "center",
    }}
  >
    <AnnouncementOutlinedIcon
      sx={{
        fontSize: "80px",
      }}
    />
  </svg>
);

export default function EventCard(props: { event?: PinchEvent; width: string; isFront?: boolean; turn?: boolean }) {
  return <CommonCard front={<EventFront event={props.event} />} back={<EventBack />} {...props} />;
}
