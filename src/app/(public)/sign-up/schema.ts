import { z } from 'zod'

// =========================
// Zod Schema
// =========================
/**
 * signUpSchema: Zod validation schema for the registration form
 */
export const signUpSchema = z.object({
  barbershop: z.object({
    name: z.string().min(2, 'Name is required'),
    address: z.string().min(2, 'Address is required'),
  }),
  owner: z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(2, 'Name is required'),
    phoneNumber: z.string().min(7, 'Phone number is required'),
  }),
}) 