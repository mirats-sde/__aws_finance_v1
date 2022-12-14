import React, { useState } from "react";
import styles from "./VendorInvoice.module.css";
import { styled } from "@mui/system";
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from "@mui/base/TablePaginationUnstyled";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Header from "../../../components/header/Header";
import loader from "../../../assets/loader.gif";
import { useVendorContext } from "../vendorContext/VendorContext";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import { utils, writeFile } from "xlsx";
var CryptoJS = require("crypto-js");
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
const VendorInvoices = () => {
  const [searchQuery, setSearchQuery] = useState({});
  const [filters, setFilters] = useState({});
  //   let { allVendorInvoice } = useInvoiceContext();
  const { allVendorData, allVendorInvoice } = useVendorContext();
  // console.log(allInvoicesData);
  // console.log(allVendorInvoice);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  // Avoid a layout jump when reaching the last page with empty rows.
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleFilterChange = (e) => {
    e.target.value !== "" ? setRowsPerPage(-1) : setRowsPerPage(10);
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExportToExcel = (e) => {
    var elt = document.getElementById("table-to-xls-DATA");
    var wb = utils.table_to_book(elt, { sheet: "Sheet JS" });
    return writeFile(wb, `vendorInvoices.xlsx`);
  };
  console.log(allVendorInvoice);
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
                onClick={(e) => navigate("/add-vendor-invoice")}
              >
                Create Vendor Invoice
              </Button>
              <input
                type="search"
                name="search"
                className={styles.icon}
                placeholder="Search...."
                onChange={handleFilterChange}
              />
            </div>
            <div className={styles.right_header}>
              <select name="payment_status" onChange={handleFilterChange}>
                <option value="" selected>
                  Filter: All
                </option>
                <option value="paid">PAID</option>
                <option value="unpaid">UNPAID</option>
              </select>
              <select name="month" onChange={handleFilterChange}>
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
              <select name="year" onChange={handleFilterChange}>
                <option value="" selected>
                  Filter: All Year
                </option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
              </select>
              <BsFileEarmarkArrowDown
                size={29}
                onClick={handleExportToExcel}
                style={{ cursor: "pointer" }}
              />
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
            <table aria-label="custom pagination table" id="table-to-xls-DATA">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Invoice No</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Project No</th>
                  <th>Invoice Date</th>
                  <th>Payment Month</th>
                  <th>Billing Details</th>
                  <th>Invoice Link</th>
                  <th>Payment Status</th>
                  <th>Client Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  // (rowsPerPage > 0
                  //   ? invoiceTableData
                  //       .filter(
                  //         (data) =>
                  //           data.customerLink.toLowerCase().includes(searchQuery) ||
                  //           data.invoiceNumber.toLowerCase().includes(searchQuery)
                  //       )
                  //       .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  //   : invoiceTableData
                  // )

                  allVendorInvoice?.length ? (
                    (rowsPerPage > 0
                      ? allVendorInvoice?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : allVendorInvoice
                    )
                      ?.filter((mData) =>
                        !filters?.search
                          ? mData
                          : mData?.poNo
                              ?.toLowerCase()
                              ?.includes(filters?.search?.toLowerCase()) ||
                            mData?.invoiceNo
                              ?.toLowerCase()
                              ?.includes(filters?.search?.toLowerCase())
                      )
                      ?.filter((mData) =>
                        !filters?.month
                          ? mData
                          : new Date(mData?.createdAt)?.getMonth() ==
                            filters?.month
                      )
                      ?.filter((mData) =>
                        !filters?.payment_status
                          ? mData
                          : mData?.status?.toLowerCase() ==
                            filters?.payment_status?.toLowerCase()
                      )
                      ?.filter((yData) =>
                        !filters?.year
                          ? yData
                          : new Date(yData?.createdAt)?.getFullYear() ==
                            filters?.year
                      )

                      ?.map((data, ind) => (
                        <tr
                          key={ind}
                          className={
                            data?.status?.toLowerCase() === "canceled" ||
                            data?.status?.toLowerCase() === "cancelled"
                              ? styles.cancelledRow
                              : ""
                          }
                          onClick={(e) => {
                            navigate(
                              `/edit-vendor-invoice/${data?.vendor_invoice_id}`
                            );
                          }}
                        >
                          <td>
                            {/* <h1>{data?.sale_by}</h1> */}
                            {/* <a
                                  className={styles.customerLink}
                                  href={data.customerLink}
                                >
                                  {elm?.company_name}
                                </a>{" "} */}
                            <p>{data?.vendor_invoice_id} </p>
                          </td>
                          <td>
                            {/* <Link
                       
                            to={encryptText(data?.invoice_number)}
                            className={styles.invoiceNumber}
                          > */}
                            {data?.invoiceNo}
                            {/* </Link> */}
                            <p className={styles.light}>{data?.invoiceDate}</p>
                          </td>
                          <td>
                            <p>
                              {data?.due_date
                                ? new Date(data?.due_date)?.toLocaleDateString(
                                    "en-in"
                                  )
                                : "-"}
                            </p>
                            {/* <p className={styles.light}>
                            <Link
                              className={styles.invoiceLink}
                              to={encryptText(data?.invoice_link)}
                            >
                            View Invoice
                            </Link>
                          </p> */}
                          </td>
                          <td className={styles.warning}>{data?.amount}</td>
                          <td className={styles.create}>
                            <p>{data?.poNo}</p>
                          </td>
                          <td>
                            <span
                              className={
                                data?.status?.toLowerCase() === "active"
                                  ? styles.active
                                  : styles.canceled
                              }
                            >
                              {data?.invoice_date
                                ? new Date(data?.invoice_date)?.toDateString()
                                : "-"}
                            </span>
                          </td>
                          <td>
                            <p>
                              {data?.invoice_date
                                ? new Date(
                                    data?.invoice_date
                                  )?.toLocaleDateString("default", {
                                    month: "long",
                                  })
                                : "-"}
                            </p>

                            {/* <p>{data?.sale_by}</p> */}
                          </td>
                          <td className={styles.create}>
                            <p>{data?.billTo}</p>
                          </td>
                          <td className={styles.create}>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <a href={data?.invoice_link} target="_blank">
                                View Invoice
                              </a>
                            </span>
                          </td>
                          <td className={styles.create}>
                            <p>{data?.status}</p>
                          </td>
                          <td className={styles.create}>
                            <p>
                              {data?.client_status ? data?.client_status : "-"}
                            </p>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <div className={styles.loaderContainer}>
                      <img src={loader} alt="" />
                    </div>
                  )
                }
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
                    count={allVendorInvoice.length}
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
      </div>
    </>
  );
};

export default VendorInvoices;
