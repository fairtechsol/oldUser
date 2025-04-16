import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setButtonValue } from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import { initialValues } from "../../utils/Constants";
import LabelButton from "./LabelButton";
import ValueButton from "./ValueButton";

interface ButtonProps {
  label: string;
  value: string;
}

const MatchValues = () => {
  const [loader, setLoader] = useState(false);

  interface ButtonValue {
    id: string;
    type: string;
    value: any;
  }
  const dispatch: AppDispatch = useDispatch();
  const { buttonValues, buttonValueSuccess, error } = useSelector(
    (state: RootState) => state.user.profile
  );
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (value: any) => {
      setLoader(true);
      let result = {};
      value.forEach((item: ButtonProps) => {
        result = { ...result, [item?.label]: item?.value };
      });
      const typeToSearch = "Match";

      const matchEntry = buttonValues.find(
        (entry: ButtonValue) => entry.type === typeToSearch
      );

      const payload = {
        id: matchEntry?.id,
        type: typeToSearch,
        value: result,
      };

      dispatch(setButtonValue(payload));
    },
  });

  const { handleSubmit, setValues, values, setFieldValue } = formik;

  useEffect(() => {
    const typeIndexMap: Record<string, number> = {};

    for (let i = 0; i < buttonValues.length; i++) {
      const entry = buttonValues[i];
      const type = entry.type;

      typeIndexMap[type] = i;
    }
    const indexOfTypeMatch = typeIndexMap["Match"];
    if (buttonValues[indexOfTypeMatch]?.value) {
      const response = JSON.parse(buttonValues[indexOfTypeMatch]?.value);
      const keys = Object.keys(response);
      const additionalFieldsCount = Math.max(0, 8 - keys.length);
      const additionalFields = Array.from({
        length: additionalFieldsCount,
      }).map((_) => ({
        label: "",
        value: "",
      }));
      setValues(
        keys
          .map((item) => ({
            label: item,
            value: response[item],
          }))
          .concat(additionalFields)
      );
    }
  }, [buttonValues]);

  useEffect(() => {
    if (buttonValueSuccess) {
      setLoader(false);
    }
    if (error) {
      setLoader(false);
    }
  }, [buttonValueSuccess]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row", md: "column" },
      }}
    >
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
    </Box>
  );
};

export default MatchValues;
