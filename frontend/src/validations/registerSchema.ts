import { z } from "zod";

const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: "First Name is required!" }),
    lastName: z.string().min(1, { message: "Last Name is required!" }),
    email: z.string().min(1, { message: "Email Address is required!" }).email(),
    password: z
      .string()
      .min(1, { message: "Password is required!" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message: "Weak Password",
        }
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required!" }),
  })
  // Custom Validation
  .refine((input) => input.password === input.confirmPassword, {
    message: "Password & Confirm Password does not match!",
    path: ["confirmPassword"],
  });

type TRegisterFormInputs = z.infer<typeof registerSchema>;
export { registerSchema, type TRegisterFormInputs };
