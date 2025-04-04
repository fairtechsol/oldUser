import {
  Box,
  Button,
  CircularProgress,
  Typography,
  debounce,
} from "@mui/material";

import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eye, eyeLock } from "../../assets";
import Input from "../../components/login/input";
import {
  changePassword,
  checkOldPassword,
} from "../../store/actions/auth/authAction";
import { AppDispatch, RootState } from "../../store/store";
import { changePasswordValidation } from "../../utils/Validations";

const initialValues: any = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = (props: any) => {
  const { passLoader, width } = props;
  const dispatch: AppDispatch = useDispatch();
  const { oldPasswordMatched } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: changePasswordValidation(oldPasswordMatched),
    onSubmit: (values: any) => {
      const payload = {
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
        oldPassword: values.oldPassword,
      };
      dispatch(changePassword(payload));
    },
  });

  const { handleSubmit, touched, errors } = formik;

  const debouncedInputValue: any = useMemo(() => {
    const debouncedFn = debounce((value) => {
      dispatch(checkOldPassword({ oldPassword: value }));
    }, 500);
    return debouncedFn;
  }, []);

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    formik.handleChange(e);
    debouncedInputValue(query);
  };

  useEffect(() => {
    return () => {
      debouncedInputValue.cancel();
    };
  }, []);

  useEffect(() => {
    if (formik.values.oldPassword) {
      formik.validateForm();
    }
  }, [oldPasswordMatched]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: { xs: "96vw", lg: "19vw", md: "19vw" },
            minWidth: {
              lg: width ? width : "350px",
              md: width ? width : "350px",
              xs: "0px",
            },
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
            Change Password
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
            <Input
              required={true}
              placeholder={"Enter Old Password"}
              title={"Old Password"}
              titleStyle={{
                color: "#222222",
                marginLeft: "0px",
                fontWeight: "600",
              }}
              inputContainerStyle={{ borderRadius: "5px" }}
              containerStyle={{}}
              img={eye}
              img1={eyeLock}
              id="oldPassword"
              name={"oldPassword"}
              type="password"
              onBlur={formik.handleBlur}
              onChange={handleOldPasswordChange}
            />
            {touched.oldPassword && errors.oldPassword && (
              <p style={{ color: "#fa1e1e" }}>{errors.oldPassword as string}</p>
            )}
            <Input
              required={true}
              placeholder={"Enter New Password"}
              title={"New Password"}
              name={"newPassword"}
              id="newPassword"
              titleStyle={{
                color: "#222222",
                marginLeft: "0px",
                fontWeight: "600",
              }}
              inputContainerStyle={{ borderRadius: "5px" }}
              containerStyle={{ marginTop: "30px" }}
              img={eye}
              img1={eyeLock}
              type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {touched.newPassword && errors.newPassword && (
              <p style={{ color: "#fa1e1e" }}>{errors.newPassword as string}</p>
            )}
            <Input
              required={true}
              placeholder={"Enter Confirm Password"}
              title={"Confirm New Password"}
              name={"confirmPassword"}
              id="confirmPassword"
              titleStyle={{
                color: "#222222",
                marginLeft: "0px",
                fontWeight: "600",
              }}
              inputContainerStyle={{ borderRadius: "5px" }}
              containerStyle={{ marginTop: "30px" }}
              img={eye}
              img1={eyeLock}
              type="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p style={{ color: "#fa1e1e" }}>
                {errors.confirmPassword as string}
              </p>
            )}
            <Button
              type="submit"
              sx={{
                height: "50px",
                display: "flex",
                justify: "center",
                alignItems: "center",
                mx: "auto",
                marginTop: "60px",
                marginBottom: "40px",
                width: "80%",
                background: "#0B4F26",
                borderRadius: "5px",
                cursor: "pointer",
                "&:hover": {
                  background: "#0B4F26",
                },
              }}
            >
              <Typography
                sx={{ fontSize: { lg: "18px", xs: "20px" } }}
                color={"white"}
              >
                {passLoader ? (
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
  );
};

export default ChangePassword;
