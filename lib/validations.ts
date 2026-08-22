import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(255),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters"),
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(255),
  password: z.string().min(1, "Password is required").max(72),
});

export const addressSchema = z.object({
  city: z.string().trim().min(1, "City is required").max(100),
  state: z.string().trim().min(1, "State is required").max(100),
  zipcode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Zip code must be exactly 5 digits"),
});

export const wishlistItemSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().min(1, "Description is required").max(2000),
  photoUrl: z.string().trim().url().max(2000).optional().or(z.literal("")),
});

export const supplySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  description: z.string().trim().min(1, "Description is required").max(2000),
  condition: z.string().trim().min(1, "Condition is required").max(100),
  categoryId: z.string().trim().min(1, "Category is required").max(100),
  quantity: z.coerce.number().int().min(1).max(100),
  photoUrl: z.string().trim().url().max(2000).optional().or(z.literal("")),
});
