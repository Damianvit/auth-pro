// @/app/api/auth/register/route.ts

import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        console.log("REQUEST BODY:", body);
        const validatedFields = RegisterSchema.safeParse(body);
        if (!validatedFields.success) {
            return NextResponse.json({ error: "Invalid fields!", status: 400 });
        }

        const { email, password, name } = validatedFields.data;
        const hashedPassword = await bcrypt.hash(password, 10);

        const client = await clientPromise;
        const db = client.db();
        const usersCollection = db.collection("users");

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                error: "Email already in use!",
                status: 401,
            });
        }

        await usersCollection.insertOne({
            name,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({ success: "User created!", status: 201 });
    } catch (error) {
        console.error("Error in register route:", error);
        return NextResponse.json({
            error: "Internal server error",
            status: 500,
        });
    }
}
