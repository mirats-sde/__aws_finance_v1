import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const InvoiceContextProvider = createContext();
export const useInvoiceContext = () => {
  return useContext(InvoiceContextProvider);
};
const InvoiceContext = ({ children }) => {
  const [allCompanyData, setAllCompanyData] = useState([]);
  const [signatureData, setSignatureData] = useState([]);
  const [allInvoicesData, setAllInvoicesData] = useState([]);
  const fetchAllInvoicesData = useCallback(() => {
    axios
      .get("https://finance.miratsoneservices.com/api/get-company")
      .then((res) => setAllCompanyData(res?.data?.reverse()))
      .catch((err) => console.log(err));
  }, [allCompanyData]);
  const fetchAllCompanyData = useCallback(() => {
    axios
      .get("https://finance.miratsoneservices.com/api/get-invoice")
      .then((res) => setAllInvoicesData(res?.data?.reverse()))
      .catch((err) => console.log(err));
  }, [allInvoicesData]);
  function fetchAllSignatureData(e) {
    axios
      .get("https://finance.miratsoneservices.com/api/get-signature")
      .then((res) => setSignatureData(res?.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchAllInvoicesData();
    fetchAllCompanyData();
    fetchAllSignatureData();
  }, []);

  const value = {
    allCompanyData,
    allInvoicesData,
    setAllCompanyData,
    fetchAllCompanyData,
    fetchAllInvoicesData,
    fetchAllSignatureData,
    signatureData,
  };
  return (
    <InvoiceContextProvider.Provider value={value}>
      {children}
    </InvoiceContextProvider.Provider>
  );
};

export default InvoiceContext;
