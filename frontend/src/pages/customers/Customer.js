import { Link, useNavigate } from "react-router-dom";
import styles from "./customer.module.css";
import { useCustomerContext } from "./customerContex/CustomerContext";
import { styled } from "@mui/system";
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from "@mui/base/TablePaginationUnstyled";
import { useState } from "react";
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

const Customer = () => {
  const { allCustomerData, setAllCustomerData } = useCustomerContext();
  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - allCustomerData?.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const navigate = useNavigate();

  return (
    <>
      <Header />
      {
        <div className={styles.invoice_table_container}>
          <div className={styles.left_invoice_table}>
            <div className={styles.table_header}>
              <div className={styles.left_table_header}>
                <button onClick={() => navigate("/add-client")}>
                  Add Customers
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
                    <th>Name</th>
                    <th>Contact Info</th>
                    <th>Tax Information</th>
                    <th>Others</th>
                  </tr>
                </thead>
                <tbody>
                  {(rowsPerPage > 0
                    ? allCustomerData?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : allCustomerData
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
                          <Link to={`/customer-details/${elm?.customer_id}`}>
                            {elm?.company_name}
                          </Link>
                          <br />
                          <Link to={`/customer-details/${elm?.customer_id}`}>
                            <p className={styles.light}>{elm?.customer_name}</p>
                          </Link>
                        </td>
                        <td>
                          <p>{elm?.mobile_number}</p>
                          <p className={styles.light}>
                            {elm?.account_email_id}
                          </p>
                        </td>
                        <td>
                          <p>{elm?.tax_information?.PAN_number}</p>
                          <p className={styles.light}>{elm?.tax_id_number}</p>
                        </td>
                        <td>
                          <p>{elm?.type_of_business}</p>
                          <p className={styles.light}>
                            {elm?.billing_address?.country}
                          </p>
                        </td>
                      </tr>
                    ))}

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
                      count={allCustomerData?.length}
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
              {/* {allCustomerData.map((stats) => {
              return ( */}
              <section>
                <h4>Total Customers</h4>
                <span>{allCustomerData?.length}</span>
              </section>
              <section>
                <h4>GST Registered</h4>
                <span>
                  {
                    allCustomerData?.filter((data) => data?.tax_id_number)
                      ?.length
                  }
                </span>
              </section>
              <section>
                <h4>Unregistered</h4>
                <span>
                  {
                    allCustomerData?.filter((data) => !data?.tax_id_number)
                      ?.length
                  }
                </span>
              </section>
              {/* <section>
                <h4>Customers in last 30 days</h4>
                <span>
                  {
                    allCustomerData?.filter((data) => !data?.tax_id_number)
                      ?.length
                  }
                </span>
              </section> */}

              {/* );
            })} */}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Customer;
