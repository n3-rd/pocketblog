import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// const tags = locals.pb.collection('tags');
	const tags = await locals.pb.collection('tags').getFullList();

	return {
		tags
	};
};

export const actions: Actions = {
	'create-post': async ({ request, locals }) => {
		if (!locals.user) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}
		const data: FormData = await request.formData();
		console.log(data);
		const title = data.get('title');
		const slug = data.get('slug');
		const description = data.get('description');
		const keywords = data.get('keywords');
		const md = data.get('md');
		const image = data.get('image');
		const tags = data.getAll('tags');

		console.log('tags', tags);
		// console.log('pb', locals.user);
		locals.pb.collection('posts').create({
			title: title,
			slug: slug,
			description: description,
			keywords: keywords,
			content: md,
			tags: tags,
			image: image,
			author: [locals.user.id],
			published: true
		});

		return {
			success: true
		};
	},
	'edit-post': async ({ request, locals }) => {
		if (!locals.user) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}
		const data: FormData = await request.formData();
		const postId = data.get('postId');
		const updatedData = {
			title: data.get('title'),
			slug: data.get('slug'),
			description: data.get('description'),
			keywords: data.get('keywords'),
			content: data.get('md'),
			tags: data.getAll('tags'),
			image: data.get('image')
		};
		locals.pb.collection('posts').doc(postId).update(updatedData);
		return {
			success: true
		};
	},
	'delete-post': async ({ request, locals }) => {
		if (!locals.user) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}
		const data: FormData = await request.formData();
		const postId = data.get('postId');
		locals.pb.collection('posts').doc(postId).delete();
		return {
			success: true
		};
	}
};
