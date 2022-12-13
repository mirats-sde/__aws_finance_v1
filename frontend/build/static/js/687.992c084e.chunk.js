/*! For license information please see 687.992c084e.chunk.js.LICENSE.txt */
(self.webpackChunkinvoive=self.webpackChunkinvoive||[]).push([[687],{8688:function(t,e,n){var r=n(1655).default,o=n(6389).default,i=n(7061).default,a=n(6690).default,s=n(9728).default;t.exports=function(t){"use strict";function e(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var u=e(t);function c(t,e,n,r){return new(n||(n=Promise))((function(o,i){function a(t){try{u(r.next(t))}catch(t){i(t)}}function s(t){try{u(r.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,s)}u((r=r.apply(t,e||[])).next())}))}var l={};function f(t){var e=l[t];if(e)return e;var n=new Promise((function(e,n){var r=document.createElement("script");r.src=t,r.async=!0;var o=function(){e()},i=function e(){r.removeEventListener("load",o),r.removeEventListener("error",e),delete l[t],r.remove(),n(new Error("Unable to load script ".concat(t)))};r.addEventListener("load",o),r.addEventListener("error",i),document.body.appendChild(r)}));return l[t]=n,n}var h=function(){function t(e){var n=this;a(this,t),this.handleClick=function(t){return c(n,void 0,void 0,i().mark((function e(){var n,r,o;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=this.config){e.next=3;break}throw new Error("google-pay-button: Missing configuration");case 3:if(r=this.createLoadPaymentDataRequest(n),e.prev=4,n.onClick&&n.onClick(t),!t.defaultPrevented){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,this.client.loadPaymentData(r);case 9:o=e.sent,n.onLoadPaymentData&&n.onLoadPaymentData(o),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(4),"CANCELED"===e.t0.statusCode?n.onCancel&&n.onCancel(e.t0):n.onError?n.onError(e.t0):console.error(e.t0);case 16:case"end":return e.stop()}}),e,this,[[4,13]])})))},this.options=e}return s(t,[{key:"getElement",value:function(){return this.element}},{key:"isGooglePayLoaded",value:function(){var t,e;return"google"in(window||n.g)&&!!(null===(e=null===(t=null===google||void 0===google?void 0:google.payments)||void 0===t?void 0:t.api)||void 0===e?void 0:e.PaymentsClient)}},{key:"mount",value:function(t){var e;return c(this,void 0,void 0,i().mark((function n(){return i().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(this.isGooglePayLoaded()){n.next=9;break}return n.prev=1,n.next=4,f("https://pay.google.com/gp/p/js/pay.js");case 4:n.next=9;break;case 6:n.prev=6,n.t0=n.catch(1),(null===(e=this.config)||void 0===e?void 0:e.onError)?this.config.onError(n.t0):console.error(n.t0);case 9:this.element=t,t&&(this.appendStyles(),this.config&&this.updateElement());case 10:case"end":return n.stop()}}),n,this,[[1,6]])})))}},{key:"unmount",value:function(){this.element=void 0}},{key:"configure",value:function(t){var e;return this.config=t,this.oldInvalidationValues&&!this.isClientInvalidated(t)||(e=this.updateElement()),this.oldInvalidationValues=this.getInvalidationValues(t),null!=e?e:Promise.resolve()}},{key:"createClientOptions",value:function(t){var e={environment:t.environment,merchantInfo:this.createMerchantInfo(t)};return(t.onPaymentDataChanged||t.onPaymentAuthorized)&&(e.paymentDataCallbacks={},t.onPaymentDataChanged&&(e.paymentDataCallbacks.onPaymentDataChanged=function(e){return t.onPaymentDataChanged(e)||{}}),t.onPaymentAuthorized&&(e.paymentDataCallbacks.onPaymentAuthorized=function(e){return t.onPaymentAuthorized(e)||{}})),e}},{key:"createIsReadyToPayRequest",value:function(t){var e=t.paymentRequest;return{apiVersion:e.apiVersion,apiVersionMinor:e.apiVersionMinor,allowedPaymentMethods:e.allowedPaymentMethods,existingPaymentMethodRequired:t.existingPaymentMethodRequired}}},{key:"createLoadPaymentDataRequest",value:function(t){return Object.assign(Object.assign({},t.paymentRequest),{merchantInfo:this.createMerchantInfo(t)})}},{key:"createMerchantInfo",value:function(t){var e=Object.assign({},t.paymentRequest.merchantInfo);return e.softwareInfo||(e.softwareInfo={id:this.options.softwareInfoId,version:this.options.softwareInfoVersion}),e}},{key:"isMounted",value:function(){return null!=this.element&&!1!==this.element.isConnected}},{key:"removeButton",value:function(){if(this.element instanceof ShadowRoot||this.element instanceof Element)for(var t=0,e=Array.from(this.element.children);t<e.length;t++){var n=e[t];"STYLE"!==n.tagName&&n.remove()}}},{key:"updateElement",value:function(){return c(this,void 0,void 0,i().mark((function t(){var e,n,r,o,a,s,u;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.isMounted()){t.next=2;break}return t.abrupt("return");case 2:if(e=this.getElement(),this.config){t.next=5;break}throw new Error("google-pay-button: Missing configuration");case 5:return this.removeButton(),this.client=new google.payments.api.PaymentsClient(this.createClientOptions(this.config)),n={buttonType:this.config.buttonType,buttonColor:this.config.buttonColor,buttonSizeMode:this.config.buttonSizeMode,buttonLocale:this.config.buttonLocale,onClick:this.handleClick,allowedPaymentMethods:this.config.paymentRequest.allowedPaymentMethods},(r=e.getRootNode())instanceof ShadowRoot&&(n.buttonRootNode=r),o=this.client.createButton(n),this.setClassName(e,[e.className,"not-ready"]),e.appendChild(o),s=!1,t.prev=11,t.next=14,this.client.isReadyToPay(this.createIsReadyToPayRequest(this.config));case 14:a=t.sent,s=a.result&&!this.config.existingPaymentMethodRequired||a.result&&a.paymentMethodPresent&&this.config.existingPaymentMethodRequired||!1,t.next=21;break;case 18:t.prev=18,t.t0=t.catch(11),this.config.onError?this.config.onError(t.t0):console.error(t.t0);case 21:if(this.isMounted()){if(s){try{this.client.prefetchPaymentData(this.createLoadPaymentDataRequest(this.config))}catch(e){console.log("Error with prefetch",e)}this.setClassName(e,(e.className||"").split(" ").filter((function(t){return t&&"not-ready"!==t})))}this.isReadyToPay===(null==a?void 0:a.result)&&this.paymentMethodPresent===(null==a?void 0:a.paymentMethodPresent)||(this.isReadyToPay=!!(null==a?void 0:a.result),this.paymentMethodPresent=null==a?void 0:a.paymentMethodPresent,!this.config.onReadyToPayChange)||(u={isButtonVisible:s,isReadyToPay:this.isReadyToPay},this.paymentMethodPresent&&(u.paymentMethodPresent=this.paymentMethodPresent),this.config.onReadyToPayChange(u))}case 22:case"end":return t.stop()}}),t,this,[[11,18]])})))}},{key:"setClassName",value:function(t,e){var n=e.filter((function(t){return t})).join(" ");n?t.className=n:t.removeAttribute("class")}},{key:"appendStyles",value:function(){var t,e,n;if("undefined"!=typeof document){var r=null===(t=this.element)||void 0===t?void 0:t.getRootNode(),o="default-google-style-".concat(this.options.cssSelector.replace(/[^\w-]+/g,""),"-").concat(null===(e=this.config)||void 0===e?void 0:e.buttonLocale);if(r&&!(null===(n=r.getElementById)||void 0===n?void 0:n.call(r,o))){var i=document.createElement("style");i.id=o,i.type="text/css",i.innerHTML="\n          ".concat(this.options.cssSelector," {\n            display: inline-block;\n          }\n          ").concat(this.options.cssSelector,".not-ready {\n            width: 0;\n            height: 0;\n            overflow: hidden;\n          }\n        "),r instanceof Document&&r.head?r.head.appendChild(i):r.appendChild(i)}}}},{key:"isClientInvalidated",value:function(t){var e=this;return!this.oldInvalidationValues||this.getInvalidationValues(t).some((function(t,n){return t!==e.oldInvalidationValues[n]}))}},{key:"getInvalidationValues",value:function(t){var e,n;return[t.environment,t.existingPaymentMethodRequired,!!t.onPaymentDataChanged,!!t.onPaymentAuthorized,t.buttonColor,t.buttonType,t.buttonLocale,t.buttonSizeMode,t.paymentRequest.merchantInfo.merchantId,t.paymentRequest.merchantInfo.merchantName,null===(e=t.paymentRequest.merchantInfo.softwareInfo)||void 0===e?void 0:e.id,null===(n=t.paymentRequest.merchantInfo.softwareInfo)||void 0===n?void 0:n.version,t.paymentRequest.allowedPaymentMethods]}}]),t}(),d="google-pay-button-container",p=function(t){r(n,t);var e=o(n);function n(){var t;return a(this,n),(t=e.apply(this,arguments)).manager=new h({cssSelector:".".concat(d),softwareInfoId:"@google-pay/button-react",softwareInfoVersion:"3.0.2"}),t.elementRef=u.default.createRef(),t}return s(n,[{key:"componentDidMount",value:function(){return c(this,void 0,void 0,i().mark((function t(){var e;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=this.elementRef.current,t.t0=e,!t.t0){t.next=7;break}return t.next=5,this.manager.configure(this.props);case 5:return t.next=7,this.manager.mount(e);case 7:case"end":return t.stop()}}),t,this)})))}},{key:"componentWillUnmount",value:function(){this.manager.unmount()}},{key:"componentDidUpdate",value:function(){this.manager.configure(this.props)}},{key:"render",value:function(){return u.default.createElement("div",{ref:this.elementRef,className:[d,this.props.className].filter((function(t){return t})).join(" "),style:this.props.style})}}]),n}(u.default.Component);return p}(n(2791))},1694:function(t,e){var n;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var i=typeof n;if("string"===i||"number"===i)t.push(n);else if(Array.isArray(n)){if(n.length){var a=o.apply(null,n);a&&t.push(a)}}else if("object"===i){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){t.push(n.toString());continue}for(var s in n)r.call(n,s)&&n[s]&&t.push(s)}}}return t.join(" ")}t.exports?(o.default=o,t.exports=o):void 0===(n=function(){return o}.apply(e,[]))||(t.exports=n)}()},5763:function(t,e,n){"use strict";n.d(e,{ASC:function(){return o}});var r=n(9983);function o(t){return(0,r.w_)({tag:"svg",attr:{viewBox:"0 0 16 16"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M12 9H2V8h10v1zm4-6v9c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h14c.55 0 1 .45 1 1zm-1 3H1v6h14V6zm0-3H1v1h14V3zm-9 7H2v1h4v-1z"}}]})(t)}},7425:function(t,e,n){"use strict";n.d(e,{Ehm:function(){return o}});var r=n(9983);function o(t){return(0,r.w_)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"g",attr:{},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"}},{tag:"path",attr:{d:"M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9z"}}]}]})(t)}},6115:function(t){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t},t.exports.__esModule=!0,t.exports.default=t.exports},6389:function(t,e,n){var r=n(3808),o=n(9617),i=n(4993);t.exports=function(t){var e=o();return function(){var n,o=r(t);if(e){var a=r(this).constructor;n=Reflect.construct(o,arguments,a)}else n=o.apply(this,arguments);return i(this,n)}},t.exports.__esModule=!0,t.exports.default=t.exports},3808:function(t){function e(n){return t.exports=e=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},t.exports.__esModule=!0,t.exports.default=t.exports,e(n)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},1655:function(t,e,n){var r=n(6015);t.exports=function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&r(t,e)},t.exports.__esModule=!0,t.exports.default=t.exports},9617:function(t){t.exports=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}},t.exports.__esModule=!0,t.exports.default=t.exports},4993:function(t,e,n){var r=n(8698).default,o=n(6115);t.exports=function(t,e){if(e&&("object"===r(e)||"function"===typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return o(t)},t.exports.__esModule=!0,t.exports.default=t.exports},7061:function(t,e,n){var r=n(8698).default;function o(){"use strict";t.exports=o=function(){return e},t.exports.__esModule=!0,t.exports.default=t.exports;var e={},n=Object.prototype,i=n.hasOwnProperty,a=Object.defineProperty||function(t,e,n){t[e]=n.value},s="function"==typeof Symbol?Symbol:{},u=s.iterator||"@@iterator",c=s.asyncIterator||"@@asyncIterator",l=s.toStringTag||"@@toStringTag";function f(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(O){f=function(t,e,n){return t[e]=n}}function h(t,e,n,r){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),s=new R(r||[]);return a(i,"_invoke",{value:E(t,n,s)}),i}function d(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(O){return{type:"throw",arg:O}}}e.wrap=h;var p={};function v(){}function y(){}function m(){}var g={};f(g,u,(function(){return this}));var x=Object.getPrototypeOf,w=x&&x(x(C([])));w&&w!==n&&i.call(w,u)&&(g=w);var b=m.prototype=v.prototype=Object.create(g);function P(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function k(t,e){function n(o,a,s,u){var c=d(t[o],t,a);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==r(f)&&i.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,s,u)}),(function(t){n("throw",t,s,u)})):e.resolve(f).then((function(t){l.value=t,s(l)}),(function(t){return n("throw",t,s,u)}))}u(c.arg)}var o;a(this,"_invoke",{value:function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}})}function E(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return I()}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var s=M(a,n);if(s){if(s===p)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=d(t,e,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===p)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}function M(t,e){var n=e.method,r=t.iterator[n];if(void 0===r)return e.delegate=null,"throw"===n&&t.iterator.return&&(e.method="return",e.arg=void 0,M(t,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),p;var o=d(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,p;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,p):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function R(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function C(t){if(t){var e=t[u];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,r=function e(){for(;++n<t.length;)if(i.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return r.next=r}}return{next:I}}function I(){return{value:void 0,done:!0}}return y.prototype=m,a(b,"constructor",{value:m,configurable:!0}),a(m,"constructor",{value:y,configurable:!0}),y.displayName=f(m,l,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,f(t,l,"GeneratorFunction")),t.prototype=Object.create(b),t},e.awrap=function(t){return{__await:t}},P(k.prototype),f(k.prototype,c,(function(){return this})),e.AsyncIterator=k,e.async=function(t,n,r,o,i){void 0===i&&(i=Promise);var a=new k(h(t,n,r,o),i);return e.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},P(b),f(b,l,"Generator"),f(b,u,(function(){return this})),f(b,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},e.values=C,R.prototype={constructor:R,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,r){return a.type="throw",a.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],a=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var s=i.call(o,"catchLoc"),u=i.call(o,"finallyLoc");if(s&&u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(s){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,p):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),L(n),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;L(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:C(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),p}},e}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},6015:function(t){function e(n,r){return t.exports=e=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},t.exports.__esModule=!0,t.exports.default=t.exports,e(n,r)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports}}]);
//# sourceMappingURL=687.992c084e.chunk.js.map