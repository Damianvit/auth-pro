"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn, auth } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = await LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        });
    } catch (error) {
        //Todo
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }
        throw error;
    }
    const session = await auth();
    console.log("session", session);
};
