import z from 'zod';

const emailSchema = z
  .string({ message: 'Email is required' })
  .email({ message: 'Invalid email address' });

const passwordSchema = z
  .string({ message: 'Password is required' })
  .min(6, { message: 'Password must be at least 6 characters long' });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
});
