import { writable } from 'svelte/store';

export const searchPostTerm = writable<string>('');
export const searchPostResults = writable<any>(null);
