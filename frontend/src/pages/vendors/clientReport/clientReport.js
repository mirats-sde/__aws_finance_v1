import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCustomerContext } from "../../customers/customerContex/CustomerContext";
import { useInvoiceContext } from "../../invoices/invoiceContext/InvoiceContext";
import styles from "./VendorReport.module.css";
import { styled } from "@mui/system";
import loader from "../../../assets/loader.gif";
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from "@mui/base/TablePaginationUnstyled";
import { useEffect } from "react";
import { utils, writeFile } from "xlsx";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import Header from "../../../components/header/Header";
import { UseGlobalContext } from "../../globalContext/GlobalContext";
var CryptoJS = require("crypto-js");
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 64,
  p: 4,
};
const CustomTablePagination = styled(TablePaginationUnstyled)`
  & .MuiTablePaginationUnstyled-toolbar {
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

  & .MuiTablePaginationUnstyled-selectLabel {
    margin: 0;
  }

  & .MuiTablePaginationUnstyled-select {
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

  & .MuiTablePaginationUnstyled-displayedRows {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .MuiTablePaginationUnstyled-spacer {
    display: none;
  }

  & .MuiTablePaginationUnstyled-actions {
    display: flex;
    gap: 0.5rem;
    padding: 0.5em;
  }

  & .MuiTablePaginationUnstyled-actions button {
    padding: 0.1em 0.5em;
    border: 1px solid #828282;
    cursor: pointer;
    background-color: white;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border: none;
  }

  & .MuiTablePaginationUnstyled-actions span {
    // padding: 0 0.8em;
    padding: 1em;
    color: #484848;
    font-weight: 700;
  }
`;

const ClientReport = () => {
  const [searchQuery, setSearchQuery] = useState({});
  let { allInvoicesData } = useInvoiceContext();
  const { allCustomerData } = useCustomerContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filters, setFilters] = useState({});
  const [modalData, setModalData] = useState({});
  const [exportExcel, setExportExcel] = useState([]);
  const [modalInputs, setModalInputs] = useState({});
  const [open, setOpen] = React.useState(false);
  const { setSnackbar } = UseGlobalContext();
  const handleOpen = (e, cData, iData) => {
    setOpen(true);
    setModalData(iData);
    // console.log(iData);
  };
  const handleClose = () => {
    setOpen(false);
    setModalData({});
  };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // Avoid a layout jump when reaching the last page with empty rows.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // console.log(allCustomerData);
  var years = [];
  function generateArrayOfYears() {
    var max = new Date().getFullYear();
    var min = max - 9;

    for (var i = max; i >= min; i--) {
      years.push(i);
    }
    return years;
  }
  generateArrayOfYears();
  const handleFiltersChange = (e) => {
    e.target.value !== "" ? setRowsPerPage(-1) : setRowsPerPage(50);
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSelectClientFilter = (e) => {
    e.target.value !== "" ? setRowsPerPage(-1) : setRowsPerPage(50);
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleMonthFilter = (e) => {
    e.target.value !== "" ? setRowsPerPage(-1) : setRowsPerPage(50);
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // handles Download To Excel btn
  const DownloadToExcel = () => {
    var elt = document.getElementById("table-to-xls-DATA");
    var wb = utils.table_to_book(elt, { sheet: "Sheet JS" });
    return writeFile(wb, `Client-Reports.xlsx`);
  };
  const encryptText = (text) => {
    var b64 = CryptoJS.AES.encrypt(text, "MiratsInsights").toString();
    var e64 = CryptoJS.enc.Base64.parse(b64);
    var eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
  };
  const handleModalInputChange = (e) => {
    setModalData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReportUpdate = (e) => {
    axios
      .put(
        `https://finance.miratsoneservices.com/api/update-invoice/${modalData?.invoice_number}`,
        {
          project_name: modalData?.project_name,
          exchange_rate: modalData?.exchange_rate,
          completes_as_per_console: modalData?.completes_as_per_console,
          qr: modalData?.qr,
          project_manager: modalData?.project_manager,
          date_of_receipt: modalData?.date_of_receipt,
        }
      )
      .then((res) => {
        handleClose();

        setSnackbar({
          open: true,
          severity: "success",
          msg: "Report Updated Successfully!",
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Header />
      <div className={styles.invoice_table}>
        <div className={styles.filtersContainer}>
          <select name="client" onChange={handleSelectClientFilter}>
            <option value="" selected>
              Select Client
            </option>
            {allCustomerData?.map((cli, ind) => (
              <option value={cli?.customer_id} key={ind}>
                {cli?.company_name}
              </option>
            ))}
          </select>
          <input
            type="search"
            placeholder=" Client Name"
            name="clientName"
            onChange={handleFiltersChange}
          />
          <input
            type="search"
            placeholder="Search by #PO"
            name="po_number"
            onChange={handleFiltersChange}
          />
          <select name="month" onChange={handleMonthFilter}>
            <option value="" selected>
              Select Month
            </option>
            {monthNames?.map((month, ind) => (
              <option value={ind} key={ind}>
                {month}
              </option>
            ))}
          </select>
          <select name="year" onChange={handleFiltersChange}>
            <option value="" selected>
              Select Year
            </option>
            {years?.map((year, ind) => (
              <option value={year} key={ind}>
                {year}
              </option>
            ))}
          </select>
          <button onClick={DownloadToExcel}>Download</button>
        </div>
        <table aria-label="custom pagination table" id="table-to-xls-DATA">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Project Name</th>
              <th>Invoice No </th>
              <th>Date of Invoice</th>
              <th>Due date</th>
              <th>PO#</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amt in USD</th>
              <th>Total Invoice Amt</th>
              <th>INR Amt Taxable</th>
              <th>GST</th>
              <th>TDS</th>
              <th>Net Receivable</th>
              <th>Exchange Rate</th>
              <th>Billing Entity</th>
              <th>Completes as per Console</th>
              <th>QR%</th>
              <th> Name of Project Manager</th>
              <th> Status</th>
              <th> Date of Receipt</th>
              <th> Remarks</th>
            </tr>
          </thead>
          <tbody>
            <>
              {(rowsPerPage > 0
                ? allInvoicesData?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : allInvoicesData
              )?.map((data, ind) => {
                return (
                  <React.Fragment key={ind + 6}>
                    {allCustomerData
                      ?.filter((cust) => cust?.customer_id == data?.customer_id)
                      ?.filter((sData) => {
                        return !filters?.po_number
                          ? sData
                          : data?.orders?.filter((order) => {
                              return order?.description
                                .toLowerCase()
                                .includes(filters?.po_number.toLowerCase());
                            })?.length;
                      })
                      ?.filter((sData) =>
                        !filters?.client
                          ? sData
                          : sData?.customer_id == filters?.client
                      )
                      ?.filter((fData) =>
                        !filters?.clientName
                          ? fData
                          : fData?.company_name
                              ?.toLowerCase()
                              ?.includes(filters?.clientName?.toLowerCase())
                      )
                      ?.filter((mData) =>
                        !filters?.month
                          ? mData
                          : new Date(data?.invoice_date)?.getMonth() ==
                            filters?.month
                      )
                      ?.filter((yData) =>
                        !filters?.year
                          ? yData
                          : new Date(data?.invoice_date)?.getFullYear() ==
                            filters?.year
                      )
                      ?.map((elm, ind) => (
                        <React.Fragment key={ind}>
                          <tr
                            key={ind}
                            className={
                              data?.status?.toLowerCase() === "canceled" ||
                              data?.status?.toLowerCase() === "cancelled"
                                ? styles.cancelledRow
                                : ""
                            }
                            onClick={(e) => handleOpen(e, elm, data)}
                            style={{ cursor: "pointer" }}
                          >
                            <td>
                              {/* <h1>{data?.sale_by}</h1> */}
                              <a
                                className={styles.customerLink}
                                href={data.customerLink}
                              >
                                {elm?.company_name}
                              </a>{" "}
                              <p>{elm?.account_email_id}</p>
                            </td>
                            <td>
                              {/* <Link
                                  to={`/invoices/${encryptText(
                                    data?.invoice_number
                                  )}`}
                                  className={styles.invoiceNumber}
                                >
                                  {data?.invoice_number}
                                </Link> */}
                              {data?.project_name}
                              {/* <p className={styles.light}>
                                  {data?.invoice_date}
                                </p> */}
                            </td>
                            <td>
                              <p>{data?.invoice_number}</p>
                              <p className={styles.light}>
                                <Link
                                  className={styles.invoiceLink}
                                  to={`/invoices/${encryptText(
                                    data?.invoice_number
                                  )}`}
                                >
                                  View Invoice
                                </Link>
                              </p>
                            </td>
                            <td className={styles.warning}>
                              <p className={styles.light}>
                                {new Date(
                                  data?.invoice_date
                                )?.toLocaleDateString("en-IN")}
                              </p>
                            </td>
                            <td className={styles.create}>
                              <p>
                                {new Date(
                                  data?.invoice_dueDate
                                )?.toLocaleDateString("en-in")}
                              </p>
                            </td>
                            {/* po number */}
                            <td>
                              <span
                                className={
                                  data?.status?.toLowerCase() === "active"
                                    ? styles.active
                                    : styles.canceled
                                }
                              >
                                {data?.orders?.map(
                                  (pos) => `${pos?.description},  `
                                )}
                              </span>
                            </td>
                            <td>
                              {/* <p>
                              <span>
                                {data?.currency_type
                                  ? data?.currency_type
                                  : "INR"}{" "}
                                {data?.received_amount
                                  ? data?.received_amount
                                  : 0}
                              </span>
                            </p> */}
                              <p>
                                {data?.orders
                                  ?.reduce((cur, acc, index) => {
                                    return (cur =
                                      (cur * index + Number(acc?.quantity)) /
                                      (index + 1));
                                  }, 0)
                                  ?.toFixed(2)}
                              </p>
                              {/* <p>{data?.sale_by}</p> */}
                            </td>
                            <td>
                              {data?.orders
                                ?.reduce((cur, acc, index) => {
                                  return (cur =
                                    (cur * index + Number(acc?.rate)) /
                                    (index + 1));
                                }, 0)
                                ?.toFixed(3)}
                            </td>
                            <td>
                              {data?.currency_type ? data?.total_amount : "-"}
                            </td>

                            <td>
                              {data?.currency_type
                                ? data?.currency_type
                                : "INR"}{" "}
                              {data?.total_amount
                                ? data?.total_amount?.toFixed(3)
                                : "0"}
                            </td>
                            <td>
                              {data?.taxable_amount
                                ? data?.taxable_amount?.toFixed(3)
                                : "0"}
                            </td>
                            <td>{data?.IGST ? data?.IGST?.toFixed(2) : "0"}</td>
                            <td>{data?.tds ? data?.tds : "0"}</td>
                            <td>
                              {" "}
                              {data?.currency_type
                                ? data?.currency_type
                                : "INR"}{" "}
                              {!data?.currency_type
                                ? Number(
                                    data?.taxable_amount + data?.IGST
                                  )?.toFixed(2)
                                : data?.total_amount}
                            </td>
                            <td>
                              {data?.exchange_rate ? data?.exchange_rate : "-"}
                            </td>
                            <td>
                              {/* {data?.completes_as_per_console
                                  ? data?.completes_as_per_console
                                  : "-"} */}
                              bE
                            </td>
                            <td>
                              {data?.completes_as_per_console
                                ? data?.completes_as_per_console
                                : "-"}
                            </td>
                            <td>{data?.qr ? data?.qr : "-"}</td>
                            <td>
                              {" "}
                              {data?.project_manager
                                ? data?.project_manager
                                : "-"}
                            </td>
                            <td>{data?.status}</td>
                            <td>
                              {" "}
                              {data?.date_of_receipt
                                ? new Date(
                                    data?.date_of_receipt
                                  )?.toLocaleDateString("en-in")
                                : "-"}
                            </td>
                            <td>{data?.note ? data?.note : "-"}</td>
                            <br />
                          </tr>
                        </React.Fragment>
                      ))}
                  </React.Fragment>
                );
              })}

              <>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td colSpan="2">Total Amount(INR)</td>
                  <td colSpan="3">
                    {allInvoicesData
                      ?.filter((sData) =>
                        !filters?.client
                          ? sData
                          : sData?.customer_id == filters?.client
                      )
                      ?.filter((mData) =>
                        !filters?.month
                          ? mData
                          : new Date(mData?.invoice_date)?.getMonth() ==
                            filters?.month
                      )
                      ?.filter((sData) => {
                        return !filters?.po_number
                          ? sData
                          : sData?.orders?.filter((order) => {
                              return order?.description
                                .toLowerCase()
                                .includes(filters?.po_number.toLowerCase());
                            })?.length;
                      })
                      ?.filter((yData) =>
                        !filters?.year
                          ? yData
                          : new Date(yData?.invoice_date)?.getFullYear() ==
                            filters?.year
                      )
                      ?.reduce((acc, curr) => {
                        return (acc += curr?.current_USD_price
                          ? Number(curr?.total_amount) *
                            Number(curr?.current_USD_price)
                          : Number(curr?.total_amount));
                      }, 0)
                      ?.toFixed(2)}
                  </td>
                </tr>
              </>
            </>
          </tbody>
          <tfoot>
            <tr>
              <CustomTablePagination
                rowsPerPageOptions={[50, 100, 150, { label: "All", value: -1 }]}
                colSpan={3}
                count={allInvoicesData.length}
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
          <Box sx={style}>
            <div className={styles.modalInnerContainer}>
              <div className={styles.inputContainer}>
                <label htmlFor="project_name">Project Name</label>
                {" : "}
                <input
                  type="text"
                  name="project_name"
                  value={modalData?.project_name}
                  onChange={handleModalInputChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="exchange_rate">Exchange Rate</label>
                {" : "}
                <input
                  type="text"
                  name="exchange_rate"
                  value={modalData?.exchange_rate}
                  onChange={handleModalInputChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="completes_as_per_console">
                  Completes As Per Console
                </label>
                {" : "}
                <input
                  type="text"
                  name="completes_as_per_console"
                  value={modalData?.completes_as_per_console}
                  onChange={handleModalInputChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="qr">QR</label>
                {" : "}
                <input
                  type="text"
                  name="qr"
                  value={modalData?.qr}
                  onChange={handleModalInputChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="project_manager">Project Manager</label>
                {" : "}
                <input
                  type="text"
                  name="project_manager"
                  value={modalData?.project_manager}
                  onChange={handleModalInputChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="date_of_receipt">Date Of Receipt</label>
                {" : "}
                <input
                  type="date"
                  name="date_of_receipt"
                  value={modalData?.date_of_receipt}
                  onChange={handleModalInputChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <button>Cancel</button>
                <button onClick={handleReportUpdate}>Upload</button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ClientReport;
