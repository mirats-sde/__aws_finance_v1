import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/header/Header";
import { useCustomerContext } from "../../customers/customerContex/CustomerContext";
import { useInvoiceContext } from "../invoiceContext/InvoiceContext";
import EditDomesticInvoice from "./EditDomesticInvoice";
import EditInternationalInvoice from "./EditInternationalInvoice";

const EditInvoice = () => {
  const { invoiceNumber } = useParams();
  const { invoiceID } = useParams();
  const { allCustomerData } = useCustomerContext();
  const { allCompanyData, allInvoicesData } = useInvoiceContext();
  let invoice = allInvoicesData?.filter(
    (iData) =>
      iData?.invoice_number === invoiceNumber && iData?.invoice_id == invoiceID
  );
  let company = allCompanyData?.filter(
    (cData) => cData?.company_id == invoice[0]?.company_id
  );
  console.log(invoice);
  return (
    <>
      <Header />
      {invoice[0]?.currency_type ? (
        <EditInternationalInvoice />
      ) : (
        <EditDomesticInvoice />
      )}
    </>
  );
};

export default EditInvoice;
