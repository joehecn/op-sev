var e=Object.defineProperty,a=Object.defineProperties,t=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,l=(a,t,r)=>t in a?e(a,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[t]=r;import{h as s}from"./moment.08a7f518.js";import{C as i}from"./axios.641f0188.js";import{e as p,R as c,M as d,p as g,a as u,r as f,S as b,o as m,c as h,T as y,b as v,t as w,w as P}from"./vendor.86ff60f9.js";import"./index.e79032c8.js";const j={name:"CardHistory",setup(){const e=p({loading:!1,tableData:[],total:0,currentPage:1,pageSize:10,type:"add",doorOptions:[]});c((()=>{g()}));const g=()=>{e.loading=!0,i.get("/history/list").then((a=>{const t=(e.currentPage-1)*e.pageSize,r=t+e.pageSize;e.total=a.length,e.tableData=a.slice(t,r),e.loading=!1})).catch((e=>{console.error(e)}))};return u=((e,a)=>{for(var t in a||(a={}))o.call(a,t)&&l(e,t,a[t]);if(r)for(var t of r(a))n.call(a,t)&&l(e,t,a[t]);return e})({},d(e)),a(u,t({changePage:a=>{e.currentPage=a,g()},refreshData:g,formatTime:e=>s(e).format("YYYY-MM-DD HH:mm:ss")}));var u}},O=P();g("data-v-54065908");const C=v("div",{class:"header"},null,-1);u();const D=O(((e,a,t,r,o,n)=>{const l=f("el-table-column"),s=f("el-table"),i=f("el-pagination"),p=f("el-card"),c=b("loading");return m(),h(p,{class:"index-container"},{header:O((()=>[C])),default:O((()=>[y(v(s,{data:e.tableData,"tooltip-effect":"dark",style:{width:"100%"}},{default:O((()=>[v(l,{prop:"cardNo",label:"舊卡",width:"200"}),v(l,{prop:"newCardNo",label:"新卡",width:"200"}),v(l,{prop:"username",label:"用戶名"}),v(l,{prop:"realname",label:"姓名"}),v(l,{prop:"userInfo",label:"住戶信息"}),v(l,{label:"時間",width:"200"},{default:O((e=>[v("div",null,w(r.formatTime(e.row.createdAt)),1)])),_:1})])),_:1},8,["data"]),[[c,e.loading]]),v(i,{background:"",layout:"prev, pager, next",total:e.total,"page-size":e.pageSize,"current-page":e.currentPage,onCurrentChange:r.changePage},null,8,["total","page-size","current-page","onCurrentChange"])])),_:1})}));j.render=D,j.__scopeId="data-v-54065908";export default j;
