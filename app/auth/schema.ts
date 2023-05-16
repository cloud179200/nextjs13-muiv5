"use client"
import * as Yup from "yup";
import { FORM_VALIDATE_ERROR_MESSAGE } from "@/app/config/constant";
import { parsePhoneNumberWithError } from "libphonenumber-js";
const regexPatternDOB = /\b([0-3][0-9])\/(0[1-9]|1[0-2])\/([0-9]{4}) ([01][0-9]|2[0-3]):([0-5][0-9])\b/;
export const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .email(FORM_VALIDATE_ERROR_MESSAGE.INVALID)
    .max(255)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  password: Yup.string()
    .max(255)
    .min(6, FORM_VALIDATE_ERROR_MESSAGE.INVALID_LENGTH)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  confirm_password: Yup.string()
    .max(255)
    .label("confirm password")
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED)
    .oneOf([Yup.ref("password"), ""], FORM_VALIDATE_ERROR_MESSAGE.INVALID),
  first_Name: Yup.string()
    .max(255)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  last_Name: Yup.string()
    .max(255)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  date_of_birth: Yup.string().matches(regexPatternDOB, FORM_VALIDATE_ERROR_MESSAGE.INVALID).required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  country: Yup.string()
    .max(255)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  state: Yup.string()
    .max(255)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  phone_number: Yup.string()
    .test(`phone`, FORM_VALIDATE_ERROR_MESSAGE.INVALID, (value: any) => {
      try {
        const val = value || "";
        const phone = parsePhoneNumberWithError(val, "VN");
        return phone.isValid();
      } catch (error) {
        return false;
      }
    })
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  gender: Yup.number().oneOf([0, 1, 2], FORM_VALIDATE_ERROR_MESSAGE.INVALID).default(0),
});

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email(FORM_VALIDATE_ERROR_MESSAGE.INVALID)
    .max(255)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
  password: Yup.string()
    .max(255)
    .min(6, FORM_VALIDATE_ERROR_MESSAGE.INVALID_LENGTH)
    .required(FORM_VALIDATE_ERROR_MESSAGE.REQUIRED),
});