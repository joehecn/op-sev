var e=Object.defineProperty,r=Object.defineProperties,l=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable,d=(r,l,a)=>l in r?e(r,l,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[l]=a,n=(e,r)=>{for(var l in r||(r={}))o.call(r,l)&&d(e,l,r[l]);if(a)for(var l of a(r))t.call(r,l)&&d(e,l,r[l]);return e},s=(e,a)=>r(e,l(a));import{M as i,e as u,N as c,O as p,r as m,o as g,c as f,P as b,b as y,Q as h,R as v,S as _,t as F,_ as x,d as C,T as V,p as w,a as I,U as O,W as k,w as j}from"./vendor.8e75f880.js";import{h as N}from"./index.8117c3a1.js";import{i as D}from"./index.503f9b21.js";import{a as P}from"./axios.b48086f7.js";const S={name:"DialogEditCard",props:{type:String,doorOptions:Array},emits:["success"],setup(e,r){const l=i(null),a=u({visible:!1,oldForm:null,ruleForm:{cardNo:"",cardType:"",cardType:"",doorIds:[],username:"",realname:"",userInfo:""},rules:{cardNo:[{required:"true",message:"卡號不能為空",trigger:["change"]}],username:[{required:"true",message:"用戶名不能為空",trigger:["change"]}],realname:[{required:"true",message:"姓名不能為空",trigger:["change"]}],userInfo:[{required:"true",message:"住戶信息不能為空",trigger:["change"]}]}}),o=c();return s(n({formRef:l},p(a)),{open:e=>{const r=Object.assign({},e);r.doorIds=r.doorIds.map((({_id:e})=>e)),a.oldForm=r;const l=Object.assign({},r);a.ruleForm=l,a.visible=!0},readCard:()=>{const e=o.state.vbClientID;e?P.get(`/vue_api?m=card&_id=${e}`).then((e=>{const r=JSON.parse(e);if(console.log(r),r.message)return x.error(r.message),a.ruleForm.cardNo="",void(a.ruleForm.cardType="");const l=r.card.split(" ").join("");console.log({cardNo:l});const o=parseInt(l,16);o<1e8?(a.ruleForm.cardNo=o.toString(),a.ruleForm.cardType="idi"):(a.ruleForm.cardNo=l,a.ruleForm.cardType="idm"),x.success("成功讀取卡號")})).catch((e=>{P.isAxiosError(e)?N(e):console.error(e)})):x.warning("請先在端口管理頁面選擇 VB 客戶端")},submitForm:()=>{l.value.validate().then((l=>{if(l)if("add"==e.type)P.put("/card/add",a.ruleForm).then((()=>{r.emit("success"),a.visible=!1})).catch((e=>{P.isAxiosError(e)?N(e):console.error(e)}));else{if(D(a.oldForm,a.ruleForm))return void(a.visible=!1);console.log("提交服务器"),P.post("/card/update",a.ruleForm).then((()=>{r.emit("success"),a.visible=!1})).catch((e=>{P.isAxiosError(e)?N(e):console.error(e)}))}}))}})}},E=C("讀卡"),T={style:{display:"inline-block",width:"60px"}},U={style:{color:"#8492a6"}},z={class:"dialog-footer"},R=C("取 消"),A=C("確 定");S.render=function(e,r,l,a,o,t){const d=m("el-input"),n=m("el-button"),s=m("el-form-item"),i=m("el-option"),u=m("el-select"),c=m("el-form"),p=m("el-dialog");return g(),f(p,{title:"add"==l.type?"添加門禁":"修改門禁",modelValue:e.visible,"onUpdate:modelValue":r[8]||(r[8]=r=>e.visible=r),width:"500px"},{footer:b((()=>[y("span",z,[y(n,{onClick:r[7]||(r[7]=r=>e.visible=!1)},{default:b((()=>[R])),_:1}),y(n,{type:"primary",onClick:a.submitForm},{default:b((()=>[A])),_:1},8,["onClick"])])])),default:b((()=>[y(c,{model:e.ruleForm,rules:e.rules,ref:"formRef","label-width":"100px",class:"door-form"},{default:b((()=>[y(s,{label:"卡號",prop:"cardNo"},{default:b((()=>[y(d,{style:{width:"280px"},type:"text",modelValue:e.ruleForm.cardNo,"onUpdate:modelValue":r[1]||(r[1]=r=>e.ruleForm.cardNo=r),disabled:""},null,8,["modelValue"]),y(d,{style:{width:"280px"},type:"text",modelValue:e.ruleForm.cardType,"onUpdate:modelValue":r[2]||(r[2]=r=>e.ruleForm.cardType=r),disabled:""},null,8,["modelValue"]),y(n,{style:{"margin-left":"8px"},onClick:h(a.readCard,["prevent"])},{default:b((()=>[E])),_:1},8,["onClick"])])),_:1}),y(s,{label:"門禁"},{default:b((()=>[y(u,{modelValue:e.ruleForm.doorIds,"onUpdate:modelValue":r[3]||(r[3]=r=>e.ruleForm.doorIds=r),multiple:"",placeholder:"请选择門禁"},{default:b((()=>[(g(!0),f(v,null,_(l.doorOptions,(e=>(g(),f(i,{key:e._id,label:e.building+" "+e.unit,value:e._id},{default:b((()=>[y("span",T,F(e.building),1),y("span",U,F(e.unit),1)])),_:2},1032,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),y(s,{label:"用戶名",prop:"username"},{default:b((()=>[y(d,{type:"text",modelValue:e.ruleForm.username,"onUpdate:modelValue":r[4]||(r[4]=r=>e.ruleForm.username=r)},null,8,["modelValue"])])),_:1}),y(s,{label:"姓名",prop:"realname"},{default:b((()=>[y(d,{type:"text",modelValue:e.ruleForm.realname,"onUpdate:modelValue":r[5]||(r[5]=r=>e.ruleForm.realname=r)},null,8,["modelValue"])])),_:1}),y(s,{label:"住戶信息",prop:"userInfo"},{default:b((()=>[y(d,{type:"text",modelValue:e.ruleForm.userInfo,"onUpdate:modelValue":r[6]||(r[6]=r=>e.ruleForm.userInfo=r)},null,8,["modelValue"])])),_:1})])),_:1},8,["model","rules"])])),_:1},8,["title","modelValue"])};const q={name:"Card",components:{DialogEditCard:S},setup(){const e=i(null),r=i(null),l=u({loading:!1,tableData:[],total:0,currentPage:1,pageSize:10,type:"add",doorOptions:[]});V((()=>{a(),o()}));const a=()=>{l.loading=!0,P.get("/card/list").then((e=>{const r=(l.currentPage-1)*l.pageSize,a=r+l.pageSize;l.total=e.length,l.tableData=e.slice(r,a),l.loading=!1})).catch((e=>{console.error(e)}))},o=()=>{P.get("/door/list").then((e=>{l.doorOptions=e})).catch((e=>{console.error(e)}))};return s(n({tableRef:e,editItemRef:r},p(l)),{handleAdd:()=>{l.type="add",r.value.open({cardNo:"",doorIds:[],username:"",realname:"",userInfo:""})},handleEdit:e=>{l.type="edit",r.value.open(e)},handleDelete:e=>{console.log({_id:e}),P.delete("/card/remove",{data:{_id:e}}).then((()=>{a()}))},changePage:e=>{l.currentPage=e,a()},refreshData:a})}},B=j();w("data-v-22134478");const J={class:"header"},M=C("添加"),Q={style:{display:"inline-block",width:"80px"}},W=y("a",{style:{cursor:"pointer"}},"删除",-1);I();const $=B(((e,r,l,a,o,t)=>{const d=m("el-button"),n=m("el-table-column"),s=m("el-popconfirm"),i=m("el-table"),u=m("el-pagination"),c=m("el-card"),p=m("DialogEditCard"),b=O("loading");return g(),f(v,null,[y(c,{class:"index-container"},{header:B((()=>[y("div",J,[y(d,{type:"primary",size:"small",icon:"el-icon-plus",onClick:a.handleAdd},{default:B((()=>[M])),_:1},8,["onClick"])])])),default:B((()=>[k(y(i,{ref:"tableRef",data:e.tableData,"tooltip-effect":"dark",style:{width:"100%"}},{default:B((()=>[y(n,{prop:"cardNo",label:"卡號",width:"200"}),y(n,{prop:"cardType",label:"類型",width:"200"}),y(n,{label:"門禁",width:"200"},{default:B((e=>[(g(!0),f(v,null,_(e.row.doorIds,(e=>(g(),f("div",{key:e._id},[y("span",Q,F(e.building),1),y("span",null,F(e.unit),1)])))),128))])),_:1}),y(n,{prop:"username",label:"用戶名"}),y(n,{prop:"realname",label:"姓名"}),y(n,{prop:"userInfo",label:"住戶信息"}),y(n,{label:"操作",width:"100"},{default:B((e=>[y("a",{style:{cursor:"pointer","margin-right":"10px"},onClick:r=>a.handleEdit(e.row)},"修改",8,["onClick"]),y(s,{title:"确定删除吗？",onConfirm:r=>a.handleDelete(e.row._id)},{reference:B((()=>[W])),_:2},1032,["onConfirm"])])),_:1})])),_:1},8,["data"]),[[b,e.loading]]),y(u,{background:"",layout:"prev, pager, next",total:e.total,"page-size":e.pageSize,"current-page":e.currentPage,onCurrentChange:a.changePage},null,8,["total","page-size","current-page","onCurrentChange"])])),_:1}),y(p,{ref:"editItemRef",type:e.type,doorOptions:e.doorOptions,onSuccess:a.refreshData},null,8,["type","doorOptions","onSuccess"])],64)}));q.render=$,q.__scopeId="data-v-22134478";export default q;
