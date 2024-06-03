// components/auth/RegisterForm.tsx

"use client";
import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Social } from "@/components/auth/social";

export const RegisterForm = () => {
    return (
        <CardWrapper
            headerLabel="Signup with any of these accounts"
            backButtonLabel="Already have an account"
            backButtonHref="/auth/login"
            showSocial
        >
            <Social />
        </CardWrapper>
    );
};
