import { object, optional, string, TypeOf, z } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: " Name is required",
    }),

    password: string({
      required_error: " Password is required",
    })
      .min(8, "Password should not be less than 8")
      .regex(
        /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {
          message:
            "Password must contain uppercase letter, lowercase letter, a number and any of (!@#$%^&*)",
        }
      ),
    emailAddress: string({
      required_error: "Email is required",
    }).email("Not a valid Email"),
    phoneNumber: string({
      required_error: "phoneNumber is required",
    }).length(11),
    role: z.enum(["admin", "user", "worker"]),
  }),
});

export const resetPasswordSchema = object({
  body: object({
    password: string({
      required_error: " Password is required",
    })
      .min(8, "Password should not be less than 8")
      .regex(
        /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {
          message:
            "Password must contain uppercase letter, lowercase letter, a number and any of (!@#$%^&*)",
        }
      ),
    confirmPassword: string({
      required_error: "Confirm the password you entered",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
});

export const loginSchema = object({
  body: object({
    password: string({
      required_error: " Password is required",
    }),
    emailAddress: string({
      required_error: "Email is required",
    }).email("Not a valid Email"),
  }),
});

export const idSchema = object({
  params: object({
    id: z.number({ required_error: "Id is required!!" }),
  }),
});

export type createUserInput = TypeOf<typeof createUserSchema>["body"];
export type loginInput = TypeOf<typeof loginSchema>["body"];
export type resetPasswordInput = TypeOf<typeof resetPasswordSchema>["body"];
export type idInput = TypeOf<typeof idSchema>["params"];
