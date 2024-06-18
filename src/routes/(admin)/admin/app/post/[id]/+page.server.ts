import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	// const tags = locals.pb.collection('tags');
	const tags = await locals.pb.collection('tags').getFullList();
	const post = await locals.pb.collection('posts').getOne(params.id);
	// Set the `checked` property of the matching tags to `true`
	for (let tag of tags) {
		tag.checked = post.tags.includes(tag.id);
	}
	return {
		tags,
		post
	};
};

export const actions: Actions = {
	'edit-post': async ({ request, locals, params }) => {
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
		const newImage = data.get('image');
		const existingPost = await locals.pb.collection('posts').getOne(postId);
		const existingImage = existingPost.image;

		const updatedData = {
			title: data.get('title'),
			slug: data.get('slug'),
			description: data.get('description'),
			keywords: data.get('keywords'),
			content: data.get('md'),
			tags: data.getAll('tags')
		};

		// Only include the new image in the updatedData object if it has changed
		if (newImage !== existingImage) {
			updatedData.image = newImage;
		}
		locals.pb.collection('posts').update(postId, updatedData);
		return {
			success: true,
			status: 302,
			redirect: `/admin/app/`
		};
	},
	'delete-post': async ({ locals, params }) => {
		if (!locals.user) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}
		const postId = params.id;
		await locals.pb.collection('posts').delete(postId);
		return {
			success: true
		};
	},

	'unpublish-post': async ({ locals, params }) => {
		if (!locals.user) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}
		const postId = params.id;
		await locals.pb.collection('posts').update(postId, { published: false });
		return {
			success: true
		};
	},
	'publish-post': async ({ locals, params }) => {
		if (!locals.user) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}
		const postId = params.id;
		await locals.pb.collection('posts').update(postId, { published: true });
		return {
			success: true
		};
	}
};
