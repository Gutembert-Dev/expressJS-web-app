// __mocks__/matchMedia.js
const jsdom      = require("jsdom");
const { window } = new jsdom.JSDOM(`<head></head>`,
                        {
						    url: "http://localhost:3000",
						    contentType: "application/xhtml+xml",
						    // pretendToBeVisual: true
						});
// const { window } = new jsdom.JSDOM("<!DOCTYPE html>");
var $ = jQuery   = require('jquery')(window)
var deparam = require('jquery-deparam')
$.deparam = deparam

'use strict';

Object.defineProperty(window, 'matchMedia', {
    value: () => ({
        matches: false,
        addListener: () => {},
        removeListener: () => {}
    })
});

Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
        getPropertyValue: () => {}
    })
});

// console.log($.deparam("icecream=vanilla&brownie=chocolate"));

//https://developer.aliyun.com/mirror/npm/package/nest-parrot/v/0.4.9
// require('jquery-mousewheel')(jQuery);
// require('bootstrap');
// require('bootstrap-fileinput-npm');
// global.moment = require('moment');
// global.React = require('react');
// global.ReactDOM = require('react-dom');
// global.jsface = require('jsface');

// var jsdom = require('jsdom').jsdom;
// global.document = jsdom('<html></html>', {});
// global.window = document.defaultView;
// propagateToGlobal(window);

// function propagateToGlobal (window) {
// 	for (let key in window) {
// 		if (!window.hasOwnProperty(key))
// 			continue;
// 		if (key in global)
// 			continue;

// 		global[key] = window[key];
// 	}
// }

// global.jQuery = global.$ = require('jquery');
// require('jquery-deparam');
// require('jquery-mousewheel')(jQuery);
// require('bootstrap');
// require('bootstrap-fileinput-npm');
// global.moment = require('moment');
// global.React = require('react');
// global.ReactDOM = require('react-dom');
// global.jsface = require('jsface');
// var parrot = require('../target/parrot/module/nest-parrot')(window, jQuery, jsface, moment, React, ReactDOM, true);

module.exports = {window, $};