webpackJsonp([29],{155:function(t,e,a){var o=a(231)(a(418),a(419),!1,function(t){a(416)},null,null);t.exports=o.exports},231:function(t,e){t.exports=function(t,e,a,o,s,r){var n,i=t=t||{},l=typeof t.default;"object"!==l&&"function"!==l||(n=t,i=t.default);var c,p="function"==typeof i?i.options:i;if(e&&(p.render=e.render,p.staticRenderFns=e.staticRenderFns,p._compiled=!0),a&&(p.functional=!0),s&&(p._scopeId=s),r?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},p._ssrRegister=c):o&&(c=o),c){var d=p.functional,m=d?p.render:p.beforeCreate;d?(p._injectStyles=c,p.render=function(t,e){return c.call(e),m(t,e)}):p.beforeCreate=m?[].concat(m,c):[c]}return{esModule:n,exports:i,options:p}}},232:function(t,e,a){var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var s=a(234),r={},n=o&&(document.head||document.getElementsByTagName("head")[0]),i=null,l=0,c=!1,p=function(){},d=null,m="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function u(t){for(var e=0;e<t.length;e++){var a=t[e],o=r[a.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](a.parts[s]);for(;s<a.parts.length;s++)o.parts.push(h(a.parts[s]));o.parts.length>a.parts.length&&(o.parts.length=a.parts.length)}else{var n=[];for(s=0;s<a.parts.length;s++)n.push(h(a.parts[s]));r[a.id]={id:a.id,refs:1,parts:n}}}}function v(){var t=document.createElement("style");return t.type="text/css",n.appendChild(t),t}function h(t){var e,a,o=document.querySelector("style["+m+'~="'+t.id+'"]');if(o){if(c)return p;o.parentNode.removeChild(o)}if(f){var s=l++;o=i||(i=v()),e=b.bind(null,o,s,!1),a=b.bind(null,o,s,!0)}else o=v(),e=function(t,e){var a=e.css,o=e.media,s=e.sourceMap;o&&t.setAttribute("media",o);d.ssrId&&t.setAttribute(m,e.id);s&&(a+="\n/*# sourceURL="+s.sources[0]+" */",a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */");if(t.styleSheet)t.styleSheet.cssText=a;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(a))}}.bind(null,o),a=function(){o.parentNode.removeChild(o)};return e(t),function(o){if(o){if(o.css===t.css&&o.media===t.media&&o.sourceMap===t.sourceMap)return;e(t=o)}else a()}}t.exports=function(t,e,a,o){c=a,d=o||{};var n=s(t,e);return u(n),function(e){for(var a=[],o=0;o<n.length;o++){var i=n[o];(l=r[i.id]).refs--,a.push(l)}e?u(n=s(t,e)):n=[];for(o=0;o<a.length;o++){var l;if(0===(l=a[o]).refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete r[l.id]}}}};var g,_=(g=[],function(t,e){return g[t]=e,g.filter(Boolean).join("\n")});function b(t,e,a,o){var s=a?"":o.css;if(t.styleSheet)t.styleSheet.cssText=_(e,s);else{var r=document.createTextNode(s),n=t.childNodes;n[e]&&t.removeChild(n[e]),n.length?t.insertBefore(r,n[e]):t.appendChild(r)}}},234:function(t,e){t.exports=function(t,e){for(var a=[],o={},s=0;s<e.length;s++){var r=e[s],n=r[0],i={id:t+":"+s,css:r[1],media:r[2],sourceMap:r[3]};o[n]?o[n].parts.push(i):a.push(o[n]={id:n,parts:[i]})}return a}},235:function(t,e,a){var o=a(231)(a(238),a(239),!1,function(t){a(236)},null,null);t.exports=o.exports},236:function(t,e,a){var o=a(237);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(232)("a3630c76",o,!0,{})},237:function(t,e,a){(t.exports=a(149)(!1)).push([t.i,"",""])},238:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"AppFooter"}},239:function(t,e){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",["horizontal"==this.$page.configData.mainLayoutType?e("footer",{staticClass:"footer footer-light navbar-shadow",class:this.$page.configData.footerType}):e("footer",{staticClass:"footer footer-light",class:this.$page.configData.footerType},[this._m(0)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"clearfix blue-grey lighten-2 mb-0"},[e("span",{staticClass:"float-md-left d-block d-md-inline-block mt-25"},[this._v("COPYRIGHT © 2019\n\t\t\t\t"),e("a",{staticClass:"text-bold-800 grey darken-2",attrs:{href:"http://teammahal.info/",target:"_blank"}},[this._v("Team Mahal,")]),this._v("\n\t\t\t\tAll rights Reserved\n\t\t\t")]),this._v(" "),e("span",{staticClass:"float-md-right d-none d-md-block"},[this._v("Hand-crafted & Made with"),e("i",{staticClass:"feather icon-heart pink"})]),this._v(" "),e("button",{staticClass:"btn btn-primary btn-icon scroll-top",attrs:{type:"button"}},[e("i",{staticClass:"feather icon-arrow-up"})])])}]}},399:function(t,e,a){var o=a(231)(a(402),a(403),!1,function(t){a(400)},null,null);t.exports=o.exports},400:function(t,e,a){var o=a(401);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(232)("4e74591e",o,!0,{})},401:function(t,e,a){(t.exports=a(149)(!1)).push([t.i,".form-control-position{position:absolute;top:2px;right:0;z-index:2;display:block;width:2.5rem;height:2.5rem;line-height:2.5rem;text-align:center}.has-icon-left .form-control-position{right:auto;left:inherit}.has-icon-left .form-control-position i{position:relative;left:5px;color:rgba(34,41,47,.4)}.has-icon-left .form-control{padding-right:2rem;padding-left:3rem}.position-relative .form-control{padding-right:calc(1.25em + 1.4rem + 1px)}.bg-authentication{background-color:#eff2f7}.bg-authentication .login-footer{padding:0 1.5rem .5rem}.bg-authentication .login-footer .footer-btn .btn{padding:.9rem 1.2rem!important;margin:1rem 1rem 1rem 0}@media (-ms-high-contrast:none),screen and (-ms-high-contrast:active){.bg-authentication{width:100%}}",""])},402:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(235),s=a.n(o);e.default={name:"AuthLayout",components:{AppFooter:s.a}}},403:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("body",{staticClass:"vertical-layout vertical-menu-modern 1-column",class:t.$page.configData.blankPageClass+" "+t.$page.configData.navbarType+" "+t.$page.configData.bodyClass+" "+t.$page.configData.footerType+["light"===t.$page.configData.theme?"":t.$page.configData.theme],attrs:{"data-menu":"vertical-menu-modern","data-col":"1-column"}},[a("div",{attrs:{id:"app"}},[a("div",{staticClass:"content-overlay"}),t._v(" "),a("div",{staticClass:"header-navbar-shadow"}),t._v(" "),a("div",{staticClass:"app-content content"},[a("div",{staticClass:"content-wrapper"},[a("div",{staticClass:"content-body"},[t._t("default")],2)])]),t._v(" "),a("app-footer")],1)])},staticRenderFns:[]}},416:function(t,e,a){var o=a(417);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(232)("8229971c",o,!0,{})},417:function(t,e,a){(t.exports=a(149)(!1)).push([t.i,"",""])},418:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(399),s=a.n(o);e.default={name:"Register",components:{AuthLayout:s.a},props:{errors:Object},data:function(){return{form:{name:"",shop_name:"",phone:"",email:"",password:"",password_confirmation:"",accepted:!1}}},methods:{register:function(){this.$inertia.post(this.route("register"),{name:this.form.name,shop_name:this.form.shop_name,phone:this.form.phone,email:this.form.email,password:this.form.password,password_confirmation:this.form.password_confirmation})}}}},419:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("auth-layout",[a("section",{staticClass:"row flexbox-container"},[a("div",{staticClass:"col-xl-8 col-10 d-flex justify-content-center"},[a("div",{staticClass:"card bg-authentication rounded-0 mb-0"},[a("div",{staticClass:"row m-0"},[a("div",{staticClass:"col-lg-6 d-lg-block d-none text-center align-self-center pl-0 pr-3 py-0"},[a("img",{attrs:{src:"/images/pages/register.jpg",alt:"branding logo"}})]),t._v(" "),a("div",{staticClass:"col-lg-6 col-12 p-0"},[a("div",{staticClass:"card rounded-0 mb-0 p-2"},[a("div",{staticClass:"card-header pt-50 pb-1"},[a("div",{staticClass:"card-title"},[a("h4",{staticClass:"mb-0"},[t._v("Create Account")])])]),t._v(" "),a("p",{staticClass:"px-2"},[t._v("Fill the below form to create a new account.")]),t._v(" "),a("div",{staticClass:"card-content"},[a("div",{staticClass:"card-body pt-0"},[a("form",{on:{submit:function(e){return e.preventDefault(),t.register(e)}}},[a("div",{staticClass:"form-label-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.name,expression:"form.name"}],staticClass:"form-control",class:[t.errors.name?"is-invalid":""],attrs:{type:"text",placeholder:"Name",autocomplete:"name",autofocus:""},domProps:{value:t.form.name},on:{input:function(e){e.target.composing||t.$set(t.form,"name",e.target.value)}}}),t._v(" "),a("label",[t._v("Name")]),t._v(" "),t.errors.name?a("span",{staticClass:"invalid-feedback",attrs:{role:"alert"}},[a("strong",[t._v(t._s(t.errors.name[0]))])]):t._e()]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.shop_name,expression:"form.shop_name"}],staticClass:"form-control",class:[t.errors.shop_name?"is-invalid":""],attrs:{type:"text",placeholder:"Shop Name",autocomplete:"shop_name"},domProps:{value:t.form.shop_name},on:{input:function(e){e.target.composing||t.$set(t.form,"shop_name",e.target.value)}}}),t._v(" "),a("label",[t._v("shop_name")]),t._v(" "),t.errors.shop_name?a("span",{staticClass:"invalid-feedback",attrs:{role:"alert"}},[a("strong",[t._v(t._s(t.errors.shop_name[0]))])]):t._e()]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.phone,expression:"form.phone"}],staticClass:"form-control",class:[t.errors.phone?"is-invalid":""],attrs:{type:"text",placeholder:"Contact No.",autocomplete:"phone"},domProps:{value:t.form.phone},on:{input:function(e){e.target.composing||t.$set(t.form,"phone",e.target.value)}}}),t._v(" "),a("label",[t._v("Contact No.")]),t._v(" "),t.errors.phone?a("span",{staticClass:"invalid-feedback",attrs:{role:"alert"}},[a("strong",[t._v(t._s(t.errors.phone[0]))])]):t._e()]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.email,expression:"form.email"}],staticClass:"form-control",class:[t.errors.email?"is-invalid":""],attrs:{type:"email",placeholder:"Email",autocomplete:"email"},domProps:{value:t.form.email},on:{input:function(e){e.target.composing||t.$set(t.form,"email",e.target.value)}}}),t._v(" "),a("label",[t._v("Email")]),t._v(" "),t.errors.email?a("span",{staticClass:"invalid-feedback",attrs:{role:"alert"}},[a("strong",[t._v(t._s(t.errors.email[0]))])]):t._e()]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.password,expression:"form.password"}],staticClass:"form-control",class:[t.errors.password?"is-invalid":""],attrs:{type:"password",placeholder:"Password",autocomplete:"new-password"},domProps:{value:t.form.password},on:{input:function(e){e.target.composing||t.$set(t.form,"password",e.target.value)}}}),t._v(" "),a("label",[t._v("Password")]),t._v(" "),t.errors.password?a("span",{staticClass:"invalid-feedback",attrs:{role:"alert"}},[a("strong",[t._v(t._s(t.errors.password[0]))])]):t._e()]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.password_confirmation,expression:"form.password_confirmation"}],staticClass:"form-control",attrs:{type:"password",name:"password_confirmation",placeholder:"Confirm Password",autocomplete:"new-password"},domProps:{value:t.form.password_confirmation},on:{input:function(e){e.target.composing||t.$set(t.form,"password_confirmation",e.target.value)}}}),t._v(" "),a("label",[t._v("Confirm Password")])]),t._v(" "),a("div",{staticClass:"form-group row"},[a("div",{staticClass:"col-12"},[a("fieldset",{staticClass:"checkbox"},[a("div",{staticClass:"vs-checkbox-con vs-checkbox-primary"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.form.accepted,expression:"form.accepted"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.form.accepted)?t._i(t.form.accepted,null)>-1:t.form.accepted},on:{change:function(e){var a=t.form.accepted,o=e.target,s=!!o.checked;if(Array.isArray(a)){var r=t._i(a,null);o.checked?r<0&&t.$set(t.form,"accepted",a.concat([null])):r>-1&&t.$set(t.form,"accepted",a.slice(0,r).concat(a.slice(r+1)))}else t.$set(t.form,"accepted",s)}}}),t._v(" "),a("span",{staticClass:"vs-checkbox"},[a("span",{staticClass:"vs-checkbox--check"},[a("i",{staticClass:"vs-icon feather icon-check"})])]),t._v(" "),a("span",{},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tI accept the terms & conditions.")])])])])]),t._v(" "),a("inertia-link",{staticClass:"btn btn-outline-primary float-left btn-inline mb-50",attrs:{href:"/login"}},[t._v("Login")]),t._v(" "),a("button",{staticClass:"btn btn-primary float-right btn-inline mb-50",class:[t.form.accepted?"":"disabled"],attrs:{type:"submit"}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\tRegister\n\t\t\t\t\t\t\t\t\t\t")])],1)])])])])])])])])])},staticRenderFns:[]}}});