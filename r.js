import { WebR } from 'https://webr.r-wasm.org/latest/webr.mjs'

globalThis.webR = new WebR();

// this can be accessed everywhere as "webR"
await globalThis.webR.init();
