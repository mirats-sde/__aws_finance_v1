(self.webpackChunkinvoive=self.webpackChunkinvoive||[]).push([[5564,3001,554,6839,9356],{6839:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return b}});var i=t(885),o={header:"Header_header__d+igc",active:"Header_active__7nHMJ",header_left:"Header_header_left__b5+S6",header_right:"Header_header_right__Yp9r9",right:"Header_right__b7qNX",sign_in:"Header_sign_in__l1VlE",portalprofile:"Header_portalprofile__Qf5Cm",avatar_profile:"Header_avatar_profile__WRaZm",navTitles:"Header_navTitles__hJeSy",dropdownContainer:"Header_dropdownContainer__uA-2z",dropdownLists:"Header_dropdownLists__enHds",myNav:"Header_myNav__3EAW-"},l=t(9714),a=t(7689),r=t(1087),s=t(6809),d=t(6149),c=t(3811),u=t(7997),v=t(7254),h=t(5514),m=t(3564),p=t(2791),x=t(6205),f=t(9460),_=t(5933),g=t(6910),j=t(184),b=function(){var e=(0,p.useState)(null),n=(0,i.Z)(e,2),t=n[0],b=n[1],C=(0,g.F_)(_.I8),N=(0,i.Z)(C,1)[0],y=Boolean(t),Z=function(){b(null)};return(0,j.jsx)(j.Fragment,{children:(0,j.jsx)("div",{className:o.header,children:(0,j.jsxs)("header",{children:[(0,j.jsxs)("div",{className:o.header_left,children:[(0,j.jsx)("figure",{children:(0,j.jsx)("img",{src:l,alt:""})}),(0,j.jsxs)("div",{className:o.navCenterBody,children:[(0,j.jsx)(r.OL,{to:"/invoices",className:function(e){return e.isActive?o.active:""},children:(0,j.jsx)("span",{className:o.nav_name,children:"Invoices"})}),(0,j.jsx)(r.OL,{to:"/vendors",className:function(e){return e.isActive?o.active:""},children:(0,j.jsx)("span",{className:o.nav_name,children:"Vendors"})}),(0,j.jsx)(r.OL,{to:"/vendor-invoice",className:function(e){return e.isActive?o.active:""},children:(0,j.jsx)("span",{className:o.nav_name,children:"Vendor Invoices"})}),(0,j.jsx)(r.OL,{to:"/client-report",className:function(e){return e.isActive?o.active:""},children:(0,j.jsx)("span",{className:o.nav_name,children:"Client Report"})}),(0,j.jsx)(r.OL,{to:"/clients",className:function(e){return e.isActive?o.active:""},children:(0,j.jsx)("span",{className:o.nav_name,children:"Clients"})}),(0,j.jsxs)("span",{className:o.dropdownContainer,children:[(0,j.jsx)("span",{className:o.myNav,children:"others"}),(0,j.jsxs)("ul",{className:o.dropdownLists,children:[(0,j.jsx)("li",{children:(0,j.jsx)(r.OL,{to:"/bank",className:function(e){return e.isActive?o.active:""},children:(0,j.jsx)("span",{className:o.nav_name,children:"Bank"})})}),(0,j.jsx)("li",{children:(0,j.jsx)(r.OL,{to:"/companies",className:function(e){return e.isActive?o.active:""},children:(0,j.jsx)("span",{className:o.nav_name,children:"Companies"})})}),(0,j.jsx)("li",{children:(0,j.jsx)(r.OL,{to:"/expense",className:function(e){return e.isActive?o.active:""},children:(0,j.jsx)("span",{className:o.nav_name,children:"Expense"})})})]})]})]})]}),(0,j.jsxs)("div",{className:o.right,children:[(0,j.jsx)("section",{}),(0,j.jsxs)("section",{className:o.sign_in,children:[(0,j.jsx)(s.Z,{children:(0,j.jsx)(d.Z,{title:"Account settings",children:(0,j.jsx)(c.Z,{onClick:function(e){b(e.currentTarget)},size:"small",sx:{ml:2},"aria-controls":y?"account-menu":void 0,"aria-haspopup":"true","aria-expanded":y?"true":void 0,children:(0,j.jsx)(m.ZP,{size:"lg",bordered:!0,zoomed:!0,className:o.avatar_img})})})}),(0,j.jsxs)(u.Z,{anchorEl:t,id:"account-menu",open:y,onClose:Z,onClick:Z,PaperProps:{elevation:0,sx:{overflow:"visible",filter:"drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",mt:1.5,"& .MuiAvatar-root":{width:32,height:32,ml:-.5,mr:1},"&:before":{content:'""',display:"block",position:"absolute",top:0,right:14,width:10,height:10,bgcolor:"background.paper",transform:"translateY(-50%) rotate(45deg)",zIndex:0}}},transformOrigin:{horizontal:"right",vertical:"top"},anchorOrigin:{horizontal:"right",vertical:"bottom"},children:[(0,j.jsxs)(v.Z,{children:[(0,j.jsx)(m.ZP,{size:"sm",bordered:!0,className:o.avatar_img})," ",(0,j.jsx)("span",{className:o.avatar_profile,children:null===N||void 0===N?void 0:N.email})]}),(0,j.jsxs)(v.Z,{onClick:function(){(0,f.w7)(_.I8).then((function(e){return(0,j.jsx)(a.Fg,{to:"/login"})}))},children:[(0,j.jsx)(h.Z,{children:(0,j.jsx)(x.Z,{fontSize:"small"})}),"Logout"]})]})]})]})]})})})}},3001:function(e,n,t){"use strict";t.r(n),t.d(n,{useCustomerContext:function(){return h}});var i=t(4942),o=t(1413),l=t(885),a=t(4569),r=t.n(a),s=t(2791),d=t(7689),c=t(9356),u=t(184),v=(0,s.createContext)(),h=function(){return(0,s.useContext)(v)};n.default=function(e){var n=e.children,t=(0,d.s0)(),a=(0,c.UseGlobalContext)().setSnackbar,h=(0,s.useState)({billing_address:{place_of_supply:"INTERNATIONAL"},shipping_address:{place_of_supply:"INTERNATIONAL"}}),m=(0,l.Z)(h,2),p=m[0],x=m[1],f=(0,s.useState)(!1),_=(0,l.Z)(f,2),g=_[0],j=_[1],b=(0,s.useState)([]),C=(0,l.Z)(b,2),N=C[0],y=C[1],Z=(0,s.useCallback)((function(){r().get("https://finance.miratsoneservices.com/api/get-customer").then((function(e){y(null===e||void 0===e?void 0:e.data)})).catch((function(e){return console.log(e)}))}),[N]);(0,s.useEffect)((function(){Z()}),[]);var S={handleChange:function(e){x((function(n){return(0,o.Z)((0,o.Z)({},n),{},(0,i.Z)({},e.target.name,e.target.value))}))},disableBTN:g,setDisableBTN:j,customerInputData:p,getAllCustomerData:Z,setCustomerInputData:x,customerBillingAddressChange:function(e){x((function(n){return(0,o.Z)((0,o.Z)({},n),{},{billing_address:(0,o.Z)((0,o.Z)({},n.billing_address),{},(0,i.Z)({},e.target.name,e.target.value))})}))},customerShippingAddressChange:function(e){x((function(n){return(0,o.Z)((0,o.Z)({},n),{},{shipping_address:(0,o.Z)((0,o.Z)({},n.shipping_address),{},(0,i.Z)({},e.target.name,e.target.value))})}))},submitAddCustomer:function(){console.log("submit"),j(!0),t("/clients"),r().post("https://finance.miratsoneservices.com/api/create-customer",p).then((function(e){console.log(e.data),r().post("https://finance.miratsoneservices.com/api/create-tax-information",(0,o.Z)({customer_id:e.data.customer_id},null===p||void 0===p?void 0:p.tax_information)),r().post("https://finance.miratsoneservices.com/api/create-billing-address",(0,o.Z)({customer_id:e.data.customer_id},null===p||void 0===p?void 0:p.billing_address)),r().post("https://finance.miratsoneservices.com/api/create-shipping_address",(0,o.Z)({customer_id:e.data.customer_id},null===p||void 0===p?void 0:p.shipping_address)),r().post("https://finance.miratsoneservices.com/api/create-customer-bank-details",(0,o.Z)({customer_id:e.data.customer_id},null===p||void 0===p?void 0:p.bank_details)).then((function(e){return Z()}),j(!1),a({open:!0,severity:"success",msg:"Customer Added Successfully!"}))})).catch((function(e){return console.log(e)}))},allCustomerData:N,setAllCustomerData:y};return(0,u.jsx)(v.Provider,{value:S,children:n})}},9356:function(e,n,t){"use strict";t.r(n),t.d(n,{UseGlobalContext:function(){return p}});var i=t(1413),o=t(2982),l=t(885),a=t(4569),r=t.n(a),s=t(276),d=t(2791),c=t(5933),u=t(1647),v=t(1508),h=t(184),m=(0,d.createContext)(),p=function(){return(0,d.useContext)(m)};n.default=function(e){var n=e.children,t=(0,d.useState)([]),a=(0,l.Z)(t,2),p=a[0],x=a[1],f=(0,d.useState)({open:!1,severity:"",msg:""}),_=(0,l.Z)(f,2),g=_[0],j=_[1],b=(0,d.useState)([]),C=(0,l.Z)(b,2),N=C[0],y=C[1],Z=(0,d.useState)([]),S=(0,l.Z)(Z,2),w=(S[0],S[1],(0,d.useState)(!1)),D=(0,l.Z)(w,2),A=D[0],I=D[1],k=function(){r().get("https://finance.miratsoneservices.com/api/get-bank-transaction").then((function(e){x(null===e||void 0===e?void 0:e.data)}))};(0,d.useEffect)((function(){k(),(0,s.aF)((0,s.iH)(c.tO,(0,s.iH)("bank_statement"))).then((function(e){e.prefixes.forEach((function(e){y((function(n){return[].concat((0,o.Z)(n),[e.name])}))})),e.items.forEach((function(e){console.log(e)}))}))}),[]);var F={bankTransaction:p,name:"sonumonu",getingImgFromFolder:N,setGetingImgFromFolder:y,getBankTransaction:k,setSnackbar:j,disableBtn:A,setDisableBtn:I},L=d.forwardRef((function(e,n){return(0,h.jsx)(v.Z,(0,i.Z)({elevation:6,ref:n,variant:"filled"},e))})),P=function(e,n){"clickaway"!==n&&j({open:!1})};return(0,h.jsxs)(m.Provider,{value:F,children:[n,(0,h.jsx)(u.Z,{open:null===g||void 0===g?void 0:g.open,autoHideDuration:4e3,onClose:P,children:(0,h.jsx)(L,{onClose:P,severity:null===g||void 0===g?void 0:g.severity,sx:{width:"100%"},children:null===g||void 0===g?void 0:g.msg})})]})}},554:function(e,n,t){"use strict";t.r(n),t.d(n,{useInvoiceContext:function(){return d}});var i=t(885),o=t(4569),l=t.n(o),a=t(2791),r=t(184),s=(0,a.createContext)(),d=function(){return(0,a.useContext)(s)};n.default=function(e){var n=e.children,t=(0,a.useState)([]),o=(0,i.Z)(t,2),d=o[0],c=o[1],u=(0,a.useState)([]),v=(0,i.Z)(u,2),h=v[0],m=v[1],p=(0,a.useState)([]),x=(0,i.Z)(p,2),f=x[0],_=x[1],g=(0,a.useCallback)((function(){l().get("https://finance.miratsoneservices.com/api/get-company").then((function(e){var n;return c(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.reverse())})).catch((function(e){return console.log(e)}))}),[d]),j=(0,a.useCallback)((function(){l().get("https://finance.miratsoneservices.com/api/get-invoice").then((function(e){var n;return _(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.reverse())})).catch((function(e){return console.log(e)}))}),[f]);function b(e){l().get("https://finance.miratsoneservices.com/api/get-signature").then((function(e){return m(null===e||void 0===e?void 0:e.data)})).catch((function(e){return console.log(e)}))}(0,a.useEffect)((function(){g(),j(),b()}),[]);var C={allCompanyData:d,allInvoicesData:f,setAllCompanyData:c,fetchAllCompanyData:j,fetchAllInvoicesData:g,fetchAllSignatureData:b,signatureData:h};return(0,r.jsx)(s.Provider,{value:C,children:n})}},9411:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return w}});var i,o=t(4942),l=t(1413),a=t(885),r=t(168),s=t(2791),d=t(7689),c=t(1087),u=t(3001),v=t(554),h={invoice_table:"VendorReport_invoice_table__qrXgk",filtersContainer:"VendorReport_filtersContainer__kIxKJ",modalInnerContainer:"VendorReport_modalInnerContainer__cFQgC",inputContainer:"VendorReport_inputContainer__8I12e"},m=t(3457),p=(t(6082),t(3677)),x=t(4045),f=t(5923),_=t(6809),g=t(4569),j=t.n(g),b=t(6839),C=t(9356),N=t(184),y=t(9704),Z={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:600,height:400,bgcolor:"background.paper",border:"none",boxShadow:64,p:4},S=(0,m.Z)(p.Z)(i||(i=(0,r.Z)(["\n  & .MuiTablePaginationUnstyled-toolbar {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    align-items: flex-start;\n    gap: 12px;\n    padding: 0.5em 0em;\n\n    @media (min-width: 768px) {\n      flex-direction: row;\n      align-items: center;\n    }\n  }\n\n  & .MuiTablePaginationUnstyled-selectLabel {\n    margin: 0;\n  }\n\n  & .MuiTablePaginationUnstyled-select {\n    padding: 0.1em 1em;\n    border-radius: 5px;\n    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,\n      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;\n    border: none;\n    font-weight: 700;\n    font-size: 14px;\n    color: #484848;\n    outline: none;\n  }\n\n  & .MuiTablePaginationUnstyled-displayedRows {\n    margin: 0;\n\n    @media (min-width: 768px) {\n      margin-left: auto;\n    }\n  }\n\n  & .MuiTablePaginationUnstyled-spacer {\n    display: none;\n  }\n\n  & .MuiTablePaginationUnstyled-actions {\n    display: flex;\n    gap: 0.5rem;\n    padding: 0.5em;\n  }\n\n  & .MuiTablePaginationUnstyled-actions button {\n    padding: 0.1em 0.5em;\n    border: 1px solid #828282;\n    cursor: pointer;\n    background-color: white;\n    border-radius: 5px;\n    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,\n      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;\n    border: none;\n  }\n\n  & .MuiTablePaginationUnstyled-actions span {\n    // padding: 0 0.8em;\n    padding: 1em;\n    color: #484848;\n    font-weight: 700;\n  }\n"]))),w=function(){var e,n,t,i,r,m,p=(0,s.useState)({}),g=(0,a.Z)(p,2),w=(g[0],g[1],(0,v.useInvoiceContext)().allInvoicesData),D=(0,u.useCustomerContext)().allCustomerData,A=(0,s.useState)(0),I=(0,a.Z)(A,2),k=I[0],F=I[1],L=(0,s.useState)(50),P=(0,a.Z)(L,2),T=P[0],R=P[1],H=((0,d.s0)(),s.useState(null)),M=(0,a.Z)(H,2),O=(M[0],M[1],(0,s.useState)({})),E=(0,a.Z)(O,2),U=E[0],B=E[1],q=(0,s.useState)({}),z=(0,a.Z)(q,2),G=z[0],V=z[1],J=(0,s.useState)([]),Y=(0,a.Z)(J,2),Q=(Y[0],Y[1],(0,s.useState)({})),W=(0,a.Z)(Q,2),X=(W[0],W[1],s.useState(!1)),K=(0,a.Z)(X,2),$=K[0],ee=K[1],ne=(0,C.UseGlobalContext)().setSnackbar,te=function(){ee(!1),V({})},ie=["January","February","March","April","May","June","July","August","September","October","November","December"],oe=[];!function(){for(var e=(new Date).getFullYear(),n=e-9,t=e;t>=n;t--)oe.push(t)}();var le=function(e){""!==e.target.value?R(-1):R(50),B((function(n){return(0,l.Z)((0,l.Z)({},n),{},(0,o.Z)({},e.target.name,e.target.value))}))},ae=function(e){var n=y.AES.encrypt(e,"MiratsInsights").toString();return y.enc.Base64.parse(n).toString(y.enc.Hex)},re=function(e){V((function(n){return(0,l.Z)((0,l.Z)({},n),{},(0,o.Z)({},e.target.name,e.target.value))}))};return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(b.default,{}),(0,N.jsxs)("div",{className:h.invoice_table,children:[(0,N.jsxs)("div",{className:h.filtersContainer,children:[(0,N.jsxs)("select",{name:"client",onChange:function(e){""!==e.target.value?R(-1):R(50),B((function(n){return(0,l.Z)((0,l.Z)({},n),{},(0,o.Z)({},e.target.name,e.target.value))}))},children:[(0,N.jsx)("option",{value:"",selected:!0,children:"Select Client"}),null===D||void 0===D?void 0:D.map((function(e,n){return(0,N.jsx)("option",{value:null===e||void 0===e?void 0:e.customer_id,children:null===e||void 0===e?void 0:e.company_name},n)}))]}),(0,N.jsx)("input",{type:"search",placeholder:" Client Name",name:"clientName",onChange:le}),(0,N.jsx)("input",{type:"search",placeholder:"Search by #PO",name:"po_number",onChange:le}),(0,N.jsxs)("select",{name:"month",onChange:function(e){""!==e.target.value?R(-1):R(50),B((function(n){return(0,l.Z)((0,l.Z)({},n),{},(0,o.Z)({},e.target.name,e.target.value))}))},children:[(0,N.jsx)("option",{value:"",selected:!0,children:"Select Month"}),null===ie||void 0===ie?void 0:ie.map((function(e,n){return(0,N.jsx)("option",{value:n,children:e},n)}))]}),(0,N.jsxs)("select",{name:"year",onChange:le,children:[(0,N.jsx)("option",{value:"",selected:!0,children:"Select Year"}),null===oe||void 0===oe?void 0:oe.map((function(e,n){return(0,N.jsx)("option",{value:e,children:e},n)}))]}),(0,N.jsx)("button",{onClick:function(){var e=document.getElementById("table-to-xls-DATA"),n=x.P6.table_to_book(e,{sheet:"Sheet JS"});return(0,x.NC)(n,"Client-Reports.xlsx")},children:"Download"})]}),(0,N.jsxs)("table",{"aria-label":"custom pagination table",id:"table-to-xls-DATA",children:[(0,N.jsx)("thead",{children:(0,N.jsxs)("tr",{children:[(0,N.jsx)("th",{children:"Client Name"}),(0,N.jsx)("th",{children:"Project Name"}),(0,N.jsx)("th",{children:"Invoice No "}),(0,N.jsx)("th",{children:"Date of Invoice"}),(0,N.jsx)("th",{children:"Due date"}),(0,N.jsx)("th",{children:"PO#"}),(0,N.jsx)("th",{children:"Qty"}),(0,N.jsx)("th",{children:"Rate"}),(0,N.jsx)("th",{children:"Amt in USD"}),(0,N.jsx)("th",{children:"Total Invoice Amt"}),(0,N.jsx)("th",{children:"INR Amt Taxable"}),(0,N.jsx)("th",{children:"GST"}),(0,N.jsx)("th",{children:"TDS"}),(0,N.jsx)("th",{children:"Net Receivable"}),(0,N.jsx)("th",{children:"Exchange Rate"}),(0,N.jsx)("th",{children:"Billing Entity"}),(0,N.jsx)("th",{children:"Completes as per Console"}),(0,N.jsx)("th",{children:"QR%"}),(0,N.jsx)("th",{children:" Name of Project Manager"}),(0,N.jsx)("th",{children:" Status"}),(0,N.jsx)("th",{children:" Date of Receipt"}),(0,N.jsx)("th",{children:" Remarks"})]})}),(0,N.jsx)("tbody",{children:(0,N.jsxs)(N.Fragment,{children:[null===(e=T>0?null===w||void 0===w?void 0:w.slice(k*T,k*T+T):w)||void 0===e?void 0:e.map((function(e,n){var t,i,o,l,a,r;return(0,N.jsx)(s.Fragment,{children:null===D||void 0===D||null===(t=D.filter((function(n){return(null===n||void 0===n?void 0:n.customer_id)==(null===e||void 0===e?void 0:e.customer_id)})))||void 0===t||null===(i=t.filter((function(n){var t,i;return null!==U&&void 0!==U&&U.po_number?null===e||void 0===e||null===(t=e.orders)||void 0===t||null===(i=t.filter((function(e){return null===e||void 0===e?void 0:e.description.toLowerCase().includes(null===U||void 0===U?void 0:U.po_number.toLowerCase())})))||void 0===i?void 0:i.length:n})))||void 0===i||null===(o=i.filter((function(e){return null!==U&&void 0!==U&&U.client?(null===e||void 0===e?void 0:e.customer_id)==(null===U||void 0===U?void 0:U.client):e})))||void 0===o||null===(l=o.filter((function(e){var n,t,i;return null!==U&&void 0!==U&&U.clientName?null===e||void 0===e||null===(n=e.company_name)||void 0===n||null===(t=n.toLowerCase())||void 0===t?void 0:t.includes(null===U||void 0===U||null===(i=U.clientName)||void 0===i?void 0:i.toLowerCase()):e})))||void 0===l||null===(a=l.filter((function(n){var t;return null!==U&&void 0!==U&&U.month?(null===(t=new Date(null===e||void 0===e?void 0:e.invoice_date))||void 0===t?void 0:t.getMonth())==(null===U||void 0===U?void 0:U.month):n})))||void 0===a||null===(r=a.filter((function(n){var t;return null!==U&&void 0!==U&&U.year?(null===(t=new Date(null===e||void 0===e?void 0:e.invoice_date))||void 0===t?void 0:t.getFullYear())==(null===U||void 0===U?void 0:U.year):n})))||void 0===r?void 0:r.map((function(n,t){var i,o,l,a,r,d,u,v,m,p,x,f,_,g,j;return(0,N.jsx)(s.Fragment,{children:(0,N.jsxs)("tr",{className:"canceled"===(null===e||void 0===e||null===(i=e.status)||void 0===i?void 0:i.toLowerCase())||"cancelled"===(null===e||void 0===e||null===(o=e.status)||void 0===o?void 0:o.toLowerCase())?h.cancelledRow:"",onClick:function(n){return t=e,ee(!0),void V(t);var t},style:{cursor:"pointer"},children:[(0,N.jsxs)("td",{children:[(0,N.jsx)("a",{className:h.customerLink,href:e.customerLink,children:null===n||void 0===n?void 0:n.company_name})," ",(0,N.jsx)("p",{children:null===n||void 0===n?void 0:n.account_email_id})]}),(0,N.jsx)("td",{children:null===e||void 0===e?void 0:e.project_name}),(0,N.jsxs)("td",{children:[(0,N.jsx)("p",{children:null===e||void 0===e?void 0:e.invoice_number}),(0,N.jsx)("p",{className:h.light,children:(0,N.jsx)(c.rU,{className:h.invoiceLink,to:"/invoices/".concat(ae(null===e||void 0===e?void 0:e.invoice_number)),children:"View Invoice"})})]}),(0,N.jsx)("td",{className:h.warning,children:(0,N.jsx)("p",{className:h.light,children:null===(l=new Date(null===e||void 0===e?void 0:e.invoice_date))||void 0===l?void 0:l.toLocaleDateString("en-IN")})}),(0,N.jsx)("td",{className:h.create,children:(0,N.jsx)("p",{children:null===(a=new Date(null===e||void 0===e?void 0:e.invoice_dueDate))||void 0===a?void 0:a.toLocaleDateString("en-in")})}),(0,N.jsx)("td",{children:(0,N.jsx)("span",{className:"active"===(null===e||void 0===e||null===(r=e.status)||void 0===r?void 0:r.toLowerCase())?h.active:h.canceled,children:null===e||void 0===e||null===(d=e.orders)||void 0===d?void 0:d.map((function(e){return"".concat(null===e||void 0===e?void 0:e.description,",  ")}))})}),(0,N.jsx)("td",{children:(0,N.jsx)("p",{children:null===e||void 0===e||null===(u=e.orders)||void 0===u||null===(v=u.reduce((function(e,n,t){return(e*t+Number(null===n||void 0===n?void 0:n.quantity))/(t+1)}),0))||void 0===v?void 0:v.toFixed(2)})}),(0,N.jsx)("td",{children:null===e||void 0===e||null===(m=e.orders)||void 0===m||null===(p=m.reduce((function(e,n,t){return(e*t+Number(null===n||void 0===n?void 0:n.rate))/(t+1)}),0))||void 0===p?void 0:p.toFixed(3)}),(0,N.jsx)("td",{children:null!==e&&void 0!==e&&e.currency_type?null===e||void 0===e?void 0:e.total_amount:"-"}),(0,N.jsxs)("td",{children:[null!==e&&void 0!==e&&e.currency_type?null===e||void 0===e?void 0:e.currency_type:"INR"," ",null!==e&&void 0!==e&&e.total_amount?null===e||void 0===e||null===(x=e.total_amount)||void 0===x?void 0:x.toFixed(3):"0"]}),(0,N.jsx)("td",{children:null!==e&&void 0!==e&&e.taxable_amount?null===e||void 0===e||null===(f=e.taxable_amount)||void 0===f?void 0:f.toFixed(3):"0"}),(0,N.jsx)("td",{children:null!==e&&void 0!==e&&e.IGST?null===e||void 0===e||null===(_=e.IGST)||void 0===_?void 0:_.toFixed(2):"0"}),(0,N.jsx)("td",{children:null!==e&&void 0!==e&&e.tds?null===e||void 0===e?void 0:e.tds:"0"}),(0,N.jsxs)("td",{children:[" ",null!==e&&void 0!==e&&e.currency_type?null===e||void 0===e?void 0:e.currency_type:"INR"," ",null!==e&&void 0!==e&&e.currency_type?null===e||void 0===e?void 0:e.total_amount:null===(g=Number((null===e||void 0===e?void 0:e.taxable_amount)+(null===e||void 0===e?void 0:e.IGST)))||void 0===g?void 0:g.toFixed(2)]}),(0,N.jsx)("td",{children:null!==e&&void 0!==e&&e.exchange_rate?null===e||void 0===e?void 0:e.exchange_rate:"-"}),(0,N.jsx)("td",{children:"bE"}),(0,N.jsx)("td",{children:null!==e&&void 0!==e&&e.completes_as_per_console?null===e||void 0===e?void 0:e.completes_as_per_console:"-"}),(0,N.jsx)("td",{children:null!==e&&void 0!==e&&e.qr?null===e||void 0===e?void 0:e.qr:"-"}),(0,N.jsxs)("td",{children:[" ",null!==e&&void 0!==e&&e.project_manager?null===e||void 0===e?void 0:e.project_manager:"-"]}),(0,N.jsx)("td",{children:null===e||void 0===e?void 0:e.status}),(0,N.jsxs)("td",{children:[" ",null!==e&&void 0!==e&&e.date_of_receipt?null===(j=new Date(null===e||void 0===e?void 0:e.date_of_receipt))||void 0===j?void 0:j.toLocaleDateString("en-in"):"-"]}),(0,N.jsx)("td",{children:null!==e&&void 0!==e&&e.note?null===e||void 0===e?void 0:e.note:"-"}),(0,N.jsx)("br",{})]},t)},t)}))},n+6)})),(0,N.jsx)(N.Fragment,{children:(0,N.jsxs)("tr",{children:[(0,N.jsx)("td",{}),(0,N.jsx)("td",{}),(0,N.jsx)("td",{}),(0,N.jsx)("td",{}),(0,N.jsx)("td",{}),(0,N.jsx)("td",{}),(0,N.jsx)("td",{}),(0,N.jsx)("td",{}),(0,N.jsx)("td",{}),(0,N.jsx)("td",{}),(0,N.jsx)("td",{}),(0,N.jsx)("td",{}),(0,N.jsx)("td",{}),(0,N.jsx)("td",{}),(0,N.jsx)("td",{}),(0,N.jsx)("td",{}),(0,N.jsx)("td",{}),(0,N.jsx)("td",{colSpan:"2",children:"Total Amount(INR)"}),(0,N.jsx)("td",{colSpan:"3",children:null===w||void 0===w||null===(n=w.filter((function(e){return null!==U&&void 0!==U&&U.client?(null===e||void 0===e?void 0:e.customer_id)==(null===U||void 0===U?void 0:U.client):e})))||void 0===n||null===(t=n.filter((function(e){var n;return null!==U&&void 0!==U&&U.month?(null===(n=new Date(null===e||void 0===e?void 0:e.invoice_date))||void 0===n?void 0:n.getMonth())==(null===U||void 0===U?void 0:U.month):e})))||void 0===t||null===(i=t.filter((function(e){var n,t;return null!==U&&void 0!==U&&U.po_number?null===e||void 0===e||null===(n=e.orders)||void 0===n||null===(t=n.filter((function(e){return null===e||void 0===e?void 0:e.description.toLowerCase().includes(null===U||void 0===U?void 0:U.po_number.toLowerCase())})))||void 0===t?void 0:t.length:e})))||void 0===i||null===(r=i.filter((function(e){var n;return null!==U&&void 0!==U&&U.year?(null===(n=new Date(null===e||void 0===e?void 0:e.invoice_date))||void 0===n?void 0:n.getFullYear())==(null===U||void 0===U?void 0:U.year):e})))||void 0===r||null===(m=r.reduce((function(e,n){return e+(null!==n&&void 0!==n&&n.current_USD_price?Number(null===n||void 0===n?void 0:n.total_amount)*Number(null===n||void 0===n?void 0:n.current_USD_price):Number(null===n||void 0===n?void 0:n.total_amount))}),0))||void 0===m?void 0:m.toFixed(2)})]})})]})}),(0,N.jsx)("tfoot",{children:(0,N.jsx)("tr",{children:(0,N.jsx)(S,{rowsPerPageOptions:[50,100,150,{label:"All",value:-1}],colSpan:3,count:w.length,rowsPerPage:T,page:k,componentsProps:{select:{"aria-label":"rows per page"},actions:{showFirstButton:!0,showLastButton:!0}},onPageChange:function(e,n){F(n)},onRowsPerPageChange:function(e){R(parseInt(e.target.value,10)),F(0)}})})})]}),(0,N.jsx)(f.Z,{open:$,onClose:te,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,N.jsx)(_.Z,{sx:Z,children:(0,N.jsxs)("div",{className:h.modalInnerContainer,children:[(0,N.jsxs)("div",{className:h.inputContainer,children:[(0,N.jsx)("label",{htmlFor:"project_name",children:"Project Name"})," : ",(0,N.jsx)("input",{type:"text",name:"project_name",value:null===G||void 0===G?void 0:G.project_name,onChange:re})]}),(0,N.jsxs)("div",{className:h.inputContainer,children:[(0,N.jsx)("label",{htmlFor:"exchange_rate",children:"Exchange Rate"})," : ",(0,N.jsx)("input",{type:"text",name:"exchange_rate",value:null===G||void 0===G?void 0:G.exchange_rate,onChange:re})]}),(0,N.jsxs)("div",{className:h.inputContainer,children:[(0,N.jsx)("label",{htmlFor:"completes_as_per_console",children:"Completes As Per Console"})," : ",(0,N.jsx)("input",{type:"text",name:"completes_as_per_console",value:null===G||void 0===G?void 0:G.completes_as_per_console,onChange:re})]}),(0,N.jsxs)("div",{className:h.inputContainer,children:[(0,N.jsx)("label",{htmlFor:"qr",children:"QR"})," : ",(0,N.jsx)("input",{type:"text",name:"qr",value:null===G||void 0===G?void 0:G.qr,onChange:re})]}),(0,N.jsxs)("div",{className:h.inputContainer,children:[(0,N.jsx)("label",{htmlFor:"project_manager",children:"Project Manager"})," : ",(0,N.jsx)("input",{type:"text",name:"project_manager",value:null===G||void 0===G?void 0:G.project_manager,onChange:re})]}),(0,N.jsxs)("div",{className:h.inputContainer,children:[(0,N.jsx)("label",{htmlFor:"date_of_receipt",children:"Date Of Receipt"})," : ",(0,N.jsx)("input",{type:"date",name:"date_of_receipt",value:null===G||void 0===G?void 0:G.date_of_receipt,onChange:re})]}),(0,N.jsxs)("div",{className:h.inputContainer,children:[(0,N.jsx)("button",{children:"Cancel"}),(0,N.jsx)("button",{onClick:function(e){j().put("https://finance.miratsoneservices.com/api/update-invoice/".concat(null===G||void 0===G?void 0:G.invoice_number),{project_name:null===G||void 0===G?void 0:G.project_name,exchange_rate:null===G||void 0===G?void 0:G.exchange_rate,completes_as_per_console:null===G||void 0===G?void 0:G.completes_as_per_console,qr:null===G||void 0===G?void 0:G.qr,project_manager:null===G||void 0===G?void 0:G.project_manager,date_of_receipt:null===G||void 0===G?void 0:G.date_of_receipt}).then((function(e){te(),ne({open:!0,severity:"success",msg:"Report Updated Successfully!"})})).catch((function(e){return console.log(e)}))},children:"Upload"})]})]})})})]})]})}},6082:function(e,n,t){"use strict";e.exports=t.p+"static/media/loader.56ec7b0f514fa47b67e4.gif"},9714:function(e,n,t){"use strict";e.exports=t.p+"static/media/miratsLogo.b2dc32dbe312888e3144.png"},2480:function(){}}]);
//# sourceMappingURL=5564.0f259469.chunk.js.map