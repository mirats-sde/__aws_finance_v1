import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomerContext } from "../../customers/customerContex/CustomerContext";
import { useInvoiceContext } from "../invoiceContext/InvoiceContext";
import styles from "../../../components/invoice_india/InvoiceIndia.module.css";
import miratsLogo from "../../../assets/miratsLogo.png";
import { ToWords } from "to-words";
import CryptoJS from "crypto-js";
const IndianInvoice = () => {
  let { invoiceNumber } = useParams();
  let invoiceID = invoiceNumber?.includes("-")
    ? invoiceNumber?.split("-")[1]
    : null;
  invoiceNumber = invoiceNumber?.includes("-")
    ? invoiceNumber?.split("-")[0]
    : invoiceNumber;
  const [invoiceData, setInvoiceData] = useState({});
  const {
    allInvoicesData,
    allCompanyData,
    fetchAllCompanyData,
    fetchAllInvoicesData,
  } = useInvoiceContext();
  const { allCustomerData } = useCustomerContext();

  const navigate = useNavigate();
  // to words config
  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
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
  return (
    <>
      {allInvoicesData
        ?.filter((inv) =>
          invoiceID
            ? inv?.invoice_number === decryptText(invoiceNumber) &&
              inv?.invoice_id == decryptText(invoiceID)
            : inv?.invoice_number === decryptText(invoiceNumber)
        )
        ?.map((elm, ind) => (
          // <React.Fragment >

          <div className={styles.detailInvoiceMainParentContainer2} key={ind}>
            <div className={styles.invoice_container}>
              <section className={styles.logo}>
                <img src={miratsLogo} alt="" />
                {console.log(elm)}
              </section>

              {/* address invoice */}
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
                          {comData?.address?.city}- {comData?.address?.zip_code}{" "}
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
                        <p>GSTIN:{comData?.tax_id_no}</p>
                        <p>CIN: {comData?.CIN_no}</p>
                      </section>

                      <section className={styles.invoice}>
                        <h3 className={styles.invoice_text}>TAX INVOICE</h3>
                        <p className={styles.bold}>
                          Invoice #: <span> {elm?.invoice_number}</span>
                        </p>
                        <p>
                          Date:{" "}
                          <span>
                            {" "}
                            {new Date(elm?.invoice_date)?.toLocaleDateString(
                              "en-US"
                            )}
                          </span>
                        </p>
                        <p>
                          Due Date:{" "}
                          <span>
                            {" "}
                            {new Date(elm?.invoice_dueDate)?.toLocaleDateString(
                              "en-US"
                            )}
                          </span>
                        </p>
                        {/* <p>
                            LUT Code: <span> {comData?.LUT_code}</span>
                          </p> */}
                        <p>
                          Created By:{" "}
                          <span className={styles.created_by}>
                            {elm?.sale_by}
                          </span>
                        </p>
                        <p className={styles.payStatus}>
                          {elm?.payment_status ? elm?.payment_status : "unpaid"}
                        </p>
                      </section>
                    </div>
                  </React.Fragment>
                ))}

              {allCustomerData
                ?.filter((cust) => cust?.customer_id == elm?.customer_id)
                ?.map((custData, custInd) => (
                  <div className={styles.billing_info}>
                    <section className={styles.customer}>
                      <h4>Customer Name</h4>
                      <p>{custData?.company_name}</p>
                      {/* <p>{custData?.customer_name}</p> */}
                      <p>
                        <a href={`mailto:${elm?.account_email_id}`}>
                          {custData?.account_email_id}
                        </a>
                      </p>
                      <p>GSTIN:{custData?.tax_id_number}</p>

                      <p>
                        Place of Supply:{" "}
                        {custData?.billing_address?.country != "India"
                          ? "INTERNATIONAL"
                          : custData?.billing_address?.place_of_supply}
                      </p>
                    </section>
                    <section className={styles.billing_address}>
                      <h4>Billing Address</h4>

                      <p>{custData?.billing_address?.street1}</p>
                      <p>{custData?.billing_address?.street2}</p>
                      <p>
                        {custData?.billing_address?.city}{" "}
                        {custData?.billing_address?.zip_code}
                      </p>
                      <p>
                        {custData?.billing_address?.place_of_supply ===
                        "INTERNATIONAL"
                          ? ""
                          : custData?.billing_address?.place_of_supply}{" "}
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
                      <th style={{ width: "50%" }}>Description</th>
                      <th style={{ width: "5%" }}>GST</th>
                      <th style={{ width: "10%" }}>Rate</th>
                      <th style={{ width: "10%" }}>Qty</th>
                      <th style={{ width: "10%" }}>Taxable Amt</th>
                      <th style={{ width: "10%" }}>GST</th>
                      <th style={{ width: "10%" }}>Total</th>
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
                            {/* <NumberFormat
                                value={Number(ord?.rate)?.toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                thousandsGroupStyle="lakh"
                                prefix={"₹"}
                              /> */}
                          </div>
                        </td>
                        <td className={styles.center}>{ord?.gst}%</td>
                        <td className={styles.center}>
                          ₹{Number(ord?.rate)?.toFixed(2)}
                        </td>
                        <td className={styles.center}>{ord?.quantity}</td>
                        <td className={styles.center}>
                          {console.log(ord)}₹{ord?.taxable_amount}
                        </td>
                        <td className={styles.center}>
                          ₹
                          {Number(
                            (ord?.taxable_amount * Number(ord?.gst)) / 100
                          )?.toFixed(2)}
                        </td>
                        <td className={styles.center}>
                          ₹{Number(ord?.amount)?.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className={styles.grand_total} colSpan="4">
                        Grand Total
                      </td>
                      <td className={styles.align_bold}>
                        {" "}
                        {elm?.orders?.reduce(
                          (acc, curr) => (acc = acc + Number(curr?.quantity)),
                          0
                        )}
                      </td>
                      {/* txt amount */}
                      <td className={styles.align_bold}>
                        ₹
                        {/* {Number(
                            elm?.orders?.reduce(
                              (acc, cur) => (acc = acc + cur?.taxable_amount),
                              0
                            )
                          )?.toFixed(2)} */}
                        {Number(elm?.taxable_amount)?.toFixed(2)}
                      </td>
                      {/* gst amt */}
                      <td className={styles.align_bold}>
                        ₹
                        {Number(
                          elm?.orders?.reduce(
                            (acc, cur) =>
                              (acc =
                                acc +
                                (cur?.taxable_amount * Number(cur?.gst)) / 100),
                            0
                          )
                        )?.toFixed(2)}
                      </td>
                      {/* total amt */}
                      <td className={styles.align_bold}>
                        ₹
                        {Number(
                          elm?.orders?.reduce(
                            (acc, curr) => (acc = acc + Number(curr?.amount)),
                            0
                          ) +
                            Number(
                              elm?.adjusted_amount ? elm?.adjusted_amount : 0
                            )
                        )?.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>

                  {allCompanyData
                    ?.filter((cust) => cust?.company_id == elm?.company_id)
                    ?.map((custData, custInd) => (
                      <tbody className={styles.second_tbody}>
                        <tr>
                          <td className={styles.widthSpan}>eInvoice</td>
                          <td>
                            <a
                              // ref={copyLink}
                              href={`https://finance.miratsoneservices.com/${invoiceNumber}${
                                invoiceID ? `-${invoiceID}` : ""
                              }`}
                              target="_ajay"
                            >
                              {`https://finance.miratsoneservices.com/${invoiceNumber}${
                                invoiceID ? `-${invoiceID}` : ""
                              }`}
                            </a>
                          </td>
                          <td colSpan={5}>Sub Total</td>
                          <td
                            className={styles.right}
                            style={{ textAlign: "center" }}
                          >
                            ₹{Number(elm?.taxable_amount)?.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td>UPI</td>
                          <td>{custData?.bank_detail?.UPI}</td>
                          {allCompanyData
                            ?.filter(
                              (compp) => compp?.company_id == elm?.company_id
                            )
                            ?.map((ann, ii) =>
                              ann?.address?.state?.toLowerCase() ===
                              custData?.billing_address?.place_of_supply?.toLowerCase() ? (
                                <>
                                  <td colSpan={5}>
                                    <div>
                                      <p className={styles.underline}>
                                        SGST Total 9%
                                      </p>
                                      <p>CGST Total 9%</p>
                                    </div>
                                  </td>
                                  <td>
                                    <div>
                                      <p
                                        className={styles.align_bold_underline}
                                      >
                                        ₹{Number(elm?.CGST)?.toFixed(2)}
                                      </p>
                                      <p className={styles.align_bold}>
                                        ₹{Number(elm?.SGST)?.toFixed(2)}
                                      </p>
                                    </div>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td colSpan={5}>IGST Total 18%</td>
                                  <td className={styles.align_bold}>
                                    ₹{Number(elm?.IGST)?.toFixed(2)}
                                  </td>
                                </>
                              )
                            )}
                        </tr>
                        <tr>
                          <td className={styles.widthSpan}>Bank Name</td>
                          <td>{custData?.bank_detail?.bank_name}</td>
                          <td colSpan={5}>Grand Total</td>
                          <td className={styles.right_bold}>
                            ₹{Number(elm?.total_amount)?.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td>Account Name</td>
                          <td>{custData?.bank_detail?.account_name}</td>
                          <td className={styles.bold} colSpan={6}>
                            Amount:{" "}
                            <span>
                              {" "}
                              {toWords.convert(
                                elm?.total_amount ? elm?.total_amount : 0
                              )}{" "}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Account</p> Number
                          </td>
                          <td>{custData?.bank_detail?.account_number}</td>
                          <td className={styles.bold} rowSpan={2} colSpan={6}>
                            Notes:{" "}
                            <span className={styles.note_desc}>
                              {elm?.notes}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>IFSC Code</td>
                          <td>{custData?.bank_detail?.IFSC_code}</td>
                        </tr>
                        {custData?.company_name?.endsWith("LLC") ? (
                          <>
                            {" "}
                            <tr>
                              <td>SWIFT Code</td>
                              <td>{custData?.bank_detail?.SWIFT_code}</td>
                              <td rowSpan={4} colSpan={6}>
                                <div className={styles.for_signature}>
                                  <p className={styles.signature_text}>
                                    For{" "}
                                    {company[0]?.company_name?.toUpperCase()}
                                  </p>
                                  <section className={styles.signature}>
                                    {elm?.signature && (
                                      <img src={elm?.signature} />
                                    )}
                                    <p
                                      style={
                                        !elm?.signature
                                          ? {
                                              marginTop: "8em",
                                            }
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
                              <td>Beneficiary Name</td>
                              <td>{custData?.bank_detail?.beneficiary_name}</td>
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
                              <td>{custData?.bank_detail?.routing_number}</td>
                            </tr>
                          </>
                        ) : (
                          ""
                        )}

                        <tr>
                          <td colSpan={2}>
                            <div className={styles.terms_conditions}>
                              <h4 className={styles.terms}>
                                Terms & Conditions: {elm?.terms_and_conditions}
                              </h4>
                              <p>
                                Payment shall be made on the respective due date
                                and made through the bank details specified in
                                the invoice
                              </p>
                            </div>
                          </td>

                          {!custData?.company_name?.endsWith("LLC") && (
                            <td rowSpan={3} colSpan={6}>
                              <div className={styles.for_signature}>
                                <p className={styles.signature_text}>
                                  For {company[0]?.company_name?.toUpperCase()}
                                </p>
                                <section className={styles.signature}>
                                  {elm?.signature && (
                                    <img src={elm?.signature} />
                                  )}
                                  <p>Authorised Signatory</p>
                                </section>
                              </div>
                            </td>
                          )}

                          {/* <td rowSpan={3} colSpan={6}>
                <div className={styles.for_signature}>
                  <p className={styles.signature_text}>
                    For MIRATS INSIGHTS PRIVATE LIMITED
                  </p>
                  <section className={styles.signature}>
                    <p>Authorised Signatory</p>
                  </section>
                </div>
              </td> */}
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
              <section className={styles.end}>
                <p>Thank you for your business!</p>
              </section>
            </div>
          </div>

          // </React.Fragment>
        ))}
    </>
  );
};

export default IndianInvoice;
