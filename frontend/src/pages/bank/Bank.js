import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { utils, writeFile } from "xlsx";
import Header from "../../components/header/Header";
import { UseGlobalContext } from "../globalContext/GlobalContext";
import styles from "./Bank.module.css";
import { BsFileEarmarkArrowDown } from "react-icons/bs";
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes,
} from "@mui/base/TablePaginationUnstyled";
import { styled } from "@mui/system";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { GrView, GrAttachment } from "react-icons/gr";
import { listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../FirebaseConfig";
import { useEffect } from "react";
import loader from "../../assets/loader.gif";

const Bank = () => {
  const { bankTransaction, getBankTransaction, name, setSnackbar } =
    UseGlobalContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [singleExpense, setSingleExpense] = useState([]);
  const [open, setOpen] = useState(false);
  const { getingImgFromFolder, setGetingImgFromFolder } = UseGlobalContext();
  // console.log(searchQuery);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filter, setFilters] = useState({});
  const [attachment, setAttachment] = useState([]);
  const [singleStatement, setSingleStatement] = useState([]);
  const today = moment();
  const daysFilter = moment().subtract(Number(filter?.days), "days");

  const getExcelData = async () => {
    let wb = utils.readFile(
      await (await fetch("../../assets/data.xlsx")).arrayBuffer()
    );
    console.log(wb);
  };
  // mui modal
  const style = {
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
  // open
  const handleOpen = (elm) => {
    setOpen(true);
    setSingleStatement(elm);
  };
  const handleClose = () => {
    setOpen(false);
    setSingleExpense([]);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // excel convert
  const handleExportToExcel = () => {
    var elt = document.getElementById("table-to-xls-DATA");
    var wb = utils.table_to_book(elt, { sheet: "Sheet JS" });
    return writeFile(wb, `Bank-Transaction.xlsx`);
  };
  // filter Change

  const handleDaysFillterChange = (e) => {
    e.target.value !== "" ? setRowsPerPage(-1) : setRowsPerPage(10);
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleYearExcelChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    e.target.value !== "" ? setRowsPerPage(-1) : setRowsPerPage(10);
  };
  const handleDateFilterChange = (e) => {
    setMonthFilter(e.target.value);
    e.target.value !== "" ? setRowsPerPage(-1) : setRowsPerPage(10);
  };
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

  // console.log(bankTransaction);
  // console.log(new Date(bankTransaction[9]?.value_date?.split(" ")[0]));
  // console.log(new Date(bankTransaction[0]?.value_date));
  // console.log(new Date(bankTransaction[0]?.value_date));
  // console.log(filter);
  // console.log(monthFilter);
  // console.log(new Date(daysFilter._d));
  const modalOpener = (elm) => {
    handleOpen(elm);
  };
  const addAttachment = (e, elm) => {
    console.log(elm);
    setAttachment([...e.target.files]);
    modalOpener(elm);
  };
  const addFiles = (e, elm) => {
    for (let i = 0; i < attachment?.length; i++) {
      uploadBytes(
        ref(
          storage,
          `bank_statement/${singleStatement?.transaction_id}/${attachment[i]?.name}`
        ),
        attachment[i]
      )
        .then(
          (data) => getBankTransaction(),
          setSnackbar({
            open: true,
            severity: "success",
            msg: "File Added Successfully!",
          })
        )
        .catch((err) => console.log(err));
    }
    handleClose();
  };

  // console.log(getingImgFromFolder);
  // console.log(singleStatement);
  // console.log(attachment);
  return (
    <div>
      <Header />{" "}
      <div className={styles.invoice_table_container}>
        <div className={styles.left_invoice_table}>
          <div className={styles.table_header}>
            <div className={styles.left_table_header}>
              <button onClick={() => navigate("/convert")}>
                Add Statement
              </button>
              <input
                type="search"
                className={styles.icon}
                placeholder="Search by transaction ID"
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
                <option value="" selected>
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
                  <th>No</th>
                  <th>Transaction ID</th>
                  <th>Value Date </th>
                  <th>Txn Posted Date</th>
                  <th>Cheque No. </th>
                  <th>Description</th>
                  <th> Cr/Dr </th>
                  <th> Transaction Amount(INR)</th>
                  <th> Available Balance(INR)</th>
                </tr>
              </thead>
              <tbody>
                {bankTransaction?.length ? (
                  (rowsPerPage > 0
                    ? bankTransaction?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : bankTransaction
                  )

                    ?.filter((cData) =>
                      !searchQuery
                        ? cData
                        : cData?.transaction_id
                            ?.toLowerCase()
                            ?.includes(searchQuery?.toLowerCase())
                    )
                    ?.filter((mFilter) =>
                      !monthFilter
                        ? mFilter
                        : new Date(mFilter?.value_date).getMonth() ==
                          monthFilter
                    )
                    ?.filter((dFilter) =>
                      !filter?.year
                        ? dFilter
                        : new Date(dFilter?.value_date).getFullYear() ==
                          filter?.year
                    )
                    ?.filter((Qfilter) =>
                      !filter?.days
                        ? Qfilter
                        : new Date(Qfilter?.value_date) >=
                          new Date(daysFilter?._d)
                    )
                    ?.map((elm, ind) => (
                      <React.Fragment key={ind}>
                        <tr>
                          <td>
                            {elm?.bank_transaction_id}
                            <br />
                          </td>
                          <td>
                            {elm?.transaction_id}
                            <br />
                          </td>
                          <td>
                            <p>{new Date(elm?.value_date)?.toDateString()}</p>
                          </td>
                          <td>
                            <p>{elm?.txn_posted_date}</p>
                          </td>
                          <td>
                            <p>{elm?.Cheque_No}</p>
                          </td>

                          <td>
                            <p>{elm?.Description}</p>
                            {/* <p className={styles.light}>{elm?.address?.country}</p> */}
                          </td>
                          <td>
                            <p>{elm?.Cr_Dr}</p>
                          </td>
                          <td>
                            <p>₹{elm?.transaction_amount}</p>
                          </td>
                          <td>
                            <p>₹{elm?.available_balance}</p>
                          </td>
                          <td className={styles.file_attachment}>
                            {getingImgFromFolder?.includes(
                              elm?.transaction_id
                            ) ? (
                              <GrView
                                onClick={() =>
                                  navigate(
                                    `/bank-statement-details/${elm?.transaction_id}`
                                  )
                                }
                                style={{ cursor: "pointer" }}
                              />
                            ) : (
                              <label>
                                <GrAttachment style={{ cursor: "pointer" }} />
                                <input
                                  type="file"
                                  size="60"
                                  multiple
                                  onChange={(e) => addAttachment(e, elm)}
                                />
                              </label>
                            )}
                          </td>
                        </tr>
                      </React.Fragment>
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
                    count={bankTransaction?.length}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.modalContainer}>
            <h3>
              Do You Want To ADD
              {attachment?.map((data, inn) => (
                <p key={inn}>{data?.name}</p>
              ))}
              ?
            </h3>
            <div className={styles.BTNConatainer}>
              <button
                className={styles.downloadBillBTN}
                onClick={(e) => addFiles(e)}
              >
                Add
              </button>
              <button
                className={styles.downloadBillBTN}
                onClick={(e) => handleClose()}
              >
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Bank;
