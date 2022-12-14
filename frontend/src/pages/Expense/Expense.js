import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import styles from "./Expense.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { firestoredb, storage } from "../../FirebaseConfig";
import { styled } from "@mui/system";
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from "@mui/base/TablePaginationUnstyled";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import { utils, writeFile } from "xlsx";
import moment from "moment";
import { ImBin } from "react-icons/im";
import { deleteObject, listAll, ref } from "firebase/storage";
import { UseGlobalContext } from "../globalContext/GlobalContext";
const Expense = () => {
  const navigate = useNavigate();
  const [expenseData, setExpenseData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [singleExpense, setSingleExpense] = useState([]);
  // console.log(searchQuery);
  const { setSnackbar } = UseGlobalContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [exportExcel, setExportExcel] = useState([]);
  const [filter, setFilters] = useState({});
  const getExpenseData = async () => {
    await getDocs(query(collection(firestoredb, "expenses"))).then((doc) => {
      setExpenseData([]);
      doc.forEach((data) => {
        console.log(data.data().bill_id);
        setExpenseData((prev) => [...prev, { ...data.data() }]);
        setExportExcel((prev) => [...prev, { ...data.data() }]);
      });
    });
  };
  const getExcelData = async () => {
    let wb = utils.readFile(
      await (await fetch("../../assets/data.xlsx")).arrayBuffer()
    );
    console.log(wb);
  };
  useEffect(() => {
    getExpenseData();
    getExcelData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
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
        background-color: ${
          theme.palette.mode === "dark" ? grey[800] : grey[50]
        };
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
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // mui modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = (elm) => {
    setOpen(true);
    setSingleExpense([elm]);
  };

  const handleClose = () => {
    setOpen(false);
    setSingleExpense([]);
  };
  const today = moment();
  const daysFilter = moment().subtract(Number(filter?.days), "days");

  const sevenDaysBefore = moment().subtract(7, "days");

  console.log("Today is " + today.format("MMM Do YYYY"));
  console.log(
    "Is " + today.format("MMM Do YYYY") + " included in the last seven days?"
  );
  console.log(today.isBetween(sevenDaysBefore, today, "day", "[]"));

  const handleExportToExcel = (e) => {
    var elt = document.getElementById("table-to-xls-DATA");
    var wb = utils.table_to_book(elt, { sheet: "Sheet JS" });
    return writeFile(wb, `Expenses.xlsx`);
  };

  const handleDateFilterChange = (e) => {
    setMonthFilter(e.target.value);
    e.target.value !== "" ? setRowsPerPage(-1) : setRowsPerPage(10);
  };
  const handleDaysFillterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    e.target.value !== "" ? setRowsPerPage(-1) : setRowsPerPage(10);
  };
  const handleSingleExcelExport = (data) => {
    var wb = utils.book_new(),
      ws = utils.json_to_sheet([data]);
    utils.book_append_sheet(wb, ws, "Sheet1");
    writeFile(wb, `All-Vendors-Bills.xlsx`);
  };
  const handleYearExcelChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    e.target.value !== "" ? setRowsPerPage(-1) : setRowsPerPage(10);
  };

  // console.log(filter);
  // console.log(expenseData);
  // console.log(new Date(daysFilter?._d)?.toDateString());
  async function deleteExpense(data) {
    await deleteDoc(doc(firestoredb, "expenses", String(data?.bill_id)))
      .then((res) =>
        listAll(ref(storage, `expense/${data?.bill_id}`)).then((res) => {
          res.items.forEach((itemref) => {
            deleteObject(itemref)
              .then((res) => {
                setSnackbar({
                  open: true,
                  msg: "Expense Deleted Successfully!",
                  severity: "error",
                });
                setOpen(false);
                getExpenseData();
              })
              .catch((er) => {
                setSnackbar({
                  open: true,
                  msg: "Expense Deleted Successfully!",
                  severity: "error",
                });
                setOpen(false);
                getExpenseData();
              });
          });
        })
      )
      .catch((err) => console.log(err));

    // deleteObject(ref(storage, `expense/${data?.bill_id}`))
    //   .then(() => alert("success"))
    //   .catch((err) => console.log(err));
  }
  return (
    <>
      <Header />

      <div className={styles.invoice_table_container}>
        <div className={styles.left_invoice_table}>
          <div className={styles.table_header}>
            <div className={styles.left_table_header}>
              <button onClick={() => navigate("/add-expense")}>
                Add Expense
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
              <select name="days" onChange={handleDaysFillterChange}>
                <option value="" diabled selected>
                  Select: Days
                </option>
                <option value="7">1 Week</option>
                <option value="30">1 Month</option>
                <option value="90">3 Months</option>
                <option value="180">6 Months</option>
              </select>
              <select name="year" onChange={handleYearExcelChange}>
                <option value="" selected>
                  Select : Year
                </option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
              </select>
              <select name="filterByMonth" onChange={handleDateFilterChange}>
                <option value="" selected>
                  Filter: All
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
                <option value="9">November</option>
                <option value="10">December</option>
              </select>

              <BsFileEarmarkArrowDown
                size={29}
                onClick={handleExportToExcel}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>

          <div className={styles.invoice_table}>
            <table id="table-to-xls-DATA">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Bill Amount</th>
                  <th>Expense Nature</th>
                  <th>Payment Method</th>
                  <th>Bill Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(rowsPerPage > 0
                  ? expenseData?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : expenseData
                )

                  ?.filter((cData) =>
                    !searchQuery
                      ? cData
                      : cData?.company_name
                          ?.toLowerCase()
                          ?.includes(searchQuery?.toLowerCase())
                  )
                  ?.filter((mFilter) =>
                    !monthFilter
                      ? mFilter
                      : new Date(mFilter?.selected_date).getMonth() ==
                        monthFilter
                  )
                  ?.filter((dFilter) =>
                    !filter?.year
                      ? dFilter
                      : new Date(dFilter?.selected_date).getFullYear() ==
                        filter?.year
                  )
                  ?.filter((Qfilter) =>
                    !filter?.days
                      ? Qfilter
                      : new Date(Qfilter?.selected_date) >=
                        new Date(daysFilter?._d)
                  )
                  ?.map((elm, ind) => (
                    <>
                      <tr key={ind}>
                        <td onClick={() => handleOpen(elm)}>
                          {elm?.company_name}

                          <br />
                          {/* <p className={styles.light}>{elm?.company_email_id}</p> */}
                        </td>
                        <td style={{ textAlign: "start" }}>
                          <p>₹ {elm?.bill_amount}</p>
                          {/* <p className={styles.light}>{elm?.account_email_id}</p> */}
                        </td>
                        <td>
                          <p>{elm?.expense_nature}</p>
                          {/* <p className={styles.light}>{elm?.CIN_no}</p> */}
                        </td>
                        <td>
                          <p>{elm?.payment_method}</p>
                          {/* <p className={styles.light}>{elm?.address?.country}</p> */}
                        </td>
                        <td>
                          <p>
                            {/* {new Date(elm?.selected_date)?.toLocaleDateString()} */}
                            {new Date(elm?.selected_date)?.toDateString()}
                          </p>
                        </td>
                        {/* <img src={elm?.image_url} alt="" /> */}
                      </tr>
                    </>
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
                    count={expenseData?.length}
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.modalContainer}>
              {singleExpense?.map((data, ind) => (
                <>
                  <div className={styles.modalLeftContainer}>
                    <a href={data?.image_url} target="_blank">
                      <img src={data?.image_url} alt="" />
                    </a>
                  </div>
                  <div className={styles.modalRightContainer}>
                    <div className={styles.innerRightDiv}>
                      <p>Company Name :</p>
                      <p>{data?.company_name}</p>
                    </div>
                    <div className={styles.innerRightDiv}>
                      <p>Bill Amount :</p>
                      <p>₹{data?.bill_amount}</p>
                    </div>
                    <div className={styles.innerRightDiv}>
                      <p>Expense Nature :</p>
                      <p>{data?.expense_nature}</p>
                    </div>
                    <div className={styles.innerRightDiv}>
                      <p>Payment Method :</p>
                      <p>{data?.payment_method}</p>
                    </div>
                    <div className={styles.innerRightDiv}>
                      <p>Bill Date :</p>
                      <p>{data?.selected_date}</p>
                    </div>
                    <div className={styles.innerRightDiv}>
                      <p>Bill Description :</p>
                      <p>{data?.description}</p>
                    </div>
                    <div className={styles.innerRightDiv}>
                      <p>GST Number:</p>
                      <p>{data?.GST_number}</p>
                    </div>
                    <div className={styles.innerRightDiv}>
                      <p>Uploaded By :</p>
                      <p>{data?.uploaded_by}</p>
                    </div>
                    <section className={styles.BTNConatainer}>
                      <button
                        className={styles.downloadBillBTN}
                        onClick={() =>
                          navigate(`/edit-expense/${data?.bill_id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className={styles.downloadBillBTN}
                        onClick={(e) => handleSingleExcelExport(data)}
                      >
                        Download Bill
                      </button>
                      <button
                        className={styles.downloadBillBTN}
                        onClick={(e) => deleteExpense(data)}
                      >
                        <ImBin />
                      </button>
                    </section>
                  </div>
                </>
              ))}
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Expense;
