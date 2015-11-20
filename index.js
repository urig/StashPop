var self = require('sdk/self');
var pageMod = require("sdk/page-mod");

// Nasty hack based on source code from sdk/self.js.
// Lets us load 'content.js' from root, rather than from under /data
// (which is what self.data.url() does).
const options = require('@loader/options');
const { get } = require("sdk/preferences/service");
const { readURISync } = require('sdk/net/url');
const id = options.id;
const readPref = key => get("extensions." + id + ".sdk." + key);
const name = readPref("name") || options.name;
const baseURI = readPref("baseURI") || options.prefixURI + name + "/"
const uri = (path="") =>
  path.includes(":") ? path : baseURI + path.replace(/^\.\//, "");
var selfDataHack = Object.freeze({
  url: uri,
  load: function read(path) {
    return readURISync(uri(path));
  }
});
// End of nasty hack

pageMod.PageMod({
  include: "*.github.com",
  // Instead of self.data.url() we use selfDataHack.url()
  contentScriptFile: selfDataHack.url("content.js")
});

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;
