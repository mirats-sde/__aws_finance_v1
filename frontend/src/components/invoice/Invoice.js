import React, { useEffect, useMemo, useState } from "react";
import styles from "./Invoice.module.css";
import miratsLogo from "../../assets/miratsLogo.png";
import axios from "axios";
import { ToWords } from "to-words";
import { useNavigate, useParams } from "react-router-dom";
import { useInvoiceContext } from "../../pages/invoices/invoiceContext/InvoiceContext";
import { useCustomerContext } from "../../pages/customers/customerContex/CustomerContext";
import { HiDownload } from "react-icons/hi";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteForever, MdContentCopy } from "react-icons/md";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Box, Modal } from "@mui/material";
import { Convert } from "easy-currencies";
import Header from "../../components/header/Header";
import CryptoJS from "crypto-js";
import loader from "../../assets/loader.gif";
import { UseGlobalContext } from "../../pages/globalContext/GlobalContext";
const InvoiceInternational = () => {
  let { invoiceNumber } = useParams();
  const { signatureData } = useInvoiceContext();
  let invoiceID = invoiceNumber?.includes("-")
    ? invoiceNumber?.split("-")[1]
    : null;
  invoiceNumber = invoiceNumber?.includes("-")
    ? invoiceNumber?.split("-")[0]
    : invoiceNumber;

  const { setSnackbar } = UseGlobalContext();
  // const [invoiceData, setInvoiceData] = useState({});
  // const [currency, setCurrency] = useState();
  const {
    allInvoicesData,
    allCompanyData,
    fetchAllCompanyData,
    fetchAllInvoicesData,
  } = useInvoiceContext();
  const { allCustomerData } = useCustomerContext();
  const navigate = useNavigate();
  // useEffect(() => {
  //   axios
  //     .get("https://finance.miratsoneservices.com/api/get-company")
  //     .then((res) =>
  //       setInvoiceData((prev) => ({
  //         ...prev,
  //         companyData: [...res.data],
  //       }))
  //     )
  //     .catch((err) => console.log(err));

  //   axios
  //     .get("https://finance.miratsoneservices.com/api/get-customer")
  //     .then((res) =>
  //       setInvoiceData((prev) => ({
  //         ...prev,
  //         customerData: [...res.data],
  //       }))
  //     )
  //     .catch((err) => console.log(err));
  //   Convert(1)
  //     .from("USD")
  //     .to("INR")
  //     .then((data) => setCurrency(data));
  // }, []);
  // console.log(invoiceNumber);
  // useEffect(() => {
  //   invoiceNumber
  //     ? (document.title = decryptText(invoiceNumber))
  //     : console.log("no Invoice number  found");
  // }, [invoiceNumber]);
  // to words config
  const toWords = new ToWords({
    localeCode: "en-US",
    converterOptions: {
      // currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      // currencyOptions: { // can be used to override defaults for the selected locale
      //   name: 'Rupee',
      //   plural: 'Rupees',
      //   symbol: '$',
      //   fractionalUnit: {
      //     name: 'Paisa',
      //     plural: 'Paise',
      //     symbol: '',
      //   },
      // }
    },
  });
  const decryptText = (encryptText) => {
    var reb64 = CryptoJS.enc.Hex.parse(encryptText);
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, "MiratsInsights");
    var plain = decrypt.toString(CryptoJS.enc.Utf8);

    return plain;
  };
  // to print invoice
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: decryptText(invoiceNumber),
  });

  // console.log("dd", allCompanyData);
  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
  };
  const handleCancelInvoice = () => {
    axios
      .put(
        `https://finance.miratsoneservices.com/api/update-invoice/${decryptText(
          invoiceNumber
        )}`,
        {
          status: "canceled",
          payment_status: "canceled",
        }
      )
      .then(
        (res) => fetchAllCompanyData(),
        fetchAllInvoicesData(),
        setSnackbar({
          open: true,
          severity: "success",
          msg: "Invoice Canceled Successfully!",
        })
      )
      .catch((err) => console.log(err));
    setOpen(false);
    navigate("/invoices");
  };

  let singleInvoice = useMemo(
    () =>
      allInvoicesData?.filter(
        (iData) => iData?.invoice_number === decryptText(invoiceNumber)
      ),
    [invoiceNumber]
  );
  const company = allCompanyData?.filter(
    (cData) => cData?.company_id == singleInvoice[0]?.company_id
  );

  // copy to clipboard
  const copyLink = useRef(null);
  const copyIcon = useRef(null);
  const copyLinkToClipBoard = (e) => {
    navigator.clipboard.writeText(copyLink?.current?.innerHTML);
    copyIcon.current.style.color = "rgb(174, 38, 41)";
    copyIcon.current.style.scale = "1.2";
    setTimeout(() => {
      copyIcon.current.style.scale = "1";
    }, 500);
    // copyIcon
  };

  return (
    <>
      {console.log("i am from console.")}
      <Header />
      {allInvoicesData?.length ? (
        allInvoicesData
          ?.filter((inv) =>
            invoiceID
              ? inv?.invoice_number === decryptText(invoiceNumber) &&
                inv?.invoice_id == decryptText(invoiceID)
              : inv?.invoice_number === decryptText(invoiceNumber)
          )
          ?.map((elm, ind) => (
            <div className={styles.detailInvoiceMainParentContainer} key={ind}>
              <div className={styles.detailInvoiceLeftContainer}>
                <div className={styles.invoice_actions}>
                  <section className={styles.comp_name}>
                    <span>{company[0]?.company_name} </span>
                  </section>
                  <section className={styles.actions}>
                    <span ref={copyIcon}>
                      <MdContentCopy
                        onClick={copyLinkToClipBoard}
                        size={22}
                        style={{ cursor: "pointer" }}
                      />
                    </span>

                    <HiDownload
                      onClick={handlePrint}
                      size={25}
                      style={{ cursor: "pointer" }}
                    />
                    <BiEditAlt
                      size={25}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(
                          `/edit-invoice/${decryptText(
                            invoiceNumber
                          )}/${decryptText(invoiceID)}`
                        )
                      }
                    />
                    <MdDeleteForever
                      size={25}
                      style={{ cursor: "pointer" }}
                      onClick={handleOpen}
                    />
                  </section>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <section className={styles.cancel_modal}>
                        <p>Are you sure you want to cancel the Invoice?</p>
                        <button
                          className={styles.yes_option}
                          onClick={handleCancelInvoice}
                        >
                          Yes
                        </button>
                        <button
                          className={styles.no_option}
                          onClick={() => setOpen(false)}
                        >
                          No
                        </button>
                      </section>
                    </Box>
                  </Modal>
                </div>
                <div ref={printRef} className={styles.invoice_container}>
                  <section className={styles.logo}>
                    <img src={miratsLogo} alt="" />
                  </section>

                  {allCompanyData
                    ?.filter((com) => com?.company_id == elm?.company_id)
                    ?.map((comData, comInd) => (
                      <React.Fragment key={comInd}>
                        {/* address invoice */}
                        <div className={styles.address}>
                          <section className={styles.company_address}>
                            <h4 style={{ textTransform: "uppercase" }}>
                              {comData?.company_name}
                            </h4>
                            <p>{comData?.address?.street1}</p>
                            <p>{comData?.address?.street2}</p>
                            {/* <p>SRY, SEC-C, LUCKNOW</p> */}
                            <p>
                              {comData?.address?.city}-{" "}
                              {comData?.address?.zip_code}{" "}
                              {comData?.address?.state}
                            </p>
                            <p>
                              Email:
                              <a href={`mailto:${elm?.company_email_id}`}>
                                {comData?.company_email_id}
                              </a>
                            </p>
                            {/* <p>
                          Phone:
                          <a href="tel:+918318759858">
                            +918318759858{comData?.phone_no}{" "}
                          </a>
                        </p> */}
                            <p>CIN: {comData?.CIN_no}</p>

                            {comData?.company_name?.endsWith("LLC") ? (
                              ""
                            ) : (
                              <p>GSTIN:{comData?.tax_id_no}</p>
                            )}
                          </section>

                          <section className={styles.invoice}>
                            <h3 className={styles.invoice_text}>INVOICE</h3>
                            <p className={styles.bold}>
                              Invoice #: <span> {elm?.invoice_number}</span>
                            </p>
                            <p>
                              Date:{" "}
                              <span>
                                {" "}
                                {new Date(
                                  elm?.invoice_date
                                )?.toLocaleDateString("en-US")}
                              </span>
                            </p>
                            <p>
                              Due Date:{" "}
                              <span>
                                {" "}
                                {new Date(
                                  elm?.invoice_dueDate
                                )?.toLocaleDateString("en-US")}
                              </span>
                            </p>
                            <p>
                              <span>
                                {" "}
                                {comData?.LUT_code
                                  ? `LUT Code: ${comData?.LUT_code}`
                                  : ""}
                              </span>
                            </p>
                            <p>
                              Created By:{" "}
                              <span className={styles.created_by}>
                                {elm?.sale_by}
                              </span>
                            </p>
                            <p className={styles.payStatus}>
                              {elm?.payment_status
                                ? elm?.payment_status
                                : "unpaid"}
                            </p>
                          </section>
                        </div>
                      </React.Fragment>
                    ))}

                  {allCustomerData
                    ?.filter((cust) => cust?.customer_id == elm?.customer_id)
                    ?.map((custData, custInd) => (
                      <div className={styles.billing_info} key={custInd}>
                        <section className={styles.customer}>
                          <h4>Customer Name</h4>
                          {/* {invoiceData?.customerData?.slice(0, 1).map((elm, ind) => ( */}
                          {console.log(custData)}

                          <p>{custData?.company_name}</p>
                          {/* <p>{custData?.customer_name}</p> */}
                          <p>
                            <a href={`mailto:${elm?.account_email_id}`}>
                              {custData?.account_email_id}
                            </a>
                          </p>
                          <p>
                            Place of Supply:{" "}
                            {custData?.billing_address?.country != "India"
                              ? "INTERNATIONAL"
                              : custData?.billing_address?.place_of_supply}
                          </p>
                          <p>
                            {custData?.tax_id_number
                              ? `GST/VAT Number :${custData?.tax_id_number}`
                              : ""}
                          </p>
                        </section>
                        <section className={styles.billing_address}>
                          <h4>Billing Address</h4>

                          <p>{custData?.billing_address?.street1}</p>
                          <p>{custData?.billing_address?.street2}</p>
                          <p>
                            {custData?.billing_address?.city}{" "}
                            {custData?.billing_address?.zip_code}{" "}
                          </p>
                          <p>
                            {" "}
                            {custData?.billing_address?.place_of_supply ===
                            "INTERNATIONAL"
                              ? ""
                              : custData?.billing_address?.place_of_supply}
                            {custData?.billing_address?.country}
                          </p>
                        </section>
                      </div>
                    ))}

                  {/* table */}
                  <div className={styles.invoice_table_container}>
                    <table>
                      <thead>
                        <tr>
                          <th style={{ width: "1%" }}>#</th>
                          <th style={{ width: "40%" }}>Description</th>
                          <th style={{ width: "15%" }}>Rate</th>
                          <th style={{ width: "15%" }}>Qty</th>
                          <th style={{ width: "15%" }}>Total</th>
                        </tr>
                      </thead>

                      <tbody className={styles.first_body}>
                        {elm?.orders?.map((ord, oind) => (
                          <tr key={oind}>
                            <td className={styles.id}>{oind + 1}</td>
                            <td>
                              <div>
                                <p>{ord?.item}</p>
                                <p>{ord?.description}</p>
                              </div>
                            </td>
                            <td className={styles.center}>
                              ${""}
                              {ord?.rate}
                            </td>
                            <td className={styles.center}>{ord?.quantity}</td>
                            <td className={styles.center}>$ {ord?.amount}</td>
                          </tr>
                        ))}
                        <tr>
                          <td className={styles.grand_total} colSpan="3">
                            Grand Total
                          </td>
                          <td className={styles.align_bold}>
                            {elm?.orders?.reduce(
                              (acc, curr) => (acc += Number(curr?.quantity)),
                              0
                            )}
                          </td>
                          <td className={styles.align_bold}>
                            ${" "}
                            {Number(
                              elm?.orders?.reduce(
                                (acc, curr) => (acc += Number(curr?.amount)),
                                0
                              ) +
                                Number(
                                  elm?.adjusted_amount
                                    ? elm?.adjusted_amount
                                    : 0
                                )
                            )?.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>

                      {allCompanyData
                        ?.filter((cust) => cust?.company_id == elm?.company_id)
                        ?.map((custData, custInd) => (
                          <tbody className={styles.second_tbody} key={custInd}>
                            <tr>
                              <td className={styles.widthSpan}>eInvoice</td>
                              <td>
                                <a
                                  href={`https://finance.miratsoneservices.com/${invoiceNumber}${
                                    invoiceID ? `-${invoiceID}` : ""
                                  }`}
                                  target="_BLANK"
                                  ref={copyLink}
                                >
                                  {`https://finance.miratsoneservices.com/${invoiceNumber}${
                                    invoiceID ? `-${invoiceID}` : ""
                                  }`}
                                </a>
                              </td>
                              <td colSpan={2}>Sub Total</td>
                              <td
                                className={styles.right}
                                style={{ textAlign: "center" }}
                              >
                                $ {elm?.total_amount}
                              </td>
                            </tr>
                            <tr>
                              <td>UPI</td>
                              <td>{custData?.bank_detail?.UPI}</td>

                              <td colSpan={2}>Grand Total</td>
                              <td
                                className={styles.right_bold}
                                style={{ textAlign: "center" }}
                              >
                                $ {elm?.total_amount}
                              </td>
                            </tr>
                            <tr>
                              <td className={styles.widthSpan}>Bank Name</td>
                              <td>{custData?.bank_detail?.bank_name}</td>
                              <td className={styles.bold} colSpan={3}>
                                Amount:{" "}
                                <span>
                                  {toWords.convert(
                                    elm?.total_amount ? elm?.total_amount : 0
                                  )}{" "}
                                  Dollars Only
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Account Name</td>
                              <td>{custData?.bank_detail?.account_name}</td>
                              <td className={styles.bold} colSpan={3}>
                                Notes: {elm?.notes}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p>Account</p> Number
                              </td>
                              <td>{custData?.bank_detail?.account_number}</td>
                              <td
                                rowSpan={6}
                                colSpan={5}
                                className={styles.signatureTD}
                              >
                                <div className={styles.for_signature}>
                                  <p className={styles.signature_text}>
                                    For {custData?.company_name}
                                  </p>
                                  <section className={styles.invoiceSignature}>
                                    {elm?.signature && (
                                      <img src={elm?.signature} />
                                    )}
                                    <p
                                      style={
                                        !elm?.signature
                                          ? { marginTop: "11em" }
                                          : {}
                                      }
                                    >
                                      Authorised Signatory
                                    </p>
                                  </section>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>IFSC Code</td>
                              <td>{custData?.bank_detail?.IFSC_code}</td>
                            </tr>
                            <tr>
                              <td>SWIFT Code</td>
                              <td>{custData?.bank_detail?.SWIFT_code}</td>
                            </tr>

                            {custData?.company_name?.endsWith("LLC") ? (
                              <>
                                {" "}
                                <tr>
                                  <td>Beneficiary Name</td>
                                  <td>
                                    {custData?.bank_detail?.beneficiary_name}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Beneficiary Address</td>
                                  <td>
                                    {" "}
                                    {custData?.bank_detail?.beneficiary_address}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Routing Number</td>
                                  <td>
                                    {custData?.bank_detail?.routing_number}
                                  </td>
                                </tr>
                              </>
                            ) : (
                              ""
                            )}

                            {/* <tr>
                            <td>Account Name</td>
                            <td>
                              {custData?.customer_bank_detail?.account_name}
                            </td>
                            <td className={styles.bold} colSpan={3}>
                              Notes: {elm?.notes}
                            </td>
                          </tr> */}
                            <tr>
                              <td colSpan={2}>
                                <div className={styles.terms_conditions}>
                                  <h4 className={styles.terms}>
                                    Terms & Conditions:{" "}
                                    {elm?.terms_and_conditions}
                                  </h4>
                                  <p className={styles.note}>
                                    SUPPLY MEANT FOR EXPORT UNDER BOND OR LETTER
                                    OF UNDERTAKING WITHOUT PAYMENT OF INTEGRATED
                                    TAX.
                                  </p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                    </table>
                    {/* <table>
    <tbody>
      <tr>
        <td className={styles.widthSpan}>eInvoice</td>
        <td>
          <a href="ledgr.in/MekU3PmUexOA">ledgr.in/MekU3PmUexOA</a>
        </td>
        <td colSpan={2}>Sub Total</td>
        <td className={styles.right}>USD 327.25</td>
      </tr>
      <tr>
        <td>UPI</td>
        <td></td>
        <td colSpan={2}>Grand Total</td>
        <td className={styles.right_bold}>USD 327.25</td>
      </tr>
      <tr>
        <td className={styles.widthSpan}>Bank Name</td>
        <td>ICICI BANK LIMITED</td>
        <td className={styles.bold} colSpan={3}>
          Amount: <span> USD Three hundred and twenty seven only.</span>
        </td>
      </tr>
      <tr>
        <td>Acc Name</td>
        <td>MIRATS INSIGHTS PRIVATE LIMITED</td>
        <td className={styles.bold} colSpan={3}>
          Notes:
        </td>
      </tr>
      <tr>
        <td>
          <p>Account</p> Number
        </td>
        <td>125805001709</td>
        <td rowSpan={3} colSpan={5}>
          <div className={styles.for_signature}>
            <p className={styles.signature_text}>
              For MIRATS INSIGHTS PRIVATE LIMITED
            </p>
            <section className={styles.signature}>
              <p>Authorised Signatory</p>
            </section>
          </div>
        </td>
      </tr>
      <tr>
        <td>IFSC Code</td>
        <td>ICIC0001258</td>
      </tr>
      <tr>
        <td colSpan={2}>
          <div className={styles.terms_conditions}>
            <h4 className={styles.terms}>Terms & Conditions:</h4>
            <p>CIN: U72900UP2021PTC153917</p>
            <p className={styles.note}>
              SUPPLY MEANT FOR EXPORT UNDER BOND OR LETTER OF UNDERTAKING
              WITHOUT PAYMENT OF INTEGRATED TAX.
            </p>
          </div>
        </td>
      </tr>
    </tbody>
  </table> */}
                  </div>
                  <section className={styles.end}>
                    <p>Thank you for your business!</p>
                  </section>
                </div>
              </div>
              <div className={styles.detailInvoiceRightContainer}>
                <section className={styles.paymentDetailsContainer}>
                  <h3>Payment Information</h3>
                  <div className={styles.paymentDetailsInnerContainer}>
                    <span>
                      <p>Invoiced on {elm?.invoice_date}</p>
                      <p>USD {elm?.total_amount} </p>
                    </span>
                    <span>
                      <p>Balance Receivable</p>
                      <p>USD {elm?.total_amount}</p>
                    </span>
                  </div>
                </section>
                <section className={styles.paymentDetailsContainer}>
                  <h3>Currency Rates</h3>
                  <div className={styles.paymentDetailsInnerContainer}>
                    <span>
                      <p>1 {elm?.currency_type}</p>
                      <p>
                        INR{" "}
                        {elm?.current_USD_price ? elm?.current_USD_price : "-"}{" "}
                      </p>
                    </span>
                    <span>
                      <p>Invoice Amount INR</p>
                      <p>
                        INR{" "}
                        {elm?.current_USD_price
                          ? Number(
                              elm?.current_USD_price * elm?.total_amount
                            )?.toFixed(2)
                          : elm?.total_amount}
                      </p>
                    </span>
                  </div>
                </section>
              </div>
            </div>
          ))
      ) : (
        <div className={styles.loaderContainer}>
          <img src={loader} alt="" />
        </div>
      )}
    </>
  );
};

export default InvoiceInternational;
