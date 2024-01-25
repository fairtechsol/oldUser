import { Box, TextField } from "@mui/material";


const LabelButton = ({ value, onChange, }: any) => {

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
        value={value.label}
        onChange={onChange}
        variant="outlined"
        onKeyDown={(event) => {
          if (event.code === "Space") {
            event.preventDefault();
          }
        }}
        size="small"
        fullWidth
        sx={{ fontSize: "14px", fontWeight: "600" }}
        inputProps={{
          onBlur: (event) => event.target.blur(),
        }}
      />
    </Box>
  );
};

export default LabelButton;