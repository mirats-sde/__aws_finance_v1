import classNames from "classnames";
import { useState } from "react";
import styles from "./AddVendors.module.css";
import cx from "classnames";
import { RiCloseFill } from "react-icons/ri";
import React, { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useCustomerContext } from "../../customers/customerContex/CustomerContext";
import Header from "../../../components/header/Header";
import { useVendorContext } from "../vendorContext/VendorContext";
const tabData = [
  {
    id: 1,
    tabName: "Information",
  },
  {
    id: 2,
    tabName: "Banking & Taxes",
  },
];

const addressTabData = [
  {
    id: 1,
    tabName: "Billing Address",
  },
  {
    id: 2,
    tabName: "Shipping Address",
  },
];

const titleData = [
  "Title",
  "Mr",
  "Mrs",
  "Miss",
  "Ms",
  "Dr",
  "M/s",
  "Prof",
  "CA",
  "CS",
  "CWA",
  "ADV",
  "ER",
  "CMA",
];

const typeOfCustomer = [
  "Individual",
  "Proprietorship",
  "Partnership",
  "Hindu Undivided Family",
  "Private Limited Company",
  "Public Limited Company",
  "One Person Company",
  "Society/Club/Trust/Association of Persons",
  "Government Department",
  "Public Sector Undertaking",
  "Unlimited Company",
  "Limited Liability Partnership",
  "Local Authority",
  "Statutory Body",
  "Foreign Limited Liability Partnership",
  "Foreign Company Registered (in India)",
  "Others",
];

const stateList = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Andaman and Nicobar Islands",
  "Bihar",
  "Chhattisgarh",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Pondicherry",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
const AddVendor = () => {
  let [tab, setTab] = useState("Information");

  const { submitAddVendor, disableBTN } = useVendorContext();

  const getCorrectPage = (tab) => {
    switch (tab) {
      case "Information":
        return <Information />;
      case "Banking & Taxes":
        return <BankingTaxes />;
      default:
    }
  };

  return (
    <>
      <Header />
      <div className={styles.add_customer_container}>
        <div className={styles.customer_onboarding}>
          <p className={styles.onboarding_text}>New Vendor Onboarding</p>
          {/* tabs */}
          <div className={styles.tabContainer}>
            {tabData.map((i) => {
              return (
                <>
                  <h2
                    // className={`inactiveTab ${tab === i.tabName && "activetab"}  `}
                    className={cx(styles.tablight, {
                      [styles.tabactive]:
                        tab === i.tabName ? styles.tabactive : "",
                    })}
                    onClick={() => {
                      setTab(i.tabName);
                    }}
                  >
                    {i.tabName}
                  </h2>
                </>
              );
            })}
          </div>
          <div className={styles.actionBtns}>
            <button disabled={disableBTN} onClick={submitAddVendor}>
              <span>+</span> Save
            </button>
          </div>
        </div>

        <div className={styles.tabComponent}>{getCorrectPage(tab)}</div>
      </div>
    </>
  );
};
const Information = () => {
  let [addressTab, setAddressTab] = useState("Billing Address");
  const { vendorInputData, setVendorInputData } = useVendorContext();
  const getCorrectPage = (addressTab) => {
    switch (addressTab) {
      case "Billing Address":
        return <BilingAddress />;
      case "Shipping Address":
        return <ShippingAddress />;
      default:
        return;
    }
  };
  const customerInfoChange = (e) => {
    setVendorInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <div className={styles.customer_information_container}>
        <div className={styles.customer_information}>
          <section className={styles.left_inputs}>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Customer Name *"
                name="vendor_name"
                value={vendorInputData?.vendor_name}
                onChange={(e) =>
                  setVendorInputData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="number"
                placeholder="Mobile Number"
                name="mobile_number"
                value={vendorInputData?.mobile_number}
                onChange={customerInfoChange}
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Customer GSTIN"
                name="tax_id_number"
                value={vendorInputData?.tax_id_number}
                onChange={customerInfoChange}
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Company Name"
                name="company_name"
                value={vendorInputData?.company_name}
                onChange={customerInfoChange}
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="number"
                placeholder="Phone Number"
                name="phone_number"
                value={vendorInputData?.phone_number}
                onChange={customerInfoChange}
              />
            </div>
          </section>
          <section className={styles.right_inputs}>
            <div className={styles.input_group}>
              <select
                name="type_of_business"
                value={vendorInputData?.type_of_business}
                onChange={customerInfoChange}
              >
                <option value="" selected disabled>
                  Select Business Type
                </option>
                {typeOfCustomer.map((type) => {
                  return <option value={type}>{type}</option>;
                })}
              </select>
            </div>
            <div className={styles.input_group}>
              <input
                type="email"
                placeholder="Email"
                name="account_email_id"
                value={vendorInputData?.account_email_id}
                onChange={customerInfoChange}
              />
            </div>
            <div className={styles.input_group}>
              <section className={styles.gst}>
                <input
                  type="text"
                  placeholder="GST Registered Name"
                  name="GST_registered_name"
                  value={vendorInputData?.GST_registered_name}
                  onChange={customerInfoChange}
                />{" "}
                {/* <a href="/">Filing Status</a> */}
              </section>
            </div>

            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Fax"
                name="fax"
                value={vendorInputData?.fax}
                onChange={customerInfoChange}
              />
            </div>
          </section>
        </div>

        {/* tabs */}
        <div className={styles.tabContainer}>
          {addressTabData.map((i) => {
            return (
              <>
                <h2
                  // className={`inactiveTab ${tab === i.tabName && "activetab"}  `}

                  className={cx(styles.tablight, {
                    [styles.tabactive]:
                      addressTab === i.tabName ? styles.tabactive : "",
                  })}
                  onClick={() => {
                    setAddressTab(i.tabName);
                  }}
                >
                  {i.tabName}
                </h2>
              </>
            );
          })}
        </div>
        <div className={styles.tabComponent}>{getCorrectPage(addressTab)}</div>
      </div>
    </>
  );
};

const BankingTaxes = () => {
  //   const [setVendorInputData, vendorInputData] = useState();
  const { vendorInputData, setVendorInputData } = useVendorContext();
  const handleCustomerBankingChange = (e) => {
    setVendorInputData((prev) => ({
      ...prev,
      bank_details: {
        ...prev?.bank_details,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const handleCustomerTaxChange = (e) => {
    setVendorInputData((prev) => ({
      ...prev,
      tax_information: {
        ...prev?.tax_information,
        [e.target.name]: e.target.value,
      },
    }));
  };
  console.log(vendorInputData);
  return (
    <>
      <div className={styles.banking_taxes}>
        <div className={styles.customer_information}>
          <section className={styles.left_inputs}>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Account Name"
                name="account_name"
                onChange={handleCustomerBankingChange}
                value={vendorInputData?.bank_details?.account_name}
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="IFSC Code"
                name="IFSC_code"
                onChange={handleCustomerBankingChange}
                value={vendorInputData?.bank_details?.IFSC_code}
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Bank Name"
                name="bank_name"
                onChange={handleCustomerBankingChange}
                value={vendorInputData?.bank_details?.bank_name}
              />
            </div>
          </section>
          <section className={styles.right_inputs}>
            <div className={styles.input_group}>
              <input
                type="number"
                placeholder="Account Number"
                name="account_number"
                onChange={handleCustomerBankingChange}
                value={vendorInputData?.bank_details?.account_number}
              />
            </div>
            <div className={styles.input_group}>
              <select
                name="account_type"
                onChange={handleCustomerBankingChange}
                value={vendorInputData?.bank_details?.account_type}
              >
                <option value="" selected disabled>
                  Select Account Type
                </option>
                <option value="Savings Account">Savings Account</option>
                <option value="Current Account">Current Account</option>
                <option value="Overdraft Account">Overdraft Account</option>
              </select>
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Branch Name"
                name="branch_name"
                value={vendorInputData?.bank_details?.branch_name}
                onChange={handleCustomerBankingChange}
              />
            </div>
          </section>
        </div>

        <div className={styles.tax_information}>
          <h2 className={styles.tax_text}>Tax Information</h2>
          <div className={styles.customer_information}>
            <section className={styles.left_inputs}>
              <div className={styles.input_group}>
                <input
                  type="text"
                  placeholder="PAN"
                  name="PAN_number"
                  value={vendorInputData?.tax_information?.PAN_number}
                  onChange={handleCustomerTaxChange}
                />
              </div>
              <div className={styles.input_group}>
                {/* <select      name="PAN_number"
                    onChange={handleCustomerTaxChange}>
                    <option value="">TDS Not Applicable</option>
                  </select> */}
                <input
                  type="text"
                  placeholder="TDS Percentage"
                  name="TDS_percentage"
                  value={vendorInputData?.tax_information?.TDS_percentage}
                  onChange={handleCustomerTaxChange}
                />
              </div>
              <div className={styles.input_group}>
                {/* <select name="" id=""      onChange={handleCustomerTaxChange}>
                    <option value="">- Bank Name -</option>
                  </select> */}
                <input
                  type="text"
                  placeholder="bank_name"
                  name="bank_name"
                  value={vendorInputData?.tax_information?.bank_name}
                  onChange={handleCustomerTaxChange}
                />
              </div>
              {/* <div className={styles.input_group}>
                  <select name="" id="">
                    <option value="">Not Applicable</option>
                  </select>
                </div> */}
            </section>
            <section className={styles.right_inputs}>
              <div className={styles.input_group}>
                <input
                  type="text"
                  placeholder="TAN"
                  name="TAN_number"
                  onChange={handleCustomerTaxChange}
                  value={vendorInputData?.tax_information?.TAN_number}
                />
              </div>
              <div className={styles.input_group}>
                <select
                  name="currency_type"
                  onChange={handleCustomerTaxChange}
                  value={vendorInputData?.tax_information?.currency_type}
                >
                  <option value="" disabled selected>
                    Select Currency
                  </option>
                  <option value="Indian Rupee">Indian Rupee</option>
                  <option value="USD">USD</option>
                  <option value="Euro">Euro</option>
                </select>
              </div>
              {/* <div className={styles.input_group}>
                  <select name="" id="">
                    <option value="no">NO</option>
                    <option value="yes">YES</option>
                  </select>
                </div> */}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

const BilingAddress = () => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const { vendorInputData, setVendorInputData, vendorBillingAddressChange } =
    useVendorContext();
  const changeHandler = (value) => {
    setValue(value);
    setVendorInputData((prev) => ({
      ...prev,
      billing_address: {
        ...prev?.billing_address,
        country: value.label,
      },
    }));
    console.log(value);
  };

  const [selected, setSelected] = useState("");
  console.log(vendorInputData);
  const handleCountrySelect = (e) => {
    setSelected(e.target.value);
  };
  return (
    <>
      <div className={styles.biling_address_container}>
        <div className={styles.customer_information}>
          <section className={styles.left_inputs}>
            <div className={styles.input_group}>
              <input
                type="text"
                name="street1"
                placeholder="Address Line 1"
                value={vendorInputData?.billing_address?.street1}
                onChange={vendorBillingAddressChange}
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="City"
                name="city"
                onChange={vendorBillingAddressChange}
                value={vendorInputData?.billing_address?.city}
              />
            </div>
            <div className={styles.input_group}>
              {value?.label !== "India" ? (
                <input
                  name="place_of_supply"
                  type="text"
                  onChange={vendorBillingAddressChange}
                  value={vendorInputData?.billing_address?.place_of_supply}
                ></input>
              ) : (
                <select
                  name="place_of_supply"
                  value={vendorInputData?.billing_address?.place_of_supply}
                  onChange={vendorBillingAddressChange}
                >
                  {stateList.map((list) => {
                    return <option value={list}>{list}</option>;
                  })}
                </select>
              )}
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Branch Name"
                name="branch_name"
                value={vendorInputData?.billing_address?.branch_name}
                onChange={vendorBillingAddressChange}
              />
            </div>
          </section>
          <section className={styles.right_inputs}>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="Address Line 2"
                name="street2"
                value={vendorInputData?.billing_address?.street2}
                onChange={vendorBillingAddressChange}
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="number"
                placeholder="Pincode"
                name="zip_code"
                value={vendorInputData?.billing_address?.zip_code}
                onChange={vendorBillingAddressChange}
              />
            </div>
            <div className={styles.input_group}>
              {/* <select name="" id="">
                  <option value="">INDIA</option>
                </select> */}
              <Select
                options={options}
                value={value}
                onChange={changeHandler}
              />
            </div>
            <div className={styles.input_group}>
              <input
                type="text"
                placeholder="GSTIN"
                name="tax_id_number"
                value={vendorInputData?.billing_address?.tax_id_number}
                onChange={vendorBillingAddressChange}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

const ShippingAddress = () => {
  const [checked, setChecked] = useState(true);
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  // console.log(checked);
  const { vendorInputData, setVendorInputData, vendorShippingAddressChange } =
    useVendorContext();
  console.log(vendorInputData);
  const changeHandler = (value) => {
    setValue(value);
    setVendorInputData((prev) => ({
      ...prev,
      shipping_address: {
        ...prev?.shipping_address,
        country: value.label,
      },
    }));
    console.log(value);
  };
  return (
    <>
      <div className={styles.biling_address_container}>
        <section className={styles.check}>
          <input
            type="checkbox"
            onChange={() => setChecked(!checked)}
            checked={checked}
          />
          <label htmlFor=""> Shipping address is same as billing address</label>
          {checked ? (
            ""
          ) : (
            <div className={styles.biling_address_container}>
              <div className={styles.customer_information}>
                <section className={styles.left_inputs}>
                  <div className={styles.input_group}>
                    <input
                      type="text"
                      name="street1"
                      placeholder="Address Line 1"
                      value={vendorInputData?.shipping_address?.street1}
                      onChange={vendorShippingAddressChange}
                    />
                  </div>
                  <div className={styles.input_group}>
                    <input
                      type="text"
                      placeholder="City"
                      name="city"
                      value={vendorInputData?.shipping_address?.city}
                      onChange={vendorShippingAddressChange}
                    />
                  </div>
                  <div className={styles.input_group}>
                    {value?.label !== "India" ? (
                      <input
                        name="place_of_supply"
                        value={
                          vendorInputData?.shipping_address?.place_of_supply
                        }
                        type="text"
                        onChange={vendorShippingAddressChange}
                      ></input>
                    ) : (
                      <select
                        name="place_of_supply"
                        value={
                          vendorInputData?.shipping_address?.place_of_supply
                        }
                        onChange={vendorShippingAddressChange}
                      >
                        {stateList.map((list) => {
                          return <option value={list}>{list}</option>;
                        })}
                      </select>
                    )}
                  </div>
                  <div className={styles.input_group}>
                    <input
                      type="text"
                      placeholder="Branch Name"
                      name="Branch Name"
                      value={vendorInputData?.shipping_address?.["Branch Name"]}
                      onChange={vendorShippingAddressChange}
                    />
                  </div>
                </section>
                <section className={styles.right_inputs}>
                  <div className={styles.input_group}>
                    <input
                      type="text"
                      placeholder="Address Line 2"
                      name="street2"
                      value={vendorInputData?.shipping_address?.street2}
                      onChange={vendorShippingAddressChange}
                    />
                  </div>
                  <div className={styles.input_group}>
                    <input
                      type="number"
                      placeholder="Pincode"
                      name="zip_code"
                      value={vendorInputData?.shipping_address?.zip_code}
                      onChange={vendorShippingAddressChange}
                    />
                  </div>
                  <div className={styles.input_group}>
                    {/* <select name="" id="">
                      <option value="">INDIA</option>
                    </select> */}
                    <Select
                      options={options}
                      value={value}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className={styles.input_group}>
                    <input
                      type="text"
                      placeholder="GSTIN"
                      name="tax_id_number"
                      value={vendorInputData?.shipping_address?.tax_id_number}
                      onChange={vendorShippingAddressChange}
                    />
                  </div>
                </section>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};
export default AddVendor;
