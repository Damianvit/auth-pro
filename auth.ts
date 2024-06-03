import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

import bcrypt from "bcryptjs";
import { Adapter } from "next-auth/adapters";

const prisma = new PrismaClient();
export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma) as Adapter,

    providers: [GitHub, Google],
});
