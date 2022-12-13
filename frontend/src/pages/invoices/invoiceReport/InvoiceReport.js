import React from "react";
import styles from "./InvoiceReport.module.css";
import { styled } from "@mui/system";
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from "@mui/base/TablePaginationUnstyled";
// import { useInvoiceContext } from "./invoiceContext/InvoiceContext";
// import { useCustomerContext } from "../customers/customerContex/CustomerContext";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Header from "../../../components/header/Header";
import loader from "../../../assets/loader.gif";
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
const InvoiceReport = () => {
  return (
    <>
      <div>
        <div className={styles.invoice_table}>
          <table aria-label="custom pagination table">
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
                <th>Client Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>hhhh</td>
                <td>hhhh</td>
                <td>hhhh</td>
                <td>hhhh</td>
                <td>hhhh</td>
                <td>hhhh</td>
                <td>hhhh</td>
                <td>hhhh</td>
                <td>hhhh</td>
                <td>hhhh</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                {/* <CustomTablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
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
                /> */}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default InvoiceReport;
