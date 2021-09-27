import{_ as e}from"./vendor.86ff60f9.js";import{l as t,r}from"./index.e79032c8.js";var n={exports:{}},o=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}},a=o,s=Object.prototype.toString;function i(e){return"[object Array]"===s.call(e)}function u(e){return void 0===e}function c(e){return null!==e&&"object"==typeof e}function f(e){if("[object Object]"!==s.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function p(e){return"[object Function]"===s.call(e)}function d(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}var l={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===s.call(e)},isBuffer:function(e){return null!==e&&!u(e)&&null!==e.constructor&&!u(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:c,isPlainObject:f,isUndefined:u,isDate:function(e){return"[object Date]"===s.call(e)},isFile:function(e){return"[object File]"===s.call(e)},isBlob:function(e){return"[object Blob]"===s.call(e)},isFunction:p,isStream:function(e){return c(e)&&p(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:d,merge:function e(){var t={};function r(r,n){f(t[n])&&f(r)?t[n]=e(t[n],r):f(r)?t[n]=e({},r):i(r)?t[n]=r.slice():t[n]=r}for(var n=0,o=arguments.length;n<o;n++)d(arguments[n],r);return t},extend:function(e,t,r){return d(t,(function(t,n){e[n]=r&&"function"==typeof t?a(t,r):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}},h=l;function m(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var g=function(e,t,r){if(!t)return e;var n;if(r)n=r(t);else if(h.isURLSearchParams(t))n=t.toString();else{var o=[];h.forEach(t,(function(e,t){null!=e&&(h.isArray(e)?t+="[]":e=[e],h.forEach(e,(function(e){h.isDate(e)?e=e.toISOString():h.isObject(e)&&(e=JSON.stringify(e)),o.push(m(t)+"="+m(e))})))})),n=o.join("&")}if(n){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+n}return e},y=l;function v(){this.handlers=[]}v.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},v.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},v.prototype.forEach=function(e){y.forEach(this.handlers,(function(t){null!==t&&e(t)}))};var w=v,b=l,x=function(e){return!(!e||!e.__CANCEL__)},E=l,j=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e},C=function(e,t,r,n,o){var a=new Error(e);return j(a,t,r,n,o)},R=C,S=l,A=S.isStandardBrowserEnv()?{write:function(e,t,r,n,o,a){var s=[];s.push(e+"="+encodeURIComponent(t)),S.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),S.isString(n)&&s.push("path="+n),S.isString(o)&&s.push("domain="+o),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}},O=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)},N=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e},U=l,T=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],B=l,L=B.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function n(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=n(window.location.href),function(t){var r=B.isString(t)?n(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0},P=l,q=function(e,t,r){var n=r.config.validateStatus;r.status&&n&&!n(r.status)?t(R("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)},k=A,D=g,F=function(e,t){return e&&!O(t)?N(e,t):t},H=function(e){var t,r,n,o={};return e?(U.forEach(e.split("\n"),(function(e){if(n=e.indexOf(":"),t=U.trim(e.substr(0,n)).toLowerCase(),r=U.trim(e.substr(n+1)),t){if(o[t]&&T.indexOf(t)>=0)return;o[t]="set-cookie"===t?(o[t]?o[t]:[]).concat([r]):o[t]?o[t]+", "+r:r}})),o):o},z=L,_=C,M=function(e){return new Promise((function(t,r){var n=e.data,o=e.headers;P.isFormData(n)&&delete o["Content-Type"];var a=new XMLHttpRequest;if(e.auth){var s=e.auth.username||"",i=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.Authorization="Basic "+btoa(s+":"+i)}var u=F(e.baseURL,e.url);if(a.open(e.method.toUpperCase(),D(u,e.params,e.paramsSerializer),!0),a.timeout=e.timeout,a.onreadystatechange=function(){if(a&&4===a.readyState&&(0!==a.status||a.responseURL&&0===a.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in a?H(a.getAllResponseHeaders()):null,o={data:e.responseType&&"text"!==e.responseType?a.response:a.responseText,status:a.status,statusText:a.statusText,headers:n,config:e,request:a};q(t,r,o),a=null}},a.onabort=function(){a&&(r(_("Request aborted",e,"ECONNABORTED",a)),a=null)},a.onerror=function(){r(_("Network Error",e,null,a)),a=null},a.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(_(t,e,"ECONNABORTED",a)),a=null},P.isStandardBrowserEnv()){var c=(e.withCredentials||z(u))&&e.xsrfCookieName?k.read(e.xsrfCookieName):void 0;c&&(o[e.xsrfHeaderName]=c)}if("setRequestHeader"in a&&P.forEach(o,(function(e,t){void 0===n&&"content-type"===t.toLowerCase()?delete o[t]:a.setRequestHeader(t,e)})),P.isUndefined(e.withCredentials)||(a.withCredentials=!!e.withCredentials),e.responseType)try{a.responseType=e.responseType}catch(f){if("json"!==e.responseType)throw f}"function"==typeof e.onDownloadProgress&&a.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&a.upload&&a.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){a&&(a.abort(),r(e),a=null)})),n||(n=null),a.send(n)}))},I=l,X=function(e,t){E.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))},J={"Content-Type":"application/x-www-form-urlencoded"};function V(e,t){!I.isUndefined(e)&&I.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var $,K={adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&($=M),$),transformRequest:[function(e,t){return X(t,"Accept"),X(t,"Content-Type"),I.isFormData(e)||I.isArrayBuffer(e)||I.isBuffer(e)||I.isStream(e)||I.isFile(e)||I.isBlob(e)?e:I.isArrayBufferView(e)?e.buffer:I.isURLSearchParams(e)?(V(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):I.isObject(e)?(V(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(t){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};K.headers={common:{Accept:"application/json, text/plain, */*"}},I.forEach(["delete","get","head"],(function(e){K.headers[e]={}})),I.forEach(["post","put","patch"],(function(e){K.headers[e]=I.merge(J)}));var G=K,W=l,Q=function(e,t,r){return b.forEach(r,(function(r){e=r(e,t)})),e},Y=x,Z=G;function ee(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var te=l,re=function(e,t){t=t||{};var r={},n=["url","method","data"],o=["headers","auth","proxy","params"],a=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],s=["validateStatus"];function i(e,t){return te.isPlainObject(e)&&te.isPlainObject(t)?te.merge(e,t):te.isPlainObject(t)?te.merge({},t):te.isArray(t)?t.slice():t}function u(n){te.isUndefined(t[n])?te.isUndefined(e[n])||(r[n]=i(void 0,e[n])):r[n]=i(e[n],t[n])}te.forEach(n,(function(e){te.isUndefined(t[e])||(r[e]=i(void 0,t[e]))})),te.forEach(o,u),te.forEach(a,(function(n){te.isUndefined(t[n])?te.isUndefined(e[n])||(r[n]=i(void 0,e[n])):r[n]=i(void 0,t[n])})),te.forEach(s,(function(n){n in t?r[n]=i(e[n],t[n]):n in e&&(r[n]=i(void 0,e[n]))}));var c=n.concat(o).concat(a).concat(s),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===c.indexOf(e)}));return te.forEach(f,u),r},ne=l,oe=g,ae=w,se=function(e){return ee(e),e.headers=e.headers||{},e.data=Q(e.data,e.headers,e.transformRequest),e.headers=W.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),W.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||Z.adapter)(e).then((function(t){return ee(e),t.data=Q(t.data,t.headers,e.transformResponse),t}),(function(t){return Y(t)||(ee(e),t&&t.response&&(t.response.data=Q(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))},ie=re;function ue(e){this.defaults=e,this.interceptors={request:new ae,response:new ae}}ue.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=ie(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[se,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)r=r.then(t.shift(),t.shift());return r},ue.prototype.getUri=function(e){return e=ie(this.defaults,e),oe(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},ne.forEach(["delete","get","head","options"],(function(e){ue.prototype[e]=function(t,r){return this.request(ie(r||{},{method:e,url:t,data:(r||{}).data}))}})),ne.forEach(["post","put","patch"],(function(e){ue.prototype[e]=function(t,r,n){return this.request(ie(n||{},{method:e,url:t,data:r}))}}));var ce=ue;function fe(e){this.message=e}fe.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},fe.prototype.__CANCEL__=!0;var pe=fe,de=pe;function le(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new de(e),t(r.reason))}))}le.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},le.source=function(){var e;return{token:new le((function(t){e=t})),cancel:e}};var he=le,me=l,ge=o,ye=ce,ve=re;function we(e){var t=new ye(e),r=ge(ye.prototype.request,t);return me.extend(r,ye.prototype,t),me.extend(r,t),r}var be=we(G);be.Axios=ye,be.create=function(e){return we(ve(be.defaults,e))},be.Cancel=pe,be.CancelToken=he,be.isCancel=x,be.all=function(e){return Promise.all(e)},be.spread=function(e){return function(t){return e.apply(null,t)}},be.isAxiosError=function(e){return"object"==typeof e&&!0===e.isAxiosError},n.exports=be,n.exports.default=be;var xe=n.exports;let Ee="http://localhost:4003/api/v1";Ee="/api/v1";var je="/api/v1";xe.defaults.baseURL=je,xe.defaults.headers["X-Requested-With"]="XMLHttpRequest",xe.defaults.headers.Authorization=t("token")||"",xe.defaults.headers.post["Content-Type"]="application/json",xe.interceptors.response.use((t=>"object"!=typeof t.data?(console.log({res:t}),e.error("服務端異常!"),Promise.reject(t)):0!==t.data.code?(console.log({res:t}),t.data.message&&e.error(t.data.message),419==t.data.code&&r.push({path:"/login"}),Promise.reject(t.data)):t.data.data));export{xe as C};
