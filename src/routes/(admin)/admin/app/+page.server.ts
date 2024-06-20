import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const posts = await locals.pb.collection('posts').getFullList({
		sort: '-created'
	});

	const publishedPosts = posts.filter((post: { published: any }) => post.published);
	const unpublishedPosts = posts.filter((post: { published: any }) => !post.published);

	return {
		posts,
		publishedPosts,
		unpublishedPosts
	};
};

export const actions: Actions = {
	'search-posts': async ({ request, locals }) => {
		const data: FormData = await request.formData();
		const term = data.get('search');

		const fetchPosts = await locals.pb.collection('posts').getList(1, 50, {
			filter: `title ~ "${term}"`
		});

		const posts = fetchPosts.items;
		const publishedPosts = posts.filter((post: { published: unknown }) => post.published);
		const unpublishedPosts = posts.filter((post: { published: unknown }) => !post.published);
		console.log('posts', posts);

		return {
			posts,
			publishedPosts,
			unpublishedPosts
		};
	},
	'delete-post-from-list': async ({ locals, request }) => {
		if (!locals.user) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}

		const data: FormData = await request.formData();
		const postId = data.get('id');
		await locals.pb.collection('posts').delete(postId);
		return {
			success: true
		};
	},

	'publish-post-from-list': async ({ locals, request }) => {
		if (!locals.user) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}

		const data: FormData = await request.formData();
		const postId = data.get('id');
		await locals.pb.collection('posts').update(postId, { published: true });
		return {
			success: true
		};
	},
	'unpublish-post-from-list': async ({ locals, request }) => {
		if (!locals.user) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}

		const data: FormData = await request.formData();
		const postId = data.get('id');
		await locals.pb.collection('posts').update(postId, { published: false });
		return {
			success: true
		};
	}
};
