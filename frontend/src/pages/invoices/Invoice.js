import React, { useState } from "react";
import styles from "./invoice.module.css";
import { styled } from "@mui/system";
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from "@mui/base/TablePaginationUnstyled";
import { useInvoiceContext } from "./invoiceContext/InvoiceContext";
import { useCustomerContext } from "../customers/customerContex/CustomerContext";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Header from "../../components/header/Header";
import loader from "../../assets/loader.gif";
var CryptoJS = require("crypto-js");

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

const Invoice = () => {
  const [searchQuery, setSearchQuery] = useState({});
  let { allInvoicesData, allCompanyData } = useInvoiceContext();
  const { allCustomerData } = useCustomerContext();
  // console.log(allInvoicesData);
  // console.log(allCustomerData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  // Avoid a layout jump when reaching the last page with empty rows.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // let newData = allCustomerData?.map((cust, ind, allInvoicesData) => {
  //   return allInvoicesData?.filter(
  //     (inv) => inv?.customer_id == cust?.customer_id
  //   );
  // });
  // console.log(newData);

  // dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filters, setFilters] = useState({});
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const encryptText = (text) => {
    var b64 = CryptoJS.AES.encrypt(text, "MiratsInsights").toString();
    var e64 = CryptoJS.enc.Base64.parse(b64);
    var eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
  };
  console.log(allInvoicesData);
  console.log(filters);
  return (
    <>
      <Header />

      <div className={styles.invoice_table_container}>
        <div className={styles.left_invoice_table}>
          <div className={styles.table_header}>
            <div className={styles.left_table_header}>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Create Invoice
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
                  <MenuItem>
                    <Link to="/create-domestic-invoice">Domestic Invoice</Link>
                  </MenuItem>

                  <MenuItem>
                    <Link to="/create-international-invoice">
                      International Invoice
                    </Link>
                  </MenuItem>
                </span>
              </Menu>

              <input
                type="search"
                className={styles.icon}
                placeholder="Search...."
                onChange={(e) => {
                  setSearchQuery((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }));
                  e.target.value !== ""
                    ? setRowsPerPage(-1)
                    : setRowsPerPage(10);
                }}
              />
            </div>
            <div className={styles.right_header}>
              <select
                style={{ width: "100px" }}
                name="company_id"
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                  e.target.value !== ""
                    ? setRowsPerPage(-1)
                    : setRowsPerPage(10);
                }}
              >
                <option value="" selected>
                  Company
                </option>
                {allCompanyData?.map((data) => (
                  <option value={data?.company_id}>{data?.company_name}</option>
                ))}
              </select>
              <select
                name="payment_status"
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                  e.target.value !== ""
                    ? setRowsPerPage(-1)
                    : setRowsPerPage(10);
                }}
              >
                <option value="" selected>
                  Filter: All
                </option>
                <option value="paid">PAID</option>
                <option value="unpaid">UNPAID</option>
                <option value="canceled">CANCELED</option>
              </select>
              <select
                name="month"
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                  e.target.value !== ""
                    ? setRowsPerPage(-1)
                    : setRowsPerPage(10);
                }}
              >
                <option value="" selected>
                  Filter: All Months
                </option>
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </select>
              <select
                name="year"
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                  e.target.value !== ""
                    ? setRowsPerPage(-1)
                    : setRowsPerPage(10);
                }}
              >
                <option value="" selected>
                  Filter: All Year
                </option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
              </select>
            </div>
            {/* <section>
              <p>From:</p>
              <input
                type="date"
                onChange={(e) => setSearchQuery((prev) => ({}))}
              />
            </section>
            <section>
              <p>To:</p>
              <input type="date" name="" id="" />
            </section> */}

            {/* <div className={styles.right_header}>
            <select name="" id="">
              <option value="filter">Filter: All</option>
            </select>
          </div> */}
          </div>

          <div className={styles.invoice_table}>
            <table aria-label="custom pagination table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Invoice</th>
                  <th>Total Amount</th>
                  <th>Payment</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th>Received Amt</th>
                </tr>
              </thead>
              <tbody>
                {allCustomerData?.length ? (
                  (rowsPerPage > 0
                    ? allInvoicesData?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : allInvoicesData
                  )?.map((data, ind) => (
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
                        ?.filter(
                          (cust) => cust?.customer_id == data?.customer_id
                        )
                        ?.filter((fData) =>
                          !searchQuery?.search
                            ? fData
                            : fData?.company_name
                                ?.toLowerCase()
                                ?.includes(
                                  searchQuery?.search?.toLowerCase()
                                ) ||
                              data?.invoice_number
                                ?.toLowerCase()
                                ?.includes(searchQuery?.search?.toLowerCase())
                        )
                        ?.filter((sData) =>
                          !filters?.payment_status
                            ? sData
                            : data?.payment_status?.toLowerCase() ==
                              filters?.payment_status?.toLowerCase()
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
                        ?.filter((comFilter) =>
                          !filters?.company_id
                            ? comFilter
                            : filters?.company_id == data?.company_id
                        )
                        ?.map((elm, ind) => (
                          <>
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
                              <Link
                                // to={data?.invoice_number}
                                to={`${encryptText(
                                  data?.invoice_number
                                )}-${encryptText(String(data?.invoice_id))}`}
                                className={styles.invoiceNumber}
                              >
                                {data?.invoice_number}
                              </Link>
                              <p className={styles.light}>
                                {data?.invoiceDate}
                              </p>
                            </td>
                            <td>
                              <p>
                                <span>
                                  {data?.currency_type
                                    ? data?.currency_type
                                    : "INR"}
                                </span>
                                <span>
                                  {" "}
                                  {Number(data?.total_amount)?.toFixed(2)}
                                </span>
                              </p>
                              <p className={styles.light}>
                                <Link
                                  className={styles.invoiceLink}
                                  to={encryptText(data?.invoice_number)}
                                >
                                  View Invoice
                                </Link>
                              </p>
                            </td>
                            <td className={styles.warning}>
                              <Link to={encryptText(data?.invoice_number)}>
                                {data?.currency_type
                                  ? data?.currency_type
                                  : "INR"}{" "}
                                {data?.total_amount}{" "}
                                {data?.payment_status === "paid"
                                  ? "PAID"
                                  : "UNPAID"}
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
                            <td className={styles.create}>
                              <p>
                                {new Date(
                                  data?.invoice_date
                                )?.toLocaleDateString("en-in")}
                              </p>
                              <p>{data?.sale_by}</p>
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
                            <td>
                              <p>
                                <span>
                                  {data?.currency_type
                                    ? data?.currency_type
                                    : "INR"}{" "}
                                  {data?.received_amount
                                    ? data?.received_amount
                                    : 0}
                                </span>
                              </p>
                              <p>
                                {data?.received_amount
                                  ? new Date(data?.updatedAt)?.toDateString()
                                  : ""}
                              </p>
                              {/* <p>{data?.sale_by}</p> */}
                            </td>
                          </>
                        ))}
                    </tr>
                  ))
                ) : (
                  <div className={styles.loaderContainer}>
                    <img src={loader} alt="" />
                  </div>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <CustomTablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
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
          </div>
        </div>

        {/* right */}
        <div className={styles.right_invoice_table}>
          <div className={styles.table_stats}>
            <section>
              <h4>Total</h4>
              <span>
                ₹
                {allInvoicesData
                  ?.reduce(
                    (acc, cur) =>
                      (acc =
                        acc +
                        Number(
                          cur?.current_USD_price
                            ? cur?.current_USD_price * cur?.total_amount
                            : cur?.total_amount
                        )),
                    0
                  )
                  ?.toFixed(2)}
              </span>
            </section>
            <section>
              <h4>Fully Paid</h4>
              <span>
                ₹{" "}
                {allInvoicesData
                  ?.reduce(
                    (acc, cur) =>
                      (acc =
                        acc +
                        Number(
                          cur?.received_amount
                            ? cur?.currency_type
                              ? cur?.received_amount * cur?.current_USD_price
                              : cur?.received_amount
                            : 0
                        )),
                    0
                  )
                  ?.toFixed(2)}
              </span>
            </section>
            <section>
              <h4>Receivables</h4>
              <span>
                {" "}
                ₹{" "}
                {allInvoicesData
                  ?.reduce((acc, cur) => {
                    acc =
                      acc +
                      Number(
                        Number(
                          cur?.current_USD_price
                            ? cur?.current_USD_price * cur?.total_amount
                            : cur?.total_amount
                        ) -
                          Number(
                            cur?.received_amount
                              ? cur?.currency_type
                                ? cur?.received_amount * cur?.current_USD_price
                                : cur?.received_amount
                              : 0
                          )
                      );
                    return acc;
                  }, 0)
                  .toFixed(2)}
              </span>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
