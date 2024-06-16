import { generateUserName } from '$lib/generateUserName.js';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	register: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		console.log('body', body);

		let username = generateUserName(body.name.split(' ').join('')).toLowerCase();

		try {
			await locals.pb.collection('users').create({ username, ...body });
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong');
		}

		throw redirect(303, '/admin/login');
	}
};
