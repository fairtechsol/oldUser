import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  getButtonValue,
  setButtonValue,
} from "../../store/actions/user/userAction";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import LabelButton from "./LabelButton";
import ValueButton from "./ValueButton";

interface ButtonProps {
  label: string;
  value: string;
}

const MatchValues = () => {
  const [loader] = useState(false);

  const initialValues = [
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
  ];
  const dispatch: AppDispatch = useDispatch();
  const { buttonValues } = useSelector(
    (state: RootState) => state.user.profile
  );

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (value: any) => {
      let result = {};
      value.forEach((item: ButtonProps) => {
        result = { ...result, [item?.label]: item?.value };
      });
      const payload = {
        id: buttonValues?.id,
        type: "match",
        value: result,
      };
      dispatch(setButtonValue(payload));
    },
  });

  useEffect(() => {
    dispatch(getButtonValue("match"));
  }, []);

  const { handleSubmit, setValues, values, setFieldValue } = formik;

  useEffect(() => {
    if (buttonValues[0]?.value) {
      setValues(
        Object.keys(JSON.parse(buttonValues[0]?.value))?.map((item) => {
          return {
            label: item,
            value: JSON.parse(buttonValues[0]?.value)[item],
          };
        })
      );
    }
  }, [buttonValues]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row", md: "column" },
      }}
    >
      <>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              flex: 1,
              width: { xs: "96vw", lg: "35vw", md: "35vw" },
              minWidth: { lg: "450px", md: "450px", xs: "0px" },
              marginTop: "10px",
              marginX: { xs: "2vw", lg: "1vw" },
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { lg: "18px", xs: "20px" },
                fontWeight: "700",
              }}
            >
              Change Match Button Values
            </Typography>
            <Box
              sx={{
                width: "100%",
                minHeight: "200px",
                background: "#F8C851",
                borderRadius: "5px",
                padding: "20px",
                marginTop: "10px",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      color: "#202020",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Price Lable
                  </Typography>
                  {values?.map((_: any, index: number) => {
                    return (
                      <LabelButton
                        key={index}
                        type="text"
                        onChange={(e: any) => {
                          setFieldValue(`[${index}].label`, e.target.value);
                        }}
                        value={values[index]}
                      />
                    );
                  })}
                </Box>
                <Box sx={{ flex: 1, marginLeft: "10px" }}>
                  <Typography
                    sx={{
                      color: "#202020",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    Price Value
                  </Typography>
                  {values.map((_: any, index: number) => {
                    return (
                      <ValueButton
                        key={index}
                        type="text"
                        onChange={(e: any) => {
                          setFieldValue(`[${index}].value`, e.target.value);
                        }}
                        value={values[index]}
                      />
                    );
                  })}
                </Box>
              </Box>
              <Button
                type="submit"
                sx={{
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mx: "auto",
                  marginTop: "50px",
                  marginBottom: "40px",
                  width: "80%",
                  background: "#0B4F26",
                  borderRadius: "5px",
                  cursor: "pointer",
                  "&:hover": {
                    cursor: "pointer",
                    background: "#0B4F26",
                  },
                }}
              >
                <Typography
                  sx={{ fontSize: { lg: "18px", xs: "20px" } }}
                  color={"white"}
                >
                  {loader ? (
                    <CircularProgress
                      sx={{
                        color: "#FFF",
                      }}
                      size={20}
                      thickness={4}
                      value={60}
                    />
                  ) : (
                    "Update"
                  )}
                </Typography>
              </Button>
            </Box>
          </Box>
        </form>
      </>
    </Box>
  );
};

export default MatchValues;
