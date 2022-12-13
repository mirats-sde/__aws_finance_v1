import React, { useEffect, useState } from "react";
import styles from "../domestic_invoice/DomesticInvoice.module.css";
import { useInvoiceContext } from "../invoiceContext/InvoiceContext";
import { useCustomerContext } from "../../customers/customerContex/CustomerContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Header from "../../../components/header/Header";
import { UseGlobalContext } from "../../globalContext/GlobalContext";
const InternationalInvoice = () => {
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
  const { allCustomerData, disableBTN, setDisableBTN } = useCustomerContext();
  const { setSnackbar } = UseGlobalContext();
  const [invoiceData, setInvoiceData] = useState({
    total_amount: 0,
    adjusted_amount: 0,
    currency_type: "USD",
    status: "active",
    payment_status: "unpaid",
  });
  const navigate = useNavigate();
  const handleChange = (e, ind) => {
    const newArr = [...itemCalc];
    newArr[ind][e.target.name] = e.target.value;
    newArr[ind]["amount"] = Number(
      newArr[ind]?.quantity && newArr[ind]?.rate
        ? newArr[ind]?.quantity * newArr[ind]?.rate
        : 0
    )?.toFixed(2);
    setItemCalc(newArr);
  };

  // console.log(itemCalc);

  const addItemCalc = (e) => {
    e.preventDefault();

    setItemCalc([
      ...itemCalc,
      {
        item: "",
        quantity: "",
        rate: "",
        amount: 0,
        description: "",
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

  function gotopage(selval) {
    let value = selval.options[selval.selectedIndex].value;
    window.location.href = value;
  }

  const createInvoice = (e) => {
    e.preventDefault();
    let invoiceMatch = allInvoicesData?.filter(
      (data) => data?.company_id == invoiceData?.company_id
    );
    let invoiceNumberExists = invoiceMatch?.filter(
      (data) => data?.invoice_number == invoiceData?.invoice_number
    );
    if (!invoiceNumberExists?.length) {
      setDisableBTN(true);
      navigate("/invoices");
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
                fetchAllCompanyData(),
                fetchAllInvoicesData(),
                setDisableBTN(false),
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
  // shortcuts
  let company = allCompanyData?.filter(
    (comData) => comData?.company_id == invoiceData?.company_id
  );
  let invoice = allInvoicesData?.filter(
    (invData) => invData?.company_id == company[0]?.company_id
  );
  const gettingBiggerNum = (arr) => {
    let invoiceNumbersArr = [];
    arr.forEach((element) => {
      let prevSplit = element?.invoice_number?.split("-");
      invoiceNumbersArr.push(prevSplit[prevSplit.length - 1]);
    });
    let biggerNumber = invoiceNumbersArr.sort((a, b) => a - b);

    return Number(biggerNumber[biggerNumber?.length - 1]) + 1;
    // return invoiceNumbersArr;
  };
  let newPreviousInvoiceNumber = gettingBiggerNum(invoice);
  let prevInvoiceNumberSplit = invoice
    ?.reverse()
    ?.[invoice?.length - 1]?.invoice_number?.split("-");
  let prevInvoiceNumber =
    Number(prevInvoiceNumberSplit?.[prevInvoiceNumberSplit?.length - 1]) + 1;

  company[0]?.company_name == "Mirats Insights LLC"
    ? console.log("matched")
    : console.log("unmatched");

  useEffect(() => {
    let total_amount = itemCalc?.reduce((acc, cur) => {
      acc = acc + Number(cur?.amount);
      return acc;
    }, 0);
    setInvoiceData((prev) => ({
      ...prev,

      total_amount: invoiceData?.adjusted_amount
        ? Number(Number(invoiceData?.adjusted_amount) + total_amount)
        : total_amount,

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
      //: `${company[0]?.company_name
      //   ?.slice(0, 3)
      //   ?.toUpperCase()}${new Date()?.getFullYear()}-01`,
    }));
  }, [
    itemCalc,
    invoiceData?.adjusted_amount,
    allInvoicesData,
    invoiceData?.company_id,
    company[0]?.company_name,
  ]);
  // dropdown
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
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                International Invoice
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
                    <Link to="/create-domestic-invoice"> Domestic Invoice</Link>
                  </MenuItem>
                </span>
              </Menu>
              <button
                type="submit"
                disabled={disableBTN}
                // onClick={handleSubmit}
                className={styles.create_invoice}
              >
                Create Invoice
              </button>
            </div>
            <div className={styles.right_header}>
              <span>Sale By</span>
              <select
                onChange={handleChangeInput}
                name="sale_by"
                id="creater_name"
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
                      <option value="" selected>
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
                        onChange={(e) =>
                          setInvoiceData((prev) => ({
                            ...prev,
                            invoice_number: e.target.value,
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
                        onChange={handleChangeInput}
                      />
                      <span>Invoice Date</span>
                    </section>
                    <section className={styles.date}>
                      <input
                        type="date"
                        name="invoice_dueDate"
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
                        value={invoiceData?.currency_type}
                        id=""
                        required
                      >
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
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
                          onChange={handleChangeInput}
                        />
                        <span>Enter Current {invoiceData?.currency_type}</span>
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
                      required
                      onChange={handleChangeInput}
                    >
                      <option value="" selected>
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
                          {/* {console.log(add)} */}

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
                  {itemCalc.map((item, i) => {
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
                              required
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
                      <p>Adjustment</p>
                      <input
                        type="number"
                        onChange={(e) =>
                          setInvoiceData((prev) => ({
                            ...prev,
                            [e.target.name]: Number(e.target.value),
                          }))
                        }
                        name="adjusted_amount"
                        step="any"
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
                    <p>For {company[0]?.company_name}</p>

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

export default InternationalInvoice;
