import { Box, Typography } from "@mui/material";
import { memo, useState } from "react";
import { ARROWUP } from "../../../assets";
import Divider from "../../../helper/Divider";
import CricketCasinoMarketBox from "./CricketCasinoMarketBox";
import SmallboxSeason from "./SmallBoxSeason";

interface CricketCasinoMarketProps {
  data: any;
  allBetsData: any;
  show: any;
  setShow: any;
  upcoming: boolean;
  title: string;
  eventType: string;
  min: number | string | null | undefined;
  typeOfBet: string;
  matchDetails: any;
  type?: string | null | undefined;
}

const CricketCasinoMarket = ({
  data,
  allBetsData,
  show,
  setShow,
  upcoming,
  title,
  eventType,
  min,
  typeOfBet,
  matchDetails,
  type,
}: CricketCasinoMarketProps) => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <Box
        id="test"
        sx={{
          display: "flex",
          position: "relative",
          background: "white",
          padding: "1px",
          flexDirection: "column",
          marginY: { xs: "2px", lg: ".5vh" },
          marginTop: { xs: "0" },
          width: { xs: "98%", lg: "97%" },
          marginX: "1vw",
          alignSelf: {
            xs: "center",
            md: "center",
            lg: "flex-start",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: 38,
            flexDirection: "row",
            width: "99.9%",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              background: "#f1c550",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                width: "100%",
                fontSize: { lg: "13px", md: "10px", xs: "10px" },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 0.1,
              background: "#262626",
            }}
          >
            <div className="slanted" />
          </Box>
          <Box
            sx={{
              flex: 1,
              background: "#262626",
              display: "flex",
              alignItems: "center",
              justifyContent: {
                xs: "flex-end",
                lg: "center",
                md: "flex-end",
              },
            }}
          >
            <SmallboxSeason
              allBetsData={Array.from(new Set(allBetsData))?.filter(
                (item: any) => item?.betId == data?.id
              )}
            />
            <Box
              className="arrowUpCollaps"
              sx={{
                flex: 1,
                background: { lg: "#262626", xs: "none" },
                position: { lg: "static", xs: "absolute" },
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <img
                onClick={() => {
                  setVisible(!visible);
                }}
                src={ARROWUP}
                style={{
                  transform: !visible ? "rotate(180deg)" : "rotate(0deg)",
                  width: "15px",
                  height: "15px",
                  marginRight: "5px",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                alt="arrow up"
              />
            </Box>
          </Box>
        </Box>

        {visible && (
          <Box sx={{ width: "100%", position: "relative" }}>
            {data?.activeStatus !== "live" && (
              <Box
                sx={{
                  margin: "1px",
                  width: "100%",
                  height: "100%",
                  right: 0,
                  position: "absolute",
                  background: "rgba(0, 0, 0, 0.4)",
                  zIndex: 2,
                }}
              />
            )}
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: { lg: "100%", xs: "99.9%" },
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  background: "'#319E5B'",
                  height: "25px",
                  width: "40%",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: { lg: "11px", xs: "9px" },
                    marginLeft: "7px",
                  }}
                >
                  MIN:{min}
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: { lg: "11px", xs: "9px" },
                    marginLeft: "7px",
                  }}
                >
                  MAX:{data?.max}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  background: "#319E5B",
                  marginRight: { lg: "16px", xs: "0px" },
                  height: "25px",
                  gap: { xs: "0px", lg: "1px", md: "1px" },
                  width: { lg: "63%", xs: "80%" },
                  justifyContent: { lg: "center", xs: "flex-end" },
                }}
              >
                <Box
                  sx={{
                    background: "#00C0F9",
                    width: { lg: "20%", xs: "30%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderLeft: {
                      lg: "0 solid #319e5b",
                      xs: "1px solid #319e5b",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "black",
                      fontWeight: "600",
                    }}
                  >
                    BACK
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                position: "relative",
              }}
            >
              {!(
                data?.activeStatus === "result" ||
                data?.activeStatus === "unSave"
              ) &&
                Array.from({ length: 10 }, (_, index) => index)?.map(
                  (element: any, index: any) => {
                    const currSessionItem =
                      data?.section?.find(
                        (item: any) => parseInt(item?.sid) == element + 1
                      ) || {};
                    return (
                      <Box
                        key={element}
                        sx={{
                          width: "100%",
                          display: "block",
                        }}
                      >
                        <CricketCasinoMarketBox
                          index={index}
                          upcoming={upcoming}
                          typeOfBet={typeOfBet}
                          eventType={eventType}
                          data={{
                            ...currSessionItem,
                            matchId: matchDetails?.id,
                            type: type,
                            id: data?.id,
                            mid: data?.mid,
                            RunnerName: data?.RunnerName,
                          }}
                          show={show}
                          setShow={setShow}
                          profitLossData={Array.from(
                            new Set(allBetsData)
                          )?.filter((item: any) => item?.betId === data?.id)}
                          mid={data?.mid}
                        />
                        <Divider />
                      </Box>
                    );
                  }
                )}
            </Box>
          </Box>
        )}
      </Box>

      <style>
        {`
          @media only screen and (max-width: 600px) {
            body .arrowUpCollaps img {
              width: 14px !important;
              height: 14px !important;
              margin-right: 3px !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default memo(CricketCasinoMarket);
