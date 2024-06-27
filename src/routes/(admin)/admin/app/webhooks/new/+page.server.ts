import { WebhookSchema } from '$lib/schemas/webhook-schema';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(WebhookSchema))
	};
};
