import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import { eye, eyeLock, mail } from "../../../assets";

import { useFormik } from "formik";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/login/input";
import { LoginProps } from "../../../interface/auth";
import { authReset, login } from "../../../store/actions/auth/authAction";
import { AppDispatch, RootState } from "../../../store/store";
import { loginValidationSchema } from "../../../utils/Validations";

const initialValues: LoginProps = {
  userName: "",
  password: "",
  loginType: "user",
};

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { success, forceChangePassword, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values: LoginProps) => {
      if (loading) {
        return;
      }
      dispatch(login(values));
    },
  });

  const { handleSubmit, touched, errors } = formik;

  useEffect(() => {
    if (success) {
      if (forceChangePassword) {
        sessionStorage.setItem("forceChangePassword", "true");
        navigate("/change-password");
      } else {
        navigate("/inplay");
      }
      dispatch(authReset());
    }
  }, [success]);

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "75%",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          opacity: 1,
          marginTop: { xs: "100px", lg: "1rem" },
        }}
      >
        <Input
          id="userName"
          placeholder="Enter Username"
          title="Username"
          type="text"
          name="userName"
          img={mail}
          img1={mail}
          onChange={formik.handleChange}
          value={formik.values.userName}
        />
        {touched.userName && errors.userName && (
          <p style={{ color: "#fa1e1e" }}>{errors.userName as string}</p>
        )}
        <Input
          id="password"
          title="Password"
          type="password"
          placeholder="Enter Password"
          containerStyle={{ marginTop: "10px" }}
          img={eye}
          img1={eyeLock}
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {touched.password && errors.password && (
          <p style={{ color: "#fa1e1e" }}>{errors.password as string}</p>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginY: "1vh",
          marginTop: "4vh",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{
            width: "62%",
            cursor: "pointer",
            height: { xs: "50px", lg: "43px" },
            borderRadius: "10px",
            fontWeight: "500",
            textTransform: "none",
            fontSize: { lg: "14px", xs: "14px" },
            background: `${theme.palette.secondary}`,
          }}
        >
          {loading ? (
            <CircularProgress
              sx={{
                color: "#FFF",
              }}
              size={20}
              thickness={4}
              value={60}
            />
          ) : (
            "Login"
          )}
        </Button>
      </Box>
    </form>
  );
};

export default memo(Login);
