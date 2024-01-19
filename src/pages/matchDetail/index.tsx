
import { Box, useMediaQuery, useTheme } from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MatchOdds from "../../components/MatchDetail/MatchOdds/MatchOdds";

import LiveMatchHome from "../../components/MatchDetail/LiveMatchScore/LiveMatchHome";
import AllRateSeperate from "../../components/MatchDetail/AllRateBets/AllRateSeperate";
import SessionBetSeperate from "../../components/MatchDetail/SessionOdds/SessionBetSeperate";
import BetPlaced from "../../components/MatchDetail/Common/BetPlaced";
import { memo } from "react";


import LiveScore from "../../components/MatchDetail/LiveMatchScore";


const MatchDetail = () => {
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(true);
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: "flex",
                // overflowX: "hidden",
                flexDirection: "column",
                flex: 1,
                width: "100%",
                justifyContent: "flex-start",
                // overflowY: "auto",
                alignItems: "flex-start",
            }}
          
        >
            <BetPlaced visible={visible} setVisible={setVisible} />

            <>
                {matchesMobile && (
                    <div
                        style={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            // gap: { lg: "8px", xs: "0px", md: "0px" },
                            marginTop: "2%",
                            flexDirection: "column",
                        }}
                    
                    >
                        <LiveScore />
                        <div style={{ width: "100%" }}>
                            <MatchOdds />
                        </div>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                alignSelf: "center",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "98%",
                                }}
                            >
                                <SessionBetSeperate mark />

                                <AllRateSeperate mark />

                            </Box>
                            <LiveMatchHome />
                        </Box>
                    </div>
                )}
                {!matchesMobile && (
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            gap: "8px",
                            marginTop: "1%",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "70%",
                            }}
                        >
                            <MatchOdds />
                        </Box>
                        <Box sx={{ width: "30%", paddingRight: "1%" }}>

                            <LiveScore />{" "}

                            {/** Live scoreBoard */}

                            <LiveMatchHome /> {/* Poster */}
                            <AllRateSeperate mark />
                            <SessionBetSeperate mark />
                        </Box>
                    </Box>
                )}
            </>

        </Box>
    );
};

export default memo(MatchDetail);