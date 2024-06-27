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

export const PostSchema = z.object({
	title: z
		.string({
			message: 'Title is required'
		})
		.min(1, 'Title must be more than 1 character')
		.max(100, 'Title must be less than 100 characters'),
	slug: z
		.string({
			message: 'Slug is required'
		})
		.min(1, 'Slug must be more than 1 character')
		.max(100, 'Slug must be less than 100 characters'),
	description: z
		.string()
		.min(1)
		.max(200, 'Description must be less than 200 characters')
		.optional(),
	tags: z.array(z.string()).max(5, 'Tags must be less than 5').optional(),
	keywords: z.array(z.string()).max(5),
	image: z
		.instanceof(File)
		.refine((file) => file.size < 10000000, {
			message: 'Image must be less than 10MB'
		})
		.refine((file) => file.type.startsWith('image/'), {
			message: 'File must be an image'
		}),
	content: z
		.string({
			required_error: 'Content is required'
		})
		.min(1, 'Content must be more than 1 character'),
	published: z.boolean().default(true)
});
