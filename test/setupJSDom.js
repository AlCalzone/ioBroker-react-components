/**
 * Sets up a DOM for react component tests
 */
const { JSDOM } = require("jsdom");
const { composeObject } = require("alcalzone-shared/objects");

const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;

function copyProps(src, target) {
	for (const prop of Object.getOwnPropertyNames(src)) {
		if (typeof target[prop] !== "undefined") return;
		Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(src, prop));
	}
}

global.window = window;
global.document = window.document;
global.navigator = {
	userAgent: "node.js",
};

// Translate polyfill
window._ = (text) => text;
global._ = window._;

copyProps(window, global);
