"use client";
import { Social } from "@/components/auth/social";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/card-wrapper";
export const LoginForm = () => {
    return (
        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account"
            backButtonHref="/auth/register"
            showSocial
        >
            <Social />
        </CardWrapper>
    );
};
