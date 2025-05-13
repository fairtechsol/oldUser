import { Box, Modal, Typography } from "@mui/material";
import { memo } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface CountDownTimerProps {
  visible: boolean;
  setVisible: (val: boolean) => void;
  time: number;
}

const CountDownTimer = ({ visible, setVisible, time }: CountDownTimerProps) => {
  return (
    <Modal
      disableAutoFocus={true}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        outline: "none",
      }}
      open={visible}
      slotProps={{
        backdrop: {
          onClick: (event) => event.stopPropagation(),
        },
      }}
    >
      <Box
        sx={{
          width: "220px",
          borderRadius: "6px",
          paddingY: "20px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          display: "flex",
          position: "absolute",
          top: "45%",
          zIndex: 999,
        }}
      >
        <CountdownCircleTimer
          isPlaying
          duration={time}
          size={130}
          colors={["#F7B801", "#0B4F26"]}
          colorsTime={[5, 0]}
          strokeWidth={8}
          onComplete={() => {
            setVisible(false);
          }}
        >
          {({ remainingTime }) => (
            <Typography sx={{ fontSize: "25px" }}>{remainingTime}</Typography>
          )}
        </CountdownCircleTimer>
      </Box>
    </Modal>
  );
};
export default memo(CountDownTimer);
