import { z } from 'zod';

export const WebhookSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	url: z.string().url(),
	dataset: z.array(z.string()),
	triggerOn: z.array(z.enum(['Create', 'Update', 'Delete'])),
	filter: z.string().optional(),
	projection: z.record(z.string()).optional(),
	status: z.boolean(),
	advancedSettings: z.object({
		httpMethod: z.enum(['POST']),
		httpHeaders: z.record(z.string()).optional(),
		apiVersion: z.string(),
		drafts: z.boolean(),
		secret: z.string().optional()
	})
});
