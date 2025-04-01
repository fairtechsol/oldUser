import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import { formatNumber } from "../../../../helper";
import MoneyBox from "../MoneyBox";
import SeparateModal from "./SeparateModal";

const BoxComponent = ({
  name,
  color,
  data,
  rate,
  matchDetails,
  showBox,
  isRound,
  marketDetails,
  upcoming,
  show6Box,
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { ex, status, selectionId } = data ?? {};

  return (
    <Box
      sx={{
        display: "flex",
        background: "white",
        height: "40px",
        width: "100%",
        position: "relative",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {(upcoming ||
        showBox ||
        !marketDetails?.isActive ||
        (!["ACTIVE", "OPEN", ""].includes(marketDetails?.status) &&
          marketDetails?.gtype == "match")) && (
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: "100%",
            display: "flex",
            zIndex: "888",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.71)",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "12px", lg: "22px" },
              textTransform: "uppercase",
              width: "100%",
              textAlign: "center",
              color: "white",
              fontWeight: "400",
            }}
          >
            {!["ACTIVE", "OPEN", ""].includes(marketDetails?.status) &&
            marketDetails?.gtype == "match"
              ? marketDetails?.status
              : ""}
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          background: "white",
          position: "relative",
          height: "40px",
          width: { xs: "60%", lg: show6Box ? "40%" : "60%" },
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            width: { xs: "70%", lg: show6Box ? "100%" : "70%", md: "100%" },
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "14px", xs: "10px" },
              fontWeight: "600",
              marginLeft: "10px",
              marginRight: "10px",

              width: { xs: "113px", md: "100%", lg: "100%" },
            }}
          >
            {name}
          </Typography>
        </Box>
        <MoneyBox color={color} rates={rate} />
      </Box>
      {showBox && (
        <Box
          sx={{
            background: "rgba(0,0,0,0.5)",
            height: "40px",
            position: "absolute",
            right: 0,
            zIndex: 10,
            width: { lg: show6Box ? "60%" : "40%", xs: "40%" },
            justifyContent: {
              xs: "flex-end",
              lg: show6Box ? "center" : "flex-end",
            },
            alignItems: "center",
            display: "flex",
          }}
        />
      )}
      {(!["ACTIVE", "", "OPEN", undefined, null].includes(status) ||
        matchDetails?.bettings?.length === 0) &&
      !(
        !["ACTIVE", "OPEN", ""].includes(marketDetails?.status) &&
        marketDetails?.gtype == "match"
      ) ? (
        <Box
          sx={{
            background: "rgba(0,0,0,1)",
            height: "40px",
            width: { lg: show6Box ? "60%" : "40.5%", xs: "40.5%" },
            justifyContent: { xs: "center", lg: "center" },
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "12px", lg: "22px" },
              textTransform: "uppercase",
              width: "100%",
              textAlign: "center",
              color: "white",
              fontWeight: "400",
            }}
          >
            {matchDetails?.bettings?.length === 0 ? "suspended" : status}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "40px",
            width: { lg: show6Box ? "60%" : "40%", xs: "40.5%" },
            justifyContent: { xs: "flex-end", lg: "center" },
            alignItems: "center",
            position: "relative",
          }}
        >
          {!matchesMobile && show6Box && (
            <SeparateModal
              po={
                ex?.availableToBack[ex?.availableToBack?.length > 1 ? 0 : 2]
                  ?.tno
              }
              betType={"back"}
              lock={ex?.availableToBack?.length > 0 ? false : true}
              value={
                isRound
                  ? Math.round(
                      ex?.availableToBack?.length > 0
                        ? ex?.availableToBack[
                            ex?.availableToBack?.length > 1 ? 0 : 2
                          ]?.price ?? 0
                        : 0
                    )
                  : ex?.availableToBack?.length > 0
                  ? ex?.availableToBack[ex?.availableToBack?.length > 1 ? 0 : 2]
                      ?.price ?? 0
                  : 0
              }
              value2={formatNumber(
                ex?.availableToBack?.length > 0
                  ? ex?.availableToBack[ex?.availableToBack?.length > 1 ? 0 : 2]
                      ?.size ?? 0
                  : 0,
                isRound
              )}
              color={matchesMobile ? "white" : "#CEEBFF"}
              type={{ color: "#A7DCFF", type: "BL" }}
              data={data}
              marketDetails={marketDetails}
              upcoming={upcoming}
              mid={marketDetails?.mid}
              selectionId={selectionId}
              matchDetails={matchDetails}
              show6Box={show6Box}
            />
          )}
          {!matchesMobile && show6Box && (
            <SeparateModal
              po={ex?.availableToBack[1]?.tno}
              betType={"back"}
              lock={ex?.availableToBack?.length > 0 ? false : true}
              value={
                isRound
                  ? Math.round(
                      ex?.availableToBack?.length > 0
                        ? ex?.availableToBack[1]?.price ?? 0
                        : 0
                    )
                  : ex?.availableToBack?.length > 0
                  ? ex?.availableToBack[1]?.price ?? 0
                  : 0
              }
              value2={formatNumber(
                ex?.availableToBack?.length > 0
                  ? ex?.availableToBack[1]?.size ?? 0
                  : 0,
                isRound
              )}
              color={matchesMobile ? "white" : "#C2E6FF"}
              type={{ color: "#A7DCFF", type: "BL" }}
              data={data}
              marketDetails={marketDetails}
              upcoming={upcoming}
              mid={marketDetails?.mid}
              selectionId={selectionId}
              matchDetails={matchDetails}
              show6Box={show6Box}
            />
          )}

          <SeparateModal
            po={
              ex?.availableToBack[ex?.availableToBack?.length > 1 ? 2 : 0]?.tno
            }
            betType={"back"}
            lock={ex?.availableToBack?.length > 0 ? false : true}
            value={
              isRound
                ? Math.round(
                    ex?.availableToBack?.length > 0
                      ? ex?.availableToBack[
                          ex?.availableToBack?.length > 1 ? 2 : 0
                        ]?.price ?? 0
                      : 0
                  )
                : ex?.availableToBack?.length > 0
                ? ex?.availableToBack[ex?.availableToBack?.length > 1 ? 2 : 0]
                    ?.price ?? 0
                : 0
            }
            value2={formatNumber(
              ex?.availableToBack?.length > 0
                ? ex?.availableToBack[ex?.availableToBack?.length > 1 ? 2 : 0]
                    ?.size ?? 0
                : 0,
              isRound
            )}
            color={matchesMobile ? "#B3E0FF" : "#A7DCFF"}
            type={{ color: "#A7DCFF", type: "BL" }}
            data={data}
            marketDetails={marketDetails}
            upcoming={upcoming}
            mid={marketDetails?.mid}
            selectionId={selectionId}
            matchDetails={matchDetails}
            show6Box={show6Box}
          />

          <SeparateModal
            po={ex?.availableToLay[0]?.tno}
            betType={"lay"}
            lock={ex?.availableToLay?.length > 0 ? false : true}
            value={
              isRound
                ? Math.round(
                    ex?.availableToLay?.length > 0
                      ? ex?.availableToLay[0]?.price ?? 0
                      : 0
                  )
                : ex?.availableToLay?.length > 0
                ? ex?.availableToLay[0]?.price ?? 0
                : 0
            }
            value2={formatNumber(
              ex?.availableToLay?.length > 0
                ? ex?.availableToLay[0]?.size ?? 0
                : 0,
              isRound
            )}
            color={matchesMobile ? "#F6D0CB" : "#FFB5B5"}
            type={{ color: "#FFB5B5", type: "BL" }}
            data={data}
            marketDetails={marketDetails}
            upcoming={upcoming}
            mid={marketDetails?.mid}
            selectionId={selectionId}
            matchDetails={matchDetails}
            show6Box={show6Box}
          />
          {!matchesMobile && show6Box && (
            <SeparateModal
              po={ex?.availableToLay[1]?.tno}
              betType={"lay"}
              lock={ex?.availableToLay?.length > 0 ? false : true}
              value={
                isRound
                  ? Math.round(
                      ex?.availableToLay?.length > 0
                        ? ex?.availableToLay[1]?.price ?? 0
                        : 0
                    )
                  : ex?.availableToLay?.length > 0
                  ? ex?.availableToLay[1]?.price ?? 0
                  : 0
              }
              value2={formatNumber(
                ex?.availableToLay?.length > 0
                  ? ex?.availableToLay[1]?.size ?? 0
                  : 0,
                isRound
              )}
              color={matchesMobile ? "white" : "#F2CBCB"}
              type={{ color: "#FFB5B5", type: "BL" }}
              data={data}
              marketDetails={marketDetails}
              upcoming={upcoming}
              mid={marketDetails?.mid}
              selectionId={selectionId}
              matchDetails={matchDetails}
              show6Box={show6Box}
            />
          )}
          {!matchesMobile && show6Box && (
            <SeparateModal
              po={ex?.availableToLay[2]?.tno}
              betType={"lay"}
              lock={ex?.availableToLay?.length > 0 ? false : true}
              value={
                isRound
                  ? Math.round(
                      ex?.availableToLay?.length > 0
                        ? ex?.availableToLay[2]?.price ?? 0
                        : 0
                    )
                  : ex?.availableToLay?.length > 0
                  ? ex?.availableToLay[2]?.price ?? 0
                  : 0
              }
              value2={formatNumber(
                ex?.availableToLay?.length > 0
                  ? ex?.availableToLay[2]?.size ?? 0
                  : 0,
                isRound
              )}
              color={matchesMobile ? "white" : "#ECD6D6"}
              type={{ color: "#FFB5B5", type: "BL" }}
              data={data}
              marketDetails={marketDetails}
              upcoming={upcoming}
              mid={marketDetails?.mid}
              selectionId={selectionId}
              matchDetails={matchDetails}
              show6Box={show6Box}
              lastIndex
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default memo(BoxComponent);
