import clientPromise from "@/lib/db";
import { MongoClient } from "mongodb";

export const getUserByEmail = async (email: string) => {
    try {
        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection("users").findOne({ email });

        return user;
    } catch {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const client = await clientPromise;
        const db = client.db();
        const user = await db
            .collection("users")
            .findOne({ _id: new ObjectId(id) });

        return user;
    } catch {
        return null;
    }
};
export const getUserFromDb = async (email: string, pwHash: string) => {
    try {
        const client = await clientPromise;
        const db = client.db();
        const user = await db
            .collection("users")
            .findOne({ email, password: pwHash });
        return user;
    } catch {
        return null;
    }
};
