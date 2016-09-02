var CodeMirror = require("./node_modules/codemirror/addon/runmode/runmode.node.js");

module.exports = function(code, lang) {
  var out = "";

  var lang = lang.toLowerCase(), modeName = lang;

  require("./node_modules/codemirror/mode/meta.js");

  CodeMirror.modeInfo.forEach(function(info) {
    if (info.mime == lang) {
      modeName = info.mode;
    } else if (info.name.toLowerCase() == lang) {
      modeName = info.mode;
      lang = info.mime;
    }
  });

  // TODO: We never use lang, which makes me think this is wrong?
  if (!CodeMirror.modes[modeName])
    require("./node_modules/codemirror/mode/" + modeName + "/" + modeName + ".js");

  function esc(str) {
    return str.replace(/[<&]/g, function(ch) { return ch == "&" ? "&amp;" : "&lt;"; });
  }

  var curStyle = null, accum = "";
  function flush() {
    if (curStyle) out += "<span class=\"" + curStyle.replace(/(^|\s+)/g, "$1cm-") + "\">" + accum + "</span>";
    else out += accum;
  }

  CodeMirror.runMode(code, 'javascript', function(text, style) {
    if (style != curStyle) {
      flush();
      curStyle = style; accum = text;
    } else {
      accum += text;
    }
  });
  flush();

  return out;
};
