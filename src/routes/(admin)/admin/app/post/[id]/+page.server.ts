import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	// @ts-expect-error user does not exits on type locals

	const tags = await locals.pb.collection('tags').getFullList();
	// @ts-expect-error user does not exits on type locals
	const post = await locals.pb.collection('posts').getOne(params.id);
	// Set the `checked` property of the matching tags to `true`
	for (const tag of tags) {
		tag.checked = post.tags.includes(tag.id);
	}
	return {
		tags,
		post
	};
};

export const actions: Actions = {
	'edit-post': async ({ request, locals, params }) => {
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
		const postId = params.id;
		// @ts-expect-error pb does not exits on type locals
		const existingPost = await locals.pb.collection('posts').getOne(postId);
		const existingImage = existingPost.image;

		const updatedData = {
			title: data.get('title'),
			slug: data.get('slug'),
			description: data.get('description'),
			keywords: data.get('keywords'),
			content: data.get('md'),
			image: existingImage,
			tags: data.getAll('tags')
		};

		// @ts-expect-error pb does not exits on type locals
		locals.pb.collection('posts').update(postId, updatedData);
		return {
			success: true,
			status: 302,
			redirect: `/admin/app/`
		};
	},
	'delete-post': async ({ locals, params }) => {
		// @ts-expect-error user does not exits on type locals
		if (!locals.user) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}
		const postId = params.id;
		// @ts-expect-error pb does not exits on type locals
		await locals.pb.collection('posts').delete(postId);
		return {
			success: true
		};
	},

	'unpublish-post': async ({ locals, params }) => {
		// @ts-expect-error user does not exits on type locals

		if (!locals.user) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}
		const postId = params.id;
		// @ts-expect-error pb does not exits on type locals

		await locals.pb.collection('posts').update(postId, { published: false });
		return {
			success: true
		};
	},
	'publish-post': async ({ locals, params }) => {
		// @ts-expect-error user does not exits on type locals

		if (!locals.user) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}
		const postId = params.id;
		// @ts-expect-error user does not exits on type locals
		await locals.pb.collection('posts').update(postId, { published: true });
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
