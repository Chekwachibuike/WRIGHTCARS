import { object, string, TypeOf, z } from "zod";

export const enable2FASchema = object({
  body: object({
    emailAddress: string({
      required_error: "Email is required",
    }).email("Not a valid Email"),
  }),
});

export const verify2FASchema = object({
  body: object({
    emailAddress: string({
      required_error: "Email is required",
    }).email("Not a valid Email"),
    code: string({
      required_error: "OTP code is required",
    }).length(6, "OTP must be 6 digits"),
  }),
});

export const verifyLoginOTPSchema = object({
  body: object({
    emailAddress: string({
      required_error: "Email is required",
    }).email("Not a valid Email"),
    code: string({
      required_error: "OTP code is required",
    }).length(6, "OTP must be 6 digits"),
  }),
});

export type enable2FAInput = TypeOf<typeof enable2FASchema>["body"];
export type verify2FAInput = TypeOf<typeof verify2FASchema>["body"];
export type verifyLoginOTPInput = TypeOf<typeof verifyLoginOTPSchema>["body"]; 