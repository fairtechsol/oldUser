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



  const EventListing = ({selected }: any) => {
    const [anchor, setAnchor] = useState(null);
    const data = [
        {
          title: "INPLAY",
          image: Play,
          url: "inplay",
        },
        {
          title: "MY ACCOUNT",
          image: MYACCOUNT,
          url: "my-account",
        },
        {
          title: "CRICKET",
          image: Cricket,
          url: "match",
        },
        {
          title: "LIVE CASINO",
          image: Slot,
          url: "comingsoon",
        },
        {
          title: "LIVE CARD",
          image: Card,
          url: "comingsoon",
        },
        {
          title: "SOCCER",
          image: Football,
          url: "comingsoon",
        },
        {
          title: "TENNIS",
          image: Tennis,
          url: "comingsoon",
        },
        {
          title: "ICE HOCKEY",
          image: Hockey,
          url: "comingsoon",
        },
        {
          title: "SNOOKER",
          image: SNOOKER,
          url: "comingsoon",
        },
        {
          title: "GOLF",
          image: GOLF,
          url: "comingsoon",
        },
        {
          title: "CHESS",
          image: CHESS,
          url: "comingsoon",
        },
        {
          title: "BASKETBALL",
          image: BASKETBALL,
          url: "comingsoon",
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
