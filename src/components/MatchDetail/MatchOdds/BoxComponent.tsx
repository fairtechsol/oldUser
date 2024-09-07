import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo, useEffect } from "react";
import { formatNumber } from "../../../helper/index";
import MoneyBox from "./MoneyBox";
import SeparateModal from "./SeparateModal";

const BoxComponent = ({
  name,
  color,
  data,
  typeOfBet,
  selectedFastAmount,
  rate,
  allRates,
  teamImage,
  newData,
  showBox,
  livestatus,
  isRound,
  fromOdds,
  setFastAmount,
  sessionMain,
  setPlaceBetData,
  setFastRate,
  fastRate,
  placeBetData,
  setFastBetLoading,
  handleRateChange,
  marketDetails,
  upcoming,
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { ex, status, selectionId } = data ?? {};
  useEffect(() => {
    if (livestatus || status !== "ACTIVE" || showBox) {
      setPlaceBetData(null);
    }
  }, [livestatus, status, showBox]);
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
      <Box
        sx={{
          display: "flex",
          background: "white",
          position: "relative",
          height: "40px",
          width: { xs: "60%", lg: "40%" },
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            width: { xs: "70%", lg: "100%", md: "100%" },
            alignItems: "center",
          }}
        >
          {teamImage != null && (
            <>
              <img
                // src={`${apiBasePath}/${teamImage}`}
                style={{
                  width: "22px",
                  height: "25px",
                  marginLeft: "10px",
                  backgroundSize: "contains",
                }}
                alt={name}
              />
              <Box
                sx={{ width: "22px", height: "25px", marginLeft: "10px" }}
              ></Box>
            </>
          )}
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
            width: { lg: "60%", xs: "40%" },
            justifyContent: { xs: "flex-end", lg: "center" },
            alignItems: "center",
            display: "flex",
          }}
        ></Box>
      )}
      {!["ACTIVE", "", undefined, null].includes(status) ||
      newData?.bettings?.length === 0 ||
      livestatus ? (
        <Box
          sx={{
            background: "rgba(0,0,0,1)",
            height: "40px",
            width: { lg: "60%", xs: "40.5%" },
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
            {newData?.bettings?.length === 0 || livestatus
              ? "suspended"
              : status}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "40px",
            width: { lg: "60%", xs: "40.5%" },
            justifyContent: { xs: "flex-end", lg: "center" },
            alignItems: "center",
            position: "relative",
          }}
        >
          {!matchesMobile && (
            <SeparateModal
              closeModal={
                !["ACTIVE", "", undefined, null].includes(status) ||
                newData?.bettings?.length === 0 ||
                livestatus
              }
              setFastBetLoading={setFastBetLoading}
              po={
                ex?.availableToBack[ex?.availableToBack?.length > 1 ? 0 : 2]
                  ?.tno
              }
              updateRate={{
                key: 1,
                match: "back",
                team: name,
                value:
                  typeOfBet == "MATCH ODDS"
                    ? isRound
                      ? Math.round(
                          ex?.availableToBack?.length > 0
                            ? ex?.availableToBack[
                                ex?.availableToBack?.length > 1 ? 0 : 2
                              ]?.price ?? 0
                            : 0
                        )
                      : ex?.availableToBack?.length > 0
                      ? ex?.availableToBack[
                          ex?.availableToBack?.length > 1 ? 0 : 2
                        ]?.price ?? 0
                      : 0
                    : null,
              }}
              placeBetData={placeBetData}
              setFastRate={setFastRate}
              fastRate={fastRate}
              sessionMain={sessionMain}
              // setPlaceBetData={setPlaceBetData}
              setFastAmount={setFastAmount}
              selectedFastAmount={selectedFastAmount}
              fromOdds={fromOdds}
              back={true}
              currentMatch={newData}
              lock={ex?.availableToBack?.length > 0 ? false : true}
              rates={allRates}
              betType={"back"}
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
              name={name}
              data={data}
              typeOfBet={typeOfBet}
              handleRateChange={handleRateChange}
              marketDetails={marketDetails}
              upcoming={upcoming}
              selectionId={selectionId}
            />
          )}
          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>
          {!matchesMobile && (
            <SeparateModal
              selectionId={selectionId}
              closeModal={
                !["ACTIVE", "", undefined, null].includes(status) ||
                newData?.bettings?.length === 0 ||
                livestatus
              }
              setFastBetLoading={setFastBetLoading}
              po={ex?.availableToBack[1]?.tno}
              updateRate={{
                key: 2,
                match: "back",
                team: name,
                value:
                  typeOfBet == "MATCH ODDS"
                    ? isRound
                      ? Math.round(
                          ex?.availableToBack?.length > 0
                            ? ex?.availableToBack[1]?.price ?? 0
                            : 0
                        )
                      : ex?.availableToBack?.length > 0
                      ? ex?.availableToBack[1]?.price ?? 0
                      : 0
                    : null,
              }}
              betType={"back"}
              placeBetData={placeBetData}
              setFastRate={setFastRate}
              fastRate={fastRate}
              // setPlaceBetData={setPlaceBetData}
              sessionMain={sessionMain}
              setFastAmount={setFastAmount}
              selectedFastAmount={selectedFastAmount}
              fromOdds={fromOdds}
              back={true}
              currentMatch={newData}
              lock={ex?.availableToBack?.length > 0 ? false : true}
              rates={allRates}
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
              name={name}
              data={data}
              typeOfBet={typeOfBet}
              handleRateChange={handleRateChange}
              marketDetails={marketDetails}
              upcoming={upcoming}
            />
          )}
          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>

          <SeparateModal
            closeModal={
              !["ACTIVE", "", undefined, null].includes(status) ||
              newData?.bettings?.length === 0 ||
              livestatus
            }
            setFastBetLoading={setFastBetLoading}
            po={
              ex?.availableToBack[ex?.availableToBack?.length > 1 ? 2 : 0]?.tno
            }
            betType={"back"}
            updateRate={{
              key: 3,
              match: "back",
              team: name,
              value:
                typeOfBet == "MATCH ODDS"
                  ? isRound
                    ? Math.round(
                        ex?.availableToBack?.length > 0
                          ? ex?.availableToBack[
                              ex?.availableToBack?.length > 1 ? 2 : 0
                            ]?.price ?? 0
                          : 0
                      )
                    : ex?.availableToBack?.length > 0
                    ? ex?.availableToBack[
                        ex?.availableToBack?.length > 1 ? 2 : 0
                      ]?.price ?? 0
                    : 0
                  : null,
            }}
            placeBetData={placeBetData}
            setFastRate={setFastRate}
            fastRate={fastRate}
            // setPlaceBetData={setPlaceBetData}
            sessionMain={sessionMain}
            setFastAmount={setFastAmount}
            back={true}
            selectedFastAmount={selectedFastAmount}
            fromOdds={fromOdds}
            currentMatch={newData}
            lock={ex?.availableToBack?.length > 0 ? false : true}
            rates={allRates}
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
            name={name}
            data={marketDetails}
            typeOfBet={typeOfBet}
            handleRateChange={handleRateChange}
            marketDetails={marketDetails}
            upcoming={upcoming}
            selectionId={selectionId}
          />

          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>

          <SeparateModal
            closeModal={
              !["ACTIVE", "", undefined, null].includes(status) ||
              newData?.bettings?.length === 0 ||
              livestatus
            }
            setFastBetLoading={setFastBetLoading}
            po={ex?.availableToLay[0]?.tno}
            betType={"lay"}
            updateRate={{
              key: 4,
              match: "lay",
              team: name,
              value:
                typeOfBet == "MATCH ODDS"
                  ? isRound
                    ? Math.round(
                        ex?.availableToLay?.length > 0
                          ? ex?.availableToLay[0]?.price ?? 0
                          : 0
                      )
                    : ex?.availableToLay?.length > 0
                    ? ex?.availableToLay[0]?.price ?? 0
                    : 0
                  : null,
            }}
            placeBetData={placeBetData}
            setFastRate={setFastRate}
            fastRate={fastRate}
            // setPlaceBetData={setPlaceBetData}
            setFastAmount={setFastAmount}
            selectedFastAmount={selectedFastAmount}
            back={true}
            sessionMain={sessionMain}
            fromOdds={fromOdds}
            currentMatch={newData}
            lock={ex?.availableToLay?.length > 0 ? false : true}
            rates={allRates}
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
            name={name}
            data={marketDetails}
            typeOfBet={typeOfBet}
            handleRateChange={handleRateChange}
            marketDetails={marketDetails}
            upcoming={upcoming}
            selectionId={selectionId}
          />
          {!matchesMobile && (
            <SeparateModal
              betType={"lay"}
              closeModal={
                !["ACTIVE", "", undefined, null].includes(status) ||
                newData?.bettings?.length === 0 ||
                livestatus
              }
              setFastBetLoading={setFastBetLoading}
              po={ex?.availableToLay[1]?.tno}
              updateRate={{
                key: 5,
                match: "lay",
                team: name,
                value:
                  typeOfBet == "MATCH ODDS"
                    ? isRound
                      ? Math.round(
                          ex?.availableToLay?.length > 0
                            ? ex?.availableToLay[1]?.price ?? 0
                            : 0
                        )
                      : ex?.availableToLay?.length > 0
                      ? ex?.availableToLay[1]?.price ?? 0
                      : 0
                    : null,
              }}
              placeBetData={placeBetData}
              setFastRate={setFastRate}
              fastRate={fastRate}
              // setPlaceBetData={setPlaceBetData}
              sessionMain={sessionMain}
              setFastAmount={setFastAmount}
              selectedFastAmount={selectedFastAmount}
              back={true}
              fromOdds={fromOdds}
              currentMatch={newData}
              rates={allRates}
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
              name={name}
              data={data}
              typeOfBet={typeOfBet}
              handleRateChange={handleRateChange}
              marketDetails={marketDetails}
              upcoming={upcoming}
              selectionId={selectionId}
            />
          )}
          {!matchesMobile && (
            <SeparateModal
              betType={"lay"}
              closeModal={
                !["ACTIVE", "", undefined, null].includes(status) ||
                newData?.bettings?.length === 0 ||
                livestatus
              }
              setFastBetLoading={setFastBetLoading}
              po={ex?.availableToLay[2]?.tno}
              updateRate={{
                key: 6,
                match: "lay",
                team: name,
                value:
                  typeOfBet == "MATCH ODDS"
                    ? isRound
                      ? Math.round(
                          ex?.availableToLay?.length > 0
                            ? ex?.availableToLay[2]?.price ?? 0
                            : 0
                        )
                      : ex?.availableToLay?.length > 0
                      ? ex?.availableToLay[2]?.price ?? 0
                      : 0
                    : null,
              }}
              placeBetData={placeBetData}
              setFastRate={setFastRate}
              fastRate={fastRate}
              // setPlaceBetData={setPlaceBetData}
              sessionMain={sessionMain}
              setFastAmount={setFastAmount}
              selectedFastAmount={selectedFastAmount}
              fromOdds={fromOdds}
              back={true}
              currentMatch={newData}
              rates={allRates}
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
              name={name}
              data={data}
              typeOfBet={typeOfBet}
              handleRateChange={handleRateChange}
              marketDetails={marketDetails}
              upcoming={upcoming}
              selectionId={selectionId}
            />
          )}
          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(BoxComponent);
