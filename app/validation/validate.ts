import * as Yup from "yup";

export const loginValidate = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8, "Password at least 8 characters")
    .max(32, "Password less then 32 characters")
    .required("Password is require"),
});

export const registerValidate = Yup.object({
  name: Yup.string()
    .min(3, "Username at least 3 characters")
    .max(15, "Username less then 15 characters")
    .required("Username is require"),
  email: Yup.string().email("Email is invalid").required("Email is require"),
  password: Yup.string()
    .min(8, "Password at least 8 characters")
    .max(32, "Password less then 32 characters")
    .required("Password is require"),
});
