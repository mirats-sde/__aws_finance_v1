const express = require("express");
const app = express();
const db = require("./models");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 3001;

const company = require("./routers/company/companyRouter");
const company_address = require("./routers/company/addressRouter");
const bankDetails = require("./routers/company/bankDetailsRouter");
const customers = require("./routers/customers/customersRouter");
const billing_address = require("./routers/customers/customerBillingAddressRouter");
const order = require("./routers/invoices/invoiceOrderRouter");
const tax_Information = require("./routers/customers/customerTaxInformationRouter");
const customer_shippingAddress = require("./routers/customers/customerShippingAddressRouter");
const customerBankDetails = require("./routers/customers/customerBankDetailsRouter");
const invoiceOrder = require("./routers/invoices/invoiceOrderRouter");
const invoice = require("./routers/invoices/invoicesRouter");
const bank_transaction = require("./routers/Bank Transaction/BankTransactionRouter");
const vendor_bank_details = require("./routers/vendors/vendorBankDetailsRouter");
const vendor_tax_details = require("./routers/vendors/vendorTaxInformationRouter");
const vendor_billing_address = require("./routers/vendors/vendorBillingAddressRouter");
const vendor = require("./routers/vendors/vendorRouter");
const vendor_shipping_address = require("./routers/vendors/vendorShippingAddressRouter");
const vendor_invoice = require("./routers/vendors/VendorInvoiceRouter");
const contact = require("./routers/contact/contactRouter");
const client_report = require("./routers/customers/clientReportRouter");
const signature = require("./routers/invoices/invoiceSignatureRouter");
// ---------------------------------------
// -------------useRouters---------------
// ---------------------------------------
// app.use(
//   cors({
//     origin: "*",
//   })
// );
app.use(cors());
app.use(express.json());
app.use("/api", company);
app.use("/api", company_address);
app.use("/api", bankDetails);
app.use("/api", customers);
app.use("/api", billing_address);
app.use("/api", order);
app.use("/api", bank_transaction);
// app.use(grand_total);
app.use("/api", tax_Information);
app.use("/api", customerBankDetails);
app.use("/api", customer_shippingAddress);
app.use("/api", invoiceOrder);
app.use("/api", invoice);
app.use("/api", vendor);
app.use("/api", vendor_bank_details);
app.use("/api", vendor_billing_address);
app.use("/api", vendor_shipping_address);
app.use("/api", vendor_tax_details);
app.use("/api", vendor_invoice);
app.use("/api", contact);
app.use("/api", client_report);
app.use("/api", signature);
app.use("/api", (req, res) => {
  res.send("hello I'm live");
});
// { alter: true }
db.sequelize.sync().then((req) => {
  app.listen(process.env.PORT || 3001, () => {
    console.log(`server is runninG on http://localhost:${port}`);
  });
});
