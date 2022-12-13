import axios from "axios";
import { listAll, ref } from "firebase/storage";
import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { storage } from "../../FirebaseConfig";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const GlobalContextProvider = createContext();
export const UseGlobalContext = () => {
  return useContext(GlobalContextProvider);
};
const GlobalContext = ({ children }) => {
  const [bankTransaction, setBankTransaction] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "",
    msg: "",
  });
  const [getingImgFromFolder, setGetingImgFromFolder] = useState([]);
  const [exportExcel, setExportExcel] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);

  const getBankTransaction = () => {
    axios
      .get("https://finance.miratsoneservices.com/api/get-bank-transaction")
      .then((data) => {
        setBankTransaction(data?.data);
      });
  };

  useEffect(() => {
    getBankTransaction();
    listAll(ref(storage, ref(`bank_statement`))).then((res) => {
      res.prefixes.forEach((folderRef) => {
        setGetingImgFromFolder((prev) => [...prev, folderRef.name]);
      });
      res.items.forEach((itemref) => {
        console.log(itemref);
      });
    });
  }, []);

  // console.log(bankTransaction);
  let name = "sonumonu";
  const value = {
    bankTransaction,
    name,
    getingImgFromFolder,
    setGetingImgFromFolder,
    getBankTransaction,
    setSnackbar,
    disableBtn,
    setDisableBtn,
  };
  // snackbar
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ open: false });
  };
  return (
    <GlobalContextProvider.Provider value={value}>
      {children}
      <Snackbar
        open={snackbar?.open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar?.severity}
          sx={{ width: "100%" }}
        >
          {snackbar?.msg}
        </Alert>
      </Snackbar>
    </GlobalContextProvider.Provider>
  );
};

export default GlobalContext;
