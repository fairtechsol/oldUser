import { Box, TextField } from "@mui/material";


const LabelButton = ({ value, index, onChange }:any) => {
    const handleChange = (event:any) => {
      onChange(index, event.target.value, "label");
    };
  
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
          value={value.lable}
          onChange={handleChange}
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