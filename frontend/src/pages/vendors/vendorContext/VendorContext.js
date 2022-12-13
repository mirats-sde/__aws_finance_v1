import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { UseGlobalContext } from "../../globalContext/GlobalContext";

const VendorContextProvider = createContext();
export const useVendorContext = () => {
  return useContext(VendorContextProvider);
};
const VendorContext = ({ children }) => {
  const navigate = useNavigate();
  const { setSnackbar } = UseGlobalContext();
  const [vendorInputData, setVendorInputData] = useState({});
  const [allVendorData, setAllVendorData] = useState([]);
  const [allVendorInvoice, setAllVendorInvoice] = useState([]);
  const [disableBTN, setDisableBTN] = useState(false);
  const vendorBillingAddressChange = (e) => {
    setVendorInputData((prev) => ({
      ...prev,
      billing_address: {
        ...prev.billing_address,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const vendorShippingAddressChange = (e) => {
    setVendorInputData((prev) => ({
      ...prev,
      shipping_address: {
        ...prev.shipping_address,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const handleChange = (e) => {
    setVendorInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submitAddVendor = () => {
    console.log("submit");
    setDisableBTN(true);
    navigate("/vendors");
    axios
      .post(
        "https://finance.miratsoneservices.com/api/create-vendor",
        vendorInputData
      )
      .then((res) => {
        console.log(res.data);
        axios.post(
          "https://finance.miratsoneservices.com/api/create-vendor-tax-information",
          {
            vendor_id: res.data.vendor_id,
            ...vendorInputData?.tax_information,
          }
        );
        axios.post(
          "https://finance.miratsoneservices.com/api/create-vendor-billing-address",
          {
            vendor_id: res.data.vendor_id,
            ...vendorInputData?.billing_address,
          }
        );
        axios.post(
          "https://finance.miratsoneservices.com/api/create-vendor-shipping-address",
          {
            vendor_id: res.data.vendor_id,
            ...vendorInputData?.shipping_address,
          }
        );
        axios
          .post(
            "https://finance.miratsoneservices.com/api/create-vendor-bank-details",
            {
              vendor_id: res.data.vendor_id,
              ...vendorInputData?.bank_details,
            }
          )
          .then((data) => {
            setDisableBTN(false);
            setSnackbar({
              open: true,
              severity: "success",
              msg: "vendor Added Successfully!",
            });
          });
      })
      .catch((err) => console.log(err));
  };
  const getVendors = (e) => {
    axios
      .get("https://finance.miratsoneservices.com/api/get-vendor")
      .then((res) => setAllVendorData(res.data))
      .catch((err) => console.log(err));
  };
  const getVendorInvoice = (e) => {
    axios
      .get("https://finance.miratsoneservices.com/api/get-vendor-invoice")
      .then((res) => setAllVendorInvoice(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getVendors();
    getVendorInvoice();
  }, []);
  const value = {
    allVendorData,
    setAllVendorData,
    vendorInputData,
    setVendorInputData,
    allVendorInvoice,
    setAllVendorInvoice,
    vendorBillingAddressChange,
    vendorShippingAddressChange,
    handleChange,
    submitAddVendor,
    getVendors,
    getVendorInvoice,
  };
  return (
    <VendorContextProvider.Provider value={value}>
      {children}
    </VendorContextProvider.Provider>
  );
};

export default VendorContext;
