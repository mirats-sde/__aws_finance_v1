import React, { useEffect, useState } from "react";
import styles from "../domestic_invoice/DomesticInvoice.module.css";
import { useInvoiceContext } from "../invoiceContext/InvoiceContext";
import { useCustomerContext } from "../../customers/customerContex/CustomerContext";
import { auth, db, firestoredb, storage } from "../../../FirebaseConfig";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UseGlobalContext } from "../../globalContext/GlobalContext";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const EditInternationalInvoice = () => {
  const { invoiceNumber } = useParams();
  const { invoiceID } = useParams();
  const [itemCalc, setItemCalc] = useState([
    {
      item: "",
      quantity: "",
      rate: "",
      amount: "0",
      description: "",
    },
  ]);
  const {
    allCompanyData,
    allInvoicesData,
    fetchAllCompanyData,
    fetchAllInvoicesData,
  } = useInvoiceContext();
  const { setSnackbar } = UseGlobalContext();
  const { allCustomerData } = useCustomerContext();
  const { signatureData, fetchAllSignatureData } = useInvoiceContext();
  const [company, setCompany] = useState({});
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();
  const [selectSign, setSelectSign] = useState({});
  const [invoiceData, setInvoiceData] = useState();
  const [signatureModalInputData, setSignatureModalInputData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSignatureModalInputData({});
  };
  const handleChange = (e, ind) => {
    const newArr = [...invoiceData?.orders];
    newArr[ind][e.target.name] = e.target.value;
    newArr[ind]["amount"] = Number(
      newArr[ind]?.quantity && newArr[ind]?.rate
        ? Number(Number(newArr[ind]?.quantity) * Number(newArr[ind]?.rate))
        : 0
    );
    setInvoiceData((prev) => ({ ...prev, orders: newArr }));
  };

  const addItemCalc = (e) => {
    e.preventDefault();

    setInvoiceData((prev) => ({
      ...prev,
      orders: [
        ...prev?.orders,
        {
          item: "",
          quantity: "",
          rate: "",
          amount: 0,
          description: "",
        },
      ],
    }));
  };

  const deleteItemCalc = (item, i) => {
    const deleteData = invoiceData?.orders;
    setInvoiceData((prev) => ({
      ...prev,
      orders: deleteData.filter((_, index) => index !== i),
    }));
    axios.delete(
      `https://finance.miratsoneservices.com/api/delete-order/${item?.order_id}`
    );
    console.log(item);
  };

  const handleChangeInput = (e) => {
    setInvoiceData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateInvoice = (e) => {
    e.preventDefault();

    let invoiceMatch = allInvoicesData?.filter(
      (data) => data?.company_id == invoiceData?.company_id
    );
    let invoiceNumberExists = invoiceMatch?.filter(
      (data) => data?.invoice_number == invoiceData?.invoice_number
    );

    if (
      !invoiceNumberExists?.length ||
      invoiceNumber == invoiceNumberExists[0]?.invoice_number
    ) {
      axios
        .put(
          `https://finance.miratsoneservices.com/api/update-invoice/${Number(
            invoiceID
          )}`,
          invoiceData
        )
        .then((res) => {
          for (let i = 0; i < invoiceData?.orders?.length; i++) {
            let myObj = invoiceData?.orders[i];
            if (myObj.hasOwnProperty("order_id")) {
              console.log("updating order " + myObj.order_id);
              // put request to update the order
              axios
                .put(
                  `https://finance.miratsoneservices.com/api/update-order/${myObj.order_id}`,
                  myObj
                )
                .then(
                  (res) => console.log(res.data),
                  fetchAllCompanyData(),
                  fetchAllInvoicesData()
                )
                .catch((err) => console.log(err));
            } else {
              console.log(
                "creating new order in invoice " + invoiceData.invoice_id
              );
              axios
                ?.post(
                  "https://finance.miratsoneservices.com/api/create-order",
                  {
                    invoice_id: invoiceData.invoice_id,
                    ...myObj,
                  }
                )
                .then(
                  (res) => console.log(res.data),
                  fetchAllCompanyData(),
                  fetchAllInvoicesData(),
                  setSnackbar({
                    open: true,
                    severity: "success",
                    msg: "Invoice Updated Successfully!",
                  })
                )
                .catch((err) => console.log(err));
            }
          }
        });
      setSnackbar({
        open: true,
        severity: "success",
        msg: "Invoice Updated Successfully",
      });
      navigate("/invoices");
    } else {
      alert("Invoice number already exists");
    }
  };

  const createInvoiceNumber = (invoice) => {
    let prevInvoiceNumber =
      Number(invoice[0]?.invoice_number?.split("-")[1]) + 1;
    return prevInvoiceNumber;
  };

  const handleCompanyChange = (e) => {
    let selectedCompany = allCompanyData?.filter(
      (comData) => comData?.company_id == e.target.value
    );
    let selectedCompanyInvoices = allInvoicesData?.filter(
      (invData) => invData?.company_id == selectedCompany[0]?.company_id
    );
    let flag = false;
    selectedCompanyInvoices?.forEach((invoice) => {
      if (invoice.invoice_number == invoiceNumber) {
        setInvoiceData((prev) => {
          return {
            ...prev,
            invoice_number: invoiceNumber,
            company_id: invoice?.company_id,
          };
        });
        flag = true;
      }
    });
    if (!flag) {
      let prevInvoiceNumber = createInvoiceNumber(selectedCompanyInvoices);
      setInvoiceData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        invoice_number: selectedCompany?.length
          ? selectedCompany[0]?.company_name?.endsWith("LLC")
            ? `LLC${new Date()?.getFullYear()}-${prevInvoiceNumber}`
            : `${selectedCompany[0]?.company_name
                ?.slice(0, 3)
                ?.toUpperCase()}${new Date()?.getFullYear()}-${prevInvoiceNumber}`
          : selectedCompany[0]?.company_name?.endsWith("LLC")
          ? `LLC${new Date()?.getFullYear()}-01`
          : `${selectedCompany[0]?.company_name
              ?.slice(0, 3)
              ?.toUpperCase()}${new Date()?.getFullYear()}-01`,
      }));
    }
    setCompany(selectedCompany);
    setInvoices(selectedCompanyInvoices);
  };
  useEffect(() => {
    let total_amount = invoiceData?.orders?.reduce((acc, cur) => {
      acc = acc + Number(cur?.amount);
      return acc;
    }, 0);
    setInvoiceData((prev) => ({
      ...prev,
      total_amount: invoiceData?.adjusted_amount
        ? Number(Number(invoiceData?.adjusted_amount) + total_amount)
        : total_amount,
    }));
  }, [invoiceData?.orders, invoiceData?.adjusted_amount]);
  useEffect(() => {
    let invoice = allInvoicesData?.filter(
      (Idata) =>
        Idata?.invoice_number == invoiceNumber && Idata?.invoice_id == invoiceID
    );
    console.log(invoice);
    setInvoiceData({ ...invoice[0] });
  }, [allInvoicesData]);
  let currentCompany = allCompanyData?.filter(
    (data) => data?.company_id == invoiceData?.company_id
  );
  const handleAddSignature = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    e.target.style.cursor = "not-allowed";
    uploadBytes(
      ref(
        storage,
        `signatures/${signatureModalInputData?.signature_name}/${signatureModalInputData?.signature_name}`
      ),
      signatureModalInputData?.file
    ).then(async (snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        console.log("File available at", downloadURL);
        axios
          .post("https://finance.miratsoneservices.com/api/create-signature", {
            signature: downloadURL,
            signature_name: signatureModalInputData?.signature_name,
          })
          .then((res) => {
            console.log("signature uploaded");
            e.target.disabled = false;
            e.target.style.cursor = "pointer";
            fetchAllSignatureData();
            handleClose();
            setSnackbar({
              open: true,
              msg: "Signature Added Successfully",
              severity: "success",
            });
          });
      });
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 330,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 64,
    p: 4,
  };
  return (
    <>
      <form onSubmit={updateInvoice}>
        <div className={styles.domestic_invoice_container}>
          <div className={styles.invoice_header}>
            <div className={styles.left_header}>
              {/* <select
                onChange={handleChangeInput}
                className={styles.invoice_select}
                name="invoice_select"
                id="invoice_select"
              >
                <option value="international invoice">
                  International Invoice
                </option>
                <option value="https://finance.miratsoneservices.com/api/get-customer">
                  Domestic Invoice
                </option>
              </select> */}

              <button
                type="submit"
                // onClick={handleSubmit}
                className={styles.create_invoice}
              >
                Update Invoice
              </button>
            </div>
            <div className={styles.right_header}>
              <span>Sale By</span>
              <select
                onChange={handleChangeInput}
                name="sale_by"
                id="creater_name"
                value={invoiceData?.sale_by}
                required
              >
                <option value="" disabled selected>
                  Select Sales Person
                </option>
                <option value="Mayank Patel">Mayank Patel</option>
                <option value="Amit Sharma">Amit Sharma</option>
                <option value="Charmi Patel">Charmi Patel</option>
                {/* <option value="Ashwin Gopalakrishnan">
                  Ashwin Gopalakrishnan
                </option> */}
              </select>
            </div>
          </div>

          {/* INVOICE CONTENT */}
          <div className={styles.box}>
            <div className={styles.invoice_content_container}>
              <div className={styles.invoice_content}>
                <div className={styles.left_content}>
                  <div className={styles.left_address}>
                    <select
                      // onChange={company_idChange}
                      onChange={(e) => {
                        handleCompanyChange(e);
                      }}
                      name="company_id"
                      id="company_id"
                      value={invoiceData?.company_id}
                      required
                    >
                      <option value="" disabled selected>
                        Select Company
                      </option>
                      {allCompanyData
                        // ?.filter(
                        //   (ell) =>
                        //     ell?.address?.country !== "India" &&
                        //     ell?.address?.country !== "india"
                        // )
                        ?.map((elm, ind) => (
                          <option value={elm?.company_id} key={ind}>
                            {elm?.company_name}
                          </option>
                        ))}
                    </select>
                    <div>
                      {invoiceData?.company_id ? (
                        allCompanyData
                          ?.filter(
                            (elm, ind) =>
                              elm?.company_id == invoiceData?.company_id
                          )
                          ?.map((add, i) => (
                            <React.Fragment>
                              <p>{add?.address?.street1}</p>
                              <p>{add?.address?.street2}</p>

                              <p>
                                {add?.address?.city} - {add?.address?.zip_code}
                              </p>
                              <p>
                                {" "}
                                {add?.address?.state}, {add?.address?.country}
                              </p>
                              <p className={styles.gstin}>
                                GSTIN: {add?.tax_id_no}
                              </p>
                              <p>CIN: {add?.CIN_no}</p>
                            </React.Fragment>
                          ))
                      ) : (
                        <p className={styles.errorMsg}>select a company</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.right_content}>
                  <div className={styles.invoice_dates}>
                    <section className={styles.number}>
                      <input
                        // onChange={handleChangeInput}
                        onChange={(e) =>
                          setInvoiceData((prev) => ({
                            ...prev,
                            invoice_number: e.target.value
                              ?.split(" ")
                              ?.join(""),
                          }))
                        }
                        type="text"
                        name="invoiceNumber"
                        required
                        value={invoiceData?.invoice_number}
                      />
                      {/* <select name="" id="">
                        <option value="">cal</option>
                      </select> */}
                      <span>Invoice No</span>
                    </section>
                    <section className={styles.date}>
                      <input
                        type="date"
                        required
                        name="invoice_date"
                        value={invoiceData?.invoice_date}
                        onChange={handleChangeInput}
                      />
                      <span>Invoice Date</span>
                    </section>
                    <section className={styles.date}>
                      <input
                        type="date"
                        name="invoice_dueDate"
                        value={invoiceData?.invoice_dueDate}
                        required
                        onChange={handleChangeInput}
                      />
                      <span>Due Date</span>
                    </section>
                    <section
                      className={styles.date}
                      onChange={handleChangeInput}
                    >
                      <select
                        name="currency_type"
                        value={
                          invoiceData?.currency_type
                            ? invoiceData?.currency_type
                            : ""
                        }
                        id=""
                        required
                      >
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EURO</option>
                        <option value="POUND">POUND</option>
                      </select>
                      <span>{invoiceData?.currency_type}</span>
                    </section>
                    {invoiceData?.currency_type === "INR" ? (
                      ""
                    ) : (
                      <section
                        className={styles.date}
                        onChange={handleChangeInput}
                      >
                        <input
                          type="text"
                          required
                          name="current_USD_price"
                          value={invoiceData?.current_USD_price}
                          onChange={handleChangeInput}
                        />
                        <span style={{ fontSize: "14px" }}>
                          Enter Current {invoiceData?.currency_type}
                        </span>
                      </section>
                    )}
                  </div>
                </div>
              </div>

              {/* customer info */}
              <div className={styles.customer_info}>
                <section className={styles.left_customer_info}>
                  <div className={styles.select_customer}>
                    <p>Customer Info</p>
                    <select
                      name="customer_id"
                      id="customer_id"
                      // required
                      value={invoiceData?.customer_id}
                      onChange={handleChangeInput}
                    >
                      {console.log(invoiceData)}
                      <option value="" selected disabled>
                        Select Customer
                      </option>
                      {allCustomerData
                        // ?.filter(
                        //   (ell) =>
                        //     ell?.billing_address?.country !== "India" &&
                        //     ell?.billing_address?.country !== "india"
                        // )
                        ?.map((elm, ind) => (
                          <option value={elm?.customer_id}>
                            {elm?.company_name}
                          </option>
                        ))}
                    </select>
                    {allCustomerData
                      ?.filter(
                        (elm, ind) =>
                          elm?.customer_id == invoiceData?.customer_id
                      )
                      ?.map((add, i) => (
                        <React.Fragment>
                          <p>{add?.company_name}</p>
                          <p>{add?.customer_name}</p>
                          <p className={styles.gstin}>
                            POS: {add?.billing_address?.place_of_supply}
                          </p>
                          <p className={styles.gstin}>
                            GSTIN: {add?.tax_id_number}
                          </p>
                        </React.Fragment>
                      ))}
                  </div>
                  <div className={styles.billingAddress}>
                    <p>Billing Address</p>
                    {allCustomerData
                      ?.filter(
                        (elm, ind) =>
                          elm?.customer_id == invoiceData?.customer_id
                      )
                      ?.map((add, i) => (
                        <React.Fragment>
                          <p>{add?.billing_address?.street1}</p>
                          <p>{add?.billing_address?.street2}</p>
                          <p>
                            {add?.billing_address?.city} -{" "}
                            {add?.billing_address?.zip_code}
                          </p>
                          <p>
                            {" "}
                            {add?.billing_address?.city},{" "}
                            {add?.billing_address?.country}
                          </p>
                        </React.Fragment>
                      ))}
                  </div>
                </section>

                {allCustomerData
                  ?.filter(
                    (elm, ind) => elm?.customer_id == invoiceData?.customer_id
                  )
                  ?.map((add, i) =>
                    add?.shipping_address?.country ? (
                      <section className={styles.shippingAddress}>
                        <p>Shipping Address</p>
                        <p>{add?.shipping_address?.street1}</p>
                        <p>{add?.shipping_address?.street2}</p>
                        <p>
                          {add?.shipping_address?.city} -{" "}
                          {add?.shipping_address?.zip_code}
                        </p>
                        <p>
                          {" "}
                          {add?.shipping_address?.city},{" "}
                          {add?.shipping_address?.country}
                        </p>
                      </section>
                    ) : (
                      ""
                    )
                  )}
                <section className={styles.payment_status_container}>
                  <section className={styles.payment_status}>
                    <span>Payment Status</span>
                    <select
                      name="payment_status"
                      value={invoiceData?.payment_status}
                      onChange={handleChangeInput}
                    >
                      <option value="unpaid">Unpaid</option>
                      <option value="paid">Paid</option>
                    </select>
                  </section>
                  {invoiceData?.payment_status === "paid" ? (
                    <section>
                      <section className={styles.payment_status}>
                        <span>Received Amount</span>

                        <input
                          required
                          type="number"
                          step="any"
                          name="received_amount"
                          value={invoiceData?.received_amount}
                          onChange={handleChangeInput}
                        />
                      </section>
                      <section className={styles.payment_status}>
                        <span>TDS</span>
                        <input
                          required
                          step="any"
                          type="number"
                          name="tds"
                          value={invoiceData?.tds}
                          onChange={handleChangeInput}
                        />
                      </section>
                      <section className={styles.payment_status}>
                        <span>Bank Charges</span>
                        <input
                          required
                          step="any"
                          type="number"
                          name="bank_charges"
                          value={invoiceData?.bank_charges}
                          onChange={handleChangeInput}
                        />
                      </section>
                    </section>
                  ) : (
                    ""
                  )}
                </section>
              </div>

              {/* calculations */}
              <div className={styles.calculations}>
                <div className={styles.calculation_header2}>
                  <section className={styles.item}>
                    <p>Item</p>
                    <button onClick={addItemCalc}>New Item</button>
                  </section>
                  <section>
                    <p>Qty</p>
                  </section>
                  <section>
                    <p>Rate</p>
                  </section>
                  <section>
                    <p>Amount</p>
                  </section>
                </div>
                {/* map */}
                <div className={styles.calculation_body}>
                  {invoiceData?.orders?.map((item, i) => {
                    return (
                      <>
                        <div className={styles.calculation_content2}>
                          <section>
                            <select
                              name="item"
                              onChange={(e) => handleChange(e, i)}
                              className={styles.select_item}
                              required
                              value={item?.item}
                              id="select_item"
                            >
                              <option value="" disabled selected>
                                Select Item
                              </option>
                              <option value="PO">PO</option>
                              <option value="project_number">
                                Project Number
                              </option>
                            </select>
                          </section>
                          <section>
                            <input
                              value={item?.quantity}
                              required
                              onChange={(e) => handleChange(e, i)}
                              type="number"
                              placeholder="QTY"
                              name="quantity"
                            />
                          </section>
                          <section>
                            <input
                              value={item?.rate}
                              required
                              onChange={(e) => handleChange(e, i)}
                              type="number"
                              name="rate"
                              placeholder="Rate"
                            />
                          </section>

                          <section>
                            <input
                              value={item?.amount}
                              required
                              onChange={(e) => handleChange(e, i)}
                              name="amount"
                              type="number"
                              placeholder="Total Amount"
                            />
                          </section>
                        </div>
                        <div className={styles.remove_item}>
                          <section className={styles.desc}>
                            <textarea
                              name="description"
                              value={item?.description}
                              required
                              cols="31"
                              rows="2"
                              placeholder="Description"
                              onChange={(e) => handleChange(e, i)}
                            ></textarea>
                          </section>
                          <span className={styles.remove_text}>
                            {item.length !== 1 && (
                              <span onClick={() => deleteItemCalc(item, i)}>
                                Remove Item
                              </span>
                              // <RiDeleteBinLine
                              //   size={15}
                              //   color="darkred"
                              //   style={{ cursor: "pointer" }}
                              //   onClick={() => deleteItemCalc(i)}
                              // />
                            )}
                          </span>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              {/* footer */}
              <div className={styles.footer}>
                <section className={styles.left_footer}>
                  <div>
                    <textarea
                      className={styles.notes}
                      name="notes"
                      onChange={handleChangeInput}
                      cols="30"
                      rows="5"
                      value={invoiceData?.notes}
                      placeholder="Notes"
                    ></textarea>
                  </div>
                  <textarea
                    className={styles.terms}
                    name="terms_and_conditions"
                    onChange={handleChangeInput}
                    cols="30"
                    rows="5"
                    value={invoiceData?.terms_and_conditions}
                    placeholder="Terms and Conditions"
                  ></textarea>
                </section>
                <section className={styles.right_footer}>
                  <div className={styles.adjustments}>
                    <section className={styles.adjustment_content}>
                      <p>Adjustment</p>
                      <input
                        type="number"
                        step="any"
                        name="adjusted_amount"
                        onChange={(e) =>
                          setInvoiceData((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                          }))
                        }
                        value={invoiceData?.adjusted_amount}
                        placeholder="0"
                      />
                    </section>
                    <section className={styles.adjustment_content}>
                      <p>Total</p>
                      <input
                        className={styles.disabled}
                        type="number"
                        value={invoiceData?.total_amount}
                        placeholder="0"
                      />
                    </section>
                  </div>
                  <div className={styles.for_Signature}>
                    <p>For {currentCompany[0]?.company_name}</p>

                    <section className={styles.signature}>
                      {selectSign && (
                        <img
                          src={
                            selectSign?.url
                              ? selectSign?.url
                              : invoiceData?.signature
                          }
                          className={styles.showSignature}
                        />
                      )}
                      <div className={styles.signatureContainer}>
                        <select
                          name="signature"
                          onChange={(e) => {
                            setInvoiceData((prev) => ({
                              ...prev,
                              [e.target.name]: e.target.value,
                            }));
                            setSelectSign({ url: e.target.value });
                          }}
                          value={invoiceData?.signature}
                        >
                          <option value="">Select Signature</option>
                          {signatureData?.map((data, key) => (
                            <option value={data?.signature}>
                              {data?.signature_name}
                            </option>
                          ))}
                        </select>
                        &nbsp; or &nbsp;
                        <button
                          onClick={handleOpen}
                          // disabled={!invoiceData?.signature ? true : false}
                        >
                          Upload New
                        </button>
                      </div>
                      <p>Authorised Signatory</p>
                    </section>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.modalInnerContainer}>
              <div className={styles.inputContainer}>
                <label htmlFor="signature_name">Employee Name</label>
                {" : "}
                <input
                  type="text"
                  name="signature_name"
                  // value={modalData?.project_manager}
                  onChange={(e) => {
                    setSignatureModalInputData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="signature">Upload Signature</label>
                {" : "}
                <input
                  type="file"
                  name="signature"
                  // value={modalData?.date_of_receipt}
                  accept="image/*"
                  onChange={(e) => {
                    setSignatureModalInputData((prev) => ({
                      ...prev,
                      url: URL.createObjectURL(e.target.files[0]),
                      file: e.target.files[0],
                    }));
                  }}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="">Selected Signature</label>
                {" : "}
                {signatureModalInputData?.url ? (
                  <img src={signatureModalInputData?.url} alt="sign" />
                ) : (
                  <p style={{ color: "red" }}>* Upload Signature *</p>
                )}
              </div>
              <div className={styles.inputContainer}>
                <button onClick={handleClose}>Cancel</button>
                <button
                  onClick={handleAddSignature}
                  disabled={
                    signatureModalInputData?.signature_name &&
                    signatureModalInputData?.file
                      ? false
                      : true
                  }
                >
                  Upload
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </form>
    </>
  );
};

export default EditInternationalInvoice;
