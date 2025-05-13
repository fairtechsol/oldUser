import { Box, Typography } from "@mui/material";
import { memo, useState } from "react";
import { ARROWUP } from "../../../assets";
import Divider from "../../../helper/Divider";
import { customSort, formatToINR } from "../../../helper/index";
import { sessionBettingType } from "../../../utils/Constants";
import SessionMarketBox from "./SessionMarketBox";
import SmallboxSeason from "./SmallBoxSeason";

interface SessionMarketProps {
  data: any;
  allBetsData: any[];
  show: any;
  setShow: (val: any) => void;
  newData: any[];
  upcoming: boolean;
  title: string;
  eventType: string;
  min: string | number;
  typeOfBet: string;
  matchDetails: any;
  type: string | number | any;
  mid: string | number;
}

const SessionMarket = ({
  data,
  allBetsData,
  show,
  setShow,
  newData,
  upcoming,
  title,
  eventType,
  min,
  typeOfBet,
  matchDetails,
  type,
  mid,
}: SessionMarketProps) => {
  const [visible, setVisible] = useState(true);

  const filteredData: any =
    newData?.length > 0
      ? newData
          ?.filter(
            (item: any) =>
              !item?.isManual &&
              !(
                item?.activeStatus === "unSave" ||
                item?.activeStatus === "result"
              )
          )
          ?.sort(customSort)
      : [];

  return (
    <>
      <Box
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
                (item: any) =>
                  JSON.parse(
                    matchDetails?.sessionBettings?.find(
                      (items: any) => JSON.parse(items)?.id == item?.betId
                    ) || "{}"
                  )?.type == type
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
                  MIN:{formatToINR(filteredData?.[0]?.min || min)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  background: "#319E5B",
                  marginRight: { lg: "24px", xs: "0px" },
                  height: "25px",
                  gap: { xs: "0px", lg: "1px", md: "1px" },
                  width: { lg: "60%", md: "78%", xs: "80%" },
                  justifyContent: { lg: "center", xs: "flex-end" },
                }}
              >
                {data?.gtype != "khado" ? (
                  <Box
                    sx={{
                      background:
                        sessionBettingType.oddEven == type
                          ? "#00C0F9"
                          : "#FF9292",
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
                      {sessionBettingType.oddEven == type
                        ? "BACK"
                        : sessionBettingType.fancy1 == type
                        ? "LAY"
                        : "NO"}
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      background: "none",
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
                  />
                )}
                <Box sx={{ width: ".15%", display: "flex" }} />
                <Box
                  sx={{
                    background: "#00C0F9",
                    width: { lg: "21%", xs: "29.9%" },
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: {
                      lg: " 4px solid #319e5b;",
                      xs: "0 solid #319e5b",
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
                    {[
                      sessionBettingType.oddEven,
                      sessionBettingType.fancy1,
                    ].includes(type)
                      ? "BACK"
                      : "YES"}
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
              {filteredData?.map((element: any, index: any) => {
                return (
                  <Box
                    key={element?.id}
                    sx={{
                      width: "100%",
                      display: "block",
                    }}
                  >
                    <SessionMarketBox
                      index={index}
                      upcoming={upcoming}
                      typeOfBet={typeOfBet}
                      eventType={eventType}
                      data={{
                        ...element,
                        matchId: matchDetails?.id,
                        type: type,
                      }}
                      show={show}
                      setShow={setShow}
                      profitLossData={Array.from(new Set(allBetsData))?.filter(
                        (item: any) => item?.betId === element?.id
                      )}
                      mid={mid}
                    />
                    <Divider />
                  </Box>
                );
              })}
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

export default memo(SessionMarket);
