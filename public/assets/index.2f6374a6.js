import{_ as e,p as n,a as o,r as t,o as a,c as s,b as r,t as c,w as l,d as i,u as d,e as m,f as p,g as u,h as _,i as f,j as h,k as v,l as g,m as k,n as w,q as E,s as y,v as I,x as P,y as b,z as A,A as S,B as L,C as x,D as j,E as O,F as D,G as C,H as M,I as T,J as H,K as R}from"./vendor.52ab95c6.js";function V(e){const n=window.localStorage.getItem(e);try{return JSON.parse(window.localStorage.getItem(e))}catch(o){return n}}function F(e,n){window.localStorage.setItem(e,JSON.stringify(n))}function $(n){if(n.response){console.log(n.response.data);const{code:o,message:t}=n.response.data;e.error(`Error: ${o} - ${t}`)}}const z={name:"Header",props:{title:{type:String}},setup:()=>({logout:()=>{var e;e="token",window.localStorage.removeItem(e),window.location.reload()}})},J=l();n("data-v-8640ab74");const W={class:"header"},q={class:"left"},G={style:{"font-size":"20px"}},N={class:"right"},B=r("div",{class:"author"},[r("i",{class:"icon el-icon-s-custom"}),i(" Admin "),r("i",{class:"el-icon-caret-bottom"})],-1),K={class:"nickname"},Q=r("p",null,"用戶: Admin",-1),U=r("p",null,"角色: 管理員",-1),X=i("退出系統");o();const Y=J(((e,n,o,l,i,d)=>{const m=t("el-tag"),p=t("el-popover");return a(),s("div",W,[r("div",q,[r("span",G,c(o.title),1)]),r("div",N,[r(p,{placement:"bottom",width:320,trigger:"click","popper-class":"popper-user-box"},{reference:J((()=>[B])),default:J((()=>[r("div",K,[Q,U,r(m,{size:"small",effect:"dark",class:"logout",onClick:l.logout},{default:J((()=>[X])),_:1},8,["onClick"])])])),_:1})])])}));z.render=Y,z.__scopeId="data-v-8640ab74";const Z={name:"Footer"},ee=l();n("data-v-4288a225");const ne={class:"footer"},oe=r("div",{class:"left"},null,-1),te=r("div",{class:"right"}," Powered by MEGA Automation ",-1);o();const ae=ee(((e,n,o,t,r,c)=>(a(),s("div",ne,[oe,te]))));Z.render=ae,Z.__scopeId="data-v-4288a225";const se={name:"App",components:{Header:z,Footer:Z},setup(){const e=["/login"],n={"/port":"端口管理","/door":"系統配置","/card":"住戶管理","/history":"換卡歷史","/clockin":"刷卡記錄","/login":"登錄頁面"},o=d(),t=m({showMenu:!0,currentPath:""});p((()=>o.path),(n=>{t.showMenu=!e.includes(n),t.currentPath=n}));const a=u((()=>n[t.currentPath]));return{state:t,title:a,onMenuSelect:e=>{t.currentPath=e}}}},re=l();n("data-v-8d2dec34");const ce=r("div",{class:"head"},[r("div",null,[r("span",null,"門禁卡管理系統")])],-1),le=r("div",{class:"line"},null,-1),ie=r("i",{class:"el-icon-menu"},null,-1),de=i("端口管理"),me=r("i",{class:"el-icon-menu"},null,-1),pe=i("系統配置"),ue=r("i",{class:"el-icon-user-solid"},null,-1),_e=i("住戶管理"),fe=r("i",{class:"el-icon-s-order"},null,-1),he=i("換卡歷史"),ve=r("i",{class:"el-icon-odometer"},null,-1),ge=i("刷卡記錄"),ke={class:"main"};o();const we=re(((e,n,o,c,l,i)=>{const d=t("el-menu-item"),m=t("el-menu"),p=t("el-aside"),u=t("Header"),_=t("router-view"),f=t("Footer"),h=t("el-container");return c.state.showMenu?(a(),s(h,{key:0,class:"container"},{default:re((()=>[r(p,{class:"aside"},{default:re((()=>[ce,le,r(m,{"background-color":"#222832","text-color":"#fff",router:!0,"default-active":c.state.currentPath,onSelect:c.onMenuSelect},{default:re((()=>[r(d,{index:"/port"},{default:re((()=>[ie,de])),_:1}),r(d,{index:"/door"},{default:re((()=>[me,pe])),_:1}),r(d,{index:"/card"},{default:re((()=>[ue,_e])),_:1}),r(d,{index:"/history"},{default:re((()=>[fe,he])),_:1}),r(d,{index:"/clockin"},{default:re((()=>[ve,ge])),_:1})])),_:1},8,["default-active","onSelect"])])),_:1}),r(h,{class:"content"},{default:re((()=>[r(u,{title:c.title},null,8,["title"]),r("div",ke,[r(_)]),r(f)])),_:1})])),_:1})):(a(),s(h,{key:1,class:"container"},{default:re((()=>[r(_)])),_:1}))}));let Ee;se.render=we,se.__scopeId="data-v-8d2dec34";const ye={},Ie=function(e,n){if(!n)return e();if(void 0===Ee){const e=document.createElement("link").relList;Ee=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(n.map((e=>{if(e in ye)return;ye[e]=!0;const n=e.endsWith(".css"),o=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${o}`))return;const t=document.createElement("link");return t.rel=n?"stylesheet":Ee,n||(t.as="script",t.crossOrigin=""),t.href=e,document.head.appendChild(t),n?new Promise(((e,n)=>{t.addEventListener("load",e),t.addEventListener("error",n)})):void 0}))).then((()=>e()))},Pe=[{path:"/",redirect:"/card"},{path:"/door",name:"door",component:()=>Ie((()=>import("./Door.3124ad24.js")),["./assets/Door.3124ad24.js","./assets/Door.7cba3f2b.css","./assets/index.230bc040.js","./assets/vendor.52ab95c6.js","./assets/axios.efe84ec3.js"])},{path:"/card",name:"card",component:()=>Ie((()=>import("./Card.0f4086cb.js")),["./assets/Card.0f4086cb.js","./assets/Card.74d11551.css","./assets/vendor.52ab95c6.js","./assets/index.230bc040.js","./assets/axios.efe84ec3.js"])},{path:"/history",name:"history",component:()=>Ie((()=>import("./CardHistory.75348ad3.js")),["./assets/CardHistory.75348ad3.js","./assets/CardHistory.702ebf30.css","./assets/moment.08a7f518.js","./assets/axios.efe84ec3.js","./assets/vendor.52ab95c6.js"])},{path:"/clockin",name:"clockin",component:()=>Ie((()=>import("./ClockIn.7afde8c8.js")),["./assets/ClockIn.7afde8c8.js","./assets/ClockIn.31938650.css","./assets/moment.08a7f518.js","./assets/axios.efe84ec3.js","./assets/vendor.52ab95c6.js"])},{path:"/port",name:"port",component:()=>Ie((()=>import("./Port.137283a3.js")),["./assets/Port.137283a3.js","./assets/Port.e8b82acf.css","./assets/vendor.52ab95c6.js","./assets/axios.efe84ec3.js"])},{path:"/login",name:"login",component:()=>Ie((()=>import("./Login.f504b1ef.js")),["./assets/Login.f504b1ef.js","./assets/Login.e92a7b5e.css","./assets/axios.efe84ec3.js","./assets/vendor.52ab95c6.js"])}],be=_({history:f(),routes:Pe});be.beforeEach(((e,n,o)=>{"login"===e.name||V("token")?o():o({name:"login"})}));let Ae=null;const Se=e=>{const{key:n,value:o}=e.data;"init"!==n||(({})=>{const e=h(se);e.use(be),e.component(v.name,v),e.component(g.name,g),e.component(k.name,k),e.component(w.name,w),e.component(E.name,E),e.component(y.name,y),e.component(I.name,I),e.component(P.name,P),e.component(b.name,b),e.component(A.name,A),e.component(S.name,S),e.component(L.name,L),e.component(x.name,x),e.component(j.name,j),e.component(O.name,O),e.component(D.name,D),e.component(C.name,C),e.component(M.name,M),e.component(T.name,T),e.component(H.name,H),e.use(R),e.mount("#app")})(o)};(()=>{if(window.Worker)return Ae=new Worker("./worker/worker.js"),void(Ae.onmessage=Se);document.body.innerHTML="請切換您的瀏覽器到最新的現代瀏覽器"})();export{F as a,$ as h,V as l,be as r};
