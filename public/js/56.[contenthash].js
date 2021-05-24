webpackJsonp([56],{

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(359)
}
var normalizeComponent = __webpack_require__(226)
/* script */
var __vue_script__ = __webpack_require__(361)
/* template */
var __vue_template__ = __webpack_require__(362)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/Pages/Dashboard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-097ba13b", Component.options)
  } else {
    hotAPI.reload("data-v-097ba13b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 226:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(228)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 228:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(230)
}
var normalizeComponent = __webpack_require__(226)
/* script */
var __vue_script__ = __webpack_require__(232)
/* template */
var __vue_template__ = __webpack_require__(233)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/Shared/AppFooter.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-47d87520", Component.options)
  } else {
    hotAPI.reload("data-v-47d87520", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(231);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(227)("03a0949b", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-47d87520\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AppFooter.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-47d87520\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AppFooter.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(148)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "AppFooter"
});

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.$page.configData.mainLayoutType == "horizontal"
      ? _c("footer", {
          staticClass: "footer footer-light navbar-shadow",
          class: _vm.$page.configData.footerType
        })
      : _c(
          "footer",
          {
            staticClass: "footer footer-light",
            class: _vm.$page.configData.footerType
          },
          [_vm._m(0)]
        )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "clearfix blue-grey lighten-2 mb-0" }, [
      _c(
        "span",
        { staticClass: "float-md-left d-block d-md-inline-block mt-25" },
        [
          _vm._v("COPYRIGHT © 2019\r\n\t\t\t\t"),
          _c(
            "a",
            {
              staticClass: "text-bold-800 grey darken-2",
              attrs: { href: "http://teammahal.info/", target: "_blank" }
            },
            [_vm._v("Team Mahal,")]
          ),
          _vm._v("\r\n\t\t\t\tAll rights Reserved\r\n\t\t\t")
        ]
      ),
      _vm._v(" "),
      _c("span", { staticClass: "float-md-right d-none d-md-block" }, [
        _vm._v("Hand-crafted & Made with"),
        _c("i", { staticClass: "feather icon-heart pink" })
      ]),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "btn btn-primary btn-icon scroll-top",
          attrs: { type: "button" }
        },
        [_c("i", { staticClass: "feather icon-arrow-up" })]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-47d87520", module.exports)
  }
}

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(235)
}
var normalizeComponent = __webpack_require__(226)
/* script */
var __vue_script__ = __webpack_require__(237)
/* template */
var __vue_template__ = __webpack_require__(251)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/Shared/Layout.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6bf30086", Component.options)
  } else {
    hotAPI.reload("data-v-6bf30086", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(236);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(227)("24565851", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6bf30086\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Layout.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6bf30086\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Layout.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(148)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sidebar__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sidebar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Sidebar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Navbar__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Navbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Navbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppFooter__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppFooter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__AppFooter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Breadcrumb__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Breadcrumb___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Breadcrumb__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Layout",
  components: {
    Breadcrumb: __WEBPACK_IMPORTED_MODULE_3__Breadcrumb___default.a,
    AppFooter: __WEBPACK_IMPORTED_MODULE_2__AppFooter___default.a,
    Navbar: __WEBPACK_IMPORTED_MODULE_1__Navbar___default.a,
    Sidebar: __WEBPACK_IMPORTED_MODULE_0__Sidebar___default.a
  },
  created: function created() {},
  methods: {
    url: function url() {
      return location.pathname.substr(1);
    },
    hideDropdownMenus: function hideDropdownMenus() {
      this.showUserMenu = false;
    }
  }
});

/***/ }),

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(239)
}
var normalizeComponent = __webpack_require__(226)
/* script */
var __vue_script__ = __webpack_require__(241)
/* template */
var __vue_template__ = __webpack_require__(242)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/Shared/Sidebar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f6a89ea0", Component.options)
  } else {
    hotAPI.reload("data-v-f6a89ea0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(240);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(227)("880366ac", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f6a89ea0\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Sidebar.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f6a89ea0\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Sidebar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(148)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Sidebar",
  props: {
    url: String
  },
  methods: {
    isUrl: function isUrl() {
      var _this = this;

      for (var _len = arguments.length, urls = new Array(_len), _key = 0; _key < _len; _key++) {
        urls[_key] = arguments[_key];
      }

      if (urls[0] === '') {
        return this.url === '';
      }

      return urls.filter(function (url) {
        return _this.url.startsWith(url);
      }).length;
    }
  }
});

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "main-menu menu-accordion menu-shadow",
      class:
        _vm.$page.configData.menuType +
        " " +
        [_vm.$page.configData.theme === "light" ? "menu-light" : "menu-dark"],
      attrs: { "data-scroll-to-active": "true" }
    },
    [
      _c("div", { staticClass: "navbar-header" }, [
        _c(
          "ul",
          {
            staticClass: "nav navbar-nav flex-row",
            staticStyle: {
              "background-image": "url(/images/logo/logo.png)",
              "background-size": "contain",
              "background-repeat": "no-repeat"
            }
          },
          [
            _c(
              "li",
              { staticClass: "nav-item mr-auto" },
              [
                _c("inertia-link", {
                  staticClass: "navbar-brand",
                  attrs: { href: "/dashboard" }
                })
              ],
              1
            ),
            _vm._v(" "),
            _vm._m(0)
          ]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "shadow-bottom" }),
      _vm._v(" "),
      _c("div", { staticClass: "main-menu-content" }, [
        _c(
          "ul",
          {
            staticClass: "navigation navigation-main",
            attrs: {
              id: "main-menu-navigation",
              "data-menu": "menu-navigation"
            }
          },
          [
            _c(
              "li",
              { staticClass: "nav-item" },
              [
                _c("inertia-link", { attrs: { href: "/" } }, [
                  _c("i", { staticClass: "feather icon-home" }),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                    [_vm._v(_vm._s(_vm.__("Dashboard")))]
                  )
                ])
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "li",
              { staticClass: "nav-item" },
              [
                _c(
                  "inertia-link",
                  {
                    class: _vm.isUrl("brand") ? "active" : "",
                    attrs: { href: _vm.route("brand.index") }
                  },
                  [
                    _c("i", { staticClass: "feather icon-home" }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "menu-title nav-link-text",
                        attrs: { "data-i18n": "" }
                      },
                      [_vm._v(_vm._s(_vm.__("Brand")))]
                    )
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "li",
              { staticClass: "nav-item" },
              [
                _c(
                  "inertia-link",
                  {
                    class: _vm.isUrl("category") ? "active" : "",
                    attrs: { href: _vm.route("category.index") }
                  },
                  [
                    _c("i", { staticClass: "feather icon-home" }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "menu-title nav-link-text",
                        attrs: { "data-i18n": "" }
                      },
                      [_vm._v(_vm._s(_vm.__("Category")))]
                    )
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "li",
              { staticClass: "nav-item" },
              [
                _c(
                  "inertia-link",
                  {
                    class: _vm.isUrl("product") ? "active" : "",
                    attrs: { href: _vm.route("product.index") }
                  },
                  [
                    _c("i", { staticClass: "feather icon-home" }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "menu-title nav-link-text",
                        attrs: { "data-i18n": "" }
                      },
                      [_vm._v(_vm._s(_vm.__("Product")))]
                    )
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "li",
              { staticClass: "nav-item" },
              [
                _c(
                  "inertia-link",
                  {
                    class: _vm.isUrl("package") ? "active" : "",
                    attrs: { href: _vm.route("package.index") }
                  },
                  [
                    _c("i", { staticClass: "feather icon-home" }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "menu-title nav-link-text",
                        attrs: { "data-i18n": "" }
                      },
                      [_vm._v(_vm._s(_vm.__("Package")))]
                    )
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "li",
              { staticClass: "nav-item" },
              [
                _c(
                  "inertia-link",
                  {
                    class: _vm.isUrl("paymentmethod") ? "active" : "",
                    attrs: { href: _vm.route("paymentmethod.index") }
                  },
                  [
                    _c("i", { staticClass: "feather icon-home" }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "menu-title nav-link-text",
                        attrs: { "data-i18n": "" }
                      },
                      [_vm._v(_vm._s(_vm.__("Payment Method")))]
                    )
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "li",
              { staticClass: "nav-item" },
              [
                _c(
                  "inertia-link",
                  {
                    class: _vm.isUrl("banner") ? "active" : "",
                    attrs: { href: _vm.route("banner.index") }
                  },
                  [
                    _c("i", { staticClass: "feather icon-home" }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "menu-title nav-link-text",
                        attrs: { "data-i18n": "" }
                      },
                      [_vm._v(_vm._s(_vm.__("Banner")))]
                    )
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "li",
              { staticClass: "nav-item" },
              [
                _c(
                  "inertia-link",
                  {
                    class: _vm.isUrl("transaction") ? "active" : "",
                    attrs: { href: _vm.route("transaction.index") }
                  },
                  [
                    _c("i", { staticClass: "feather icon-home" }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "menu-title nav-link-text",
                        attrs: { "data-i18n": "" }
                      },
                      [_vm._v(_vm._s(_vm.__("Transaction")))]
                    )
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "li",
              { staticClass: "nav-item" },
              [
                _c(
                  "inertia-link",
                  {
                    class: _vm.isUrl("order") ? "active" : "",
                    attrs: { href: _vm.route("order.index") }
                  },
                  [
                    _c("i", { staticClass: "feather icon-home" }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "menu-title nav-link-text",
                        attrs: { "data-i18n": "" }
                      },
                      [_vm._v(_vm._s(_vm.__("Order")))]
                    )
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "li",
              { staticClass: "nav-item" },
              [
                _c(
                  "inertia-link",
                  {
                    class: _vm.isUrl("user") ? "active" : "",
                    attrs: { href: _vm.route("users.index") }
                  },
                  [
                    _c("i", { staticClass: "feather icon-users" }),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                      [_vm._v(_vm._s(_vm.__("Users")))]
                    )
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "li",
              { staticClass: "nav-item" },
              [
                _c(
                  "inertia-link",
                  {
                    class: _vm.isUrl("notice") ? "active" : "",
                    attrs: { href: _vm.route("notice.index") }
                  },
                  [
                    _c("i", { staticClass: "feather icon-users" }),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "menu-title", attrs: { "data-i18n": "" } },
                      [_vm._v(_vm._s(_vm.__("Notice")))]
                    )
                  ]
                )
              ],
              1
            ),
            _vm._v(" "),
            _c("li", { staticClass: "nav-item" }, [
              _vm._m(1),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "collapse show-test",
                  attrs: { id: "navbar-examples" }
                },
                [
                  _c("ul", { staticClass: "nav nav-sm flex-column" }, [
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          { attrs: { href: _vm.route("brand.index") } },
                          [
                            _c("i", { staticClass: "feather icon-brands" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Brand")))]
                            )
                          ]
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "li",
                      { staticClass: "nav-item" },
                      [
                        _c(
                          "inertia-link",
                          { attrs: { href: _vm.route("category.index") } },
                          [
                            _c("i", { staticClass: "feather icon-brands" }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass: "menu-title",
                                attrs: { "data-i18n": "" }
                              },
                              [_vm._v(_vm._s(_vm.__("Category")))]
                            )
                          ]
                        )
                      ],
                      1
                    )
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _vm.$can("subscription_access")
              ? _c(
                  "li",
                  { staticClass: "nav-item" },
                  [
                    _c(
                      "inertia-link",
                      { attrs: { href: _vm.route("subscriptions.index") } },
                      [
                        _c("i", { staticClass: "feather icon-users" }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "menu-title",
                            attrs: { "data-i18n": "" }
                          },
                          [_vm._v(_vm._s(_vm.__("Subscription")))]
                        )
                      ]
                    )
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm._m(2),
            _vm._v(" "),
            _vm.$can("role_access")
              ? _c(
                  "li",
                  { staticClass: "nav-item" },
                  [
                    _c(
                      "inertia-link",
                      { attrs: { href: _vm.route("roles.index") } },
                      [
                        _c("i", { staticClass: "feather icon-unlock" }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "menu-title",
                            attrs: { "data-i18n": "" }
                          },
                          [_vm._v(_vm._s(_vm.__("Role")))]
                        )
                      ]
                    )
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.$can("permission_access")
              ? _c(
                  "li",
                  { staticClass: "nav-item" },
                  [
                    _c(
                      "inertia-link",
                      { attrs: { href: _vm.route("permissions.index") } },
                      [
                        _c("i", { staticClass: "feather icon-unlock" }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "menu-title",
                            attrs: { "data-i18n": "" }
                          },
                          [_vm._v(_vm._s(_vm.__("Permission")))]
                        )
                      ]
                    )
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.$can("gender_access")
              ? _c(
                  "li",
                  { staticClass: "nav-item" },
                  [
                    _c(
                      "inertia-link",
                      { attrs: { href: _vm.route("genders.index") } },
                      [
                        _c("i", { staticClass: "feather icon-unlock" }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "menu-title",
                            attrs: { "data-i18n": "" }
                          },
                          [_vm._v(_vm._s(_vm.__("Gender")))]
                        )
                      ]
                    )
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.$can("religion_access")
              ? _c(
                  "li",
                  { staticClass: "nav-item" },
                  [
                    _c(
                      "inertia-link",
                      { attrs: { href: _vm.route("religions.index") } },
                      [
                        _c("i", { staticClass: "feather icon-unlock" }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "menu-title",
                            attrs: { "data-i18n": "" }
                          },
                          [_vm._v(_vm._s(_vm.__("Religion")))]
                        )
                      ]
                    )
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.$can("blood_group_access")
              ? _c(
                  "li",
                  { staticClass: "nav-item" },
                  [
                    _c(
                      "inertia-link",
                      { attrs: { href: _vm.route("blood-groups.index") } },
                      [
                        _c("i", { staticClass: "feather icon-unlock" }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "menu-title",
                            attrs: { "data-i18n": "" }
                          },
                          [_vm._v(_vm._s(_vm.__("Blood Group")))]
                        )
                      ]
                    )
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm._m(3),
            _vm._v(" "),
            _vm.$can("shop_access")
              ? _c(
                  "li",
                  { staticClass: "nav-item" },
                  [
                    _c(
                      "inertia-link",
                      { attrs: { href: _vm.route("shops.index") } },
                      [
                        _c("i", { staticClass: "feather icon-unlock" }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "menu-title",
                            attrs: { "data-i18n": "" }
                          },
                          [_vm._v(_vm._s(_vm.__("Shops")))]
                        )
                      ]
                    )
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm._m(4),
            _vm._v(" "),
            _vm.$can("invoice_type_access")
              ? _c(
                  "li",
                  { staticClass: "nav-item" },
                  [
                    _c(
                      "inertia-link",
                      { attrs: { href: _vm.route("invoice-types.index") } },
                      [
                        _c("i", { staticClass: "feather icon-unlock" }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "menu-title",
                            attrs: { "data-i18n": "" }
                          },
                          [_vm._v(_vm._s(_vm.__("Invoice Types")))]
                        )
                      ]
                    )
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.$can("branch_access")
              ? _c(
                  "li",
                  { staticClass: "nav-item" },
                  [
                    _c(
                      "inertia-link",
                      { attrs: { href: _vm.route("shops.branches.index") } },
                      [
                        _c("i", { staticClass: "feather icon-unlock" }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "menu-title",
                            attrs: { "data-i18n": "" }
                          },
                          [_vm._v(_vm._s(_vm.__("Branchs")))]
                        )
                      ]
                    )
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.$can("customer_access")
              ? _c(
                  "li",
                  { staticClass: "nav-item" },
                  [
                    _c(
                      "inertia-link",
                      { attrs: { href: _vm.route("customers.index") } },
                      [
                        _c("i", { staticClass: "feather icon-unlock" }),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "menu-title",
                            attrs: { "data-i18n": "" }
                          },
                          [_vm._v(_vm._s(_vm.__("Customers")))]
                        )
                      ]
                    )
                  ],
                  1
                )
              : _vm._e()
          ]
        )
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", { staticClass: "nav-item nav-toggle" }, [
      _c(
        "a",
        {
          staticClass: "nav-link modern-nav-toggle pr-0",
          attrs: { "data-toggle": "collapse" }
        },
        [
          _c("i", {
            staticClass:
              "feather icon-x d-block d-xl-none font-medium-4 primary toggle-icon"
          }),
          _c("i", {
            staticClass:
              "toggle-icon feather icon-disc font-medium-4 d-none d-xl-block primary collapse-toggle-icon",
            attrs: { "data-ticon": "icon-disc" }
          })
        ]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "a",
      {
        staticClass: "nav-link",
        attrs: {
          href: "#navbar-examples",
          "data-toggle": "collapse",
          role: "button",
          "aria-expanded": "true",
          "aria-controls": "navbar-examples",
          "data-value": "navbar-examples"
        }
      },
      [
        _c("i", {
          staticClass: "feather icon-settings",
          staticStyle: { color: "#8B81F2" }
        }),
        _vm._v(" "),
        _c(
          "span",
          { staticClass: "nav-link-text", staticStyle: { color: "#8B81F2" } },
          [_vm._v("Setup")]
        )
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", { staticClass: "navigation-header" }, [
      _c("span", [_vm._v("Settings")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", { staticClass: "navigation-header" }, [
      _c("span", [_vm._v("Configration")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", { staticClass: "navigation-header" }, [
      _c("span", [_vm._v("Setup")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f6a89ea0", module.exports)
  }
}

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(226)
/* script */
var __vue_script__ = __webpack_require__(244)
/* template */
var __vue_template__ = __webpack_require__(245)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/Shared/Navbar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4af43e6c", Component.options)
  } else {
    hotAPI.reload("data-v-4af43e6c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Navbar",
  methods: {
    logout: function logout() {
      this.$inertia.post(this.route('logout'));
    }
  }
});

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.$page.configData.mainLayoutType == "horizontal"
      ? _c(
          "nav",
          {
            staticClass:
              "header-navbar navbar-expand-lg navbar navbar-with-menu navbar-fixed",
            class: _vm.$page.configData.navbarColor
          },
          [_vm._m(0)]
        )
      : _c(
          "nav",
          {
            staticClass:
              "header-navbar navbar-expand-lg navbar navbar-with-menu navbar-light navbar-shadow",
            class:
              _vm.$page.configData.navbarClass +
              " " +
              _vm.$page.configData.navbarColor
          },
          [
            _c("div", { staticClass: "navbar-wrapper" }, [
              _c("div", { staticClass: "navbar-container content" }, [
                _c(
                  "div",
                  {
                    staticClass: "navbar-collapse",
                    attrs: { id: "navbar-mobile" }
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass:
                          "mr-auto float-left bookmark-wrapper d-flex align-items-center"
                      },
                      [
                        _vm._m(1),
                        _vm._v(" "),
                        _c("ul", { staticClass: "nav navbar-nav" }, [
                          _vm.$page.app
                            ? _c(
                                "li",
                                {
                                  staticClass:
                                    "nav-item d-none d-lg-block app-title"
                                },
                                [
                                  _c("a", { staticClass: "bookmark-star" }, [
                                    _c("i", {
                                      staticClass:
                                        "ficon feather icon-star warning"
                                    }),
                                    _vm._v(
                                      " " +
                                        _vm._s(
                                          _vm.$page.app
                                            ? _vm.$page.app.name
                                            : ""
                                        )
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _vm._m(2)
                                ]
                              )
                            : _vm._e()
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c("ul", { staticClass: "nav navbar-nav float-right" }, [
                      _c(
                        "li",
                        { staticClass: "dropdown dropdown-language nav-item" },
                        [
                          _c(
                            "a",
                            {
                              staticClass: "dropdown-toggle nav-link",
                              attrs: {
                                id: "dropdown-flag",
                                href: "#",
                                "data-toggle": "dropdown",
                                "aria-haspopup": "true",
                                "aria-expanded": "false"
                              }
                            },
                            [
                              _c("span", { staticClass: "selected-language" }, [
                                _vm._v(_vm._s(_vm.currentLanguage()))
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "dropdown-menu",
                              attrs: { "aria-labelledby": "dropdown-flag" }
                            },
                            [
                              _c(
                                "inertia-link",
                                {
                                  staticClass: "dropdown-item",
                                  attrs: {
                                    href: _vm.current() + "?lang=en",
                                    "data-language": "en"
                                  }
                                },
                                [_vm._v(" English")]
                              ),
                              _vm._v(" "),
                              _c(
                                "inertia-link",
                                {
                                  staticClass: "dropdown-item",
                                  attrs: {
                                    href: _vm.current() + "?lang=bn",
                                    "data-language": "bn"
                                  }
                                },
                                [_vm._v(" বাংলা")]
                              )
                            ],
                            1
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _vm._m(3),
                      _vm._v(" "),
                      _vm._m(4),
                      _vm._v(" "),
                      _c(
                        "li",
                        { staticClass: "dropdown dropdown-user nav-item" },
                        [
                          _c(
                            "a",
                            {
                              staticClass:
                                "dropdown-toggle nav-link dropdown-user-link",
                              attrs: { href: "#", "data-toggle": "dropdown" }
                            },
                            [
                              _c(
                                "div",
                                { staticClass: "user-nav d-sm-flex d-none" },
                                [
                                  _c(
                                    "span",
                                    { staticClass: "user-name text-bold-600" },
                                    [_vm._v(_vm._s(_vm.$page.auth.name))]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _vm._m(5)
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "dropdown-menu dropdown-menu-right"
                            },
                            [
                              _c(
                                "a",
                                {
                                  staticClass: "dropdown-item",
                                  attrs: {
                                    href: _vm.route(
                                      "users.show",
                                      _vm.$page.auth.slug
                                    )
                                  }
                                },
                                [
                                  _c("i", { staticClass: "feather icon-user" }),
                                  _vm._v(" Profile\r\n\t\t\t\t\t\t\t\t")
                                ]
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "dropdown-divider" }),
                              _vm._v(" "),
                              _c(
                                "a",
                                {
                                  staticClass: "dropdown-item",
                                  on: { click: _vm.logout }
                                },
                                [
                                  _c("i", {
                                    staticClass: "feather icon-power"
                                  }),
                                  _vm._v(" Logout")
                                ]
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  ]
                )
              ])
            ])
          ]
        )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "navbar-header d-xl-block d-none" }, [
      _c("ul", { staticClass: "nav navbar-nav flex-row" }, [
        _c("li", { staticClass: "nav-item" }, [
          _c(
            "a",
            {
              staticClass: "navbar-brand",
              attrs: { href: "dashboard-analytics" }
            },
            [_c("div", { staticClass: "brand-logo" })]
          )
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ul", { staticClass: "nav navbar-nav" }, [
      _c("li", { staticClass: "nav-item mobile-menu d-xl-none mr-auto" }, [
        _c(
          "a",
          {
            staticClass: "nav-link nav-menu-main menu-toggle hidden-xs",
            attrs: { href: "#" }
          },
          [_c("i", { staticClass: "ficon feather icon-menu" })]
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "bookmark-input search-input" }, [
      _c("div", { staticClass: "bookmark-input-icon" }, [
        _c("i", { staticClass: "feather icon-search primary" })
      ]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control input",
        attrs: {
          type: "text",
          placeholder: "Explore Vuexy...",
          tabindex: "0",
          "data-search": "laravel-starter-list"
        }
      }),
      _vm._v(" "),
      _c("ul", { staticClass: "search-list search-list-bookmark" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("li", { staticClass: "nav-item d-none d-lg-block" }, [
      _c("a", { staticClass: "nav-link nav-link-expand" }, [
        _c("i", { staticClass: "ficon feather icon-maximize" })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "li",
      { staticClass: "dropdown dropdown-notification nav-item" },
      [
        _c(
          "a",
          {
            staticClass: "nav-link nav-link-label",
            attrs: { href: "#", "data-toggle": "dropdown" }
          },
          [
            _c("i", { staticClass: "ficon feather icon-bell" }),
            _c(
              "span",
              { staticClass: "badge badge-pill badge-primary badge-up" },
              [_vm._v("5")]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "ul",
          {
            staticClass: "dropdown-menu dropdown-menu-media dropdown-menu-right"
          },
          [
            _c("li", { staticClass: "dropdown-menu-header" }, [
              _c("div", { staticClass: "dropdown-header m-0 p-2" }, [
                _c("h3", { staticClass: "white" }, [_vm._v("5 New")]),
                _c("span", { staticClass: "grey darken-2" }, [
                  _vm._v("App Notifications")
                ])
              ])
            ]),
            _vm._v(" "),
            _c("li", { staticClass: "scrollable-container media-list" }, [
              _c(
                "a",
                {
                  staticClass: "d-flex justify-content-between",
                  attrs: { href: "javascript:void(0)" }
                },
                [
                  _c("div", { staticClass: "media d-flex align-items-start" }, [
                    _c("div", { staticClass: "media-left" }, [
                      _c("i", {
                        staticClass:
                          "feather icon-download-cloud font-medium-5 success"
                      })
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "media-body" }, [
                      _c(
                        "h6",
                        { staticClass: "success media-heading red darken-1" },
                        [_vm._v("99% Server load")]
                      ),
                      _vm._v(" "),
                      _c("small", { staticClass: "notification-text" }, [
                        _vm._v("You got new order of goods.")
                      ])
                    ]),
                    _vm._v(" "),
                    _c("small", [
                      _c(
                        "time",
                        {
                          staticClass: "media-meta",
                          attrs: { datetime: "2015-06-11T18:29:20+08:00" }
                        },
                        [_vm._v("5 hour ago")]
                      )
                    ])
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c("li", { staticClass: "dropdown-menu-footer" }, [
              _c(
                "a",
                {
                  staticClass: "dropdown-item p-1 text-center",
                  attrs: { href: "javascript:void(0)" }
                },
                [_vm._v("Read all notifications")]
              )
            ])
          ]
        )
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", [
      _c("img", {
        staticClass: "round",
        attrs: {
          src: "/images/profile/user-uploads/user-09.jpg",
          alt: "avatar",
          height: "40",
          width: "40"
        }
      })
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4af43e6c", module.exports)
  }
}

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(247)
}
var normalizeComponent = __webpack_require__(226)
/* script */
var __vue_script__ = __webpack_require__(249)
/* template */
var __vue_template__ = __webpack_require__(250)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/Shared/Breadcrumb.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6984c242", Component.options)
  } else {
    hotAPI.reload("data-v-6984c242", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(248);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(227)("c3dd8234", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6984c242\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Breadcrumb.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6984c242\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Breadcrumb.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(148)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Breadcrumb"
});

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "content-header row" }, [
    _c("div", { staticClass: "content-header-left col-md-9 col-12 mb-2" }, [
      _c("div", { staticClass: "row breadcrumbs-top" }, [
        _c("div", { staticClass: "col-12" }, [
          _c("h2", { staticClass: "content-header-title float-left mb-0" }),
          _vm._v(" "),
          _c("div", { staticClass: "breadcrumb-wrapper col-12" }, [
            _vm.$page.breadcrumbs
              ? _c(
                  "ol",
                  { staticClass: "breadcrumb" },
                  _vm._l(_vm.$page.breadcrumbs, function(breadcrumb) {
                    return _c(
                      "li",
                      { staticClass: "breadcrumb-item" },
                      [
                        breadcrumb.link
                          ? _c(
                              "inertia-link",
                              { attrs: { href: breadcrumb.link } },
                              [
                                _vm._v(
                                  "\n                " +
                                    _vm._s(breadcrumb.name) +
                                    "\n              "
                                )
                              ]
                            )
                          : _c("span", [_vm._v(_vm._s(breadcrumb.name))])
                      ],
                      1
                    )
                  }),
                  0
                )
              : _vm._e()
          ])
        ])
      ])
    ]),
    _vm._v(" "),
    _vm.$page.has_modal
      ? _c(
          "div",
          {
            staticClass:
              "content-header-right text-md-right col-md-3 col-12 d-md-block d-none"
          },
          [_vm._m(0)]
        )
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "btn-icon waves-effect waves-light btn btn-primary btn-sm",
        attrs: {
          "data-toggle": "modal",
          "data-target": "#default",
          type: "button"
        }
      },
      [
        _c("i", { staticClass: "feather icon-plus-circle" }),
        _vm._v(" New\n    ")
      ]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6984c242", module.exports)
  }
}

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "app" } },
    [
      _c("sidebar", { attrs: { url: _vm.url() } }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "app-content content" },
        [
          _c("div", { staticClass: "content-overlay" }),
          _vm._v(" "),
          _c("div", { staticClass: "header-navbar-shadow" }),
          _vm._v(" "),
          _c("navbar"),
          _vm._v(" "),
          _vm.$page.configData.contentLayout
            ? _c("div", { staticClass: "content-area-wrapper" }, [
                _c(
                  "div",
                  { class: _vm.$page.configData.sidebarPositionClass },
                  [
                    _c(
                      "div",
                      { staticClass: "sidebar" },
                      [_vm._t("default")],
                      2
                    )
                  ]
                ),
                _vm._v(" "),
                _c("div", { class: _vm.$page.configData.contentsidebarClass }, [
                  _c("div", { staticClass: "content-wrapper" }, [
                    _c(
                      "div",
                      { staticClass: "content-body" },
                      [_vm._t("default")],
                      2
                    )
                  ])
                ])
              ])
            : _c("div", { staticClass: "content-wrapper" }, [
                _vm.$page.configData.pageHeader == true
                  ? _c("div", [_c("breadcrumb")], 1)
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "content-body" },
                  [_vm._t("default")],
                  2
                )
              ])
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "sidenav-overlay" }),
      _vm._v(" "),
      _c("div", { staticClass: "drag-target" }),
      _vm._v(" "),
      _c("app-footer")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6bf30086", module.exports)
  }
}

/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(360);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(227)("31d9575e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-097ba13b\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Dashboard.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-097ba13b\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Dashboard.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 360:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(148)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shared_Layout__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shared_Layout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Shared_Layout__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Dashboard",
  components: {
    Layout: __WEBPACK_IMPORTED_MODULE_0__Shared_Layout___default.a
  },
  props: ['msg', 'users', 'orders']
});

/***/ }),

/***/ 362:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("layout", { attrs: { name: "Dashboard" } }, [
    _c("section", { attrs: { id: "dashboard-analytics" } }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-lg-6 col-md-12 col-sm-12" }, [
          _c("div", { staticClass: "card bg-analytics text-white" }, [
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "card-body text-center" }, [
                _c("img", {
                  staticClass: "img-left",
                  attrs: {
                    src: "/images/elements/decore-left.png",
                    alt: "card-img-left"
                  }
                }),
                _vm._v(" "),
                _c("img", {
                  staticClass: "img-right",
                  attrs: {
                    src: "/images/elements/decore-right.png",
                    alt: "card-img-right"
                  }
                }),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "avatar avatar-xl bg-primary shadow mt-0" },
                  [
                    _c("div", { staticClass: "avatar-content" }, [
                      _c("i", {
                        staticClass: "feather icon-award white font-large-1"
                      })
                    ])
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "text-center" }, [
                  _c("h1", { staticClass: "mb-2 text-white" }, [
                    _vm._v(
                      _vm._s(_vm.__("Congratulations")) +
                        " " +
                        _vm._s(_vm.$page.auth.name) +
                        ","
                    )
                  ])
                ])
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-lg-3 col-md-6 col-12" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-header d-flex flex-column align-items-start pb-0"
              },
              [
                _c("div", { staticClass: "avatar bg-rgba-primary p-50 m-0" }, [
                  _c("div", { staticClass: "avatar-content" }, [
                    _c("i", {
                      staticClass:
                        "feather icon-users text-primary font-medium-5"
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("h2", { staticClass: "text-bold-700 mt-1 mb-25" }, [
                  _vm._v(_vm._s(_vm.users))
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "mb-0" }, [_vm._v("Users Gained")])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { attrs: { id: "subscribe-gain-chart" } })
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-lg-3 col-md-6 col-12" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-header d-flex flex-column align-items-start pb-0"
              },
              [
                _c("div", { staticClass: "avatar bg-rgba-primary p-50 m-0" }, [
                  _c("div", { staticClass: "avatar-content" }, [
                    _c("i", {
                      staticClass:
                        "feather icon-users text-primary font-medium-5"
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("h2", { staticClass: "text-bold-700 mt-1 mb-25" }, [
                  _vm._v(_vm._s(_vm.usertoday))
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "mb-0" }, [_vm._v("Users Today")])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { attrs: { id: "subscribe-gain-chart" } })
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-lg-3 col-md-6 col-12" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-header d-flex flex-column align-items-start pb-0"
              },
              [
                _c("div", { staticClass: "avatar bg-rgba-primary p-50 m-0" }, [
                  _c("div", { staticClass: "avatar-content" }, [
                    _c("i", {
                      staticClass:
                        "feather icon-users text-primary font-medium-5"
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("h2", { staticClass: "text-bold-700 mt-1 mb-25" }, [
                  _vm._v(_vm._s(_vm.ordertoday))
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "mb-0" }, [_vm._v("Today Orders")])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { attrs: { id: "subscribe-gain-chart" } })
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-lg-3 col-md-6 col-12" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-header d-flex flex-column align-items-start pb-0"
              },
              [
                _c("div", { staticClass: "avatar bg-rgba-primary p-50 m-0" }, [
                  _c("div", { staticClass: "avatar-content" }, [
                    _c("i", {
                      staticClass:
                        "feather icon-users text-primary font-medium-5"
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("h2", { staticClass: "text-bold-700 mt-1 mb-25" }, [
                  _vm._v(_vm._s(_vm.wallet))
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "mb-0" }, [_vm._v("Wallet")])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { attrs: { id: "subscribe-gain-chart" } })
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-lg-3 col-md-6 col-12" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-header d-flex flex-column align-items-start pb-0"
              },
              [
                _c("div", { staticClass: "avatar bg-rgba-warning p-50 m-0" }, [
                  _c("div", { staticClass: "avatar-content" }, [
                    _c("i", {
                      staticClass:
                        "feather icon-package text-warning font-medium-5"
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("h2", { staticClass: "text-bold-700 mt-1 mb-25" }, [
                  _vm._v(_vm._s(_vm.orders))
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "mb-0" }, [_vm._v("Orders Received")])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { attrs: { id: "orders-received-chart" } })
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-6 col-12" }, [
          _c("div", { staticClass: "card" }, [
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "row pb-50" }, [
                  _c(
                    "div",
                    {
                      staticClass:
                        "col-lg-6 col-12 d-flex justify-content-between flex-column order-lg-1 order-2 mt-lg-0 mt-2"
                    },
                    [
                      _c("div", [
                        _c("h2", { staticClass: "text-bold-700 mb-25" }, [
                          _vm._v("2.7K")
                        ]),
                        _vm._v(" "),
                        _c("p", { staticClass: "text-bold-500 mb-75" }, [
                          _vm._v("Avg Sessions")
                        ]),
                        _vm._v(" "),
                        _c("h5", { staticClass: "font-medium-2" }, [
                          _c("span", { staticClass: "text-success" }, [
                            _vm._v("+5.2% ")
                          ]),
                          _vm._v(" "),
                          _c("span", [_vm._v("vs last 7 days")])
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "a",
                        {
                          staticClass: "btn btn-primary shadow",
                          attrs: { href: "#" }
                        },
                        [
                          _vm._v("View Details "),
                          _c("i", {
                            staticClass: "feather icon-chevrons-right"
                          })
                        ]
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "col-lg-6 col-12 d-flex justify-content-between flex-column text-right order-lg-2 order-1"
                    },
                    [
                      _c("div", { staticClass: "dropdown chart-dropdown" }, [
                        _c(
                          "button",
                          {
                            staticClass:
                              "btn btn-sm border-0 dropdown-toggle p-0",
                            attrs: {
                              type: "button",
                              id: "dropdownItem5",
                              "data-toggle": "dropdown",
                              "aria-haspopup": "true",
                              "aria-expanded": "false"
                            }
                          },
                          [
                            _vm._v(
                              "\n\t\t\t\t\t\t\t\t\t\t\tLast 7 Days\n\t\t\t\t\t\t\t\t\t\t"
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "dropdown-menu dropdown-menu-right",
                            attrs: { "aria-labelledby": "dropdownItem5" }
                          },
                          [
                            _c(
                              "a",
                              {
                                staticClass: "dropdown-item",
                                attrs: { href: "#" }
                              },
                              [_vm._v("Last 28 Days")]
                            ),
                            _vm._v(" "),
                            _c(
                              "a",
                              {
                                staticClass: "dropdown-item",
                                attrs: { href: "#" }
                              },
                              [_vm._v("Last Month")]
                            ),
                            _vm._v(" "),
                            _c(
                              "a",
                              {
                                staticClass: "dropdown-item",
                                attrs: { href: "#" }
                              },
                              [_vm._v("Last Year")]
                            )
                          ]
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { attrs: { id: "avg-session-chart" } })
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("hr"),
                _vm._v(" "),
                _c("div", { staticClass: "row avg-sessions pt-50" }, [
                  _c("div", { staticClass: "col-6" }, [
                    _c("p", { staticClass: "mb-0" }, [_vm._v("Goal: $100000")]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "progress progress-bar-primary mt-25" },
                      [
                        _c("div", {
                          staticClass: "progress-bar",
                          staticStyle: { width: "50%" },
                          attrs: {
                            role: "progressbar",
                            "aria-valuenow": "50",
                            "aria-valuemin": "50",
                            "aria-valuemax": "100"
                          }
                        })
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-6" }, [
                    _c("p", { staticClass: "mb-0" }, [_vm._v("Users: 100K")]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "progress progress-bar-warning mt-25" },
                      [
                        _c("div", {
                          staticClass: "progress-bar",
                          staticStyle: { width: "60%" },
                          attrs: {
                            role: "progressbar",
                            "aria-valuenow": "60",
                            "aria-valuemin": "60",
                            "aria-valuemax": "100"
                          }
                        })
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-6" }, [
                    _c("p", { staticClass: "mb-0" }, [
                      _vm._v("Retention: 90%")
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "progress progress-bar-danger mt-25" },
                      [
                        _c("div", {
                          staticClass: "progress-bar",
                          staticStyle: { width: "70%" },
                          attrs: {
                            role: "progressbar",
                            "aria-valuenow": "70",
                            "aria-valuemin": "70",
                            "aria-valuemax": "100"
                          }
                        })
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-6" }, [
                    _c("p", { staticClass: "mb-0" }, [_vm._v("Duration: 1yr")]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "progress progress-bar-success mt-25" },
                      [
                        _c("div", {
                          staticClass: "progress-bar",
                          staticStyle: { width: "90%" },
                          attrs: {
                            role: "progressbar",
                            "aria-valuenow": "90",
                            "aria-valuemin": "90",
                            "aria-valuemax": "100"
                          }
                        })
                      ]
                    )
                  ])
                ])
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6 col-12" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass: "card-header d-flex justify-content-between pb-0"
              },
              [
                _c("h4", { staticClass: "card-title" }, [
                  _vm._v("Support Tracker")
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "dropdown chart-dropdown" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-sm border-0 dropdown-toggle p-0",
                      attrs: {
                        type: "button",
                        id: "dropdownItem4",
                        "data-toggle": "dropdown",
                        "aria-haspopup": "true",
                        "aria-expanded": "false"
                      }
                    },
                    [_vm._v("\n\t\t\t\t\t\t\t\tLast 7 Days\n\t\t\t\t\t\t\t")]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "dropdown-menu dropdown-menu-right",
                      attrs: { "aria-labelledby": "dropdownItem4" }
                    },
                    [
                      _c(
                        "a",
                        { staticClass: "dropdown-item", attrs: { href: "#" } },
                        [_vm._v("Last 28 Days")]
                      ),
                      _vm._v(" "),
                      _c(
                        "a",
                        { staticClass: "dropdown-item", attrs: { href: "#" } },
                        [_vm._v("Last Month")]
                      ),
                      _vm._v(" "),
                      _c(
                        "a",
                        { staticClass: "dropdown-item", attrs: { href: "#" } },
                        [_vm._v("Last Year")]
                      )
                    ]
                  )
                ])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "card-body pt-0" }, [
                _c("div", { staticClass: "row" }, [
                  _c(
                    "div",
                    {
                      staticClass:
                        "col-sm-2 col-12 d-flex flex-column flex-wrap text-center"
                    },
                    [
                      _c(
                        "h1",
                        { staticClass: "font-large-2 text-bold-700 mt-2 mb-0" },
                        [_vm._v("163")]
                      ),
                      _vm._v(" "),
                      _c("small", [_vm._v("Tickets")])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "col-sm-10 col-12 d-flex justify-content-center"
                    },
                    [_c("div", { attrs: { id: "support-tracker-chart" } })]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "chart-info d-flex justify-content-between" },
                  [
                    _c("div", { staticClass: "text-center" }, [
                      _c("p", { staticClass: "mb-50" }, [
                        _vm._v("New Tickets")
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "font-large-1" }, [
                        _vm._v("29")
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "text-center" }, [
                      _c("p", { staticClass: "mb-50" }, [
                        _vm._v("Open Tickets")
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "font-large-1" }, [
                        _vm._v("63")
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "text-center" }, [
                      _c("p", { staticClass: "mb-50" }, [
                        _vm._v("Response Time")
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "font-large-1" }, [
                        _vm._v("1d")
                      ])
                    ])
                  ]
                )
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row match-height" }, [
        _c("div", { staticClass: "col-lg-4 col-12" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass: "card-header d-flex justify-content-between pb-0"
              },
              [
                _c("h4", [_vm._v("Product Orders")]),
                _vm._v(" "),
                _c("div", { staticClass: "dropdown chart-dropdown" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-sm border-0 dropdown-toggle p-0",
                      attrs: {
                        type: "button",
                        id: "dropdownItem2",
                        "data-toggle": "dropdown",
                        "aria-haspopup": "true",
                        "aria-expanded": "false"
                      }
                    },
                    [_vm._v("\n\t\t\t\t\t\t\t\tLast 7 Days\n\t\t\t\t\t\t\t")]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "dropdown-menu dropdown-menu-right",
                      attrs: { "aria-labelledby": "dropdownItem2" }
                    },
                    [
                      _c(
                        "a",
                        { staticClass: "dropdown-item", attrs: { href: "#" } },
                        [_vm._v("Last 28 Days")]
                      ),
                      _vm._v(" "),
                      _c(
                        "a",
                        { staticClass: "dropdown-item", attrs: { href: "#" } },
                        [_vm._v("Last Month")]
                      ),
                      _vm._v(" "),
                      _c(
                        "a",
                        { staticClass: "dropdown-item", attrs: { href: "#" } },
                        [_vm._v("Last Year")]
                      )
                    ]
                  )
                ])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "card-body" }, [
                _c("div", {
                  staticClass: "mb-3",
                  attrs: { id: "product-order-chart" }
                }),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass:
                      "chart-info d-flex justify-content-between mb-1"
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "series-info d-flex align-items-center" },
                      [
                        _c("i", {
                          staticClass:
                            "fa fa-circle-o text-bold-700 text-primary"
                        }),
                        _vm._v(" "),
                        _c("span", { staticClass: "text-bold-600 ml-50" }, [
                          _vm._v("Finished")
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "product-result" }, [
                      _c("span", [_vm._v("23043")])
                    ])
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass:
                      "chart-info d-flex justify-content-between mb-1"
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "series-info d-flex align-items-center" },
                      [
                        _c("i", {
                          staticClass:
                            "fa fa-circle-o text-bold-700 text-warning"
                        }),
                        _vm._v(" "),
                        _c("span", { staticClass: "text-bold-600 ml-50" }, [
                          _vm._v("Pending")
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "product-result" }, [
                      _c("span", [_vm._v("14658")])
                    ])
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass:
                      "chart-info d-flex justify-content-between mb-75"
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "series-info d-flex align-items-center" },
                      [
                        _c("i", {
                          staticClass:
                            "fa fa-circle-o text-bold-700 text-danger"
                        }),
                        _vm._v(" "),
                        _c("span", { staticClass: "text-bold-600 ml-50" }, [
                          _vm._v("Rejected")
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "product-result" }, [
                      _c("span", [_vm._v("4758")])
                    ])
                  ]
                )
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-lg-4 col-12" }, [
          _c("div", { staticClass: "card" }, [
            _c(
              "div",
              {
                staticClass:
                  "card-header d-flex justify-content-between align-items-start"
              },
              [
                _c("div", [
                  _c("h4", { staticClass: "card-title" }, [
                    _vm._v("Sales Stats")
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "text-muted mt-25 mb-0" }, [
                    _vm._v("Last 6 months")
                  ])
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "mb-0" }, [
                  _c("i", {
                    staticClass:
                      "feather icon-more-vertical font-medium-3 text-muted cursor-pointer"
                  })
                ])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "card-body px-0" }, [
                _c("div", { attrs: { id: "sales-chart" } })
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-lg-4 col-12" }, [
          _c("div", { staticClass: "card" }, [
            _c("div", { staticClass: "card-header" }, [
              _c("h4", { staticClass: "card-title" }, [
                _vm._v("Activity Timeline")
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "card-body" }, [
                _c(
                  "ul",
                  {
                    staticClass: "activity-timeline timeline-left list-unstyled"
                  },
                  [
                    _c("li", [
                      _c("div", { staticClass: "timeline-icon bg-primary" }, [
                        _c("i", {
                          staticClass:
                            "feather icon-plus font-medium-2 align-middle"
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "timeline-info" }, [
                        _c("p", { staticClass: "font-weight-bold mb-0" }, [
                          _vm._v("Client Meeting")
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "font-small-3" }, [
                          _vm._v(
                            "Bonbon macaroon jelly beans gummi bears jelly lollipop apple"
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("small", { staticClass: "text-muted" }, [
                        _vm._v("25 mins ago")
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("div", { staticClass: "timeline-icon bg-warning" }, [
                        _c("i", {
                          staticClass:
                            "feather icon-alert-circle font-medium-2 align-middle"
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "timeline-info" }, [
                        _c("p", { staticClass: "font-weight-bold mb-0" }, [
                          _vm._v("Email Newsletter")
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "font-small-3" }, [
                          _vm._v("Cupcake gummi bears soufflé caramels candy")
                        ])
                      ]),
                      _vm._v(" "),
                      _c("small", { staticClass: "text-muted" }, [
                        _vm._v("15 days ago")
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("div", { staticClass: "timeline-icon bg-danger" }, [
                        _c("i", {
                          staticClass:
                            "feather icon-check font-medium-2 align-middle"
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "timeline-info" }, [
                        _c("p", { staticClass: "font-weight-bold mb-0" }, [
                          _vm._v("Plan Webinar")
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "font-small-3" }, [
                          _vm._v("Candy ice cream cake. Halvah gummi bears")
                        ])
                      ]),
                      _vm._v(" "),
                      _c("small", { staticClass: "text-muted" }, [
                        _vm._v("20 days ago")
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("div", { staticClass: "timeline-icon bg-success" }, [
                        _c("i", {
                          staticClass:
                            "feather icon-check font-medium-2 align-middle"
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "timeline-info" }, [
                        _c("p", { staticClass: "font-weight-bold mb-0" }, [
                          _vm._v("Launch Website")
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "font-small-3" }, [
                          _vm._v("Candy ice cream cake. ")
                        ])
                      ]),
                      _vm._v(" "),
                      _c("small", { staticClass: "text-muted" }, [
                        _vm._v("25 days ago")
                      ])
                    ]),
                    _vm._v(" "),
                    _c("li", [
                      _c("div", { staticClass: "timeline-icon bg-primary" }, [
                        _c("i", {
                          staticClass:
                            "feather icon-check font-medium-2 align-middle"
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "timeline-info" }, [
                        _c("p", { staticClass: "font-weight-bold mb-0" }, [
                          _vm._v("Marketing")
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "font-small-3" }, [
                          _vm._v(
                            "Candy ice cream. Halvah bears Cupcake gummi bears."
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("small", { staticClass: "text-muted" }, [
                        _vm._v("28 days ago")
                      ])
                    ])
                  ]
                )
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-12" }, [
          _c("div", { staticClass: "card" }, [
            _c("div", { staticClass: "card-header" }, [
              _c("h4", { staticClass: "mb-0" }, [_vm._v("Dispatched Orders")])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-content" }, [
              _c("div", { staticClass: "table-responsive mt-1" }, [
                _c(
                  "table",
                  { staticClass: "table table-hover-animation mb-0" },
                  [
                    _c("thead", [
                      _c("tr", [
                        _c("th", [_vm._v("ORDER")]),
                        _vm._v(" "),
                        _c("th", [_vm._v("STATUS")]),
                        _vm._v(" "),
                        _c("th", [_vm._v("OPERATORS")]),
                        _vm._v(" "),
                        _c("th", [_vm._v("LOCATION")]),
                        _vm._v(" "),
                        _c("th", [_vm._v("DISTANCE")]),
                        _vm._v(" "),
                        _c("th", [_vm._v("START DATE")]),
                        _vm._v(" "),
                        _c("th", [_vm._v("EST DEL. DT")])
                      ])
                    ]),
                    _vm._v(" "),
                    _c("tbody", [
                      _c("tr", [
                        _c("td", [_vm._v("#879985")]),
                        _vm._v(" "),
                        _c("td", [
                          _c("i", {
                            staticClass:
                              "fa fa-circle font-small-3 text-success mr-50"
                          }),
                          _vm._v("Moving")
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "p-1" }, [
                          _c(
                            "ul",
                            {
                              staticClass:
                                "list-unstyled users-list m-0  d-flex align-items-center"
                            },
                            [
                              _c(
                                "li",
                                {
                                  staticClass: "avatar pull-up",
                                  attrs: {
                                    "data-toggle": "tooltip",
                                    "data-popup": "tooltip-custom",
                                    "data-placement": "bottom",
                                    "data-original-title": "Vinnie Mostowy"
                                  }
                                },
                                [
                                  _c("img", {
                                    staticClass: "media-object rounded-circle",
                                    attrs: {
                                      src:
                                        "/images/portrait/small/avatar-s-11.jpg",
                                      alt: "Avatar",
                                      height: "30",
                                      width: "30"
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "li",
                                {
                                  staticClass: "avatar pull-up",
                                  attrs: {
                                    "data-toggle": "tooltip",
                                    "data-popup": "tooltip-custom",
                                    "data-placement": "bottom",
                                    "data-original-title": "Elicia Rieske"
                                  }
                                },
                                [
                                  _c("img", {
                                    staticClass: "media-object rounded-circle",
                                    attrs: {
                                      src:
                                        "/images/portrait/small/avatar-s-7.jpg",
                                      alt: "Avatar",
                                      height: "30",
                                      width: "30"
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "li",
                                {
                                  staticClass: "avatar pull-up",
                                  attrs: {
                                    "data-toggle": "tooltip",
                                    "data-popup": "tooltip-custom",
                                    "data-placement": "bottom",
                                    "data-original-title": "Julee Rossignol"
                                  }
                                },
                                [
                                  _c("img", {
                                    staticClass: "media-object rounded-circle",
                                    attrs: {
                                      src:
                                        "/images/portrait/small/avatar-s-10.jpg",
                                      alt: "Avatar",
                                      height: "30",
                                      width: "30"
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "li",
                                {
                                  staticClass: "avatar pull-up",
                                  attrs: {
                                    "data-toggle": "tooltip",
                                    "data-popup": "tooltip-custom",
                                    "data-placement": "bottom",
                                    "data-original-title": "Darcey Nooner"
                                  }
                                },
                                [
                                  _c("img", {
                                    staticClass: "media-object rounded-circle",
                                    attrs: {
                                      src:
                                        "/images/portrait/small/avatar-s-8.jpg",
                                      alt: "Avatar",
                                      height: "30",
                                      width: "30"
                                    }
                                  })
                                ]
                              )
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [_vm._v("Anniston, Alabama")]),
                        _vm._v(" "),
                        _c("td", [
                          _c("span", [_vm._v("130 km")]),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "progress progress-bar-success mt-1 mb-0"
                            },
                            [
                              _c("div", {
                                staticClass: "progress-bar",
                                staticStyle: { width: "80%" },
                                attrs: {
                                  role: "progressbar",
                                  "aria-valuenow": "80",
                                  "aria-valuemin": "0",
                                  "aria-valuemax": "100"
                                }
                              })
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [_vm._v("14:58 26/07/2018")]),
                        _vm._v(" "),
                        _c("td", [_vm._v("28/07/2018")])
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("#156897")]),
                        _vm._v(" "),
                        _c("td", [
                          _c("i", {
                            staticClass:
                              "fa fa-circle font-small-3 text-warning mr-50"
                          }),
                          _vm._v("Pending")
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "p-1" }, [
                          _c(
                            "ul",
                            {
                              staticClass:
                                "list-unstyled users-list m-0  d-flex align-items-center"
                            },
                            [
                              _c(
                                "li",
                                {
                                  staticClass: "avatar pull-up",
                                  attrs: {
                                    "data-toggle": "tooltip",
                                    "data-popup": "tooltip-custom",
                                    "data-placement": "bottom",
                                    "data-original-title": "Trina Lynes"
                                  }
                                },
                                [
                                  _c("img", {
                                    staticClass: "media-object rounded-circle",
                                    attrs: {
                                      src:
                                        "/images/portrait/small/avatar-s-1.jpg",
                                      alt: "Avatar",
                                      height: "30",
                                      width: "30"
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "li",
                                {
                                  staticClass: "avatar pull-up",
                                  attrs: {
                                    "data-toggle": "tooltip",
                                    "data-popup": "tooltip-custom",
                                    "data-placement": "bottom",
                                    "data-original-title": "Lilian Nenez"
                                  }
                                },
                                [
                                  _c("img", {
                                    staticClass: "media-object rounded-circle",
                                    attrs: {
                                      src:
                                        "/images/portrait/small/avatar-s-2.jpg",
                                      alt: "Avatar",
                                      height: "30",
                                      width: "30"
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "li",
                                {
                                  staticClass: "avatar pull-up",
                                  attrs: {
                                    "data-toggle": "tooltip",
                                    "data-popup": "tooltip-custom",
                                    "data-placement": "bottom",
                                    "data-original-title": "Alberto Glotzbach"
                                  }
                                },
                                [
                                  _c("img", {
                                    staticClass: "media-object rounded-circle",
                                    attrs: {
                                      src:
                                        "/images/portrait/small/avatar-s-3.jpg",
                                      alt: "Avatar",
                                      height: "30",
                                      width: "30"
                                    }
                                  })
                                ]
                              )
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [_vm._v("Cordova, Alaska")]),
                        _vm._v(" "),
                        _c("td", [
                          _c("span", [_vm._v("234 km")]),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "progress progress-bar-warning mt-1 mb-0"
                            },
                            [
                              _c("div", {
                                staticClass: "progress-bar",
                                staticStyle: { width: "60%" },
                                attrs: {
                                  role: "progressbar",
                                  "aria-valuenow": "60",
                                  "aria-valuemin": "0",
                                  "aria-valuemax": "100"
                                }
                              })
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [_vm._v("14:58 26/07/2018")]),
                        _vm._v(" "),
                        _c("td", [_vm._v("28/07/2018")])
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("#568975")]),
                        _vm._v(" "),
                        _c("td", [
                          _c("i", {
                            staticClass:
                              "fa fa-circle font-small-3 text-success mr-50"
                          }),
                          _vm._v("Moving")
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "p-1" }, [
                          _c(
                            "ul",
                            {
                              staticClass:
                                "list-unstyled users-list m-0  d-flex align-items-center"
                            },
                            [
                              _c(
                                "li",
                                {
                                  staticClass: "avatar pull-up",
                                  attrs: {
                                    "data-toggle": "tooltip",
                                    "data-popup": "tooltip-custom",
                                    "data-placement": "bottom",
                                    "data-original-title": "Lai Lewandowski"
                                  }
                                },
                                [
                                  _c("img", {
                                    staticClass: "media-object rounded-circle",
                                    attrs: {
                                      src:
                                        "/images/portrait/small/avatar-s-6.jpg",
                                      alt: "Avatar",
                                      height: "30",
                                      width: "30"
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "li",
                                {
                                  staticClass: "avatar pull-up",
                                  attrs: {
                                    "data-toggle": "tooltip",
                                    "data-popup": "tooltip-custom",
                                    "data-placement": "bottom",
                                    "data-original-title": "Elicia Rieske"
                                  }
                                },
                                [
                                  _c("img", {
                                    staticClass: "media-object rounded-circle",
                                    attrs: {
                                      src:
                                        "/images/portrait/small/avatar-s-7.jpg",
                                      alt: "Avatar",
                                      height: "30",
                                      width: "30"
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "li",
                                {
                                  staticClass: "avatar pull-up",
                                  attrs: {
                                    "data-toggle": "tooltip",
                                    "data-popup": "tooltip-custom",
                                    "data-placement": "bottom",
                                    "data-original-title": "Darcey Nooner"
                                  }
                                },
                                [
                                  _c("img", {
                                    staticClass: "media-object rounded-circle",
                                    attrs: {
                                      src:
                                        "/images/portrait/small/avatar-s-8.jpg",
                                      alt: "Avatar",
                                      height: "30",
                                      width: "30"
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "li",
                                {
                                  staticClass: "avatar pull-up",
                                  attrs: {
                                    "data-toggle": "tooltip",
                                    "data-popup": "tooltip-custom",
                                    "data-placement": "bottom",
                                    "data-original-title": "Julee Rossignol"
                                  }
                                },
                                [
                                  _c("img", {
                                    staticClass: "media-object rounded-circle",
                                    attrs: {
                                      src:
                                        "/images/portrait/small/avatar-s-10.jpg",
                                      alt: "Avatar",
                                      height: "30",
                                      width: "30"
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "li",
                                {
                                  staticClass: "avatar pull-up",
                                  attrs: {
                                    "data-toggle": "tooltip",
                                    "data-popup": "tooltip-custom",
                                    "data-placement": "bottom",
                                    "data-original-title": "Jeffrey Gerondale"
                                  }
                                },
                                [
                                  _c("img", {
                                    staticClass: "media-object rounded-circle",
                                    attrs: {
                                      src:
                                        "/images/portrait/small/avatar-s-9.jpg",
                                      alt: "Avatar",
                                      height: "30",
                                      width: "30"
                                    }
                                  })
                                ]
                              )
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [_vm._v("Florence, Alabama")]),
                        _vm._v(" "),
                        _c("td", [
                          _c("span", [_vm._v("168 km")]),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "progress progress-bar-success mt-1 mb-0"
                            },
                            [
                              _c("div", {
                                staticClass: "progress-bar",
                                staticStyle: { width: "70%" },
                                attrs: {
                                  role: "progressbar",
                                  "aria-valuenow": "70",
                                  "aria-valuemin": "0",
                                  "aria-valuemax": "100"
                                }
                              })
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [_vm._v("14:58 26/07/2018")]),
                        _vm._v(" "),
                        _c("td", [_vm._v("28/07/2018")])
                      ]),
                      _vm._v(" "),
                      _c("tr", [
                        _c("td", [_vm._v("#245689")]),
                        _vm._v(" "),
                        _c("td", [
                          _c("i", {
                            staticClass:
                              "fa fa-circle font-small-3 text-danger mr-50"
                          }),
                          _vm._v("Canceled")
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "p-1" }, [
                          _c(
                            "ul",
                            {
                              staticClass:
                                "list-unstyled users-list m-0  d-flex align-items-center"
                            },
                            [
                              _c(
                                "li",
                                {
                                  staticClass: "avatar pull-up",
                                  attrs: {
                                    "data-toggle": "tooltip",
                                    "data-popup": "tooltip-custom",
                                    "data-placement": "bottom",
                                    "data-original-title": "Vinnie Mostowy"
                                  }
                                },
                                [
                                  _c("img", {
                                    staticClass: "media-object rounded-circle",
                                    attrs: {
                                      src:
                                        "/images/portrait/small/avatar-s-5.jpg",
                                      alt: "Avatar",
                                      height: "30",
                                      width: "30"
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "li",
                                {
                                  staticClass: "avatar pull-up",
                                  attrs: {
                                    "data-toggle": "tooltip",
                                    "data-popup": "tooltip-custom",
                                    "data-placement": "bottom",
                                    "data-original-title": "Elicia Rieske"
                                  }
                                },
                                [
                                  _c("img", {
                                    staticClass: "media-object rounded-circle",
                                    attrs: {
                                      src:
                                        "/images/portrait/small/avatar-s-7.jpg",
                                      alt: "Avatar",
                                      height: "30",
                                      width: "30"
                                    }
                                  })
                                ]
                              )
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [_vm._v("Clifton, Arizona")]),
                        _vm._v(" "),
                        _c("td", [
                          _c("span", [_vm._v("125 km")]),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "progress progress-bar-danger mt-1 mb-0"
                            },
                            [
                              _c("div", {
                                staticClass: "progress-bar",
                                staticStyle: { width: "95%" },
                                attrs: {
                                  role: "progressbar",
                                  "aria-valuenow": "95",
                                  "aria-valuemin": "0",
                                  "aria-valuemax": "100"
                                }
                              })
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [_vm._v("14:58 26/07/2018")]),
                        _vm._v(" "),
                        _c("td", [_vm._v("28/07/2018")])
                      ])
                    ])
                  ]
                )
              ])
            ])
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-097ba13b", module.exports)
  }
}

/***/ })

});