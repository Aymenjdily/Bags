import z from 'zod';

export const CreateNewUserSchema = z.object({
    name: z.string().min(3, "Full Name is required").max(255).optional(),
    email: z.string().email('Email is required'),
    password: z.string().min(5, 'Password is too short').max(255),
});

export const CreateProductSchema = z.object({
    name: z.string().min(3, "Product name is required").max(255),
    subTitle: z.string().min(3, 'SubTitle is required').max(255),
    description: z.string().min(10, "Description is required").max(355),
    price: z.number(),
    rate: z.number().max(5).optional()
})

export const CreateOrderSchema = z.object({
    firstName: z.string().min(3, 'you name is required').max(255),
    secondName: z.string().min(3, 'your family name is required').max(255),
    email: z.string().email('email is required'),
    phone: z.string().min(6, 'phone is required').max(12),
    address: z.string().min(3, "address is required").max(255)
})