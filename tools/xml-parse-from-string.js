var DOMParser = require('xmldom').DOMParser;

module.exports = (function xmlparser() {
  //common browsers
  if (typeof DOMParser !== 'undefined') {
    return function(str) {
      var parser = new DOMParser()
      return parser.parseFromString(str, 'application/xml')
    }
  }

  //last resort fallback
  return function(str) {
    var div = document.createElement('div')
    div.innerHTML = str
    return div
  }
})()
