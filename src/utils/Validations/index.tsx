import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  userName: Yup.string()
    .max(20, "Username must be at most 20 characters long")
    .required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const depositAmountValidations = Yup.object({
  amount: Yup.string().required("Amount is required"),
  transactionPassword: Yup.string().required(
    "Transaction Password is required"
  ),
});

export const newPasswordValidationSchema = Yup.object({
  oldPassword: Yup.string().required("Password is required"),
  newPassword: Yup.string()
  .required("New password is required")
  .matches(
    /^(?=.*[A-Z])/, "Password must contain at least one uppercase letter"
  )
  .matches(
    /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])/, "Password must contain at least four alphabet letters"
  )
  .matches(
    /^(?=.*\d.*\d.*\d.*\d)/, "Password must contain at least four numbers"
  ),
  // .notOneOf([Yup.ref('oldPassword'), null], 'New password must be different from old password'),
confirmPassword: Yup.string()
  .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
  .required("Confirm password is required"),
});
