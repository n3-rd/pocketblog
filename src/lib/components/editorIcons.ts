import type { Icon } from 'carta-md';
import {
	BoldIcon,
	Code,
	CodeSquare,
	Heading1Icon,
	Heading2Icon,
	Heading3Icon,
	Image,
	Italic,
	Link,
	List,
	ListOrdered,
	Quote,
	Strikethrough
} from 'lucide-svelte';

export const heading1: Icon = {
	id: 'heading1',
	action: (input) => input.toggleLinePrefix('#'),
	component: Heading1Icon
};
export const heading2: Icon = {
	id: 'heading2',
	action: (input) => input.toggleLinePrefix('##'),
	component: Heading2Icon
};
export const heading3: Icon = {
	id: 'heading3',
	action: (input) => input.toggleLinePrefix('###'),
	component: Heading3Icon
};

export const image: Icon = {
	id: 'image',
	action: (input) => {
		input.toggleSelectionSurrounding(['![alt text](', ')']);
	},
	component: Image
};

export const pre: Icon = {
	id: 'pre',
	action: (input) => {
		input.toggleSelectionSurrounding(['```\n', '\n```']);
	},
	component: CodeSquare
};

export const bold: Icon = {
	id: 'bold',
	action: (input) => {
		input.toggleSelectionSurrounding(['**', '**']);
	},
	component: BoldIcon
};

export const italic: Icon = {
	id: 'italic',
	action: (input) => {
		input.toggleSelectionSurrounding(['*', '*']);
	},
	component: Italic
};

export const blockQuote: Icon = {
	id: 'blockquote',
	action: (input) => input.toggleLinePrefix('>'),
	component: Quote
};

export const orderedList: Icon = {
	id: 'orderedlist',
	action: (input) => input.toggleLinePrefix('1. '),
	component: ListOrdered
};

export const unOrderedList: Icon = {
	id: 'unorderedlist',
	action: (input) => input.toggleLinePrefix('- '),
	component: List
};

export const code: Icon = {
	id: 'code',
	action: (input) => {
		input.toggleSelectionSurrounding(['`', '`']);
	},
	component: Code
};

export const link: Icon = {
	id: 'link',
	action: (input) => {
		input.toggleSelectionSurrounding(['[title](https://', ')']);
	},
	component: Link
};

export const strikethrough: Icon = {
	id: 'strikethrough',
	action: (input) => {
		input.toggleSelectionSurrounding(['~~', '~~']);
	},
	component: Strikethrough
};

export const enabledIcons = [
	heading1,
	heading2,
	heading3,
	bold,
	italic,
	blockQuote,
	image,
	pre,
	orderedList,
	unOrderedList,
	code,
	link,
	strikethrough
];
