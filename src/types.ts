interface CustomText {
	text: string,
	bold?: boolean,
	italic?: boolean,
	underline?: boolean,
	strikethrough?: boolean
};

interface ParagraphElement {
	type: 'paragraph',
	children: CustomText[]
};

interface CodeElement {
	type: 'code',
	children: CustomText[]
};

type CustomElement = ParagraphElement | CodeElement;

export type Descendant = CustomElement | CustomText;

export interface Document {
	id: string
	title: string,
	body: Descendant[]
};

export type ActiveDocuments = Record<string, Document>;