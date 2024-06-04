export const qs = (selector, range) => {
	return (range || document).querySelector(selector);
}

export const qsa = (selector, range) => {
	return (range || document).querySelectorAll(selector);
}

export const dc = (selector) => {
	return document.createElement(selector);
}
export const dct = (value) => {
	return document.createTextNode(value);
}