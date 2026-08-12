import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const addressSchema = z.object({
  city: z.string().trim().min(1, "City is required"),
  state: z.string().trim().min(1, "State is required"),
  zipcode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, "Zip code must be exactly 5 digits"),
});

export const wishlistItemSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  photoUrl: z.string().trim().url().optional().or(z.literal("")),
});

export const supplySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().min(1, "Description is required"),
  condition: z.string().trim().min(1, "Condition is required"),
  categoryId: z.string().trim().min(1, "Category is required"),
  quantity: z.coerce.number().int().min(1).max(100),
  photoUrl: z.string().trim().url().optional().or(z.literal("")),
});
