var e=Object.defineProperty,r=Object.defineProperties,l=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable,d=(r,l,o)=>l in r?e(r,l,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[l]=o,n=(e,r)=>{for(var l in r||(r={}))a.call(r,l)&&d(e,l,r[l]);if(o)for(var l of o(r))t.call(r,l)&&d(e,l,r[l]);return e},s=(e,o)=>r(e,l(o));import{L as i,e as u,M as p,r as c,o as m,c as f,N as g,b,O as y,P as h,Q as F,t as v,_,d as x,R as C,p as V,a as O,S as w,T as I,w as k}from"./vendor.86ff60f9.js";import{l as j,h as N}from"./index.f2d59e1f.js";import{i as P}from"./index.4fe1307f.js";import{C as D}from"./axios.8bda8223.js";const S={name:"DialogEditCard",props:{type:String,doorOptions:Array},emits:["success"],setup(e,r){const l=i(null),o=u({visible:!1,oldForm:null,ruleForm:{cardNo:"",cardType:"",cardType:"",doorIds:[],username:"",realname:"",userInfo:""},rules:{cardNo:[{required:"true",message:"卡號不能為空",trigger:["change"]}],username:[{required:"true",message:"用戶名不能為空",trigger:["change"]}],realname:[{required:"true",message:"姓名不能為空",trigger:["change"]}],userInfo:[{required:"true",message:"住戶信息不能為空",trigger:["change"]}]}});return s(n({formRef:l},p(o)),{open:e=>{const r=Object.assign({},e);r.doorIds=r.doorIds.map((({_id:e})=>e)),o.oldForm=r;const l=Object.assign({},r);o.ruleForm=l,o.visible=!0},readCard:()=>{j("portForm"),D.get("/vue_api?m=card").then((e=>{const r=JSON.parse(e);if(console.log(r),r.message)return _.error(r.message),o.ruleForm.cardNo="",void(o.ruleForm.cardType="");const l=r.card.split(" ").join("");console.log({cardNo:l});const a=parseInt(l,16);a<1e8?(o.ruleForm.cardNo=a.toString(),o.ruleForm.cardType="idi"):(o.ruleForm.cardNo=l,o.ruleForm.cardType="idm"),_.success("成功讀取卡號")})).catch((e=>{D.isAxiosError(e)?N(e):console.error(e)}))},submitForm:()=>{l.value.validate().then((l=>{if(l)if("add"==e.type)D.put("/card/add",o.ruleForm).then((()=>{r.emit("success"),o.visible=!1})).catch((e=>{D.isAxiosError(e)?N(e):console.error(e)}));else{if(P(o.oldForm,o.ruleForm))return void(o.visible=!1);console.log("提交服务器"),D.post("/card/update",o.ruleForm).then((()=>{r.emit("success"),o.visible=!1})).catch((e=>{D.isAxiosError(e)?N(e):console.error(e)}))}}))}})}},E=x("讀卡"),T={style:{display:"inline-block",width:"60px"}},z={style:{color:"#8492a6"}},R={class:"dialog-footer"},U=x("取 消"),A=x("確 定");S.render=function(e,r,l,o,a,t){const d=c("el-input"),n=c("el-button"),s=c("el-form-item"),i=c("el-option"),u=c("el-select"),p=c("el-form"),_=c("el-dialog");return m(),f(_,{title:"add"==l.type?"添加門禁":"修改門禁",modelValue:e.visible,"onUpdate:modelValue":r[8]||(r[8]=r=>e.visible=r),width:"500px"},{footer:g((()=>[b("span",R,[b(n,{onClick:r[7]||(r[7]=r=>e.visible=!1)},{default:g((()=>[U])),_:1}),b(n,{type:"primary",onClick:o.submitForm},{default:g((()=>[A])),_:1},8,["onClick"])])])),default:g((()=>[b(p,{model:e.ruleForm,rules:e.rules,ref:"formRef","label-width":"100px",class:"door-form"},{default:g((()=>[b(s,{label:"卡號",prop:"cardNo"},{default:g((()=>[b(d,{style:{width:"280px"},type:"text",modelValue:e.ruleForm.cardNo,"onUpdate:modelValue":r[1]||(r[1]=r=>e.ruleForm.cardNo=r),disabled:""},null,8,["modelValue"]),b(d,{style:{width:"280px"},type:"text",modelValue:e.ruleForm.cardType,"onUpdate:modelValue":r[2]||(r[2]=r=>e.ruleForm.cardType=r),disabled:""},null,8,["modelValue"]),b(n,{style:{"margin-left":"8px"},onClick:y(o.readCard,["prevent"])},{default:g((()=>[E])),_:1},8,["onClick"])])),_:1}),b(s,{label:"門禁"},{default:g((()=>[b(u,{modelValue:e.ruleForm.doorIds,"onUpdate:modelValue":r[3]||(r[3]=r=>e.ruleForm.doorIds=r),multiple:"",placeholder:"请选择門禁"},{default:g((()=>[(m(!0),f(h,null,F(l.doorOptions,(e=>(m(),f(i,{key:e._id,label:e.building+" "+e.unit,value:e._id},{default:g((()=>[b("span",T,v(e.building),1),b("span",z,v(e.unit),1)])),_:2},1032,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),b(s,{label:"用戶名",prop:"username"},{default:g((()=>[b(d,{type:"text",modelValue:e.ruleForm.username,"onUpdate:modelValue":r[4]||(r[4]=r=>e.ruleForm.username=r)},null,8,["modelValue"])])),_:1}),b(s,{label:"姓名",prop:"realname"},{default:g((()=>[b(d,{type:"text",modelValue:e.ruleForm.realname,"onUpdate:modelValue":r[5]||(r[5]=r=>e.ruleForm.realname=r)},null,8,["modelValue"])])),_:1}),b(s,{label:"住戶信息",prop:"userInfo"},{default:g((()=>[b(d,{type:"text",modelValue:e.ruleForm.userInfo,"onUpdate:modelValue":r[6]||(r[6]=r=>e.ruleForm.userInfo=r)},null,8,["modelValue"])])),_:1})])),_:1},8,["model","rules"])])),_:1},8,["title","modelValue"])};const q={name:"Card",components:{DialogEditCard:S},setup(){const e=i(null),r=i(null),l=u({loading:!1,tableData:[],total:0,currentPage:1,pageSize:10,type:"add",doorOptions:[]});C((()=>{o(),a()}));const o=()=>{l.loading=!0,D.get("/card/list").then((e=>{const r=(l.currentPage-1)*l.pageSize,o=r+l.pageSize;l.total=e.length,l.tableData=e.slice(r,o),l.loading=!1})).catch((e=>{console.error(e)}))},a=()=>{D.get("/door/list").then((e=>{l.doorOptions=e})).catch((e=>{console.error(e)}))};return s(n({tableRef:e,editItemRef:r},p(l)),{handleAdd:()=>{l.type="add",r.value.open({cardNo:"",doorIds:[],username:"",realname:"",userInfo:""})},handleEdit:e=>{l.type="edit",r.value.open(e)},handleDelete:e=>{console.log({_id:e}),D.delete("/card/remove",{data:{_id:e}}).then((()=>{o()}))},changePage:e=>{l.currentPage=e,o()},refreshData:o})}},J=k();V("data-v-22134478");const L={class:"header"},M=x("添加"),Q={style:{display:"inline-block",width:"80px"}},B=b("a",{style:{cursor:"pointer"}},"删除",-1);O();const G=J(((e,r,l,o,a,t)=>{const d=c("el-button"),n=c("el-table-column"),s=c("el-popconfirm"),i=c("el-table"),u=c("el-pagination"),p=c("el-card"),g=c("DialogEditCard"),y=w("loading");return m(),f(h,null,[b(p,{class:"index-container"},{header:J((()=>[b("div",L,[b(d,{type:"primary",size:"small",icon:"el-icon-plus",onClick:o.handleAdd},{default:J((()=>[M])),_:1},8,["onClick"])])])),default:J((()=>[I(b(i,{ref:"tableRef",data:e.tableData,"tooltip-effect":"dark",style:{width:"100%"}},{default:J((()=>[b(n,{prop:"cardNo",label:"卡號",width:"200"}),b(n,{prop:"cardType",label:"類型",width:"200"}),b(n,{label:"門禁",width:"200"},{default:J((e=>[(m(!0),f(h,null,F(e.row.doorIds,(e=>(m(),f("div",{key:e._id},[b("span",Q,v(e.building),1),b("span",null,v(e.unit),1)])))),128))])),_:1}),b(n,{prop:"username",label:"用戶名"}),b(n,{prop:"realname",label:"姓名"}),b(n,{prop:"userInfo",label:"住戶信息"}),b(n,{label:"操作",width:"100"},{default:J((e=>[b("a",{style:{cursor:"pointer","margin-right":"10px"},onClick:r=>o.handleEdit(e.row)},"修改",8,["onClick"]),b(s,{title:"确定删除吗？",onConfirm:r=>o.handleDelete(e.row._id)},{reference:J((()=>[B])),_:2},1032,["onConfirm"])])),_:1})])),_:1},8,["data"]),[[y,e.loading]]),b(u,{background:"",layout:"prev, pager, next",total:e.total,"page-size":e.pageSize,"current-page":e.currentPage,onCurrentChange:o.changePage},null,8,["total","page-size","current-page","onCurrentChange"])])),_:1}),b(g,{ref:"editItemRef",type:e.type,doorOptions:e.doorOptions,onSuccess:o.refreshData},null,8,["type","doorOptions","onSuccess"])],64)}));q.render=G,q.__scopeId="data-v-22134478";export default q;