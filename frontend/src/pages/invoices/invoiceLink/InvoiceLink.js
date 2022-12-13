import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/header/Header";
import { useInvoiceContext } from "../invoiceContext/InvoiceContext";
import IndianInvoice from "./IndianInvoice";
import InternationalInvoice from "./InternationalInvoice";
import CryptoJS from "crypto-js";
const InvoiceLink = () => {
  const { allCompanyData, allInvoicesData } = useInvoiceContext();
  let { invoiceNumber } = useParams();

  let invoiceID = invoiceNumber?.includes("-")
    ? invoiceNumber?.split("-")[1]
    : null;

  invoiceNumber = invoiceNumber?.includes("-")
    ? invoiceNumber?.split("-")[0]
    : invoiceNumber;
  const decryptText = (encryptText) => {
    var reb64 = CryptoJS.enc.Hex.parse(encryptText);
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, "MiratsInsights");
    var plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
  };
  // window.open(
  //   `https://finance.miratsoneservices.com/${invoiceNumber}`,
  //   "_self"
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
            <InternationalInvoice />
          ) : (
            <IndianInvoice />
          );
        })}
    </>
  );
};

export default InvoiceLink;
