webpackJsonp([31],{156:function(e,t,o){var s=o(234)(o(426),o(427),!1,function(e){o(423)},null,null);e.exports=s.exports},234:function(e,t){e.exports=function(e,t,o,s,i,r){var a,n=e=e||{},l=typeof e.default;"object"!==l&&"function"!==l||(a=e,n=e.default);var c,p="function"==typeof n?n.options:n;if(t&&(p.render=t.render,p.staticRenderFns=t.staticRenderFns,p._compiled=!0),o&&(p.functional=!0),i&&(p._scopeId=i),r?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),s&&s.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},p._ssrRegister=c):s&&(c=s),c){var d=p.functional,m=d?p.render:p.beforeCreate;d?(p._injectStyles=c,p.render=function(e,t){return c.call(t),m(e,t)}):p.beforeCreate=m?[].concat(m,c):[c]}return{esModule:a,exports:n,options:p}}},235:function(e,t,o){var s="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!s)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i=o(240),r={},a=s&&(document.head||document.getElementsByTagName("head")[0]),n=null,l=0,c=!1,p=function(){},d=null,m="data-vue-ssr-id",u="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function f(e){for(var t=0;t<e.length;t++){var o=e[t],s=r[o.id];if(s){s.refs++;for(var i=0;i<s.parts.length;i++)s.parts[i](o.parts[i]);for(;i<o.parts.length;i++)s.parts.push(v(o.parts[i]));s.parts.length>o.parts.length&&(s.parts.length=o.parts.length)}else{var a=[];for(i=0;i<o.parts.length;i++)a.push(v(o.parts[i]));r[o.id]={id:o.id,refs:1,parts:a}}}}function h(){var e=document.createElement("style");return e.type="text/css",a.appendChild(e),e}function v(e){var t,o,s=document.querySelector("style["+m+'~="'+e.id+'"]');if(s){if(c)return p;s.parentNode.removeChild(s)}if(u){var i=l++;s=n||(n=h()),t=g.bind(null,s,i,!1),o=g.bind(null,s,i,!0)}else s=h(),t=function(e,t){var o=t.css,s=t.media,i=t.sourceMap;s&&e.setAttribute("media",s);d.ssrId&&e.setAttribute(m,t.id);i&&(o+="\n/*# sourceURL="+i.sources[0]+" */",o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");if(e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}.bind(null,s),o=function(){s.parentNode.removeChild(s)};return t(e),function(s){if(s){if(s.css===e.css&&s.media===e.media&&s.sourceMap===e.sourceMap)return;t(e=s)}else o()}}e.exports=function(e,t,o,s){c=o,d=s||{};var a=i(e,t);return f(a),function(t){for(var o=[],s=0;s<a.length;s++){var n=a[s];(l=r[n.id]).refs--,o.push(l)}t?f(a=i(e,t)):a=[];for(s=0;s<o.length;s++){var l;if(0===(l=o[s]).refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete r[l.id]}}}};var _,b=(_=[],function(e,t){return _[e]=t,_.filter(Boolean).join("\n")});function g(e,t,o,s){var i=o?"":s.css;if(e.styleSheet)e.styleSheet.cssText=b(t,i);else{var r=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(r,a[t]):e.appendChild(r)}}},240:function(e,t){e.exports=function(e,t){for(var o=[],s={},i=0;i<t.length;i++){var r=t[i],a=r[0],n={id:e+":"+i,css:r[1],media:r[2],sourceMap:r[3]};s[a]?s[a].parts.push(n):o.push(s[a]={id:a,parts:[n]})}return o}},241:function(e,t,o){var s=o(234)(o(244),o(245),!1,function(e){o(242)},null,null);e.exports=s.exports},242:function(e,t,o){var s=o(243);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);o(235)("a3630c76",s,!0,{})},243:function(e,t,o){(e.exports=o(149)(!1)).push([e.i,"",""])},244:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"AppFooter"}},245:function(e,t){e.exports={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",["horizontal"==this.$page.configData.mainLayoutType?t("footer",{staticClass:"footer footer-light navbar-shadow",class:this.$page.configData.footerType}):t("footer",{staticClass:"footer footer-light",class:this.$page.configData.footerType},[this._m(0)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("p",{staticClass:"clearfix blue-grey lighten-2 mb-0"},[t("span",{staticClass:"float-md-left d-block d-md-inline-block mt-25"},[this._v("COPYRIGHT © 2019\n\t\t\t\t"),t("a",{staticClass:"text-bold-800 grey darken-2",attrs:{href:"http://teammahal.info/",target:"_blank"}},[this._v("Team Mahal,")]),this._v("\n\t\t\t\tAll rights Reserved\n\t\t\t")]),this._v(" "),t("span",{staticClass:"float-md-right d-none d-md-block"},[this._v("Hand-crafted & Made with"),t("i",{staticClass:"feather icon-heart pink"})]),this._v(" "),t("button",{staticClass:"btn btn-primary btn-icon scroll-top",attrs:{type:"button"}},[t("i",{staticClass:"feather icon-arrow-up"})])])}]}},402:function(e,t,o){var s=o(234)(o(405),o(406),!1,function(e){o(403)},null,null);e.exports=s.exports},403:function(e,t,o){var s=o(404);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);o(235)("4e74591e",s,!0,{})},404:function(e,t,o){(e.exports=o(149)(!1)).push([e.i,".form-control-position{position:absolute;top:2px;right:0;z-index:2;display:block;width:2.5rem;height:2.5rem;line-height:2.5rem;text-align:center}.has-icon-left .form-control-position{right:auto;left:inherit}.has-icon-left .form-control-position i{position:relative;left:5px;color:rgba(34,41,47,.4)}.has-icon-left .form-control{padding-right:2rem;padding-left:3rem}.position-relative .form-control{padding-right:calc(1.25em + 1.4rem + 1px)}.bg-authentication{background-color:#eff2f7}.bg-authentication .login-footer{padding:0 1.5rem .5rem}.bg-authentication .login-footer .footer-btn .btn{padding:.9rem 1.2rem!important;margin:1rem 1rem 1rem 0}@media (-ms-high-contrast:none),screen and (-ms-high-contrast:active){.bg-authentication{width:100%}}",""])},405:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=o(241),i=o.n(s);t.default={name:"AuthLayout",components:{AppFooter:i.a}}},406:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("body",{staticClass:"vertical-layout vertical-menu-modern 1-column",class:e.$page.configData.blankPageClass+" "+e.$page.configData.navbarType+" "+e.$page.configData.bodyClass+" "+e.$page.configData.footerType+["light"===e.$page.configData.theme?"":e.$page.configData.theme],attrs:{"data-menu":"vertical-menu-modern","data-col":"1-column"}},[o("div",{attrs:{id:"app"}},[o("div",{staticClass:"content-overlay"}),e._v(" "),o("div",{staticClass:"header-navbar-shadow"}),e._v(" "),o("div",{staticClass:"app-content content"},[o("div",{staticClass:"content-wrapper"},[o("div",{staticClass:"content-body"},[e._t("default")],2)])]),e._v(" "),o("app-footer")],1)])},staticRenderFns:[]}},423:function(e,t,o){var s=o(424);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);o(235)("62fbc6ca",s,!0,{})},424:function(e,t,o){(t=e.exports=o(149)(!1)).i(o(425),""),t.push([e.i,"",""])},425:function(e,t,o){(e.exports=o(149)(!1)).push([e.i,".vue__time-picker{display:inline-block;position:relative;font-size:1em;width:10em;font-family:sans-serif;vertical-align:middle}.vue__time-picker *{-webkit-box-sizing:border-box;box-sizing:border-box}.vue__time-picker input.display-time{border:1px solid #d2d2d2;width:10em;height:2.2em;padding:.3em .5em;font-size:1em}.vue__time-picker input.has-custom-icon{padding-left:1.8em}.vue__time-picker input.display-time.invalid:not(.skip-error-style){border-color:#c03;outline-color:#c03}.vue__time-picker input.display-time.disabled,.vue__time-picker input.display-time:disabled{color:#d2d2d2}.vue__time-picker .controls{position:absolute;top:0;bottom:0;right:0;z-index:3;-webkit-box-orient:horizontal;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;pointer-events:none}.vue__time-picker .controls,.vue__time-picker .controls>*{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-direction:normal}.vue__time-picker .controls>*{cursor:pointer;width:auto;-webkit-box-orient:vertical;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:0 .35em;color:#d2d2d2;line-height:100%;font-style:normal;pointer-events:auto;-webkit-transition:color .2s,opacity .2s;transition:color .2s,opacity .2s}.vue__time-picker .controls>:hover{color:#797979}.vue__time-picker .controls>:active,.vue__time-picker .controls>:focus{outline:0}.vue__time-picker .controls .char{font-size:1.1em;line-height:100%;-webkit-margin-before:-.15em}.vue__time-picker .custom-icon{z-index:2;position:absolute;left:0;top:0;bottom:0;width:1.8em;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;pointer-events:none}.vue__time-picker .controls img,.vue__time-picker .controls svg,.vue__time-picker .custom-icon img,.vue__time-picker .custom-icon svg{display:inline-block;vertical-align:middle;margin:0;border:0;outline:0;max-width:1em;height:auto}.vue__time-picker .time-picker-overlay{z-index:4;position:fixed;top:0;left:0;right:0;bottom:0}.vue__time-picker .dropdown{position:absolute;z-index:5;top:calc(2.2em + 2px);left:0;background:#fff;-webkit-box-shadow:0 1px 6px rgba(0,0,0,.15);box-shadow:0 1px 6px rgba(0,0,0,.15);width:10em;height:10em;font-weight:400}.vue__time-picker .dropdown.drop-up{top:auto;bottom:calc(2.2em + 1px)}.vue__time-picker .dropdown .select-list{width:10em;height:10em;overflow:hidden;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.vue__time-picker .dropdown .select-list:active,.vue__time-picker .dropdown .select-list:focus{outline:0}.vue__time-picker .dropdown ul{padding:0;margin:0;list-style:none;outline:0;-webkit-box-flex:1;-ms-flex:1 1 0.00001px;flex:1 1 0.00001px;overflow-x:hidden;overflow-y:auto}.vue__time-picker .dropdown ul.apms,.vue__time-picker .dropdown ul.minutes,.vue__time-picker .dropdown ul.seconds{border-left:1px solid #fff}.vue__time-picker .dropdown ul li{list-style:none;text-align:center;padding:.3em 0;color:#161616}.vue__time-picker .dropdown ul li:not(.hint):not([disabled]):focus,.vue__time-picker .dropdown ul li:not(.hint):not([disabled]):hover{background:rgba(0,0,0,.08);color:#161616;cursor:pointer}.vue__time-picker .dropdown ul li:not([disabled]).active,.vue__time-picker .dropdown ul li:not([disabled]).active:focus,.vue__time-picker .dropdown ul li:not([disabled]).active:hover{background:#41b883;color:#fff}.vue__time-picker .dropdown ul li[disabled],.vue__time-picker .dropdown ul li[disabled]:hover{background:transparent;opacity:.3;cursor:not-allowed}.vue__time-picker .dropdown .hint{color:#a5a5a5;cursor:default;font-size:.8em}",""])},426:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=o(402),i=o.n(s);t.default={name:"Subscribe",components:{AuthLayout:i.a},props:{errors:Object},data:function(){return{form:{shop_name:"",shop_phone:"",shop_email:"",shop_address:"",shop_logo:null,shop_open:"",shop_close:"",accepted:!1},shop_logo_url:""}},methods:{showImage:function(e){var t=e.target.files[0];this.form.shop_logo=t,this.shop_logo_url=URL.createObjectURL(t)},subscribe:function(){var e=new FormData;e.append("shop_name",this.form.shop_name),e.append("shop_phone",this.form.shop_phone),e.append("shop_email",this.form.shop_email),e.append("shop_address",this.form.shop_address),e.append("shop_logo",this.form.shop_logo),e.append("shop_open",this.form.shop_open),e.append("shop_close",this.form.shop_close),this.$inertia.post(this.route("subscribe.store"),e)}}}},427:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("auth-layout",{attrs:{name:"Subscribe"}},[o("section",{staticClass:"row flexbox-container"},[o("div",{staticClass:"col-xl-12 col-10 d-flex justify-content-center"},[o("div",{staticClass:"card bg-authentication rounded-0 mb-0"},[o("div",{staticClass:"row m-0"},[o("div",{staticClass:"col-lg-12 d-lg-block d-none text-center align-self-center pl-0 pr-3 py-0"},[o("img",{attrs:{src:"/images/pages/register.jpg",alt:"branding logo"}})]),e._v(" "),o("div",{staticClass:"col-12 p-0"},[o("div",{staticClass:"card rounded-0 mb-0 p-2"},[o("div",{staticClass:"card-header pt-50 pb-1"},[o("div",{staticClass:"card-title"},[o("h4",{staticClass:"mb-0"},[e._v("Subscribe Now")])])]),e._v(" "),o("div",{staticClass:"card-content"},[o("div",{staticClass:"card-body pt-0"},[o("form",{on:{submit:function(t){return t.preventDefault(),e.subscribe(t)}}},[o("div",{staticClass:"row form-label-group"},[o("div",{staticClass:"col-md-4 col-sm-12"},[o("label",[e._v("Shop Name "),o("span",{staticClass:"text-danger"},[e._v("*")])]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.form.shop_name,expression:"form.shop_name"}],staticClass:"form-control",class:[e.errors.shop_name?"is-invalid":""],attrs:{type:"text",placeholder:"Shop Name",autofocus:""},domProps:{value:e.form.shop_name},on:{input:function(t){t.target.composing||e.$set(e.form,"shop_name",t.target.value)}}}),e._v(" "),e.errors.shop_name?o("span",{staticClass:"invalid-feedback",attrs:{role:"alert"}},[o("strong",[e._v(e._s(e.errors.shop_name[0]))])]):e._e()]),e._v(" "),o("div",{staticClass:"col-md-4 col-sm-12"},[o("label",[e._v("Shop Contact No.\n                          "),o("span",{staticClass:"text-danger"},[e._v("*")])]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.form.shop_phone,expression:"form.shop_phone"}],staticClass:"form-control",class:[e.errors.shop_phone?"is-invalid":""],attrs:{type:"text",placeholder:"Shop Contact No."},domProps:{value:e.form.shop_phone},on:{input:function(t){t.target.composing||e.$set(e.form,"shop_phone",t.target.value)}}}),e._v(" "),e.errors.shop_phone?o("span",{staticClass:"invalid-feedback",attrs:{role:"alert"}},[o("strong",[e._v(e._s(e.errors.shop_phone[0]))])]):e._e()]),e._v(" "),o("div",{staticClass:"col-md-4 col-sm-12"},[o("label",[e._v("Shop Email")]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.form.shop_email,expression:"form.shop_email"}],staticClass:"form-control",class:[e.errors.shop_email?"is-invalid":""],attrs:{type:"email",placeholder:"Shop Email"},domProps:{value:e.form.shop_email},on:{input:function(t){t.target.composing||e.$set(e.form,"shop_email",t.target.value)}}}),e._v(" "),e.errors.shop_email?o("span",{staticClass:"invalid-feedback",attrs:{role:"alert"}},[o("strong",[e._v(e._s(e.errors.shop_email[0]))])]):e._e()])]),e._v(" "),o("div",{staticClass:"row form-label-group"},[o("div",{staticClass:"col-md-4 col-sm-12 text-center"},[o("label",[e._v("Shop Logo")]),e._v(" "),o("div",{staticClass:"banner-logo-upload-box mx-auto",staticStyle:{width:"200px",height:"200px",border:"1px solid #ddd","border-radius":"4px","box-shadow":"0px 0px 6px 4px rgba(0, 0, 0, 0.1)"}},[o("img",{staticClass:"users-avatar-shadow rounded",attrs:{id:"avatar",height:"90",width:"90",src:e.shop_logo_url,alt:""}}),e._v(" "),o("label",{staticClass:"btn-pill"},[o("i",{staticClass:"fa fa-camera"}),e._v(" "),o("input",{staticClass:"hidden",attrs:{id:"image",type:"file",name:"avatar"},on:{change:e.showImage}})])])]),e._v(" "),o("div",{staticClass:"col-md-8 col-sm-12"},[o("div",{staticClass:"row form-group"},[o("div",{staticClass:"col-12"},[o("label",[e._v("Shop Address\n                              "),o("span",{staticClass:"text-danger"},[e._v("*")])]),e._v(" "),o("textarea",{directives:[{name:"model",rawName:"v-model",value:e.form.shop_address,expression:"form.shop_address"}],staticClass:"form-control",class:[e.errors.shop_address?"is-invalid":""],attrs:{rows:"3"},domProps:{value:e.form.shop_address},on:{input:function(t){t.target.composing||e.$set(e.form,"shop_address",t.target.value)}}}),e._v(" "),e.errors.shop_address?o("span",{staticClass:"invalid-feedback",attrs:{role:"alert"}},[o("strong",[e._v(e._s(e.errors.shop_address[0]))])]):e._e()])]),e._v(" "),o("div",{staticClass:"row form-group"},[o("div",{staticClass:"col-md-6 col-sm-12"},[o("label",[e._v("Shop Start At")]),e._v(" "),o("vue-timepicker",{class:[e.errors.shop_open?"is-invalid":""],attrs:{placeholder:"Shop Close At",format:"hh:mm A"},model:{value:e.form.shop_open,callback:function(t){e.$set(e.form,"shop_open",t)},expression:"form.shop_open"}}),e._v(" "),e.errors.shop_open?o("span",{staticClass:"invalid-feedback",attrs:{role:"alert"}},[o("strong",[e._v(e._s(e.errors.shop_open[0]))])]):e._e()],1),e._v(" "),o("div",{staticClass:"col-md-6 col-sm-12"},[o("label",[e._v("Shop Close At")]),e._v(" "),o("vue-timepicker",{class:[e.errors.shop_close?"is-invalid":""],attrs:{placeholder:"Shop Close At",format:"hh:mm A"},model:{value:e.form.shop_close,callback:function(t){e.$set(e.form,"shop_close",t)},expression:"form.shop_close"}}),e._v(" "),e.errors.shop_close?o("span",{staticClass:"invalid-feedback",attrs:{role:"alert"}},[o("strong",[e._v(e._s(e.errors.shop_close[0]))])]):e._e()],1)])])]),e._v(" "),o("div",{staticClass:"form-group row"},[o("div",{staticClass:"col-12"},[o("fieldset",{staticClass:"checkbox"},[o("div",{staticClass:"vs-checkbox-con vs-checkbox-primary"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.form.accepted,expression:"form.accepted"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.form.accepted)?e._i(e.form.accepted,null)>-1:e.form.accepted},on:{change:function(t){var o=e.form.accepted,s=t.target,i=!!s.checked;if(Array.isArray(o)){var r=e._i(o,null);s.checked?r<0&&e.$set(e.form,"accepted",o.concat([null])):r>-1&&e.$set(e.form,"accepted",o.slice(0,r).concat(o.slice(r+1)))}else e.$set(e.form,"accepted",i)}}}),e._v(" "),o("span",{staticClass:"vs-checkbox"},[o("span",{staticClass:"vs-checkbox--check"},[o("i",{staticClass:"vs-icon feather icon-check"})])]),e._v(" "),o("span",{},[e._v("\n                              I accept the terms & conditions.")])])])])]),e._v(" "),o("inertia-link",{staticClass:"btn btn-outline-primary float-left btn-inline mb-50",attrs:{href:"/login"}},[e._v("Login")]),e._v(" "),o("button",{staticClass:"btn btn-primary float-right btn-inline mb-50",class:[e.form.accepted?"":"disabled"],attrs:{type:"submit"}},[e._v("\n                      Subscribe Now\n                    ")])],1)])])])])])])])])])},staticRenderFns:[]}}});