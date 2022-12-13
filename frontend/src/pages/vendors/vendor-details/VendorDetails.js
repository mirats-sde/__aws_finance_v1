import React, { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useCustomerContext } from "../customerContex/CustomerContext";
import styles from "./CustomerDetails.module.css";
import { useInvoiceContext } from "../../invoices/invoiceContext/InvoiceContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Select from "react-select";
import countryList from "react-select-country-list";
import cx from "classnames";
import axios from "axios";
import Header from "../../../components/header/Header";
import { ImBin } from "react-icons/im";
import { UseGlobalContext } from "../../globalContext/GlobalContext";
const addressTabData = [
  {
    id: 1,
    tabName: "Biling Address",
  },
  {
    id: 2,
    tabName: "Shipping Address",
  },
];
const tabData = [
  {
    id: 1,
    tabName: "Information",
  },
  {
    id: 2,
    tabName: "Banking & Taxes",
  },
];
const titleData = [
  "Title",
  "Mr",
  "Mrs",
  "Miss",
  "Ms",
  "Dr",
  "M/s",
  "Prof",
  "CA",
  "CS",
  "CWA",
  "ADV",
  "ER",
  "CMA",
];
const typeOfCustomer = [
  "Individual",
  "Proprietorship",
  "Partnership",
  "Hindu Undivided Family",
  "Private Limited Company",
  "Public Limited Company",
  "One Person Company",
  "Society/Club/Trust/Association of Persons",
  "Government Department",
  "Public Sector Undertaking",
  "Unlimited Company",
  "Limited Liability Partnership",
  "Local Authority",
  "Statutory Body",
  "Foreign Limited Liability Partnership",
  "Foreign Company Registered (in India)",
  "Others",
];
const stateList = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Andaman and Nicobar Islands",
  "Bihar",
  "Chhattisgarh",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Pondicherry",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
const VendorDetails = () => {
  const {
    allCustomerData,
    handleChange,
    customerInputData,
    setCustomerInputData,
    customerBillingAddressChange,
    customerShippingAddressChange,
    getAllCustomerData,
  } = useCustomerContext();

  const { customerID } = useParams();
  const { allInvoicesData, submitAddCustomer } = useInvoiceContext();
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  let customer = allCustomerData?.filter(
    (cust) => cust?.customer_id == customerID
  );
  let invoice = allInvoicesData?.filter(
    (iData) => iData?.customer_id == customerID
  );
  const getCorrectPage = (tab) => {
    switch (tab) {
      case "Information":
        return <Information />;
      case "Banking & Taxes":
        return <BankingTaxes />;
      default:
    }
  };
  // modal style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: 700,
    overflowY: "scroll",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setCustomerInputData(...customer);
  };
  const handleClose = () => {
    setOpen(false);
    setCustomerInputData(...customer);
  };
  let [tab, setTab] = useState("Information");
  const { setSnackbar } = UseGlobalContext();
  const updateCustomer = () => {
    console.log("updating");
    axios
      .put(
        `https://finance.miratsoneservices.com/api/update-customer/${customerID}`,
        customerInputData
      )
      .then((data) => {
        console.log("basic customer updated");
        axios
          .put(
            `https://finance.miratsoneservices.com/api/update-shipping_address/${customerID}`,
            customerInputData?.shipping_address
          )
          .then((data) => console.log("customer shipping address updated"))
          .catch((err) =>
            console.log("error in customer shipping address" + err)
          );
        axios
          .put(
            `https://finance.miratsoneservices.com/api/update-billing-address/${customerID}`,
            customerInputData?.billing_address
          )
          .then((data) => console.log("customer shipping address updated"))
          .catch((err) =>
            console.log("error in customer shipping address" + err)
          );
        axios
          .put(
            `https://finance.miratsoneservices.com/api/update-customer-bank-details/${customerID}`,
            customerInputData?.customer_bank_detail
          )
          .then((data) => console.log("customer bank details updated"))
          .catch((err) => console.log("error in customer bank details" + err));
        axios
          .put(
            `https://finance.miratsoneservices.com/api/update-tax-information/${customerID}`,
            customerInputData?.tax_information
          )
          .then((data) => {
            console.log("customer tax details updated");
            getAllCustomerData();
            setSnackbar({
              open: true,
              severity: "success",
              msg: "Customer Updated Successfully!",
            });
          })
          .catch((err) => console.log("error in customer tax details" + err));
      })
      .catch((err) => console.log("error in basic customer " + err));

    handleClose();
  };
  console.log(customer);
  console.log(invoice);
  const navigate = useNavigate();
  function deleteCompany(data) {
    console.log(data);
    axios
      .delete(
        `https://finance.miratsoneservices.com/api/delete-customer/${data?.customer_id}`
      )
      .then(
        (res) => navigate("/clients"),
        getAllCustomerData(),
        setSnackbar({
          open: true,
          severity: "error",
          msg: "Customer deleted Successfully!",
        })
      )
      .catch((err) => console.log(err));
  }
  // mui second
  const Secondtyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Header />
      <div className={styles.mainCustomerDetailsContainer}>
        <div className={styles.customerContentContainer}>
          <div className={styles.customerLeftContainer}>
            {customer?.map((custData, ind) => (
              <div className={styles.customerLeftContent}>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>Name</h3>
                    <h3 onClick={handleOpen}>
                      {custData?.company_name
                        ? custData?.company_name
                        : "ADD NAME"}
                    </h3>
                  </div>
                  <span className={styles.deleteBTN}>
                    <ImBin
                      size={20}
                      style={{ cursor: "pointer" }}
                      onClick={() => setConfirmDeleteModal(true)}
                    />
                  </span>
                </section>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>Email</h3>
                    <h3 onClick={handleOpen}>
                      {custData?.account_email_id
                        ? custData?.account_email_id
                        : "ADD EMAIL"}
                    </h3>
                  </div>
                </section>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>Mobile</h3>
                    <h3 onClick={handleOpen}>
                      {custData?.mobile_number
                        ? custData?.mobile_number
                        : "ADD MOBILE"}
                    </h3>
                  </div>
                </section>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>GST</h3>
                    <h3 onClick={handleOpen}>
                      {custData?.tax_id_number
                        ? custData?.tax_id_number
                        : "Add GST"}
                    </h3>
                  </div>
                </section>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>Entity</h3>
                    <h3 onClick={handleOpen}>
                      {custData?.type_of_business
                        ? custData?.type_of_business
                        : "ADD ENTITY"}
                    </h3>
                  </div>
                </section>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>Business Name</h3>
                    <h3 onClick={handleOpen}>
                      {custData?.customer_name
                        ? custData?.customer_name
                        : "ADD BUSINESS NAME"}
                    </h3>
                  </div>
                </section>

                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>PAN</h3>
                    <h3 onClick={handleOpen}>
                      {custData?.tax_information?.PAN_number
                        ? custData?.tax_information?.PAN_number
                        : "ADD PAN"}
                    </h3>
                  </div>
                </section>

                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>Billing Address</h3>
                    <h3 onClick={handleOpen} style={{ wordBreak: "break-all" }}>
                      {custData?.billing_address ? (
                        <>
                          {custData?.billing_address?.street1} <br />
                          {custData?.billing_address?.city} ,{" "}
                          {custData?.billing_address?.place_of_supply}
                        </>
                      ) : (
                        <p>Add Billing Address</p>
                      )}
                    </h3>
                  </div>
                </section>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>Shipping Address</h3>
                    <h3 onClick={handleOpen}>
                      {" "}
                      {custData?.shipping_address?.street1 ||
                      custData?.shipping_address?.city ? (
                        <>
                          {custData?.shipping_address?.street1} <br />
                          {custData?.shipping_address?.city} ,{" "}
                          {custData?.shipping_address?.place_of_supply}
                        </>
                      ) : (
                        <p>Add Shipping Address</p>
                      )}
                    </h3>
                  </div>
                </section>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>Bank</h3>
                    <h3 onClick={handleOpen}>
                      {" "}
                      {custData?.customer_bank_detail?.bank_name
                        ? custData?.customer_bank_detail?.bank_name
                        : "ADD BANK "}{" "}
                    </h3>
                  </div>
                </section>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>UPI ID</h3>
                    <h3 onClick={handleOpen}>
                      {custData?.customer_bank_detail?.UPI_id
                        ? custData?.customer_bank_detail?.UPI_id
                        : "ADD UPI"}
                    </h3>
                  </div>
                </section>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>TAN</h3>
                    <h3 onClick={handleOpen}>
                      {custData?.tax_information?.TAN_number
                        ? custData?.tax_information?.TAN_number
                        : "ADD TAN"}
                    </h3>
                  </div>
                </section>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>TDS Applicable</h3>
                    <h3 onClick={handleOpen}>
                      {custData?.tax_information?.TDS_percentage
                        ? `${custData?.tax_information?.TDS_percentage}%`
                        : "ADD TDS"}
                    </h3>
                  </div>
                </section>

                {/* <section className={styles.leftRow}>
                <div className={styles.border}>
                  <h3>Status</h3>
                  <h3>{custData?.tax_information?.term_of_payment}</h3>
                </div>
              </section> */}
                {/* <section className={styles.leftRow}>
                <div className={styles.border}>
                  <h3>Created by</h3>
                  <h3>Business Name</h3>
                </div>
              </section> */}
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>Created on</h3>
                    <h3>{new Date(custData?.createdAt)?.toDateString()}</h3>
                  </div>
                </section>
                <Modal
                  open={confirmDeleteModal}
                  onClose={(e) => setConfirmDeleteModal(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={Secondtyle}>
                    <div className={styles.modalContainer}>
                      <h3>Do You Want To Delete {custData?.company_name} ?</h3>
                      <div className={styles.BTNConatainer}>
                        <button
                          className={styles.downloadBillBTN}
                          onClick={(e) => setConfirmDeleteModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className={styles.downloadBillBTN}
                          onClick={() => deleteCompany(custData)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </div>
            ))}
          </div>
          <div className={styles.customerRightContainer}>
            <div className={styles.customerLeftContent}>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Number</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Received Amount</th>
                    <th>TDS</th>
                    <th>Bank Charges </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice?.map((data, i) => (
                    <tr key={i}>
                      <td>{data?.invoice_date}</td>
                      <td>
                        {/* <Link
                        to={data?.invoiceNum}
                        className={styles.invoiceLink}
                      > */}
                        Invoice #{data?.invoice_number}
                        {/* </Link> */}
                      </td>
                      <td>₹{data?.total_amount}</td>
                      <td>{data?.creditAmt ? data?.creditAmt : "-"}</td>
                      <td>
                        {data?.received_amount
                          ? `₹${data?.received_amount}`
                          : "-"}
                      </td>
                      <td>{data?.tds ? `₹${data?.tds}` : "-"}</td>
                      <td>
                        {data?.bank_charges ? `₹${data?.bank_charges}` : "-"}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className={styles.center_bold} colSpan={2}>
                      Total
                    </td>

                    <td className={styles.bold}>
                      ₹
                      {invoice?.reduce(
                        (acc, cur) => (acc = acc + Number(cur?.total_amount)),
                        0
                      )}
                    </td>
                    <td style={{ textAlign: "start" }}>-</td>
                    <td>
                      ₹
                      {invoice?.reduce(
                        (acc, cur) =>
                          (acc = acc + Number(cur?.received_amount)),
                        0
                      )}
                    </td>
                    <td>
                      ₹
                      {invoice?.reduce(
                        (acc, cur) => (acc = acc + Number(cur?.tds)),
                        0
                      )}
                    </td>
                    <td>
                      ₹
                      {invoice?.reduce(
                        (acc, cur) => (acc = acc + Number(cur?.bank_charges)),
                        0
                      )}
                    </td>
                  </tr>
                  {/* <tr>
                  <td colSpan={2}></td>
                  <td className={styles.bold}>Balance</td>
                  <td className={styles.bold}>
                    {invoice?.reduce(
                      (acc, cur) =>
                        (acc =
                          acc +
                          (Number(cur?.total_amount) -
                            Number(
                              cur?.credit_amount ? cur?.credit_amount : 0
                            ))),
                      0
                    )}
                  </td>
                </tr> */}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className={styles.add_customer_container}>
                <div className={styles.customer_onboarding}>
                  <p className={styles.onboarding_text}>Update Customer</p>
                  {/* tabs */}
                  <div className={styles.tabContainer}>
                    {tabData.map((i) => {
                      return (
                        <>
                          <h2
                            // className={`inactiveTab ${tab === i.tabName && "activetab"}  `}
                            className={cx(styles.tablight, {
                              [styles.tabactive]:
                                tab === i.tabName ? styles.tabactive : "",
                            })}
                            onClick={() => {
                              setTab(i.tabName);
                            }}
                          >
                            {i.tabName}
                          </h2>
                        </>
                      );
                    })}
                  </div>
                  <div className={styles.actionBtns}>
                    <button onClick={updateCustomer}>
                      <span>+</span> Update
                    </button>
                  </div>
                </div>

                <div className={styles.tabComponent}>{getCorrectPage(tab)}</div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
};
const Information = () => {
  let [addressTab, setAddressTab] = useState("Biling Address");
  const { setCustomerInputData, customerInputData } = useCustomerContext();
  const getCorrectPage = (addressTab) => {
    switch (addressTab) {
      case "Biling Address":
        return <BilingAddress />;
      case "Shipping Address":
        return <ShippingAddress />;
      default:
    }
  };
  const customerInfoChange = (e) => {
    setCustomerInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <div className={styles.customer_information_container}>
        <div className={styles.customer_information}>
          <section className={styles.left_inputs}>
            <div className={styles.select_with_input}>
              <select
                name="title"
                value={customerInputData?.title}
                onChange={customerInfoChange}
              >
                <option value="" selected disabled>
                  Select Title
                </option>
                {titleData.map((data) => {
                  return <option value={data}>{data}</option>;
                })}
              </select>
              <input
                type="text"
                placeholder="Customer Name *"
                name="customer_name"
                // value={customerInputData?.customer_name}
                onChange={(e) =>
                  setCustomerInputData((prev) => ({
                    ...prev,
                    [e.target.name]: `${prev?.title} ${e.target.value}`,
                  }))
                }
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="number"
                placeholder="Mobile Number"
                name="mobile_number"
                value={customerInputData?.mobile_number}
                onChange={customerInfoChange}
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Customer GSTIN"
                name="tax_id_number"
                value={customerInputData?.tax_id_number}
                onChange={customerInfoChange}
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Company Name"
                name="company_name"
                value={customerInputData?.company_name}
                onChange={customerInfoChange}
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="number"
                placeholder="Phone Number"
                name="phone_number"
                value={customerInputData?.phone_number}
                onChange={customerInfoChange}
              />
            </div>
          </section>
          <section className={styles.right_inputs}>
            <div className={styles.input_group}>
              <select
                name="type_of_business"
                value={customerInputData?.type_of_business}
                onChange={customerInfoChange}
              >
                <option value="" selected disabled>
                  Select Business Type
                </option>
                {typeOfCustomer.map((type) => {
                  return <option value={type}>{type}</option>;
                })}
              </select>
            </div>
            <div className={styles.input_group}>
              <input
                type="email"
                placeholder="Email"
                name="account_email_id"
                value={customerInputData?.account_email_id}
                onChange={customerInfoChange}
              />
            </div>
            <div className={styles.input_group}>
              <section className={styles.gst}>
                <input
                  type="text"
                  placeholder="GST Registered Name"
                  name="GST_registered_name"
                  value={customerInputData?.GST_registered_name}
                  onChange={customerInfoChange}
                />{" "}
                {/* <a href="/">Filing Status</a> */}
              </section>
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Display Name"
                value={customerInputData?.customer_name}
              />
            </div>
          </section>
        </div>

        {/* tabs */}
        <div className={styles.tabContainer}>
          {addressTabData.map((i) => {
            return (
              <>
                <h2
                  // className={`inactiveTab ${tab === i.tabName && "activetab"}  `}

                  className={cx(styles.tablight, {
                    [styles.tabactive]:
                      addressTab === i.tabName ? styles.tabactive : "",
                  })}
                  onClick={() => {
                    setAddressTab(i.tabName);
                  }}
                >
                  {i.tabName}
                </h2>
              </>
            );
          })}
        </div>
        <div className={styles.tabComponent}>{getCorrectPage(addressTab)}</div>
      </div>
    </>
  );
};

const BankingTaxes = () => {
  const { setCustomerInputData, customerInputData } = useCustomerContext();
  const handleCustomerBankingChange = (e) => {
    setCustomerInputData((prev) => ({
      ...prev,
      customer_bank_detail: {
        ...prev?.customer_bank_detail,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const handleCustomerTaxChange = (e) => {
    setCustomerInputData((prev) => ({
      ...prev,
      tax_information: {
        ...prev?.tax_information,
        [e.target.name]: e.target.value,
      },
    }));
  };
  return (
    <>
      <div className={styles.banking_taxes}>
        <div className={styles.customer_information}>
          <section className={styles.left_inputs}>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Account Name"
                name="account_name"
                onChange={handleCustomerBankingChange}
                value={customerInputData?.customer_bank_detail?.account_name}
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="IFSC Code"
                name="IFSC_code"
                onChange={handleCustomerBankingChange}
                value={customerInputData?.customer_bank_detail?.IFSC_code}
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Bank Name"
                name="bank_name"
                onChange={handleCustomerBankingChange}
                value={customerInputData?.customer_bank_detail?.bank_name}
              />
            </div>
          </section>
          <section className={styles.right_inputs}>
            <div className={styles.input_group}>
              <input
                type="number"
                placeholder="Account Number"
                name="account_number"
                onChange={handleCustomerBankingChange}
                value={customerInputData?.customer_bank_detail?.account_number}
              />
            </div>
            <div className={styles.input_group}>
              <select
                name="account_type"
                onChange={handleCustomerBankingChange}
                value={customerInputData?.customer_bank_detail?.account_type}
              >
                <option value="" selected disabled>
                  Select Account Type
                </option>
                <option value="Savings Account">Savings Account</option>
                <option value="Current Account">Current Account</option>
                <option value="Overdraft Account">Overdraft Account</option>
              </select>
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Branch Name"
                name="branch_name"
                value={customerInputData?.customer_bank_detail?.branch_name}
                onChange={handleCustomerBankingChange}
              />
            </div>
          </section>
        </div>

        <div className={styles.tax_information}>
          <h2 className={styles.tax_text}>Tax Information</h2>
          <div className={styles.customer_information}>
            <section className={styles.left_inputs}>
              <div className={styles.input_group}>
                <input
                  type="text"
                  placeholder="PAN"
                  name="PAN_number"
                  value={customerInputData?.tax_information?.PAN_number}
                  onChange={handleCustomerTaxChange}
                />
              </div>
              <div className={styles.input_group}>
                {/* <select      name="PAN_number"
                  onChange={handleCustomerTaxChange}>
                  <option value="">TDS Not Applicable</option>
                </select> */}
                <input
                  type="text"
                  placeholder="TDS Percentage"
                  name="TDS_percentage"
                  value={customerInputData?.tax_information?.TDS_percentage}
                  onChange={handleCustomerTaxChange}
                />
              </div>
              <div className={styles.input_group}>
                {/* <select name="" id=""      onChange={handleCustomerTaxChange}>
                  <option value="">- Bank Name -</option>
                </select> */}
                <input
                  type="text"
                  placeholder="bank_name"
                  name="bank_name"
                  value={customerInputData?.tax_information?.bank_name}
                  onChange={handleCustomerTaxChange}
                />
              </div>
              {/* <div className={styles.input_group}>
                <select name="" id="">
                  <option value="">Not Applicable</option>
                </select>
              </div> */}
            </section>
            <section className={styles.right_inputs}>
              <div className={styles.input_group}>
                <input
                  type="text"
                  placeholder="TAN"
                  name="TAN_number"
                  onChange={handleCustomerTaxChange}
                  value={customerInputData?.tax_information?.TAN_number}
                />
              </div>
              <div className={styles.input_group}>
                <select
                  name="currency_type"
                  onChange={handleCustomerTaxChange}
                  value={customerInputData?.tax_information?.currency_type}
                >
                  <option value="" disabled selected>
                    Select Currency
                  </option>
                  <option value="Indian Rupee">Indian Rupee</option>
                  <option value="USD">USD</option>
                  <option value="Euro">Euro</option>
                </select>
              </div>
              {/* <div className={styles.input_group}>
                <select name="" id="">
                  <option value="no">NO</option>
                  <option value="yes">YES</option>
                </select>
              </div> */}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

const BilingAddress = () => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const {
    handleChange,
    customerInputData,
    setCustomerInputData,
    customerBillingAddressChange,
    customerShippingAddressChange,
  } = useCustomerContext();
  const changeHandler = (value) => {
    setValue(value);
    setCustomerInputData((prev) => ({
      ...prev,
      billing_address: {
        ...prev?.billing_address,
        country: value.label,
      },
    }));
    console.log(value);
  };

  const [selected, setSelected] = useState("");
  console.log(customerInputData);
  const handleCountrySelect = (e) => {
    setSelected(e.target.value);
  };
  return (
    <>
      <div className={styles.biling_address_container}>
        <div className={styles.customer_information}>
          <section className={styles.left_inputs}>
            <div className={styles.input_group}>
              <input
                type="text"
                name="street1"
                placeholder="Address Line 1"
                value={customerInputData?.billing_address?.street1}
                onChange={customerBillingAddressChange}
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="City"
                name="city"
                onChange={customerBillingAddressChange}
                value={customerInputData?.billing_address?.city}
              />
            </div>
            <div className={styles.input_group}>
              {value?.label !== "India" ? (
                <input
                  name="place_of_supply"
                  type="text"
                  onChange={customerBillingAddressChange}
                  value={customerInputData?.billing_address?.place_of_supply}
                ></input>
              ) : (
                <select
                  name="place_of_supply"
                  value={customerInputData?.billing_address?.place_of_supply}
                  onChange={customerBillingAddressChange}
                >
                  {stateList.map((list) => {
                    return <option value={list}>{list}</option>;
                  })}
                </select>
              )}
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Branch Name"
                name="branch_name"
                value={customerInputData?.billing_address?.branch_name}
                onChange={customerBillingAddressChange}
              />
            </div>
          </section>
          <section className={styles.right_inputs}>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Address Line 2"
                name="street2"
                value={customerInputData?.billing_address?.street2}
                onChange={customerBillingAddressChange}
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="number"
                placeholder="Pincode"
                name="zip_code"
                value={customerInputData?.billing_address?.zip_code}
                onChange={customerBillingAddressChange}
              />
            </div>
            <div className={styles.input_group}>
              {/* <select name="" id="">
                <option value="">INDIA</option>
              </select> */}
              <Select
                options={options}
                value={value}
                onChange={changeHandler}
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="GSTIN"
                name="tax_id_number"
                value={customerInputData?.tax_id_number}
                onChange={customerBillingAddressChange}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

const ShippingAddress = () => {
  const [checked, setChecked] = useState(true);
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  // console.log(checked);
  const {
    handleChange,
    customerInputData,
    setCustomerInputData,
    customerBillingAddressChange,
    customerShippingAddressChange,
  } = useCustomerContext();
  console.log(customerInputData);
  const changeHandler = (value) => {
    setValue(value);
    setCustomerInputData((prev) => ({
      ...prev,
      shipping_address: {
        ...prev?.shipping_address,
        country: value.label,
      },
    }));
    console.log(value);
  };
  return (
    <>
      <div className={styles.biling_address_container}>
        <section className={styles.check}>
          <input
            type="checkbox"
            onChange={() => setChecked(!checked)}
            checked={checked}
          />
          <label htmlFor=""> Shipping address is same as billing address</label>
          {checked ? (
            ""
          ) : (
            <div className={styles.biling_address_container}>
              <div className={styles.customer_information}>
                <section className={styles.left_inputs}>
                  <div className={styles.input_group}>
                    <input
                      type="text"
                      name="street1"
                      placeholder="Address Line 1"
                      value={customerInputData?.shipping_address?.street1}
                      onChange={customerShippingAddressChange}
                    />
                  </div>
                  <div className={styles.input_group}>
                    <input
                      type="text"
                      placeholder="City"
                      name="city"
                      value={customerInputData?.shipping_address?.city}
                      onChange={customerShippingAddressChange}
                    />
                  </div>
                  <div className={styles.input_group}>
                    {value?.label !== "India" ? (
                      <input
                        name="place_of_supply"
                        value={
                          customerInputData?.shipping_address?.place_of_supply
                        }
                        type="text"
                        onChange={customerShippingAddressChange}
                      ></input>
                    ) : (
                      <select
                        name="place_of_supply"
                        value={
                          customerInputData?.shipping_address?.place_of_supply
                        }
                        onChange={customerShippingAddressChange}
                      >
                        {stateList.map((list) => {
                          return <option value={list}>{list}</option>;
                        })}
                      </select>
                    )}
                  </div>
                  <div className={styles.input_group}>
                    <input
                      type="text"
                      placeholder="Branch Name"
                      name="Branch Name"
                      value={customerInputData?.shipping_address?.branch_name}
                      onChange={customerShippingAddressChange}
                    />
                  </div>
                </section>
                <section className={styles.right_inputs}>
                  <div className={styles.input_group}>
                    <input
                      type="text"
                      placeholder="Address Line 2"
                      name="street2"
                      value={customerInputData?.shipping_address?.street2}
                      onChange={customerShippingAddressChange}
                    />
                  </div>
                  <div className={styles.input_group}>
                    <input
                      type="number"
                      placeholder="Pincode"
                      name="zip_code"
                      value={customerInputData?.shipping_address?.zip_code}
                      onChange={customerShippingAddressChange}
                    />
                  </div>
                  <div className={styles.input_group}>
                    {/* <select name="" id="">
                    <option value="">INDIA</option>
                  </select> */}
                    <Select
                      options={options}
                      value={value}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className={styles.input_group}>
                    <input
                      type="text"
                      placeholder="GSTIN"
                      name="tax_id_number"
                      value={
                        customerInputData?.customer_bank_detail?.tax_id_number
                      }
                      onChange={customerShippingAddressChange}
                    />
                  </div>
                </section>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default VendorDetails;
