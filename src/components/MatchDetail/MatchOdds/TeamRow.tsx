import { Box, Typography } from "@mui/material";
import Divider from "../../../helper/Divider";
import MatchRatesCommonComp from "./MatchRatesCommonComp";

interface TeamRowProps {
  teamName: string;
  match: any;
  runnerPosition: number;
}

const TeamRow = ({ teamName, match, runnerPosition }: TeamRowProps) => {
  if (!teamName) return null;

  return (
    <>
      {runnerPosition > 0 && <Divider />}
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "40px",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "40px",
            width: "40%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "12px", xs: "11px" },
              marginLeft: "7px",
              fontWeight: "600",
            }}
          >
            {teamName}
          </Typography>
        </Box>
        <MatchRatesCommonComp match={match} runnerPosition={runnerPosition} />
      </Box>
    </>
  );
};

export default TeamRow;
