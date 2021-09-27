var e=Object.defineProperty,l=Object.defineProperties,o=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable,n=(l,o,r)=>o in l?e(l,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):l[o]=r,d=(e,l)=>{for(var o in l||(l={}))a.call(l,o)&&n(e,o,l[o]);if(r)for(var o of r(l))t.call(l,o)&&n(e,o,l[o]);return e},s=(e,r)=>l(e,o(r));import{L as i,e as u,M as c,r as p,o as m,c as g,N as f,b,O as h,P as y,Q as _,t as v,_ as F,d as C,R as x,p as I,a as O,S as V,T as w,w as k}from"./vendor.52ab95c6.js";import{l as j,h as D}from"./index.2f6374a6.js";import{i as P}from"./index.230bc040.js";import{a as N}from"./axios.efe84ec3.js";const E={name:"DialogEditCard",props:{type:String,doorOptions:Array},emits:["success"],setup(e,l){const o=i(null),r=u({visible:!1,oldForm:null,ruleForm:{cardNo:"",doorIds:[],username:"",realname:"",userInfo:""},rules:{cardNo:[{required:"true",message:"卡號不能為空",trigger:["change"]}],username:[{required:"true",message:"用戶名不能為空",trigger:["change"]}],realname:[{required:"true",message:"姓名不能為空",trigger:["change"]}],userInfo:[{required:"true",message:"住戶信息不能為空",trigger:["change"]}]}});return s(d({formRef:o},c(r)),{open:e=>{const l=Object.assign({},e);l.doorIds=l.doorIds.map((({_id:e})=>e)),r.oldForm=l;const o=Object.assign({},l);r.ruleForm=o,r.visible=!0},readCard:()=>{const e=j("portForm")||{port:3};N.get(`/vue_api?method=ReadIDm&portnum=${e.port}`).then((e=>{console.log(e);const l=e.sIDm.split(" ").join("");console.log({cardNo:l}),r.ruleForm.cardNo=l,F.success("成功讀取卡號")})).catch((e=>{N.isAxiosError(e)?D(e):console.error(e)}))},submitForm:()=>{o.value.validate().then((o=>{if(o)if("add"==e.type)N.put("/card/add",r.ruleForm).then((()=>{l.emit("success"),r.visible=!1})).catch((e=>{N.isAxiosError(e)?D(e):console.error(e)}));else{if(P(r.oldForm,r.ruleForm))return void(r.visible=!1);console.log("提交服务器"),N.post("/card/update",r.ruleForm).then((()=>{l.emit("success"),r.visible=!1})).catch((e=>{N.isAxiosError(e)?D(e):console.error(e)}))}}))}})}},S=C("讀卡"),R={style:{display:"inline-block",width:"60px"}},z={style:{color:"#8492a6"}},A={class:"dialog-footer"},U=C("取 消"),q=C("確 定");E.render=function(e,l,o,r,a,t){const n=p("el-input"),d=p("el-button"),s=p("el-form-item"),i=p("el-option"),u=p("el-select"),c=p("el-form"),F=p("el-dialog");return m(),g(F,{title:"add"==o.type?"添加門禁":"修改門禁",modelValue:e.visible,"onUpdate:modelValue":l[7]||(l[7]=l=>e.visible=l),width:"500px"},{footer:f((()=>[b("span",A,[b(d,{onClick:l[6]||(l[6]=l=>e.visible=!1)},{default:f((()=>[U])),_:1}),b(d,{type:"primary",onClick:r.submitForm},{default:f((()=>[q])),_:1},8,["onClick"])])])),default:f((()=>[b(c,{model:e.ruleForm,rules:e.rules,ref:"formRef","label-width":"100px",class:"door-form"},{default:f((()=>[b(s,{label:"卡號",prop:"cardNo"},{default:f((()=>[b(n,{style:{width:"280px"},type:"text",modelValue:e.ruleForm.cardNo,"onUpdate:modelValue":l[1]||(l[1]=l=>e.ruleForm.cardNo=l),disabled:""},null,8,["modelValue"]),b(d,{style:{"margin-left":"8px"},onClick:h(r.readCard,["prevent"])},{default:f((()=>[S])),_:1},8,["onClick"])])),_:1}),b(s,{label:"門禁"},{default:f((()=>[b(u,{modelValue:e.ruleForm.doorIds,"onUpdate:modelValue":l[2]||(l[2]=l=>e.ruleForm.doorIds=l),multiple:"",placeholder:"请选择門禁"},{default:f((()=>[(m(!0),g(y,null,_(o.doorOptions,(e=>(m(),g(i,{key:e._id,label:e.building+" "+e.unit,value:e._id},{default:f((()=>[b("span",R,v(e.building),1),b("span",z,v(e.unit),1)])),_:2},1032,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),b(s,{label:"用戶名",prop:"username"},{default:f((()=>[b(n,{type:"text",modelValue:e.ruleForm.username,"onUpdate:modelValue":l[3]||(l[3]=l=>e.ruleForm.username=l)},null,8,["modelValue"])])),_:1}),b(s,{label:"姓名",prop:"realname"},{default:f((()=>[b(n,{type:"text",modelValue:e.ruleForm.realname,"onUpdate:modelValue":l[4]||(l[4]=l=>e.ruleForm.realname=l)},null,8,["modelValue"])])),_:1}),b(s,{label:"住戶信息",prop:"userInfo"},{default:f((()=>[b(n,{type:"text",modelValue:e.ruleForm.userInfo,"onUpdate:modelValue":l[5]||(l[5]=l=>e.ruleForm.userInfo=l)},null,8,["modelValue"])])),_:1})])),_:1},8,["model","rules"])])),_:1},8,["title","modelValue"])};const L={name:"Card",components:{DialogEditCard:E},setup(){const e=i(null),l=i(null),o=u({loading:!1,tableData:[],total:0,currentPage:1,pageSize:10,type:"add",doorOptions:[]});x((()=>{r(),a()}));const r=()=>{o.loading=!0,N.get("/card/list").then((e=>{const l=(o.currentPage-1)*o.pageSize,r=l+o.pageSize;o.total=e.length,o.tableData=e.slice(l,r),o.loading=!1})).catch((e=>{console.log(e)}))},a=()=>{N.get("/door/list").then((e=>{o.doorOptions=e})).catch((e=>{console.log(e)}))};return s(d({tableRef:e,editItemRef:l},c(o)),{handleAdd:()=>{o.type="add",l.value.open({cardNo:"",doorIds:[],username:"",realname:"",userInfo:""})},handleEdit:e=>{o.type="edit",l.value.open(e)},handleDelete:e=>{console.log({_id:e}),N.delete("/card/remove",{data:{_id:e}}).then((()=>{r()}))},changePage:e=>{o.currentPage=e,r()},refreshData:r})}},M=k();I("data-v-ce8d3150");const Q={class:"header"},T=C("添加"),$={style:{display:"inline-block",width:"80px"}},B=b("a",{style:{cursor:"pointer"}},"删除",-1);O();const G=M(((e,l,o,r,a,t)=>{const n=p("el-button"),d=p("el-table-column"),s=p("el-popconfirm"),i=p("el-table"),u=p("el-pagination"),c=p("el-card"),f=p("DialogEditCard"),h=V("loading");return m(),g(y,null,[b(c,{class:"index-container"},{header:M((()=>[b("div",Q,[b(n,{type:"primary",size:"small",icon:"el-icon-plus",onClick:r.handleAdd},{default:M((()=>[T])),_:1},8,["onClick"])])])),default:M((()=>[w(b(i,{ref:"tableRef",data:e.tableData,"tooltip-effect":"dark",style:{width:"100%"}},{default:M((()=>[b(d,{prop:"cardNo",label:"卡號",width:"200"}),b(d,{label:"門禁",width:"200"},{default:M((e=>[(m(!0),g(y,null,_(e.row.doorIds,(e=>(m(),g("div",{key:e._id},[b("span",$,v(e.building),1),b("span",null,v(e.unit),1)])))),128))])),_:1}),b(d,{prop:"username",label:"用戶名"}),b(d,{prop:"realname",label:"姓名"}),b(d,{prop:"userInfo",label:"住戶信息"}),b(d,{label:"操作",width:"100"},{default:M((e=>[b("a",{style:{cursor:"pointer","margin-right":"10px"},onClick:l=>r.handleEdit(e.row)},"修改",8,["onClick"]),b(s,{title:"确定删除吗？",onConfirm:l=>r.handleDelete(e.row._id)},{reference:M((()=>[B])),_:2},1032,["onConfirm"])])),_:1})])),_:1},8,["data"]),[[h,e.loading]]),b(u,{background:"",layout:"prev, pager, next",total:e.total,"page-size":e.pageSize,"current-page":e.currentPage,onCurrentChange:r.changePage},null,8,["total","page-size","current-page","onCurrentChange"])])),_:1}),b(f,{ref:"editItemRef",type:e.type,doorOptions:e.doorOptions,onSuccess:r.refreshData},null,8,["type","doorOptions","onSuccess"])],64)}));L.render=G,L.__scopeId="data-v-ce8d3150";export default L;
