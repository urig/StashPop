var self = require('sdk/self');
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
    include: "*.github.com",
    contentScriptFile: ["resource://stashpop/jquery-2.1.4.min.js", "resource://stashpop/content.js"],
    contentScriptWhen: "start"
});

pageMod.PageMod({
    include: "*.github.com",
    contentScriptFile: "resource://stashpop/scripts/injectedcode.js",
    contentScriptWhen: "end"
});

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;
