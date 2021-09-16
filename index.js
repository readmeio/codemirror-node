const CodeMirror = require('codemirror/addon/runmode/runmode.node');

module.exports = function (code, lang, mode) {
  let out = '';

  lang = lang.toLowerCase();
  let modeName = lang;

  if (!mode) mode = lang;

  require('codemirror/mode/meta');

  CodeMirror.modeInfo.forEach(function (info) {
    if (info.mime === lang) {
      modeName = info.mode;
    } else if (info.name.toLowerCase() === lang) {
      modeName = info.mode;
      lang = info.mime;
    }
  });

  // TODO: We never use lang, which makes me think this is wrong?
  if (!CodeMirror.modes[modeName]) {
    require(`codemirror/mode/${modeName}/${modeName}.js`);
  }

  function esc(str) {
    const map = {
      '<': '&lt;',
      '/': '&#47;',
      '&': '&amp;',
      '>': '&gt;',
    };
    return str.replace(/[<&/>]/g, ch => map[ch]);
  }

  let curStyle = null;
  let accum = '';
  function flush() {
    accum = esc(accum);
    if (curStyle) {
      out += `<span class="${curStyle.replace(/(^|\s+)/g, '$1cm-')}">${accum}</span>`;
    } else out += accum;
  }

  CodeMirror.runMode(code, mode, function (text, style) {
    if (style !== curStyle) {
      flush();
      curStyle = style;
      accum = text;
    } else {
      accum += text;
    }
  });
  flush();

  return out;
};
