import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// @ts-expect-error pn does not exits on type locals
	const tags = await locals.pb.collection('tags').getFullList();

	return {
		tags
	};
};

export const actions: Actions = {
	'create-post': async ({ request, locals }) => {
		// @ts-expect-error - formData is not yet in the types
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
		const publishedCheckbox = data.getAll('published');
		let published;

		if (publishedCheckbox.includes('on')) {
			console.log('published', publishedCheckbox);
			published = false;
		} else {
			console.log('not published', publishedCheckbox);
			published = true;
		}

		// @ts-expect-error pb does not exits on type locals
		locals.pb.collection('posts').create({
			title: title,
			slug: slug,
			description: description,
			keywords: keywords,
			content: md,
			tags: tags,
			image: image,
			// @ts-expect-error user does not exits on type locals
			author: [locals.user.id],
			published: published
		});

		return {
			success: true
		};
	},
	'add-tag': async ({ request, locals }) => {
		// @ts-expect-error user does not exits on type locals
		if (!locals.user) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}
		const data: FormData = await request.formData();
		const tag = data.get('tag');
		// @ts-expect-error pb does not exits on type locals
		locals.pb.collection('tags').create({
			name: tag
		});
		return {
			success: true
		};
	}
};
