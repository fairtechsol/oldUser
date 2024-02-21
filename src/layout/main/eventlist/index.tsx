import { Box } from "@mui/system";
import {
  BASKETBALL,
  Card,
  CHESS,
  Cricket,
  Football,
  GOLF,
  Hockey,
  MYACCOUNT,
  Play,
  Slot,
  SNOOKER,
  Tennis,
} from "../../../assets";

import EventComponent from "./EventComponent";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const EventListing = () => {
  const [data, setData] = useState([
    {
      title: "INPLAY",
      image: Play,
      url: "/inplay",
      active: false
    },
    {
      title: "MY ACCOUNT",
      image: MYACCOUNT,
      url: "/my-account",
      active: false
    },
    {
      title: "CRICKET",
      image: Cricket,
      url: "/match",
      active: false

    },
    {
      title: "LIVE CASINO",
      image: Slot,
      url: "/comingsoon",
      active: false
    },
    {
      title: "LIVE CARD",
      image: Card,
      url: "/comingsoon",
      active: false
    },
    {
      title: "SOCCER",
      image: Football,
      url: "/comingsoon",
      active: false
    },
    {
      title: "TENNIS",
      image: Tennis,
      url: "/comingsoon",
      active: false
    },
    {
      title: "ICE HOCKEY",
      image: Hockey,
      url: "/comingsoon",
      active: false
    },
    {
      title: "SNOOKER",
      image: SNOOKER,
      url: "/comingsoon",
      active: false
    },
    {
      title: "GOLF",
      image: GOLF,
      url: "/comingsoon",
      active: false
    },
    {
      title: "CHESS",
      image: CHESS,
      url: "/comingsoon",
      active: false
    },
    {
      title: "BASKETBALL",
      image: BASKETBALL,
      url: "/comingsoon",
      active: false
    },
  ]);

  const handleNavLinkClick = (idx: any) => {
    const updatedData = data.map((item, index) =>
      index === idx ? { ...item, active: true } : { ...item, active: false }
    );
    setData(updatedData);
  };

  return (
    <>
      <Box
        sx={[
          {
            width: { xs: "98%", lg: "98%" },
            msOverflowStyle: "none",
            overflowY: "hidden",
            minHeight: { xs: 80, lg: 80 },
            // marginLeft: { xs: "0", lg: ".5vw" },
            overflowX: "auto",
            marginTop: "1vh",
            marginX: "1vh",
            alignSelf: { xs: "center", lg: "flex-start" },
            display: "flex",
          },
        ]}
      >
        {data.map((item, idx) => (
          <NavLink
            key={idx}
            to={`${item.url}`}
            className={item.active ? "activeEventTab" : ""}
            onClick={() => handleNavLinkClick(idx)}
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
