import { Box } from "@mui/system";
import { useState } from "react";
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

const EventListing = ({ selected }: any) => {
  const [anchor, setAnchor] = useState(null);
  const data = [
    {
      title: "INPLAY",
      image: Play,
      url: "fgUser/inplay",
    },
    {
      title: "MY ACCOUNT",
      image: MYACCOUNT,
      url: "fgUser/my-account",
    },
    {
      title: "CRICKET",
      image: Cricket,
      url: "fgUser/match",
    },
    {
      title: "LIVE CASINO",
      image: Slot,
      url: "fgUser/comingsoon",
    },
    {
      title: "LIVE CARD",
      image: Card,
      url: "fgUser/comingsoon",
    },
    {
      title: "SOCCER",
      image: Football,
      url: "fgUser/comingsoon",
    },
    {
      title: "TENNIS",
      image: Tennis,
      url: "fgUser/comingsoon",
    },
    {
      title: "ICE HOCKEY",
      image: Hockey,
      url: "fgUser/comingsoon",
    },
    {
      title: "SNOOKER",
      image: SNOOKER,
      url: "fgUser/comingsoon",
    },
    {
      title: "GOLF",
      image: GOLF,
      url: "fgUser/comingsoon",
    },
    {
      title: "CHESS",
      image: CHESS,
      url: "fgUser/comingsoon",
    },
    {
      title: "BASKETBALL",
      image: BASKETBALL,
      url: "fgUser/comingsoon",
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
        {data?.map((i: any, idx: any) => {
          return (
            <EventComponent
              key={idx}
              data={i}
              selected={selected}
              setAnchor={setAnchor}
            />
          );
        })}
      </Box>
    </>
  );
};

export default EventListing;
