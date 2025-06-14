import { Box } from "@mui/system";
import {
  BASKETBALL,
  CHESS,
  Cricket,
  Football,
  GOLF,
  Hockey,
  Mac88,
  MacVirtual,
  MYACCOUNT,
  Play,
  // Slot,
  SNOOKER,
  Tennis,
} from "../../../assets";

import { useMediaQuery, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";
import EventComponent from "./EventComponent";

let EventNames = [
  {
    title: "INPLAY",
    image: Play,
    url: "/inplay",
    active: false,
  },
  {
    title: "CRICKET",
    image: Cricket,
    url: "/match/cricket",
    active: false,
  },
  {
    title: "CASINO",
    image: MacVirtual,
    url: "/casino",
    active: false,
  },
  {
    title: "LIVE GAMES",
    image: Mac88,
    url: "/liveCasino",
    active: false,
  },
  {
    title: "SOCCER",
    image: Football,
    // url: "/comingsoon",
    url: "/match/football",
    active: false,
  },
  {
    title: "TENNIS",
    image: Tennis,
    // url: "/comingsoon",
    url: "/match/tennis",
    active: false,
  },
  {
    title: "ICE HOCKEY",
    image: Hockey,
    url: "/comingsoon",
    active: false,
  },
  {
    title: "SNOOKER",
    image: SNOOKER,
    url: "/comingsoon",
    active: false,
  },
  {
    title: "GOLF",
    image: GOLF,
    url: "/comingsoon",
    active: false,
  },
  {
    title: "CHESS",
    image: CHESS,
    url: "/comingsoon",
    active: false,
  },
  {
    title: "BASKETBALL",
    image: BASKETBALL,
    url: "/comingsoon",
    active: false,
  },
  {
    title: "MY ACCOUNT",
    image: MYACCOUNT,
    url: "/my-account",
    active: false,
  },
];

const EventListing = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box
        sx={[
          {
            width: "100%",
            msOverflowStyle: "none",
            overflowY: "hidden",
            minHeight: { xs: 80, lg: 80 },
            // marginLeft: { xs: "0", lg: ".5vw" },
            overflowX: "auto",
            marginTop: "1vh",
            paddingX: { xs: "1vh", lg: "0" },
            alignSelf: { xs: "center", lg: "flex-start" },
            display: "flex",
          },
        ]}
      >
        {(matchesMobile
          ? EventNames.filter((item: any) => item.title !== "CASINO")
          : EventNames
        ).map((item, idx) => (
          <NavLink
            key={idx}
            to={`${item.url}`}
            className={({ isActive }) => (isActive ? "activeEventTab" : "")}
            style={{ textDecoration: "none" }}
          >
            <EventComponent data={item} setAnchor={() => { }} />
          </NavLink>
        ))}
      </Box>
    </>
  );
};

export default EventListing;
