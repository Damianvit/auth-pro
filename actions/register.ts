"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import supabaseClient from "@/lib/dbS"; // Ensure this matches your clientPromise path
import { getUserByEmail } from "@/data/userSupabase";

const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return { error: "Email already in use!" };
    }

    try {
        const { data: newUser, error } = await supabaseClient
            .from("next_auth.users")
            .insert([
                {
                    email,
                    password: hashedPassword,
                },
            ])
            .single();
        if (error) {
            throw error;
        }
    } catch {
        return null;
    }
    // Optionally, send a verification token email here

    return { success: "User created!" };
};

export default register;
