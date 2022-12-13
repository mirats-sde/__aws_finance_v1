import { Link, useNavigate } from "react-router-dom";
import styles from "./Company.module.css";
// import { useCustomerContext } from "./customerContex/CustomerContext";
import { styled } from "@mui/system";
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from "@mui/base/TablePaginationUnstyled";
import { useState } from "react";
import { useInvoiceContext } from "../invoices/invoiceContext/InvoiceContext";
import Header from "../../components/header/Header";
import loader from "../../assets/loader.gif";
const tableStats = [
  {
    statsHeader: "Total Customers",
    statsNum: "34",
  },
  {
    statsHeader: "GST Registered",
    statsNum: "16",
  },
  {
    statsHeader: "Unregistered",
    statsNum: "18",
  },
  {
    statsHeader: "Customers in last 30 days",
    statsNum: "5",
  },
];

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

const Company = () => {
  const { allCompanyData } = useInvoiceContext();
  const [searchQuery, setSearchQuery] = useState("");
  console.log(searchQuery);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const navigate = useNavigate();
  console.log(allCompanyData);
  return (
    <>
      {" "}
      <Header />
      <div className={styles.invoice_table_container}>
        <div className={styles.left_invoice_table}>
          <div className={styles.table_header}>
            <div className={styles.left_table_header}>
              <button onClick={() => navigate("/add-company")}>
                Add Company
              </button>
              <input
                type="search"
                className={styles.icon}
                placeholder="Search...."
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  e.target.value !== ""
                    ? setRowsPerPage(-1)
                    : setRowsPerPage(10);
                }}
              />
            </div>
            <div className={styles.right_header}>
              <select name="" id="">
                <option value="filter">Filter: All</option>
              </select>
            </div>
          </div>

          <div className={styles.invoice_table}>
            <table>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Contact Info</th>
                  <th>Tax Information</th>
                  <th>Others</th>
                </tr>
              </thead>
              <tbody>
                {allCompanyData?.length ? (
                  (rowsPerPage > 0
                    ? allCompanyData?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : allCompanyData
                  )
                    ?.filter((cData) =>
                      !searchQuery
                        ? cData
                        : cData?.company_name
                            ?.toLowerCase()
                            ?.includes(searchQuery?.toLowerCase())
                    )

                    ?.map((elm, ind) => (
                      <tr key={ind}>
                        <td>
                          <Link to={`${elm?.company_id}`}>
                            {elm?.company_name}
                          </Link>
                          <br />
                          {/* <p className={styles.light}>{elm?.company_email_id}</p> */}
                        </td>
                        <td>
                          <p>{elm?.company_email_id}</p>
                          <p className={styles.light}>
                            {elm?.account_email_id}
                          </p>
                        </td>
                        <td>
                          <p>{elm?.tax_id_no}</p>
                          <p className={styles.light}>{elm?.CIN_no}</p>
                        </td>
                        <td>
                          <p>{elm?.type_of_business}</p>
                          <p className={styles.light}>
                            {elm?.address?.country}
                          </p>
                        </td>
                      </tr>
                    ))
                ) : (
                  <div className={styles.loaderContainer}>
                    <img src={loader} alt="" />
                  </div>
                )}

                {/* {tableData.map((data) => {
                  return (
                    <>
                      <tr>
                        <td>
                          <a href={data.customerLink}>{data.customerLink}</a>{" "}
                        </td>
                        <td>
                          <p>{data.mobile}</p>
                          <p>{data.email}</p>
                        </td>
                        <td>
                          <p>{data.pan}</p>
                          <p>{data.gstin}</p>
                        </td>
                        <td>
                          <p>{data.typeOfComp}</p>
                          <p>{data.compLocation}</p>
                        </td>
                      </tr>
                    </>
                  );
                })} */}
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
                    count={allCompanyData?.length}
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
            {tableStats.map((stats) => {
              return (
                <section>
                  <h4>{stats.statsHeader}</h4>
                  <span>{stats.statsNum}</span>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Company;
