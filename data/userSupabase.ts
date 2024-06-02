import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const getUserByEmail = async (email: string) => {
    try {
        const { data: user, error } = await supabase
            .from("next_auth.users")
            .select("*")
            .eq("email", email)
            .single();

        if (error) {
            throw error;
        }

        return user;
    } catch {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const { data: user, error } = await supabase
            .from("next_auth.users")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            throw error;
        }

        return user;
    } catch {
        return null;
    }
};

export const getUserFromDb = async (email: string, pwHash: string) => {
    try {
        const { data: user, error } = await supabase
            .from("next_auth.users")
            .select("*")
            .eq("email", email)
            .eq("password", pwHash)
            .single();

        if (error) {
            throw error;
        }

        return user;
    } catch {
        return null;
    }
};
