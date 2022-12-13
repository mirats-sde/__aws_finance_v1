import React from "react";
import { useParams } from "react-router-dom";
import InvoiceInternational from "../../../components/invoice/Invoice";
import { useCustomerContext } from "../../customers/customerContex/CustomerContext";
import { useInvoiceContext } from "../invoiceContext/InvoiceContext";
import InvoiceIndia from "../../../components/invoice_india/InvoiceIndia";
import Header from "../../../components/header/Header";
import CryptoJS from "crypto-js";

const DetailInvoice = () => {
  const { allCustomerData } = useCustomerContext();
  const { allCompanyData, allInvoicesData, signatureData } =
    useInvoiceContext();
  let { invoiceNumber } = useParams();

  let invoiceID = invoiceNumber?.includes("-")
    ? invoiceNumber?.split("-")[1]
    : null;

  invoiceNumber = invoiceNumber?.includes("-")
    ? invoiceNumber?.split("-")[0]
    : invoiceNumber;
  // console.log(invoiceNumber);
  // console.log(invoiceNumber2);
  //   console.log(invoiceNumber);

  console.log(allInvoicesData);

  const decryptText = (encryptText) => {
    var reb64 = CryptoJS.enc.Hex.parse(encryptText);
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, "MiratsInsights");
    var plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
  };
  // window.open(
  //   `https://finance.miratsoneservices.com/${invoiceNumber}`,
  //   "_blank"
  // );

  return (
    <>
      {allInvoicesData
        ?.filter((inv) =>
          invoiceID
            ? inv?.invoice_number === decryptText(invoiceNumber) &&
              inv?.invoice_id == decryptText(invoiceID)
            : inv?.invoice_number === decryptText(invoiceNumber)
        )
        ?.map((data, ind) => {
          return data?.currency_type ? (
            <InvoiceInternational />
          ) : (
            <InvoiceIndia />
          );
        })}
      {}
    </>
  );
};

export default DetailInvoice;
