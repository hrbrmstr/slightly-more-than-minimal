import { WebR } from 'https://webr.r-wasm.org/latest/webr.mjs'

// this can be accessed everywhere as "webR"
globalThis.webR = new WebR();
await globalThis.webR.init();

/**
 * This is a [Tag Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
 * 
 * @param {strings[]} strings 
 * @param  {...any} values 
 * @returns a WebR toJs() object
 * @example
 * await R`sample(100, 5)`
 */
globalThis.R = async function R(strings, ...values) {

	let result = "";
	for (let i = 0; i < strings.length; i++) {
		result += strings[ i ];
		if (i < values.length) {
			result += values[ i ];
		}
	}
	return Promise.resolve(
		await (await webR.evalR(result)).toJs()
	)
}
