"use strict";(self.webpackChunkinvoive=self.webpackChunkinvoive||[]).push([[8386],{8386:function(n,i,e){e.r(i);var l=e(2982),d=e(1413),o=e(885),s=e(2791),t=e(4817),a=e(9714),c=e(9318),r=e(4569),v=e.n(r),u=e(554),_=e(3001),h=e(7689),m=e(8617),x=e(7692),j=e(6856),p=e(1146),I=e(5923),b=e(6809),y=(e(948),e(6839)),f=e(9704),g=e.n(f),N=e(9356),Z=e(184);i.default=function(){var n,i,e,r,f,C=(0,h.UO)().invoiceNumber,S=null!==(n=C)&&void 0!==n&&n.includes("-")?null===(i=C)||void 0===i?void 0:i.split("-")[1]:null;C=null!==(e=C)&&void 0!==e&&e.includes("-")?null===(r=C)||void 0===r?void 0:r.split("-")[0]:C;var T=(0,N.UseGlobalContext)().setSnackbar,w=(0,s.useRef)(null),k=(0,s.useRef)(null),F=function(n){var i;navigator.clipboard.writeText(null===w||void 0===w||null===(i=w.current)||void 0===i?void 0:i.innerHTML),k.current.style.color="rgb(174, 38, 41)",k.current.style.scale="1.2",setTimeout((function(){k.current.style.scale="1"}),500)},D=function(n){var i=g().enc.Hex.parse(n).toString(g().enc.Base64);return g().AES.decrypt(i,"MiratsInsights").toString(g().enc.Utf8)},R=(0,s.useState)({}),A=(0,o.Z)(R,2),G=(A[0],A[1]),L=(0,u.useInvoiceContext)(),M=L.allInvoicesData,P=L.allCompanyData,B=L.fetchAllCompanyData,z=L.fetchAllInvoicesData,U=(0,_.useCustomerContext)().allCustomerData,E=(0,h.s0)();(0,s.useEffect)((function(){v().get("https://finance.miratsoneservices.com/api/get-company").then((function(n){return G((function(i){return(0,d.Z)((0,d.Z)({},i),{},{companyData:(0,l.Z)(n.data)})}))})).catch((function(n){return console.log(n)})),v().get("https://finance.miratsoneservices.com/api/get-customer").then((function(n){return G((function(i){return(0,d.Z)((0,d.Z)({},i),{},{customerData:(0,l.Z)(n.data)})}))})).catch((function(n){return console.log(n)}))}),[]);var O=new c.ToWords({localeCode:"en-IN",converterOptions:{currency:!0,ignoreDecimal:!1,ignoreZeroCurrency:!1,doNotAddOnly:!1}}),q=(0,s.useRef)(),H=(0,p.useReactToPrint)({content:function(){return q.current},documentTitle:D(C)}),W=(0,s.useMemo)((function(){return null===M||void 0===M?void 0:M.filter((function(n){return(null===n||void 0===n?void 0:n.invoice_number)===D(C)}))}),[C]),K=null===P||void 0===P?void 0:P.filter((function(n){var i;return(null===n||void 0===n?void 0:n.company_id)==(null===(i=W[0])||void 0===i?void 0:i.company_id)})),V=(0,s.useState)(!1),Q=(0,o.Z)(V,2),Y=Q[0],X=Q[1],J=function(){return X(!0)},$=function(){return X(!1)},nn={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",boxShadow:24,borderRadius:3,p:4},en=function(){v().put("https://finance.miratsoneservices.com/api/update-invoice/".concat(D(C)),{status:"canceled",payment_status:"Canceled"}).then((function(n){return B()}),z(),T({open:!0,severity:"success",msg:"Invoice Canceled Successfully!"})).catch((function(n){return console.log(n)})),X(!1),E("/invoices")},ln=(0,s.useMemo)((function(){return null===M||void 0===M?void 0:M.filter((function(n){return(null===n||void 0===n?void 0:n.invoice_number)===D(C)||(S?(null===n||void 0===n?void 0:n.invoice_id)==D(S):null)}))}),[C]);return console.log(ln),(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(y.default,{}),null===M||void 0===M||null===(f=M.filter((function(n){return S?(null===n||void 0===n?void 0:n.invoice_number)===D(C)&&(null===n||void 0===n?void 0:n.invoice_id)==D(S):(null===n||void 0===n?void 0:n.invoice_number)===D(C)})))||void 0===f?void 0:f.map((function(n,i){var e,l,d,o,c,r,v,u,_,h,p;return(0,Z.jsxs)("div",{className:t.Z.detailInvoiceMainParentContainer,children:[(0,Z.jsxs)("div",{className:t.Z.detailInvoiceLeftContainer,children:[(0,Z.jsxs)("div",{className:t.Z.invoice_actions,children:[(0,Z.jsx)("section",{className:t.Z.comp_name,children:(0,Z.jsx)("span",{children:null===(e=K[0])||void 0===e?void 0:e.company_name})}),(0,Z.jsxs)("section",{className:t.Z.actions,children:[(0,Z.jsx)("span",{ref:k,children:(0,Z.jsx)(j.Fqs,{onClick:F,size:22,style:{cursor:"pointer"}})}),(0,Z.jsx)(m.H_7,{onClick:H,size:25,style:{cursor:"pointer"}}),(0,Z.jsx)(x.vpV,{size:25,style:{cursor:"pointer"},onClick:function(){return E("/edit-invoice/".concat(D(C),"/").concat(D(S)))}}),(0,Z.jsx)(j.FH3,{size:25,style:{cursor:"pointer"},onClick:J})]})]}),(0,Z.jsx)(I.Z,{open:Y,onClose:$,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,Z.jsx)(b.Z,{sx:nn,children:(0,Z.jsxs)("section",{className:t.Z.cancel_modal,children:[(0,Z.jsx)("p",{children:"Are you sure you want to cancel the Invoice?"}),(0,Z.jsx)("button",{className:t.Z.yes_option,onClick:en,children:"Yes"}),(0,Z.jsx)("button",{className:t.Z.no_option,onClick:function(){return X(!1)},children:"No"})]})})}),(0,Z.jsxs)("div",{ref:q,className:t.Z.invoice_container,children:[(0,Z.jsxs)("section",{className:t.Z.logo,children:[(0,Z.jsx)("img",{src:a,alt:""}),console.log(n)]}),null===P||void 0===P||null===(l=P.filter((function(i){return(null===i||void 0===i?void 0:i.company_id)==(null===n||void 0===n?void 0:n.company_id)})))||void 0===l?void 0:l.map((function(i,e){var l,d,o,a,c,r,v;return(0,Z.jsx)(s.Fragment,{children:(0,Z.jsxs)("div",{className:t.Z.address,children:[(0,Z.jsxs)("section",{className:t.Z.company_address,children:[(0,Z.jsx)("h4",{style:{textTransform:"uppercase"},children:null===i||void 0===i?void 0:i.company_name}),(0,Z.jsx)("p",{children:null===i||void 0===i||null===(l=i.address)||void 0===l?void 0:l.street1}),(0,Z.jsx)("p",{children:null===i||void 0===i||null===(d=i.address)||void 0===d?void 0:d.street2}),(0,Z.jsxs)("p",{children:[null===i||void 0===i||null===(o=i.address)||void 0===o?void 0:o.city,"-"," ",null===i||void 0===i||null===(a=i.address)||void 0===a?void 0:a.zip_code," ",null===i||void 0===i||null===(c=i.address)||void 0===c?void 0:c.state]}),(0,Z.jsxs)("p",{children:["Email:",(0,Z.jsx)("a",{href:"mailto:".concat(null===n||void 0===n?void 0:n.company_email_id),children:null===i||void 0===i?void 0:i.company_email_id})]}),""!==(null===i||void 0===i?void 0:i.tax_id_no)?(0,Z.jsxs)("p",{children:["GSTIN:",null===i||void 0===i?void 0:i.tax_id_no]}):"",""!==(null===i||void 0===i?void 0:i.CIN_no)?(0,Z.jsxs)("p",{children:["CIN: ",null===i||void 0===i?void 0:i.CIN_no]}):""]}),(0,Z.jsxs)("section",{className:t.Z.invoice,children:[(0,Z.jsx)("h3",{className:t.Z.invoice_text,children:"TAX INVOICE"}),(0,Z.jsxs)("p",{className:t.Z.bold,children:["Invoice #: ",(0,Z.jsxs)("span",{children:[" ",null===n||void 0===n?void 0:n.invoice_number]})]}),(0,Z.jsxs)("p",{children:["Date:"," ",(0,Z.jsxs)("span",{children:[" ",null===(r=new Date(null===n||void 0===n?void 0:n.invoice_date))||void 0===r?void 0:r.toLocaleDateString("en-US")]})]}),(0,Z.jsxs)("p",{children:["Due Date:"," ",(0,Z.jsxs)("span",{children:[" ",null===(v=new Date(null===n||void 0===n?void 0:n.invoice_dueDate))||void 0===v?void 0:v.toLocaleDateString("en-US")]})]}),(0,Z.jsxs)("p",{children:["Created By:"," ",(0,Z.jsx)("span",{className:t.Z.created_by,children:null===n||void 0===n?void 0:n.sale_by})]}),(0,Z.jsx)("p",{className:t.Z.payStatus,children:null!==n&&void 0!==n&&n.payment_status?null===n||void 0===n?void 0:n.payment_status:"unpaid"})]})]})},e)})),null===U||void 0===U||null===(d=U.filter((function(i){return(null===i||void 0===i?void 0:i.customer_id)==(null===n||void 0===n?void 0:n.customer_id)})))||void 0===d?void 0:d.map((function(i,e){var l,d,o,s,a,c,r,v,u;return(0,Z.jsxs)("div",{className:t.Z.billing_info,children:[(0,Z.jsxs)("section",{className:t.Z.customer,children:[(0,Z.jsx)("h4",{children:"Customer Name"}),(0,Z.jsx)("p",{children:null===i||void 0===i?void 0:i.company_name}),(0,Z.jsx)("p",{children:(0,Z.jsx)("a",{href:"mailto:".concat(null===n||void 0===n?void 0:n.account_email_id),children:null===i||void 0===i?void 0:i.account_email_id})}),(0,Z.jsxs)("p",{children:["GSTIN:",null===i||void 0===i?void 0:i.tax_id_number]}),(0,Z.jsxs)("p",{children:["Place of Supply:"," ","India"!=(null===i||void 0===i||null===(l=i.billing_address)||void 0===l?void 0:l.country)?"INTERNATIONAL":null===i||void 0===i||null===(d=i.billing_address)||void 0===d?void 0:d.place_of_supply]})]}),(0,Z.jsxs)("section",{className:t.Z.billing_address,children:[(0,Z.jsx)("h4",{children:"Billing Address"}),(0,Z.jsx)("p",{children:null===i||void 0===i||null===(o=i.billing_address)||void 0===o?void 0:o.street1}),(0,Z.jsx)("p",{children:null===i||void 0===i||null===(s=i.billing_address)||void 0===s?void 0:s.street2}),(0,Z.jsxs)("p",{children:[null===i||void 0===i||null===(a=i.billing_address)||void 0===a?void 0:a.city," ",null===i||void 0===i||null===(c=i.billing_address)||void 0===c?void 0:c.zip_code," "]}),(0,Z.jsxs)("p",{children:[" ","INTERNATIONAL"===(null===i||void 0===i||null===(r=i.billing_address)||void 0===r?void 0:r.place_of_supply)?"":null===i||void 0===i||null===(v=i.billing_address)||void 0===v?void 0:v.place_of_supply," ",null===i||void 0===i||null===(u=i.billing_address)||void 0===u?void 0:u.country]})]})]})})),(0,Z.jsx)("div",{className:t.Z.invoice_table_container,children:(0,Z.jsxs)("table",{children:[(0,Z.jsx)("thead",{children:(0,Z.jsxs)("tr",{children:[(0,Z.jsx)("th",{style:{width:"1%"},children:"#"}),(0,Z.jsx)("th",{style:{width:"50%"},children:"Description"}),(0,Z.jsx)("th",{style:{width:"5%"},children:"GST"}),(0,Z.jsx)("th",{style:{width:"10%"},children:"Rate"}),(0,Z.jsx)("th",{style:{width:"10%"},children:"Qty"}),(0,Z.jsx)("th",{style:{width:"10%"},children:"Taxable Amt"}),(0,Z.jsx)("th",{style:{width:"10%"},children:"GST"}),(0,Z.jsx)("th",{style:{width:"10%"},children:"Total"})]})}),(0,Z.jsxs)("tbody",{className:t.Z.first_body,children:[null===n||void 0===n||null===(o=n.orders)||void 0===o?void 0:o.map((function(n,i){var e,l,d;return(0,Z.jsxs)("tr",{children:[(0,Z.jsx)("td",{className:t.Z.id,children:i+1}),(0,Z.jsx)("td",{children:(0,Z.jsxs)("div",{children:[(0,Z.jsx)("p",{children:null===n||void 0===n?void 0:n.item}),(0,Z.jsx)("p",{children:null===n||void 0===n?void 0:n.description})]})}),(0,Z.jsxs)("td",{className:t.Z.center,children:[null===n||void 0===n?void 0:n.gst,"%"]}),(0,Z.jsxs)("td",{className:t.Z.center,children:["\u20b9",null===(e=Number(null===n||void 0===n?void 0:n.rate))||void 0===e?void 0:e.toFixed(2)]}),(0,Z.jsx)("td",{className:t.Z.center,children:null===n||void 0===n?void 0:n.quantity}),(0,Z.jsxs)("td",{className:t.Z.center,children:[console.log(n),"\u20b9",null===n||void 0===n?void 0:n.taxable_amount]}),(0,Z.jsxs)("td",{className:t.Z.center,children:["\u20b9",null===(l=Number((null===n||void 0===n?void 0:n.taxable_amount)*Number(null===n||void 0===n?void 0:n.gst)/100))||void 0===l?void 0:l.toFixed(2)]}),(0,Z.jsxs)("td",{className:t.Z.center,children:["\u20b9",null===(d=Number(null===n||void 0===n?void 0:n.amount))||void 0===d?void 0:d.toFixed(2)]})]},i)})),(0,Z.jsxs)("tr",{children:[(0,Z.jsx)("td",{className:t.Z.grand_total,colSpan:"4",children:"Grand Total"}),(0,Z.jsxs)("td",{className:t.Z.align_bold,children:[" ",null===n||void 0===n||null===(c=n.orders)||void 0===c?void 0:c.reduce((function(n,i){return n+Number(null===i||void 0===i?void 0:i.quantity)}),0)]}),(0,Z.jsxs)("td",{className:t.Z.align_bold,children:["\u20b9",null===(r=Number(null===n||void 0===n?void 0:n.taxable_amount))||void 0===r?void 0:r.toFixed(2)]}),(0,Z.jsxs)("td",{className:t.Z.align_bold,children:["\u20b9",null===(v=Number(null===n||void 0===n||null===(u=n.orders)||void 0===u?void 0:u.reduce((function(n,i){return n+(null===i||void 0===i?void 0:i.taxable_amount)*Number(null===i||void 0===i?void 0:i.gst)/100}),0)))||void 0===v?void 0:v.toFixed(2)]}),(0,Z.jsxs)("td",{className:t.Z.align_bold,children:["\u20b9",null===(_=Number((null===n||void 0===n||null===(h=n.orders)||void 0===h?void 0:h.reduce((function(n,i){return n+Number(null===i||void 0===i?void 0:i.amount)}),0))+Number(null!==n&&void 0!==n&&n.adjusted_amount?null===n||void 0===n?void 0:n.adjusted_amount:0)))||void 0===_?void 0:_.toFixed(2)]})]})]}),null===P||void 0===P||null===(p=P.filter((function(i){return(null===i||void 0===i?void 0:i.company_id)==(null===n||void 0===n?void 0:n.company_id)})))||void 0===p?void 0:p.map((function(i,e){var l,d,o,s,a,c,r,v,u,_,h,m,x,j,p,I,b,y;return(0,Z.jsxs)("tbody",{className:t.Z.second_tbody,children:[(0,Z.jsxs)("tr",{children:[(0,Z.jsx)("td",{className:t.Z.widthSpan,children:"eInvoice"}),(0,Z.jsx)("td",{children:(0,Z.jsx)("a",{ref:w,href:"https://finance.miratsoneservices.com/".concat(C).concat(S?"-".concat(S):""),target:"_ajay",children:"https://finance.miratsoneservices.com/".concat(C).concat(S?"-".concat(S):"")})}),(0,Z.jsx)("td",{colSpan:5,children:"Sub Total"}),(0,Z.jsxs)("td",{className:t.Z.right,style:{textAlign:"center"},children:["\u20b9",null===(l=Number(null===n||void 0===n?void 0:n.taxable_amount))||void 0===l?void 0:l.toFixed(2)]})]}),(0,Z.jsxs)("tr",{children:[(0,Z.jsx)("td",{children:"UPI"}),(0,Z.jsx)("td",{children:null===i||void 0===i||null===(d=i.bank_detail)||void 0===d?void 0:d.UPI}),null===P||void 0===P||null===(o=P.filter((function(i){return(null===i||void 0===i?void 0:i.company_id)==(null===n||void 0===n?void 0:n.company_id)})))||void 0===o?void 0:o.map((function(e,l){var d,o,s,a,c,r,v;return(null===e||void 0===e||null===(d=e.address)||void 0===d||null===(o=d.state)||void 0===o?void 0:o.toLowerCase())===(null===i||void 0===i||null===(s=i.billing_address)||void 0===s||null===(a=s.place_of_supply)||void 0===a?void 0:a.toLowerCase())?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)("td",{colSpan:5,children:(0,Z.jsxs)("div",{children:[(0,Z.jsx)("p",{className:t.Z.underline,children:"SGST Total 9%"}),(0,Z.jsx)("p",{children:"CGST Total 9%"})]})}),(0,Z.jsx)("td",{children:(0,Z.jsxs)("div",{children:[(0,Z.jsxs)("p",{className:t.Z.align_bold_underline,children:["\u20b9",null===(c=Number(null===n||void 0===n?void 0:n.CGST))||void 0===c?void 0:c.toFixed(2)]}),(0,Z.jsxs)("p",{className:t.Z.align_bold,children:["\u20b9",null===(r=Number(null===n||void 0===n?void 0:n.SGST))||void 0===r?void 0:r.toFixed(2)]})]})})]}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)("td",{colSpan:5,children:"IGST Total 18%"}),(0,Z.jsxs)("td",{className:t.Z.align_bold,children:["\u20b9",null===(v=Number(null===n||void 0===n?void 0:n.IGST))||void 0===v?void 0:v.toFixed(2)]})]})}))]}),(0,Z.jsxs)("tr",{children:[(0,Z.jsx)("td",{className:t.Z.widthSpan,children:"Bank Name"}),(0,Z.jsx)("td",{children:null===i||void 0===i||null===(s=i.bank_detail)||void 0===s?void 0:s.bank_name}),(0,Z.jsx)("td",{colSpan:5,children:"Grand Total"}),(0,Z.jsxs)("td",{className:t.Z.right_bold,children:["\u20b9",null===(a=Number(null===n||void 0===n?void 0:n.total_amount))||void 0===a?void 0:a.toFixed(2)]})]}),(0,Z.jsxs)("tr",{children:[(0,Z.jsx)("td",{children:"Account Name"}),(0,Z.jsx)("td",{children:null===i||void 0===i||null===(c=i.bank_detail)||void 0===c?void 0:c.account_name}),(0,Z.jsxs)("td",{className:t.Z.bold,colSpan:6,children:["Amount:"," ",(0,Z.jsxs)("span",{children:[" ",O.convert(null!==n&&void 0!==n&&n.total_amount?null===n||void 0===n?void 0:n.total_amount:0)," "]})]})]}),(0,Z.jsxs)("tr",{children:[(0,Z.jsxs)("td",{children:[(0,Z.jsx)("p",{children:"Account"})," Number"]}),(0,Z.jsx)("td",{children:null===i||void 0===i||null===(r=i.bank_detail)||void 0===r?void 0:r.account_number}),(0,Z.jsxs)("td",{className:t.Z.bold,rowSpan:2,colSpan:6,children:["Notes:"," ",(0,Z.jsx)("span",{className:t.Z.note_desc,children:null===n||void 0===n?void 0:n.notes})]})]}),(0,Z.jsxs)("tr",{children:[(0,Z.jsx)("td",{children:"IFSC Code"}),(0,Z.jsx)("td",{children:null===i||void 0===i||null===(v=i.bank_detail)||void 0===v?void 0:v.IFSC_code})]}),null!==i&&void 0!==i&&null!==(u=i.company_name)&&void 0!==u&&u.endsWith("LLC")?(0,Z.jsxs)(Z.Fragment,{children:[" ",(0,Z.jsxs)("tr",{children:[(0,Z.jsx)("td",{children:"SWIFT Code"}),(0,Z.jsx)("td",{children:null===i||void 0===i||null===(_=i.bank_detail)||void 0===_?void 0:_.SWIFT_code}),(0,Z.jsx)("td",{rowSpan:4,colSpan:6,children:(0,Z.jsxs)("div",{className:t.Z.for_signature,children:[(0,Z.jsxs)("p",{className:t.Z.signature_text,children:["For"," ",null===(h=K[0])||void 0===h||null===(m=h.company_name)||void 0===m?void 0:m.toUpperCase()]}),(0,Z.jsxs)("section",{className:t.Z.signature,children:[(null===n||void 0===n?void 0:n.signature)&&(0,Z.jsx)("img",{src:null===n||void 0===n?void 0:n.signature}),(0,Z.jsx)("p",{style:null!==n&&void 0!==n&&n.signature?{}:{marginTop:"8em"},children:"Authorised Signatory"})]})]})})]}),(0,Z.jsxs)("tr",{children:[(0,Z.jsx)("td",{children:"Beneficiary Name"}),(0,Z.jsx)("td",{children:null===i||void 0===i||null===(x=i.bank_detail)||void 0===x?void 0:x.beneficiary_name})]}),(0,Z.jsxs)("tr",{children:[(0,Z.jsx)("td",{children:"Beneficiary Address"}),(0,Z.jsxs)("td",{children:[" ",null===i||void 0===i||null===(j=i.bank_detail)||void 0===j?void 0:j.beneficiary_address]})]}),(0,Z.jsxs)("tr",{children:[(0,Z.jsx)("td",{children:"Routing Number"}),(0,Z.jsx)("td",{children:null===i||void 0===i||null===(p=i.bank_detail)||void 0===p?void 0:p.routing_number})]})]}):"",(0,Z.jsxs)("tr",{children:[(0,Z.jsx)("td",{colSpan:2,children:(0,Z.jsxs)("div",{className:t.Z.terms_conditions,children:[(0,Z.jsxs)("h4",{className:t.Z.terms,children:["Terms & Conditions:"," ",null===n||void 0===n?void 0:n.terms_and_conditions]}),(0,Z.jsx)("p",{children:"Payment shall be made on the respective due date and made through the bank details specified in the invoice"})]})}),!(null!==i&&void 0!==i&&null!==(I=i.company_name)&&void 0!==I&&I.endsWith("LLC"))&&(0,Z.jsx)("td",{rowSpan:3,colSpan:6,children:(0,Z.jsxs)("div",{className:t.Z.for_signature,children:[(0,Z.jsxs)("p",{className:t.Z.signature_text,children:["For"," ",null===(b=K[0])||void 0===b||null===(y=b.company_name)||void 0===y?void 0:y.toUpperCase()]}),(0,Z.jsxs)("section",{className:t.Z.signature,children:[(null===n||void 0===n?void 0:n.signature)&&(0,Z.jsx)("img",{src:null===n||void 0===n?void 0:n.signature}),(0,Z.jsx)("p",{children:"Authorised Signatory"})]})]})})]})]})}))]})}),(0,Z.jsx)("section",{className:t.Z.end,children:(0,Z.jsx)("p",{children:"Thank you for your business!"})})]})]}),(0,Z.jsxs)("div",{className:t.Z.detailInvoiceRightContainer,children:[(0,Z.jsx)("h3",{children:"Payment Information"}),(0,Z.jsxs)("div",{className:t.Z.paymentDetailsInnerContainer,children:[(0,Z.jsxs)("span",{children:[(0,Z.jsxs)("p",{children:["Invoiced on ",null===n||void 0===n?void 0:n.invoice_date]}),(0,Z.jsxs)("p",{children:["INR ",null===n||void 0===n?void 0:n.total_amount," "]})]}),(0,Z.jsxs)("span",{children:[(0,Z.jsx)("p",{children:"Balance Receivable"}),(0,Z.jsxs)("p",{children:["INR ",null===n||void 0===n?void 0:n.total_amount]})]})]})]})]},i)}))]})}},4817:function(n,i){i.Z={detailInvoiceMainParentContainer:"InvoiceIndia_detailInvoiceMainParentContainer__mN-oQ",detailInvoiceLeftContainer:"InvoiceIndia_detailInvoiceLeftContainer__HPBjO",detailInvoiceRightContainer:"InvoiceIndia_detailInvoiceRightContainer__b1Vis",paymentDetailsInnerContainer:"InvoiceIndia_paymentDetailsInnerContainer__GiFiD",bold:"InvoiceIndia_bold__Cjx5P",center:"InvoiceIndia_center__j4MKR",right:"InvoiceIndia_right__gn7P1",right_bold:"InvoiceIndia_right_bold__h54g1",align_bold:"InvoiceIndia_align_bold__j88wM",align_bold_underline:"InvoiceIndia_align_bold_underline__YKIGK",underline:"InvoiceIndia_underline__xuC-W",supply_place:"InvoiceIndia_supply_place__rdXSG",invoice_container:"InvoiceIndia_invoice_container__uZWzV",logo:"InvoiceIndia_logo__FNRyO",address:"InvoiceIndia_address__X-TQK",company_address:"InvoiceIndia_company_address__zjQqH",billing_info:"InvoiceIndia_billing_info__I3BoL",invoice:"InvoiceIndia_invoice__sIqpn",invoice_text:"InvoiceIndia_invoice_text__qDlun",created_by:"InvoiceIndia_created_by__guiaV",customer:"InvoiceIndia_customer__A0jlk",invoice_table_container:"InvoiceIndia_invoice_table_container__JRpM2",invoice_actions:"InvoiceIndia_invoice_actions__KRRI+",grand_total:"InvoiceIndia_grand_total__Dz7tT",terms:"InvoiceIndia_terms__TwVjT",note:"InvoiceIndia_note__vRBL0",note_desc:"InvoiceIndia_note_desc__dMMsc",for_signature:"InvoiceIndia_for_signature__aZYBs",signature_text:"InvoiceIndia_signature_text__fvuWZ",signature:"InvoiceIndia_signature__EYiUb",end:"InvoiceIndia_end__jZ8f3",terms_conditions:"InvoiceIndia_terms_conditions__llMqR",first_body:"InvoiceIndia_first_body__kGHfP",id:"InvoiceIndia_id__za9IJ",second_tbody:"InvoiceIndia_second_tbody__OKVEt",widthSpan:"InvoiceIndia_widthSpan__0Db2e",comp_name:"InvoiceIndia_comp_name__c-+8H",actions:"InvoiceIndia_actions__sbTvM",cancel_modal:"InvoiceIndia_cancel_modal__6tGEI",yes_option:"InvoiceIndia_yes_option__NuoIS",no_option:"InvoiceIndia_no_option__ZyBjL",payStatus:"InvoiceIndia_payStatus__qbK64",loaderContainer:"InvoiceIndia_loaderContainer__z3Tuo"}}}]);
//# sourceMappingURL=8386.d1178c1e.chunk.js.map