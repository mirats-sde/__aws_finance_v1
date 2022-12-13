import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/header/Header";
import { storage } from "../../../FirebaseConfig";
import { UseGlobalContext } from "../../globalContext/GlobalContext";
import styles from "./BankStementDetails.module.css";
import { styled } from "@mui/system";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IoMdCloseCircleOutline } from "react-icons/io";
const BankStatementDetails = () => {
  const {
    getingImgFromFolder,
    setGetingImgFromFolder,
    bankTransaction,
    getBankTransaction,
    setSnackbar,
  } = UseGlobalContext();

  const [singlebankTransaction, setSinglebankTransaction] = useState([]);
  const [downloadURLs, setDownloadUrls] = useState([]);
  const [img, setImg] = useState([]);
  const [open, setOpen] = useState(false);
  const { transactionID } = useParams();

  console.log(singlebankTransaction);

  const navigate = useNavigate();

  const getsingleFolderImages = () => {
    setImg([]);
    listAll(ref(storage, `bank_statement/${transactionID}`)).then((res) =>
      res.items.forEach((data) => setImg((prev) => [...prev, data]))
    );
  };

  const getSingleBankTransaction = () => {
    console.log(bankTransaction);
    console.log(transactionID);
    return setSinglebankTransaction((prev) =>
      bankTransaction?.filter((data) => data?.transaction_id == transactionID)
    );
  };

  useEffect(() => {
    getsingleFolderImages();
    getSingleBankTransaction();
    // getSingleImageLink();
  }, [bankTransaction]);
  const addFiles = (e) => {
    uploadBytes(
      ref(storage, `bank_statement/${transactionID}/${transactionID}`),
      img
    )
      .then((data) => console.log(data), getBankTransaction())
      .catch((err) => console.log(err));

    handleClose();
  };
  const addAttachment = (e) => {
    uploadBytes(
      ref(
        storage,
        `bank_statement/${transactionID}/${e.target.files[0]?.name}`
      ),
      e.target.files[0]
    ).then(
      (res) => getsingleFolderImages(),
      setSnackbar({
        open: true,
        severity: "success",
        msg: "File Added Successfully!",
      })
    );
  };
  // modal

  const handleClose = () => {
    setOpen(false);
  };

  function deleteFile(e, cData) {
    e.stopPropagation();
    deleteObject(ref(storage, `bank_statement/${transactionID}/${cData?.name}`))
      .then(
        (res) => getsingleFolderImages(),
        setSnackbar({
          open: true,
          severity: "error",
          msg: "File Removed Successfully!",
        })
      )
      .catch((err) => console.log(err));
  }
  function showFile(cData) {
    getDownloadURL(
      ref(storage, `bank_statement/${transactionID}/${cData?.name}`)
    ).then((url) => window.open(url));
  }

  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        {singlebankTransaction?.map((data, ind) => (
          <>
            <div className={styles.modalLeftContainer}>
              {/* <a href={data?.image_url} target="_blank"> */}
              {img?.map((cData) => (
                <div className={styles.cards} onClick={() => showFile(cData)}>
                  <section>
                    {cData?.name.split(".")[1]?.toUpperCase()}{" "}
                    <span onClick={(e) => deleteFile(e, cData)}>
                      <IoMdCloseCircleOutline size={30} />
                    </span>
                  </section>
                  <p>{cData?.name}</p>
                </div>
              ))}
              {/* </a> */}
            </div>
            <div className={styles.modalRightContainer}>
              <div className={styles.innerRightDiv}>
                <p>Transaction ID :</p>
                <p>{data?.transaction_id}</p>
              </div>
              <div className={styles.innerRightDiv}>
                <p>Value Date :</p>
                <p>{new Date(data?.value_date)?.toDateString()}</p>
              </div>
              <div className={styles.innerRightDiv}>
                <p> Txn Posted Date :</p>
                <p>{data?.txn_posted_date}</p>
              </div>
              <div className={styles.innerRightDiv}>
                <p>Cheque No :</p>
                <p>{data?.Cheque_No}</p>
              </div>
              <div className={styles.innerRightDiv}>
                <p>Description:</p>
                <p>{data?.Description}</p>
              </div>
              <div className={styles.innerRightDiv}>
                <p> Cr/Dr :</p>
                <p>{data?.Cr_Dr}</p>
              </div>
              <div className={styles.innerRightDiv}>
                <p> Transaction Amount(INR):</p>
                <p>₹{data?.transaction_amount}</p>
              </div>
              <div className={styles.innerRightDiv}>
                <p>Available Balance(INR) :</p>
                <p>₹{data?.available_balance}</p>
              </div>
              <section className={styles.BTNConatainer}>
                <label>
                  <span
                    className={styles.downloadBillBTN}
                    // onClick={() => navigate(`/edit-expense/${data?.bill_id}`)}
                  >
                    Add Attachment
                  </span>
                  <input type="file" size="60" onChange={addAttachment} />
                </label>

                {/* <button
                  className={styles.downloadBillBTN}
                  //   onClick={(e) => handleSingleExcelExport(data)}
                >
                  Download Attachment
                </button> */}
              </section>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default BankStatementDetails;
