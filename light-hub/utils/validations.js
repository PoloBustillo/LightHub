import { object, ref, string } from "yup";

export const isValidEmail = (email) => {
  const match = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  return !!match;
};

export const isEmail = (email) => {
  return isValidEmail(email) ? undefined : "El correo no parece ser válido";
};

export const registrationSchema = object({
  name: string()
    .required("Please enter your name.")
    .min(3, "Must be between 3 to 16 characters.")
    .max(16, "Must be between 3 to 16 characters.")
    .trim(),
  email: string()
    .required("Please enter your email.")
    .email("Email is invalid.")
    .trim(),
  password: string()
    .required("Please enter your password.")
    .min(9, "Must be between 9 to 16 characters.")
    .max(16, "Must be between 9 to 16 characters.")
    .trim(),
  confirmPassword: string()
    .required("Please re enter your password.")
    .oneOf([ref("password"), null], "Passwords don't match !"),
}).required();

export const loginSchema = object({
  email: string()
    .required("Please enter your email.")
    .email("Email is invalid.")
    .trim(),
  password: string()
    .required("Please enter your password.")
    .min(9, "Must be between 9 to 16 characters.")
    .max(16, "Must be between 9 to 16 characters.")
    .trim(),
}).required();
