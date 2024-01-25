
import { Box, useMediaQuery, useTheme } from "@mui/material";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MatchOdds from "../../components/MatchDetail/MatchOdds/MatchOdds";

import LiveMatchHome from "../../components/MatchDetail/LiveMatchScore/LiveMatchHome";
import AllRateSeperate from "../../components/MatchDetail/AllRateBets/AllRateSeperate";
import SessionBetSeperate from "../../components/MatchDetail/SessionOdds/SessionBetSeperate";
import BetPlaced from "../../components/MatchDetail/Common/BetPlaced";
import { memo } from "react";


import LiveScore from "../../components/MatchDetail/LiveMatchScore";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { matchDetailAction } from "../../store/actions/match/matchListAction";



interface BetTableProps {
    title: string;
    type: string;
    data: any;
    backLayCount?: number;
}



const MatchDetail = ({ title, type, data, backLayCount }: BetTableProps) => {
    const dispatch: AppDispatch = useDispatch()
    const {state} = useLocation()
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(true);
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
    const navigate = useNavigate();

    const { matchDetails } = useSelector(
        (state: RootState) => state.match.matchList

    );
//    console.log(state, "abc")

    useEffect(() => {
        if(state?.matchId){
            dispatch(matchDetailAction(state?.matchId))
        }
        
    }, [state?.matchId])

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
                            <MatchOdds

                                // data={data}
                                backLayCount={backLayCount}
                                matchDetails={matchDetails}
                            />

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