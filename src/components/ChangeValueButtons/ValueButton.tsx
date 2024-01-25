import { Box, TextField } from "@mui/material";

const ValueButton = ({ value, index, onChange }:any) => {
  
    return (
      <Box
        sx={{
          background: "white",
          height: "40px",
          marginTop: "5px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          required={true}
          value={value.value}
          onChange={onChange}
          variant="outlined"
          type="number" // Allow only numeric input
          size="small"
          fullWidth
          sx={{ fontSize: "14px", fontWeight: "600" }}
          onKeyDown={(event:any) => {
            if (
              event.code === "Space" ||
              (!(event.key >= "0" && event.key <= "9") &&
                event.key !== "Backspace" &&
                event.code !== "ArrowUp" &&
                event.code !== "ArrowDown" &&
                event.code !== "Enter" &&
                event.code !== "Tab" && // Allow Tab key
                event.code !== "ArrowRight" && // Allow Right Arrow key
                event.code !== "ArrowLeft")
            ) {
              event.preventDefault();
            }
          }}
          inputProps={{
            min: "1",
            onBlur: (event:any) => event.target.blur(),
          }}
        />
      </Box>
    );
  };

  export default ValueButton;