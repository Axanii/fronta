import { SignUpSchema } from "../lib/schema";
import z from "zod";
import bcrypt from "bcrypt";


type FormState =
  | {
      errors?: {
        regName?: string[];
        regPassword?: string[];
      };
    }
  | undefined;

export const signup = async (state: FormState, formData: FormData): Promise<FormState> => {
  const validatedFields = SignUpSchema.safeParse({
    regName: formData.get("regName"),
    regPassword: formData.get("regPassword"),
  });




  if (!validatedFields.success) {
    const err = z.flattenError(validatedFields.error).fieldErrors;
    console.log(err);
  }

const {regName, regPassword} = validatedFields.data!;

const hashedPass = await bcrypt.hash(regPassword,10);
//tbc

  console.log("Registered:", regName, hashedPass);

  return {}; // success: return empty state
};
