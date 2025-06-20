import { Box, Typography } from "@mui/material";
import { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import moment from "moment";
import CalendarImage from "../../assets/images/calendar.webp";
const Calendar = ({
  title,
  containerStyle,
  DatePickerProps,
  pickerStyles,
  startDate,
  setStartDate,
  limit
}:any) => {
  // const [startDate, setStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={[
        {
          zIndex: 100,
          width: { lg: "50%", xs: "50%" },
          position: "relative",
          height: "35px",
        },
        containerStyle,
      ]}
    >
      <Typography
        sx={{ fontSize: "12px", fontWeight: "600", marginBottom: ".3vh" }}
      >
        {title}
      </Typography>
      <Box sx={[{ position: "absolute", height: "35px" }, pickerStyles]}>
        <DatePicker
          onClickOutside={() => setOpen(false)}
          open={open}
          placeholderText="select"
          selected={startDate}
          onSelect={() => setOpen(false)}
          onChange={(date) => {
            setStartDate(date);
          }}
          {...DatePickerProps}
          customInput={<Box sx={[{ width: "10vw" }]}></Box>}
          minDate={limit ?? limit}
        />
      </Box>
      <Box
        onClick={() => {
          setOpen(!open);
        }}
        sx={[
          {
            width: "100%",
            height: "37px",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            background: "white",
            borderRadius: "3px",
            border: "2px solid #DEDEDE",
            paddingX: "7px",
            position: "absolute",
          },
          pickerStyles,
        ]}
      >
        <Typography sx={{ fontSize: "11px", fontWeight: "500" }}>
          {startDate ? moment(startDate).format("YYYY-MM-DD") : "select date"}
        </Typography>
        <img src={CalendarImage} style={{ width: "12px", height: "13px" }} alt=""/>
      </Box>
    </Box>
  );
};
export default Calendar;
