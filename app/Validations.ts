import z from 'zod';

export const CreateNewUserSchema = z.object({
    name: z.string().min(3, "Full Name is required").optional(),
    email: z.string().email('Email is required'),
    password: z.string().min(5, 'Password is too short'),
});
