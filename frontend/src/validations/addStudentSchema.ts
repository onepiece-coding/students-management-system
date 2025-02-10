import { z } from "zod";

const addStudentSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required!" }),
  lastName: z.string().min(1, { message: "Last Name is required!" }),
  email: z.string().min(1, { message: "Email Address is required!" }).email(),
  reference: z
    .string()
    .min(9, { message: "Student Reference must be exactly 9 characters!" })
    .regex(/^D[0-9]{8}$/, {
      message: "Student Reference should be something like this: D12345678",
    }),
});

type TAddStudentFormInputs = z.infer<typeof addStudentSchema>;

export { addStudentSchema, type TAddStudentFormInputs };
