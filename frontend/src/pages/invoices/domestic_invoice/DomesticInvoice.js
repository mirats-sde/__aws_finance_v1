import React, { useEffect, useMemo, useState } from "react";
import styles from "./DomesticInvoice.module.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { useInvoiceContext } from "../invoiceContext/InvoiceContext";
import { useCustomerContext } from "../../customers/customerContex/CustomerContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Header from "../../../components/header/Header";
import { UseGlobalContext } from "../../globalContext/GlobalContext";
const DomesticInvoice = () => {
  const { setSnackbar } = UseGlobalContext();
  const [itemCalc, setItemCalc] = useState([
    {
      item: "",
      quantity: "",
      rate: "",
      gst: 18,
      amount: 0,
      description: "",
      taxable_amount: "",
      gstAmount: "",
    },
  ]);
  const [disableBTN, setDisableBTN] = useState(false);
  const {
    allCompanyData,
    allInvoicesData,
    fetchAllCompanyData,
    fetchAllInvoicesData,
  } = useInvoiceContext();
  const { allCustomerData } = useCustomerContext();
  const [invoiceData, setInvoiceData] = useState({
    status: "active",
    total_amount: 0,
    adjusted_amount: 0,
    payment_status: "unpaid",
  });

  const navigate = useNavigate();
  const handleChange = (e, ind) => {
    const newArr = [...itemCalc];
    newArr[ind][e.target.name] = e.target.value;
    newArr[ind]["gstAmount"] =
      (Number(newArr[ind]?.rate * newArr[ind]?.quantity) * newArr[ind]?.gst) /
      100;
    newArr[ind]["taxable_amount"] =
      newArr[ind]?.quantity && newArr[ind]?.rate
        ? Number(newArr[ind]?.quantity * newArr[ind]?.rate)
        : "";
    setItemCalc(newArr);
    console.log(itemCalc);
    newArr[ind]["amount"] = Number(
      newArr[ind]?.quantity && newArr[ind]?.rate
        ? Number(newArr[ind]?.quantity * newArr[ind]?.rate) && newArr[ind]?.gst
          ? Number(
              Number(newArr[ind]?.quantity * newArr[ind]?.rate) *
                newArr[ind]?.gst
            ) /
              100 +
            Number(Number(newArr[ind]?.quantity * newArr[ind]?.rate))
          : newArr[ind]?.quantity * newArr[ind]?.rate
        : 0
    );
  };
  console.log(invoiceData);
  const createInvoice = (e) => {
    e.preventDefault();
    let invoiceMatch = allInvoicesData?.filter(
      (data) => data?.company_id == invoiceData?.company_id
    );
    let invoiceNumberExists = invoiceMatch?.filter(
      (data) => data?.invoice_number == invoiceData?.invoice_number
    );
    if (!invoiceNumberExists?.length) {
      navigate("/invoices");
      setDisableBTN(true);
      axios
        .post(
          "https://finance.miratsoneservices.com/api/create-invoice",
          invoiceData
        )
        .then((res) => {
          for (let i = 0; i < itemCalc.length; i++) {
            let myObj = itemCalc[i];

            axios
              ?.post("https://finance.miratsoneservices.com/api/create-order", {
                invoice_id: res.data.invoice_id,
                ...myObj,
              })
              .then(
                (res) => console.log(res.data),
                setDisableBTN(false),
                fetchAllCompanyData(),
                fetchAllInvoicesData(),
                setSnackbar({
                  open: true,
                  severity: "success",
                  msg: "Invoice Added Successfully!",
                })
              )
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Invoice number already exists");
    }
  };
  console.log(itemCalc);
  const addItemCalc = (e) => {
    e.preventDefault();

    setItemCalc([
      ...itemCalc,
      {
        item: "",
        quantity: "",
        rate: "",
        gst: 18,
        amount: 0,
        description: "",
        taxable_amount: "",
        gstAmount: "",
      },
    ]);
  };

  const deleteItemCalc = (i) => {
    const deleteData = [...itemCalc];
    setItemCalc(deleteData.filter((_, index) => index !== i));
  };

  const handleChangeInput = (e) => {
    setInvoiceData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // console.log(invoiceData);
  console.log(allCompanyData);

  let customer = allCustomerData?.filter(
    (elm) => elm?.customer_id == invoiceData?.customer_id
  );
  let company = allCompanyData?.filter(
    (elm) => elm?.company_id == invoiceData?.company_id
  );

  let invoice = allInvoicesData?.filter(
    (invData) => invData?.company_id == company[0]?.company_id
  );
  // let prevInvoiceNumber =
  //   Number(
  //     invoice?.reverse()?.[invoice?.length - 1]?.invoice_number?.slice(4)
  //   ) + 1;
  let prevInvoiceNumberSplit = invoice
    ?.reverse()
    ?.[invoice?.length - 1]?.invoice_number?.split("-");
  let prevInvoiceNumber =
    Number(prevInvoiceNumberSplit?.[prevInvoiceNumberSplit?.length - 1]) + 1;
  const gettingBiggerNum = (arr) => {
    let invoiceNumbersArr = [];
    arr?.forEach((element) => {
      console.log(element);
      let prevSplit = element?.invoice_number?.split("-");
      invoiceNumbersArr.push(prevSplit[prevSplit?.length - 1]);
    });
    let biggerNumber = invoiceNumbersArr.sort((a, b) => a - b);

    return Number(biggerNumber[biggerNumber?.length - 1]) + 1;
    // return invoiceNumbersArr;
  };
  let newPreviousInvoiceNumber = invoice?.length
    ? gettingBiggerNum(invoice)
    : gettingBiggerNum([{ invoice_number: "LLC-01" }]);
  console.log(newPreviousInvoiceNumber);
  useEffect(() => {
    let taxable_amount = Object.values(itemCalc)?.reduce((acc, cur) => {
      return Number(acc + cur?.taxable_amount);
    }, 0);
    let gstAmount = Object.values(itemCalc)?.reduce((acc, cur) => {
      return Number(acc + cur?.gstAmount);
    }, 0);
    let total_amount =
      Number(invoiceData?.taxable_amount) +
      Number(invoiceData?.adjusted_amount) +
      Number(invoiceData?.IGST);

    setInvoiceData((prev) => ({
      ...prev,
      invoice_number: company?.length
        ? invoice?.length
          ? company[0]?.company_name?.endsWith("LLC")
            ? `LLC${new Date()?.getFullYear()}-${newPreviousInvoiceNumber}`
            : `${company[0]?.company_name
                ?.slice(0, 3)
                ?.toUpperCase()}${new Date()?.getFullYear()}-${newPreviousInvoiceNumber}`
          : company[0]?.company_name?.endsWith("LLC")
          ? `LLC${new Date()?.getFullYear()}-01`
          : `${company[0]?.company_name
              ?.slice(0, 3)
              ?.toUpperCase()}${new Date()?.getFullYear()}-01`
        : // : `${company[0]?.company_name
          //     ?.slice(0, 3)
          //     ?.toUpperCase()}${new Date()?.getFullYear()}-01`,
          `INV${new Date()?.getFullYear()}-01`,
      taxable_amount: taxable_amount,
      IGST: gstAmount,
      CGST: gstAmount / 2,
      SGST: gstAmount / 2,
      total_amount: total_amount?.toFixed(2),
    }));
  }, [
    itemCalc,
    invoiceData?.taxable_amount,
    invoiceData?.adjusted_amount,
    allInvoicesData,
    invoiceData?.company_id,
  ]);
  console.log(company && invoice ? "fix" : "err");
  console.log(company);
  // dropdown
  console.log(invoiceData);
  console.log(invoice);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Header />
      <form onSubmit={createInvoice}>
        <div className={styles.domestic_invoice_container}>
          <div className={styles.invoice_header}>
            <div className={styles.left_header}>
              {/* <select
                required
                onChange={handleChangeInput}
                className={styles.invoice_select}
                name="invoice_select"
                id="invoice_select"
              >
                <option value="domestic invoice">Domestic Invoice</option>
                <option value="international invoice">
                  <span>International Invoice</span>
                </option>
              </select> */}
              <Button
                disabled={disableBTN}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Domestic Invoice
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <span className={styles.menuItem}>
                  {" "}
                  <MenuItem>
                    {" "}
                    <Link to="/create-international-invoice">
                      International Invoice
                    </Link>
                  </MenuItem>
                </span>
              </Menu>
              <button type="submit" className={styles.create_invoice}>
                Create Invoice
              </button>
            </div>
            <div className={styles.right_header}>
              <span>Sale By</span>
              <select
                onChange={handleChangeInput}
                name="sale_by"
                id="sale_by"
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
                      onChange={handleChangeInput}
                      name="company_id"
                      id="company_id"
                      required
                    >
                      <option value="" selected disabled>
                        Select Company
                      </option>
                      {allCompanyData
                        // ?.filter((ell) => ell?.address?.country === "India")
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
                              {console.log(add)}
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
                        type="text"
                        name="invoiceNumber"
                        required
                        value={invoiceData?.invoice_number}
                        onChange={(e) =>
                          setInvoiceData((prev) => ({
                            ...prev,
                            invoice_number: e.target.value,
                          }))
                        }
                      />
                      {/* <select name="" id="">
                        <option value="">cal</option>
                      </select> */}
                      <span>Invoice No</span>
                    </section>
                    <section className={styles.date}>
                      <input
                        type="date"
                        name="invoice_date"
                        required
                        onChange={handleChangeInput}
                      />
                      <span>Invoice Date</span>
                    </section>
                    <section className={styles.date}>
                      <input
                        required
                        type="date"
                        name="invoice_dueDate"
                        onChange={handleChangeInput}
                      />
                      <span>Due Date</span>
                    </section>
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
                      required
                      id="customer_id"
                      onChange={handleChangeInput}
                    >
                      <option value="" selected>
                        Select Customer
                      </option>
                      {allCustomerData
                        // ?.filter(
                        //   (ell) => ell?.billing_address?.country === "India"
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
                            {console.log(add)}
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
                            {add?.billing_address?.place_of_supply ===
                            "INTERNATIONAL"
                              ? ""
                              : `${add?.billing_address?.place_of_supply},`}
                            {add?.billing_address?.country}
                          </p>
                        </React.Fragment>
                      ))}
                  </div>
                </section>
                {}

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
              </div>

              {/* calculations */}
              <div className={styles.calculations}>
                <div className={styles.calculation_header}>
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
                    <p>GST(%)</p>
                  </section>
                  <section>
                    <p>Amount</p>
                  </section>
                </div>
                {/* map */}
                <div className={styles.calculation_body}>
                  {itemCalc.map((item, i) => {
                    return (
                      <>
                        <div className={styles.calculation_content}>
                          <section>
                            {/* <select name="" id="">
                          <option value="">Select Item</option>
                        </select> */}
                            {/* <input
                              type="text"
                              required
                              value={item?.item}
                              placeholder="Enter a Item"
                              className={styles.select_item}
                              onChange={(e) => handleChange(e, i)}
                              name="item"
                            /> */}
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
                              required
                              value={item?.quantity}
                              onChange={(e) => handleChange(e, i)}
                              type="number"
                              placeholder="QTY"
                              name="quantity"
                            />
                          </section>
                          <section>
                            <input
                              required
                              value={item?.rate}
                              onChange={(e) => handleChange(e, i)}
                              type="number"
                              name="rate"
                              placeholder="Rate"
                            />
                          </section>
                          <section>
                            <input
                              required
                              value={item?.gst}
                              onChange={(e) => handleChange(e, i)}
                              name="gst"
                              type="number"
                              placeholder="GST: 0%"
                            />
                          </section>
                          <section>
                            <input
                              required
                              value={item?.amount}
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
                              required
                              name="description"
                              id=""
                              cols="31"
                              rows="2"
                              placeholder="Description"
                              onChange={(e) => handleChange(e, i)}
                            ></textarea>
                          </section>
                          <span className={styles.remove_text}>
                            {itemCalc.length !== 1 && (
                              <span onClick={() => deleteItemCalc(i)}>
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
                      placeholder="Notes"
                    ></textarea>
                  </div>
                  <textarea
                    className={styles.terms}
                    name="terms_and_conditions"
                    onChange={handleChangeInput}
                    cols="30"
                    rows="5"
                    placeholder="Terms and Conditions"
                  ></textarea>
                </section>
                <section className={styles.right_footer}>
                  <div className={styles.adjustments}>
                    <section className={styles.adjustment_content}>
                      <p>Taxable Amount</p>
                      <input
                        className={styles.disabled}
                        required
                        type="number"
                        value={invoiceData?.taxable_amount}
                        placeholder="0"
                      />
                    </section>
                    {customer[0]?.billing_address?.place_of_supply?.toLowerCase() ==
                    company[0]?.address?.state?.toLowerCase() ? (
                      <>
                        <section className={styles.adjustment_content}>
                          <p>SGST 9%</p>
                          <input
                            required
                            type="number"
                            value={invoiceData?.SGST}
                            placeholder="0"
                          />
                        </section>
                        <section className={styles.adjustment_content}>
                          <p>CGST 9%</p>
                          <input
                            className={styles.disabled}
                            required
                            type="number"
                            value={invoiceData?.CGST}
                            placeholder="0"
                          />
                        </section>
                      </>
                    ) : (
                      <section className={styles.adjustment_content}>
                        <p>IGST 18%</p>
                        <input
                          className={styles.disabled}
                          required
                          type="number"
                          value={invoiceData?.IGST}
                          placeholder="0"
                        />
                      </section>
                    )}

                    <section className={styles.adjustment_content}>
                      <p>Adjustment</p>
                      <input
                        required
                        type="number"
                        step="any"
                        onChange={handleChangeInput}
                        name="adjusted_amount"
                        value={invoiceData?.adjusted_amount}
                        placeholder="0"
                      />
                    </section>
                    <section className={styles.adjustment_content}>
                      <p>Total</p>
                      <input
                        className={styles.disabled}
                        required
                        type="number"
                        value={invoiceData?.total_amount}
                        placeholder="0"
                      />
                    </section>
                  </div>
                  <div className={styles.for_Signature}>
                    <p>For {company[0]?.company_name?.toUpperCase()}</p>

                    <section className={styles.signature}>
                      <p>Authorised Signatory</p>
                    </section>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default DomesticInvoice;
