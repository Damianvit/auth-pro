import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/db";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserFromDb, getUserByEmail } from "@/data/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: MongoDBAdapter(clientPromise),

    providers: [
        GitHub,
        Google,

        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;

                // logic to salt and hash password
                // logic to verify if user exists
                user = await getUserByEmail(credentials.email);
                if (!user) {
                    // No user found, so this is their first attempt to login
                    // meaning this is also the place you could do registration
                    throw new Error("User not found.");
                }
                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    throw new Error("Invalid password.");
                }
                // return user object with the their profile data
                return user;
            },
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            // If callbackUrl is set, return it
            if (url.startsWith(baseUrl)) return url;
            // Otherwise, return home page
            return baseUrl;
        },
    },
});
