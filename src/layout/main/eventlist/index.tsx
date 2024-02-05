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

const EventListing = () => {
  const data = [
    {
      title: "INPLAY",
      image: Play,
      url: "/old/inplay",
    },
    {
      title: "MY ACCOUNT",
      image: MYACCOUNT,
      url: "/old/my-account",
    },
    {
      title: "CRICKET",
      image: Cricket,
      url: "/old/match",
    },
    {
      title: "LIVE CASINO",
      image: Slot,
      url: "/old/comingsoon",
    },
    {
      title: "LIVE CARD",
      image: Card,
      url: "/old/comingsoon",
    },
    {
      title: "SOCCER",
      image: Football,
      url: "/old/comingsoon",
    },
    {
      title: "TENNIS",
      image: Tennis,
      url: "/old/comingsoon",
    },
    {
      title: "ICE HOCKEY",
      image: Hockey,
      url: "/old/comingsoon",
    },
    {
      title: "SNOOKER",
      image: SNOOKER,
      url: "/old/comingsoon",
    },
    {
      title: "GOLF",
      image: GOLF,
      url: "/old/comingsoon",
    },
    {
      title: "CHESS",
      image: CHESS,
      url: "/old/comingsoon",
    },
    {
      title: "BASKETBALL",
      image: BASKETBALL,
      url: "/old/comingsoon",
    },
  ];

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
        {/* {data?.map((i: any, idx: any) => {
          return (
            <EventComponent
              key={idx}
              data={i}
              selected={selected}
              setAnchor={() => {}}
            />
          );
        })} */}
        {data?.map((i: any, idx: any) => {
          return (
            <NavLink
              key={idx}
              to={`${i.url}`}
              className={({ isActive }) =>
                [isActive ? "activeEventTab" : ""].join(" ")
              }
              style={{ textDecoration: "none" }}
            >
              <EventComponent data={i} setAnchor={() => {}} />
            </NavLink>
          );
        })}
      </Box>
    </>
  );
};

export default EventListing;
