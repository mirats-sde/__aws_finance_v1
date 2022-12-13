import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/header/Header";
import { useCustomerContext } from "../../customers/customerContex/CustomerContext";
import { useInvoiceContext } from "../../invoices/invoiceContext/InvoiceContext";
import styles from "./companyDetails.module.css";
import { ImBin } from "react-icons/im";
import axios from "axios";
import { UseGlobalContext } from "../../globalContext/GlobalContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const CompanyDetails = () => {
  const { companyID } = useParams();
  const {
    allInvoicesData,
    submitAddCustomer,
    allCompanyData,
    setAllCompanyData,
    fetchAllInvoicesData,
  } = useInvoiceContext();
  const { setSnackbar } = UseGlobalContext();
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const navigate = useNavigate();
  const {
    allCustomerData,
    handleChange,
    customerInputData,
    setCustomerInputData,
    customerBillingAddressChange,
    customerShippingAddressChange,
    getAllCustomerData,
  } = useCustomerContext();

  let company = allCompanyData?.filter((cust) => cust?.company_id == companyID);
  let invoice = allInvoicesData?.filter(
    (iData) => iData?.company_id == companyID
  );
  console.log(company);
  const handleOpen = (e) => {
    navigate(`/edit-company/${company[0]?.company_id}`);
  };
  function deleteCompany(data) {
    console.log(data);
    axios
      .delete(
        `https://finance.miratsoneservices.com/api/delete-company/${data?.company_id}`
      )
      .then(
        (res) => navigate("/companies"),
        setSnackbar({
          open: true,
          severity: "error",
          msg: "Company Deleted Successfully!",
        }),
        setAllCompanyData((prevData) => {
          return prevData.filter(
            (companyData) => companyData?.company_id !== data?.company_id
          );
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
            {company?.map((custData, ind) => (
              <div className={styles.customerLeftContent}>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>Name</h3>
                    <h3 onClick={handleOpen}>{custData?.company_name}</h3>
                  </div>
                </section>
                <span className={styles.deleteBTN}>
                  <ImBin
                    size={20}
                    style={{ cursor: "pointer" }}
                    onClick={() => setConfirmDeleteModal(true)}
                  />
                </span>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>Email</h3>
                    <h3 onClick={handleOpen}>{custData?.company_email_id}</h3>
                  </div>
                </section>

                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>GST</h3>
                    <h3 onClick={handleOpen}>{custData?.tax_id_no}</h3>
                  </div>
                </section>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>CRN</h3>
                    <h3 onClick={handleOpen}>
                      {custData?.company_registration_number}
                    </h3>
                  </div>
                </section>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    {console.log(custData)}
                    <h3>
                      {custData?.company_name?.endsWith("LLC") ? "EIN" : "CIN"}
                    </h3>
                    <h3 onClick={handleOpen}>{custData?.CIN_no}</h3>
                  </div>
                </section>

                {custData?.LUT_code !== "" ? (
                  <section className={styles.leftRow}>
                    <div className={styles.border}>
                      <h3>LUT code</h3>
                      <h3 onClick={handleOpen}>{custData?.LUT_code}</h3>
                    </div>
                  </section>
                ) : null}

                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>Address</h3>
                    <h3 onClick={handleOpen}>
                      {custData?.address ? (
                        <>
                          {custData?.address?.street1} <br />
                          {custData?.address?.street2} <br />
                          {custData?.address?.area}, {custData?.address?.city},
                          {custData?.address?.state}
                        </>
                      ) : (
                        <p onClick={handleOpen}>Add Billing Address</p>
                      )}
                    </h3>
                  </div>
                </section>

                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>Bank</h3>
                    <h3 onClick={handleOpen}>
                      {" "}
                      {custData?.bank_detail?.bank_name}{" "}
                    </h3>
                  </div>
                </section>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>Account Number</h3>
                    <h3 onClick={handleOpen}>
                      {" "}
                      {custData?.bank_detail?.account_number}{" "}
                    </h3>
                  </div>
                </section>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>IFSC Code</h3>
                    <h3 onClick={handleOpen}>
                      {" "}
                      {custData?.bank_detail?.IFSC_code}{" "}
                    </h3>
                  </div>
                </section>
                <section className={styles.leftRow}>
                  <div className={styles.border}>
                    <h3>SWIFT Code</h3>
                    <h3 onClick={handleOpen}>
                      {" "}
                      {custData?.bank_detail?.SWIFT_code}{" "}
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
          {/* <div className={styles.customerRightContainer}>
          <div className={styles.customerLeftContent}>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Number</th>
                  <th>Debit</th>
                  <th>Credit</th>
                </tr>
              </thead>
              <tbody>
                {invoice?.map((data, i) => (
                  <tr key={i}>
                    <td>{data?.invoice_date}</td>
                    <td>Invoice #{data?.invoice_number}</td>
                    <td>{data?.total_amount}</td>
                    <td>{data?.creditAmt ? data?.creditAmt : "-"}</td>
                  </tr>
                ))}
                <tr>
                  <td className={styles.center_bold} colSpan={2}>
                    Total
                  </td>
                  <td className={styles.bold}>totalAmt</td>
                  <td className={styles.bold}>
                    {invoice?.reduce(
                      (acc, cur) => (acc = acc + Number(cur?.total_amount)),
                      0
                    )}
                  </td>
                </tr>
                <tr>
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
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;
