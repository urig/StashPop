var self = require('sdk/self');
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
    include: "*.github.com",
    contentScriptFile: ["resource://stashpop/jquery-2.1.4.min.js", "resource://stashpop/content.js"],
    contentScriptWhen: "start",
    onAttach: startListening
});

pageMod.PageMod({
    include: "*.github.com",
    contentScriptFile: "resource://stashpop/scripts/injectedcode.js",
    contentScriptWhen: "end",
});

function startListening(worker) {
  worker.port.on('getSettings', function(keys) {
    var data = {};
    for (var i=0; i<keys.length; i++) {
      data[keys[i]] = ss.storage.settings[keys[i]];
    } 
    worker.port.emit('getSettingsResponse', data);
    //worker.port.emit('getSettingsResponse', keys);
  });
}

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;
