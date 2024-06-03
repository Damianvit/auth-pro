// user.ts

import prisma from "@/lib/db";

export const getUserByEmail = async (email: string) => {
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

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getUserFromDb = async (email: string, pwHash: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
                password: pwHash,
            },
        });
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};
