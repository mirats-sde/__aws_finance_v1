import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { UseGlobalContext } from "../../globalContext/GlobalContext";
const CustomerContextProvider = createContext();
export const useCustomerContext = () => {
  return useContext(CustomerContextProvider);
};
const CustomerContext = ({ children }) => {
  const navigate = useNavigate();
  const { setSnackbar } = UseGlobalContext();
  const [customerInputData, setCustomerInputData] = useState({
    billing_address: { place_of_supply: "INTERNATIONAL" },
    shipping_address: { place_of_supply: "INTERNATIONAL" },
  });
  const [disableBTN, setDisableBTN] = useState(false);
  const [allCustomerData, setAllCustomerData] = useState([]);

  const handleChange = (e) => {
    setCustomerInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const customerBillingAddressChange = (e) => {
    setCustomerInputData((prev) => ({
      ...prev,
      billing_address: {
        ...prev.billing_address,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const customerShippingAddressChange = (e) => {
    setCustomerInputData((prev) => ({
      ...prev,
      shipping_address: {
        ...prev.shipping_address,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const getAllCustomerData = useCallback(() => {
    axios
      .get("https://finance.miratsoneservices.com/api/get-customer")
      .then((res) => {
        setAllCustomerData(res?.data);
      })
      .catch((err) => console.log(err));
  }, [allCustomerData]);
  useEffect(() => {
    getAllCustomerData();
  }, []);
  const submitAddCustomer = () => {
    console.log("submit");
    setDisableBTN(true);
    navigate("/clients");
    axios
      .post(
        "https://finance.miratsoneservices.com/api/create-customer",
        customerInputData
      )
      .then((res) => {
        console.log(res.data);
        axios.post(
          "https://finance.miratsoneservices.com/api/create-tax-information",
          {
            customer_id: res.data.customer_id,
            ...customerInputData?.tax_information,
          }
        );
        axios.post(
          "https://finance.miratsoneservices.com/api/create-billing-address",
          {
            customer_id: res.data.customer_id,
            ...customerInputData?.billing_address,
          }
        );
        axios.post(
          "https://finance.miratsoneservices.com/api/create-shipping_address",
          {
            customer_id: res.data.customer_id,
            ...customerInputData?.shipping_address,
          }
        );
        axios
          .post(
            "https://finance.miratsoneservices.com/api/create-customer-bank-details",
            {
              customer_id: res.data.customer_id,
              ...customerInputData?.bank_details,
            }
          )
          .then(
            (data) => getAllCustomerData(),
            setDisableBTN(false),
            setSnackbar({
              open: true,
              severity: "success",
              msg: "Customer Added Successfully!",
            })
          );
      })
      .catch((err) => console.log(err));

    //   .catch((err) => console.log(err));

    // axios
    //   .post("https://finance.miratsoneservices.com/api/create-customer", customerInputData)
    //   .then(() => alert("success"))
    //   .catch((err) => console.log(err));
  };
  const value = {
    handleChange,
    disableBTN,
    setDisableBTN,
    customerInputData,
    getAllCustomerData,
    setCustomerInputData,
    customerBillingAddressChange,
    customerShippingAddressChange,
    submitAddCustomer,
    allCustomerData,
    setAllCustomerData,
  };
  return (
    <CustomerContextProvider.Provider value={value}>
      {children}
    </CustomerContextProvider.Provider>
  );
};

export default CustomerContext;
