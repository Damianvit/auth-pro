"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import clientPromise from "@/lib/db"; // Ensure this matches your clientPromise path
import { getUserByEmail } from "@/data/user";

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

    const client = await clientPromise; // Await the MongoDB client promise
    const db = client.db(); // Connect to your MongoDB database
    const usersCollection = db.collection("users");

    await usersCollection.insertOne({
        name,
        email,
        password: hashedPassword,
    });

    // Optionally, send a verification token email here

    return { success: "User created!" };
};

export default register;
