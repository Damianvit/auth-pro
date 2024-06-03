// user.ts

import { PrismaClient, User } from "@prisma/client";
import prisma from "@/lib/db";

export const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getUserById = async (id: string): Promise<User | null> => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        console.log(user);
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};
