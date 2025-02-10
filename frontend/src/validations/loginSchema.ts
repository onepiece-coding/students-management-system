import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email Address is required!" }).email(),
  password: z.string().min(1, { message: "Password is required!" }),
});

type TLoginFormInputs = z.infer<typeof loginSchema>;
export { loginSchema, type TLoginFormInputs };
