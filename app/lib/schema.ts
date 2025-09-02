import z from "zod";

export const SignUpSchema = z.object({
    regName: z
    .string().min(3, {message: "Username should be at least 3 characters"}).trim(),
    regPassword: z.string().min(3, {message: "Password should be at least 3 chars"}).regex(/[a-zA-Z]/, {message:"Contain at least 1 letter"})
    .regex(/[0-9]/,{message: "Contain at least 1 number"}).regex(/[^a-zA-Z0-9]/, {message:'Contain 1 special char'}).trim()
})

