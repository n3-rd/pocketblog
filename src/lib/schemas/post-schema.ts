import { z } from 'zod';

// export const themes = ["light", "dark"] as const;
// export const languages = ["en", "es", "fr"] as const;
// export const allergies = ["peanuts", "dairy", "gluten", "soy", "shellfish"] as const;

// export const schema = z.object({
// 	email: z.string().email("Please enter a valid email."),
// 	bio: z.string().optional(),
// 	theme: z.enum(themes).default("light"),
// 	language: z.enum(languages).default("en"),
// 	marketingEmails: z.boolean().default(true),
// 	allergies: z.array(z.enum(allergies)),
// });

export const schema = z.object({
	title: z.string().min(1).max(100),
	slug: z.string().min(1).max(100),
	description: z.string().min(1).max(200),
	tags: z.array(z.string()).max(5),
	keywords: z.array(z.string()).max(5),
	content: z.string().min(1),

	createdAt: z.string().transform((val) => new Date(val))
});
