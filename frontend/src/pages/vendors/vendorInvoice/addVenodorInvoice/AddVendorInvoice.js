import React, { useState } from "react";
import styles from "./AddVendorInvoice.module.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestoredb, storage } from "../../../../FirebaseConfig";
import axios from "axios";
import Header from "../../../../components/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useVendorContext } from "../../vendorContext/VendorContext";

const AddVendorInvoice = () => {
  const { vendorInvoiceNumber } = useParams();
  const navigate = useNavigate();
  const { getVendorInvoice } = useVendorContext();
  const [invoiceInputData, setInvoiceInputData] = useState({});
  const getInvoiceInputData = (e) => {
    console.log("fetching invoice");
    axios
      .get(
        `https://finance.miratsoneservices.com/api/get-vendor-invoice/${vendorInvoiceNumber}`
      )
      .then((res) => setInvoiceInputData(res?.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getInvoiceInputData();
  }, []);
  const [invoiceFile, setInvoiceFile] = useState();
  const handleChange = (e) => {
    setInvoiceInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(vendorInvoiceNumber);
  console.log(invoiceInputData);
  console.log(invoiceFile);
  const submitVendorInvoice = (e) => {
    e.preventDefault();
    navigate("/vendor-invoice");
    uploadBytes(
      ref(
        storage,
        `Vendor-Invoice/${invoiceInputData?.invoiceNo}/${invoiceInputData?.invoiceNo}`
      ),
      invoiceFile
    ).then(async (snapshot) => {
      console.log(snapshot);
      getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        console.log("File available at", downloadURL);
        !vendorInvoiceNumber
          ? axios
              .post(
                "https://finance.miratsoneservices.com/api/create-vendor-invoice",
                {
                  ...invoiceInputData,
                  invoice_link: downloadURL,
                }
              )
              .then((data) => {
                console.log("data added successfully");
                getVendorInvoice();
              })
              .catch((err) => console.log(err))
          : axios
              .put(
                `https://finance.miratsoneservices.com/api/update-vendor-invoice/${vendorInvoiceNumber}`,
                {
                  ...invoiceInputData,
                  invoice_link: downloadURL,
                }
              )
              .then((data) => {
                console.log("data updated successfully");
                getVendorInvoice();
              })
              .catch((err) => console.log(err));
      });
    });
  };
  return (
    <>
      <Header />
      <div className={styles.invoice_container}>
        <h1 className={styles.intro_text}>Invoice Upload - Vendor</h1>
        <form className={styles.inVoiceForm}>
          <div className={styles.invoice_details}>
            <section className={styles.invoice_details_left}>
              <div className={styles.input_group}>
                <label htmlFor="uploadInvoice">Upload Invoice</label>
                <input
                  type="file"
                  name="uploadInvoice"
                  // value={}
                  onChange={(e) => setInvoiceFile(e.target.files[0])}
                />
              </div>
              <div className={styles.input_group}>
                <label htmlFor="poNo">PO Number</label>
                <input
                  type="text"
                  name="poNo"
                  value={invoiceInputData?.poNo}
                  placeholder="PO12345"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input_group}>
                <label htmlFor="amount">Amount </label>
                <input
                  type="number"
                  name="amount"
                  value={invoiceInputData?.amount}
                  // placeholder=""
                  onChange={handleChange}
                />
                {/* <select name="amount" id="amount" onChange={handleChange}>
                <option value="usd">USD</option>
                <option value="inr">INR</option>
                <option value="euro">EURO</option>
              </select> */}
              </div>
              <div className={styles.input_group}>
                <label htmlFor="status">Status</label>
                <select
                  name="status"
                  id="status"
                  value={invoiceInputData?.status}
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    select status
                  </option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
              <div className={styles.input_group}>
                <label htmlFor="invoice_date">Invoice Date</label>
                <input
                  type="date"
                  name="invoice_date"
                  value={invoiceInputData?.invoice_date}
                  // placeholder=""
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input_group}>
                <label htmlFor="due_date">Due Date</label>
                <input
                  type="date"
                  name="due_date"
                  value={invoiceInputData?.due_date}
                  // placeholder=""
                  onChange={handleChange}
                />
              </div>
            </section>
            <section className={styles.invoice_details_right}>
              <div className={styles.input_group}>
                <label htmlFor="invoiceNo">Vendor Invoice Number</label>
                <input
                  type="text"
                  name="invoiceNo"
                  value={invoiceInputData?.invoiceNo}
                  // placeholder="VN09876"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input_group}>
                <label htmlFor="refSubLine">Reference Subject Line</label>
                <input
                  type="text"
                  name="refSubLine"
                  value={invoiceInputData?.refSubLine}
                  placeholder="Subject Line"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input_group}>
                <label htmlFor="billTo">Bill To</label>
                <input
                  type="text"
                  name="billTo"
                  value={invoiceInputData?.billTo}
                  placeholder="Bill To"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.input_group}>
                <label htmlFor="additionalNote">Additional Note</label>
                <textarea
                  name="additionalNote"
                  value={invoiceInputData?.additionalNote}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className={styles.input_group}>
                <label htmlFor="client_status">Client Status</label>
                <input
                  type="text"
                  name="client_status"
                  value={invoiceInputData?.client_status}
                  // placeholder=""
                  onChange={handleChange}
                />
              </div>
            </section>
          </div>
          <button onClick={submitVendorInvoice}>Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddVendorInvoice;
