import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCustomerContext } from "../customers/customerContex/CustomerContext";
import { useInvoiceContext } from "../invoices/invoiceContext/InvoiceContext";
import styles from "./vendorUserSide.module.css";
import loader from "../../assets/loader.gif";
import { styled } from "@mui/system";
import miratsLoGo from "../../assets/miratsLogo.png";
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from "@mui/base/TablePaginationUnstyled";
import Header from "../../components/header/Header";
import userProfilePic from "../../assets/userProfilePic.png";
import { useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import cx from "classnames";
import { GoCreditCard } from "react-icons/go";
import { Email } from "@mui/icons-material";
import GooglePayButton from "@google-pay/button-react";
import { MdFileDownload } from "react-icons/md";
import { utils, writeFile } from "xlsx";
import CryptoJS from "crypto-js";
import { UseGlobalContext } from "../globalContext/GlobalContext";
const blue = {
  200: "#A5D8FF",
  400: "#3399FF",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const CustomTablePagination = styled(TablePaginationUnstyled)(
  ({ theme }) => `
  & .${classes.spacer} {
    display: none;
  }

  & .${classes.toolbar}  {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
        padding: 0.5em 0em;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.select}{
    padding: 0.1em 1em;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
        rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
        border: none;
        font-weight: 700;
        font-size: 14px;
        color: #484848;
        outline: none;
  }

    &:hover {
      background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    }

    &:focus {
      outline: 1px solid ${
        theme.palette.mode === "dark" ? blue[400] : blue[200]
      };
    }
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.5rem;
    padding: 0.5em;
    border: none;
  }

  & .${classes.actions} > button {
    padding: 0.1em 1em;
    border: 1px solid #828282;
    cursor: pointer;
    background-color: white;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border: none;
  }
  `
);
// *! Do not touch this else the modal style will get affected
//  *? it has multiple component for table switch
const myModalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const myPaymentModalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 200,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const UnpaidInvoice = () => {
  let { currentUserId } = useParams();
  //*TODO Context states
  let { allInvoicesData } = useInvoiceContext();
  const { allCustomerData } = useCustomerContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = useState({});
  const decryptText = (encryptText) => {
    var reb64 = CryptoJS.enc.Hex.parse(encryptText);
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, "Mirats");
    var plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
  };
  const handleOpen = (e, data) => {
    setOpen(true);
    setModalData(data);
  };
  const handleClose = () => {
    setOpen(false);

    setModalData({});
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleExportToExcel = (e) => {
    var elt = document.getElementById("table-to-xls-DATA");
    var wb = utils.table_to_book(elt, { sheet: "Sheet JS" });
    return writeFile(wb, `UnpaidInvoice.xlsx`);
  };
  console.log(modalData);
  return (
    <>
      <span className={styles.downloadBTN} onClick={handleExportToExcel}>
        <MdFileDownload size={20} /> Download Statement
      </span>

      <table aria-label="custom pagination table" id="table-to-xls-DATA">
        <thead>
          <tr>
            <th>
              Date <p>Invoice #</p>
            </th>

            <th>
              Amount
              <p> Total due</p>
            </th>
            <th>Status</th>
            <th>Age</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? allInvoicesData
                ?.filter(
                  (uData) =>
                    uData?.customer_id == decryptText(String(currentUserId))
                )
                ?.filter((status) => status?.payment_status == "unpaid")
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : allInvoicesData
          )
            ?.filter(
              (uData) =>
                uData?.customer_id == decryptText(String(currentUserId))
            )
            ?.filter((status) => status?.payment_status == "unpaid")
            ?.map((data, ind) => (
              <tr
                key={ind}
                className={
                  data?.status?.toLowerCase() === "canceled" ||
                  data?.status?.toLowerCase() === "cancelled"
                    ? styles.cancelledRow
                    : ""
                }
              >
                {allCustomerData
                  ?.filter((cust) => cust?.customer_id == data?.customer_id)
                  ?.map((elm, ind) => (
                    <>
                      <td>
                        {/* <h1>{data?.sale_by}</h1> */}

                        {data?.invoice_date}

                        <p>{data?.invoice_number}</p>
                      </td>
                      <td>
                        <p className={styles.light}>
                          {data?.currency_type ? data?.currency_type : "INR"}{" "}
                          {data?.total_amount?.toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <p>
                          <span>{data?.payment_status?.toUpperCase()}</span>
                        </p>
                      </td>
                      <td className={styles.warning}>
                        <Link to={data?.invoice_number}>
                          {/* {elm?.payment_status
                                ? elm?.payment_status
                                : "unpaid"} */}
                          {/* {data?.payment_status === "paid"
                                ? "PAID"
                                : data?.currency_type
                                ? `${data?.currency_type} ${data?.total_amount} not paid`
                                : "INR"} */}
                        </Link>

                        {data?.payment_status === "paid" ? (
                          ""
                        ) : (
                          <p>
                            {/* Overdue by{" "} */}
                            {Math.round(
                              Number(
                                new Date()?.getTime() -
                                  new Date(data?.invoice_date)?.getTime()
                              ) /
                                (1000 * 3600 * 24)
                            )}{" "}
                            days
                          </p>
                        )}
                      </td>
                      <td>
                        <span
                          className={
                            data?.status?.toLowerCase() === "active"
                              ? styles.active
                              : styles.canceled
                          }
                        >
                          {data?.status}
                        </span>
                      </td>
                      <td onClick={(e) => handleOpen(e, data)}>
                        <GoCreditCard size={20} />
                      </td>
                    </>
                  ))}
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={
                allInvoicesData
                  ?.filter(
                    (uData) =>
                      uData?.customer_id == decryptText(String(currentUserId))
                  )
                  ?.filter((status) => status?.payment_status == "unpaid")
                  ?.length
              }
              rowsPerPage={rowsPerPage}
              page={page}
              componentsProps={{
                select: {
                  "aria-label": "rows per page",
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={myPaymentModalStyles}>
          <h2 style={{ textAlign: "center" }}>Pay Invoice</h2>
          <section className={styles.modalPaymentContainer}>
            <section className={styles.leftSection}>
              <p>Invoice</p>
              <h4>{modalData?.invoice_number}</h4>
            </section>
            <section>
              <p>Amount Due</p>
              <h4>
                {modalData?.currency_type ? modalData?.currency_type : "INR"}{" "}
                {modalData?.total_amount}
              </h4>
            </section>
          </section>
          <div className={styles.modalPayButton}>
            <GooglePayButton
              environment="TEST"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: "CARD",
                    parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                    tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: {
                        gateway: "example",
                        gatewayMerchantId: "exampleGatewayMerchantId",
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: "12345678901234567890",
                  merchantName: "Demo Merchant",
                },
                transactionInfo: {
                  totalPriceStatus: "FINAL",
                  totalPriceLabel: "Total",
                  totalPrice: String(
                    modalData?.currency_type
                      ? modalData?.current_USD_price * modalData?.total_amount
                      : modalData?.total_amount
                  ),
                  currencyCode: "INR",
                  countryCode: "IN",
                },
                shippingAddressRequired: false,
                callbackIntents: ["PAYMENT_AUTHORIZATION"],
              }}
              onLoadPaymentData={(paymentRequest) => {
                console.log("load payment data", paymentRequest);
              }}
              onPaymentAuthorized={(paymentData) => {
                console.log(paymentData);
                return { transactionState: "SUCCESS" };
              }}
              existingPaymentMethodRequired="false"
              buttonColor="white"
              buttonType="pay"
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};
const PaidInvoice = () => {
  let { currentUserId } = useParams();
  const [contactsData, setContactsData] = useState([]);
  let { allInvoicesData } = useInvoiceContext();
  const { allCustomerData } = useCustomerContext();
  const [page, setPage] = useState(0);
  const [searchQuery, setsearchQuery] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [filters, setFilters] = useState({});
  const decryptText = (encryptText) => {
    var reb64 = CryptoJS.enc.Hex.parse(encryptText);
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, "Mirats");
    var plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
  };
  // how to convert json data to csv file ?

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleExportToExcel = (e) => {
    var elt = document.getElementById("table-to-xls-DATA-unpaid");
    var wb = utils.table_to_book(elt, { sheet: "Sheet JS" });
    return writeFile(wb, `PaidInvoice.xlsx`);
  };
  return (
    <>
      <span className={styles.downloadBTN} onClick={handleExportToExcel}>
        <MdFileDownload
          size={20}
          onClick={handleExportToExcel}
          fontWeight="400"
        />
        Download Statement
      </span>
      <table aria-label="custom pagination table" id="table-to-xls-DATA-unpaid">
        <thead>
          <tr>
            <th>
              Date <p>Invoice #</p>
            </th>

            <th>
              Amount
              <p> Total due</p>
            </th>
            <th>Status</th>
            <th>Age</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? allInvoicesData
                ?.filter(
                  (uData) =>
                    uData?.customer_id == decryptText(String(currentUserId))
                )
                ?.filter((status) => status?.payment_status == "paid")
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : allInvoicesData
          )
            ?.filter(
              (uData) =>
                uData?.customer_id == decryptText(String(currentUserId))
            )
            ?.filter((status) => status?.payment_status == "paid")
            ?.map((data, ind) => (
              <tr
                key={ind}
                className={
                  data?.status?.toLowerCase() === "canceled" ||
                  data?.status?.toLowerCase() === "cancelled"
                    ? styles.cancelledRow
                    : ""
                }
              >
                {allCustomerData
                  ?.filter((cust) => cust?.customer_id == data?.customer_id)

                  ?.filter((sData) =>
                    !filters?.payment_status
                      ? sData
                      : data?.payment_status?.toLowerCase() ==
                        filters?.payment_status?.toLowerCase()
                  )
                  ?.map((elm, ind) => (
                    <>
                      <td>
                        {/* <h1>{data?.sale_by}</h1> */}

                        {data?.invoice_date}

                        <p>{data?.invoice_number}</p>
                      </td>
                      <td>
                        <p className={styles.light}>
                          {data?.currency_type ? data?.currency_type : "INR"}{" "}
                          {data?.total_amount?.toFixed(2)}
                        </p>
                      </td>
                      <td>
                        <p>
                          <span>{data?.payment_status}</span>
                        </p>
                      </td>
                      <td className={styles.warning}>
                        <Link to={data?.invoice_number}>
                          {/* {elm?.payment_status
                                ? elm?.payment_status
                                : "unpaid"} */}
                          {/* {data?.payment_status === "paid"
                                ? "PAID"
                                : data?.currency_type
                                ? `${data?.currency_type} ${data?.total_amount} not paid`
                                : "INR"} */}
                        </Link>

                        {data?.payment_status === "paid" ? (
                          ""
                        ) : (
                          <p>
                            Overdue by{" "}
                            {Math.round(
                              Number(
                                new Date()?.getTime() -
                                  new Date(data?.invoice_date)?.getTime()
                              ) /
                                (1000 * 3600 * 24)
                            )}{" "}
                            days
                          </p>
                        )}
                      </td>
                      <td>
                        <span
                          className={
                            data?.status?.toLowerCase() === "active"
                              ? styles.active
                              : styles.canceled
                          }
                        >
                          {data?.status}
                        </span>
                      </td>
                    </>
                  ))}
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={
                allInvoicesData
                  ?.filter(
                    (uData) =>
                      uData?.customer_id == decryptText(String(currentUserId))
                  )
                  ?.filter((status) => status?.payment_status == "paid")?.length
              }
              rowsPerPage={rowsPerPage}
              page={page}
              componentsProps={{
                select: {
                  "aria-label": "rows per page",
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </>
  );
};
const paymentModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const VendorUserSide = () => {
  let { currentUserId } = useParams();

  const [currentClientData, setCurrentClientData] = useState({});
  const [currentCompany, setCurrentCompany] = useState({});
  const { disableBtn, setDisableBtn, setSnackbar } = UseGlobalContext();
  const [allData, setAllData] = useState({});
  let [tab, setTab] = useState("unpaid");
  const [modalData, setModalData] = useState({});
  const [sendEmail, setSendEmail] = useState({});
  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [contactsData, setContactsData] = useState([]);
  const [currentInvoicesData, setCurrentInvoicesData] = useState();
  let { allInvoicesData } = useInvoiceContext();
  const { allCustomerData } = useCustomerContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filters, setFilters] = useState({});
  const [paymentSwitch, setPaymentSwitch] = useState(false);
  // modal
  const [open, setOpen] = React.useState(false);
  const decryptText = (encryptText) => {
    var reb64 = CryptoJS.enc.Hex.parse(encryptText);
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, "Mirats");
    var plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setModalData({});
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const tabData = [
    {
      id: 1,
      tabName: "unpaid",
    },
    {
      id: 2,
      tabName: "paid",
    },
    {
      id: 3,
      tabName: "payments",
    },
  ];

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  function getCurrentClient(e) {
    console.log("calling");
    axios
      .get(
        `https://finance.miratsoneservices.com/api/get-customer/${decryptText(
          String(currentUserId)
        )}`
      )
      .then((res) => {
        setCurrentClientData(res.data);
        setAllData((prev) => ({
          ...prev,
          customer: res.data,
        }));
      });
  }

  const getCorrectPage = (tab) => {
    switch (tab) {
      case "unpaid":
        return <UnpaidInvoice />;
      case "paid":
        return <PaidInvoice />;
      // case "unpaid":
      //   return <LiveJobs />;

      default:
    }
  };
  const getCurrentInvoices = () => {
    axios
      .get(
        `https://finance.miratsoneservices.com/api/get-multiple-invoice/${decryptText(
          String(currentUserId)
        )}`
      )
      .then((res) => {
        setCurrentInvoicesData(res.data);

        let companies = [];
        for (const inv of res.data) {
          axios
            .get(
              `https://finance.miratsoneservices.com/api/get-company/${inv?.company_id}`
            )
            .then((compRes) => {
              console.log(compRes);
              companies.push(compRes.data);
            });
        }
        setAllData((prev) => ({
          ...prev,
          invoice: res.data,
          companies,
        }));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCurrentClient();
    getCurrentInvoices();
  }, []);

  const handleModalInputChange = (e) => {
    setModalData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleAddContact = (e) => {
    e.preventDefault();
    !modalData?.contact_id
      ? axios
          .post(`https://finance.miratsoneservices.com/api/create-contact`, {
            ...modalData,
            customer_id: decryptText(String(currentUserId)),
          })
          .then((res) => {
            console.log("contact added successful");
            handleClose();
            getCurrentClient();
            setSnackbar({
              open: true,
              severity: "success",
              msg: "Contact Added Successfully!",
            });
          })
          .catch((err) => console.log(err))
      : axios
          .put(
            `https://finance.miratsoneservices.com/api/update-contact/${modalData?.contact_id}`,
            modalData
          )
          .then((res) => {
            console.log("contact updated successful");
            handleClose();
            getCurrentClient();
            setSnackbar({
              open: true,
              severity: "success",
              msg: "Contact Updated Successfully!",
            });
          })
          .catch((err) => console.log(err));
  };
  const handleDeleteContact = (data) => {
    axios
      .delete(
        `https://finance.miratsoneservices.com/api/delete-contact/${data?.contact_id}`
      )
      .then((res) => {
        console.log("contact deleted successfully");
        getCurrentClient();
        // setSnackbar({
        //   open: true,
        //   severity: "danger",
        //   msg: "Contact Deleted !",
        // });
      })
      .catch((err) => console.log("error in deleting contact" + err));
  };

  const handleSelectedInvoice = (e, data) => {
    setSelectedInvoice(data?.company_id);
  };
  const handleSendEmailChange = (e) => {
    //     {
    //       "fromEmail" : "fromEmail",
    //       "toEmails" : "toEmails",
    //       "password" : "password",
    //       "subject" : "shiftTime",
    //       "text" : "employeeName"
    // }
    setSendEmail((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSendEmailSubmit = (e) => {
    e.preventDefault();
    setDisableBtn(true);
    sendEmail?.text && sendEmail?.subject !== ""
      ? axios
          .post(
            "https://testemailspringboot.de.r.appspot.com/https://finance.miratsoneservices.com/api/v1/vendorinvoice",
            {
              fromEmail: "varsha.jadhav@miratsinsights.com",
              toEmails: "itzaltuyaar@gmail.com",
              password: "rseciioaxfedbmqy",
              customerName: currentClientData?.company_name,
              ...sendEmail,
            }
          )
          .then((res) => {
            setSnackbar({
              open: true,
              severity: "success",
              msg: "Email sent Successfully!",
            });
            setDisableBtn(false);
          })
      : alert("field are empty");
  };
  console.log(allData);
  console.log(decryptText(String(currentClientData)));
  console.log(modalData);
  console.log(currentClientData);
  console.log(currentCompany);
  console.log(decryptText(String(currentUserId)));

  return (
    <>
      {/* <Header /> */}
      <div className={styles.mainContainer}>
        <section className={styles.header}>
          <img src={miratsLoGo} alt="LOGO" />
          <h3>{currentClientData?.company_name}</h3>
        </section>
        <div className={styles.containerBody}>
          <div className={styles.bodyLeft}>
            <div className={styles.bodyLeftTop}>
              <div className={styles.bodyLeftTopHeader}>
                <h2>MIRATS (Shell)</h2>
                <p>
                  <span>
                    {/* {allData?.invoice?.length} */}
                    {
                      allData?.invoice?.filter((fData) => {
                        return fData?.payment_status === "unpaid";
                      })?.length
                    }{" "}
                    Invoices
                  </span>{" "}
                  TOTAL DUE <br />₹{" "}
                  {allData?.invoice
                    ?.filter((fInv) => fInv?.payment_status === "unpaid")
                    ?.reduce(
                      (acc, curr) =>
                        (acc += curr?.currency_type
                          ? curr?.current_USD_price * curr?.total_amount
                          : curr?.total_amount),
                      0
                    )
                    ?.toFixed(2)}
                </p>
              </div>
              <div className={styles.addressContainer}>
                <div className={styles.addressLeft}>
                  <h4>To</h4>
                  <p>1309 Coffeen Avenue,</p>
                  <p>Sheridan, WY 82801, United</p>
                  <p>states</p>
                  <p>phone- (895) 733-6583</p>
                  <p>email- accounting@mirats.in</p>
                </div>
                <div className={styles.addressRight}>
                  <h4>From</h4>
                  <p>{allData?.customer?.billing_address?.street1}</p>
                  <p>{allData?.customer?.billing_address?.street2}</p>
                  <p>
                    {allData?.customer?.billing_address?.city},{" "}
                    {allData?.customer?.billing_address?.country}
                  </p>

                  <p>email- {allData?.customer?.account_email_id}</p>
                </div>
              </div>
            </div>
            <div className={styles.bodyLeftBottom}>
              <section className={styles.bodyLeftBottomHeader}></section>
              <div className={styles.invoice_table}>
                <div className={styles.tabContainer}>
                  {tabData.map((i) => {
                    return (
                      <>
                        <h3
                          className={cx(styles.light, {
                            [styles.active]:
                              tab === i.tabName ? styles.active : "",
                          })}
                          onClick={() => {
                            setTab(i.tabName);
                          }}
                        >
                          {i.tabName?.toUpperCase()}
                        </h3>
                      </>
                    );
                  })}
                </div>
                <div className={styles.tabComponent}>{getCorrectPage(tab)}</div>
              </div>
            </div>
          </div>
          <div className={styles.bodyRight}>
            <section className={styles.bodyRightHeader}>
              <h5
                onClick={() => setPaymentSwitch(false)}
                className={!paymentSwitch ? styles.paymentSwitchActive : ""}
                style={!paymentSwitch ? { color: "#1765dc" } : {}}
              >
                SEND EMAIL
              </h5>
              <h5
                onClick={() => setPaymentSwitch(true)}
                className={paymentSwitch ? styles.paymentSwitchActive : ""}
                style={paymentSwitch ? { color: "#1765dc" } : {}}
              >
                PAYMENTS
              </h5>
            </section>
            <section className={styles.bodyRightTop}>
              {!paymentSwitch ? (
                <>
                  <div className={styles.emailContainer}>
                    <input
                      type="text"
                      placeholder="subject"
                      name="subject"
                      onChange={handleSendEmailChange}
                    />
                    <textarea
                      name="text"
                      placeholder="text"
                      id=""
                      onChange={handleSendEmailChange}
                      cols="30"
                      rows="5"
                    ></textarea>
                  </div>
                  <div className={styles.btnContainer}>
                    <button
                      onClick={handleSendEmailSubmit}
                      disabled={disableBtn}
                      style={
                        disableBtn
                          ? { cursor: "not-allowed" }
                          : { cursor: "pointer" }
                      }
                      // style={{ cursor: "not-allowed" }}
                    >
                      Send
                    </button>
                    <button onClick={(e) => setSendEmail({})}>Cancel</button>
                  </div>
                </>
              ) : (
                <GooglePayButton
                  environment="TEST"
                  paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                      {
                        type: "CARD",
                        parameters: {
                          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                          allowedCardNetworks: ["MASTERCARD", "VISA"],
                        },
                        tokenizationSpecification: {
                          type: "PAYMENT_GATEWAY",
                          parameters: {
                            gateway: "example",
                            gatewayMerchantId: "exampleGatewayMerchantId",
                          },
                        },
                      },
                    ],
                    merchantInfo: {
                      merchantId: "12345678901234567890",
                      merchantName: "Demo Merchant",
                    },
                    transactionInfo: {
                      totalPriceStatus: "FINAL",
                      totalPriceLabel: "Total",
                      totalPrice: String(
                        allData?.invoice
                          ?.filter((fInv) => fInv?.payment_status === "unpaid")
                          ?.reduce(
                            (acc, curr) =>
                              (acc += curr?.currency_type
                                ? curr?.current_USD_price * curr?.total_amount
                                : curr?.total_amount),
                            0
                          )
                          ?.toFixed(2)
                      ),
                      currencyCode: "INR",
                      countryCode: "IN",
                    },
                    shippingAddressRequired: false,
                    callbackIntents: ["PAYMENT_AUTHORIZATION"],
                  }}
                  onLoadPaymentData={(paymentRequest) => {
                    console.log("load payment data", paymentRequest);
                  }}
                  onPaymentAuthorized={(paymentData) => {
                    console.log(paymentData);
                    return { transactionState: "SUCCESS" };
                  }}
                  existingPaymentMethodRequired="false"
                  buttonColor="white"
                  buttonType="pay"
                />
              )}
            </section>
            <section className={styles.bodyRightBottom}>
              <div className={styles.bodyRightBottomHeader}>
                <h4>CONTACTS</h4>
                {/* <h5>EDIT</h5> */}
              </div>
              <div className={styles.displayContacts}>
                {currentClientData?.contacts?.map((cont, ind) => (
                  <div className={styles.displayContactsContainer}>
                    <div className={styles.contactLeft}>
                      <img src={userProfilePic} alt="p" />
                    </div>
                    <div className={styles.contactRight}>
                      <p>
                        {cont?.first_name} {cont?.last_name}
                      </p>
                      <p>{cont?.contact_phone}</p>
                      <p>{cont?.contact_email}</p>
                    </div>
                    <div className={styles.contactActions}>
                      <GrEdit
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleOpen();
                          setModalData(cont);
                        }}
                      />
                      <RiDeleteBin5Line
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteContact(cont)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <section className={styles.addContact} onClick={handleOpen}>
                + Add Contact
              </section>
            </section>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={myModalStyles}>
                <div className={styles.modalInnerContainer}>
                  <div className={styles.inputContainer}>
                    <section>
                      <label htmlFor="first_name">First Name</label>
                    </section>
                    {" : "}
                    <input
                      type="text"
                      name="first_name"
                      value={modalData?.first_name}
                      onChange={handleModalInputChange}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <section>
                      <label htmlFor="last_name">Last name</label>{" "}
                    </section>
                    {" : "}
                    <input
                      type="text"
                      name="last_name"
                      value={modalData?.last_name}
                      onChange={handleModalInputChange}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <section>
                      <label htmlFor="contact_email">Email</label>{" "}
                    </section>
                    {" : "}
                    <input
                      type="text"
                      name="contact_email"
                      value={modalData?.contact_email}
                      onChange={handleModalInputChange}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <section>
                      <label htmlFor="contact_phone">Phone</label>{" "}
                    </section>
                    {" : "}
                    <input
                      type="text"
                      name="contact_phone"
                      value={modalData?.contact_phone}
                      onChange={handleModalInputChange}
                    />
                  </div>

                  <div className={styles.inputContainer}>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleAddContact}>Upload</button>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorUserSide;
