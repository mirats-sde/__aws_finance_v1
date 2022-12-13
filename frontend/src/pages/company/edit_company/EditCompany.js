import { useState } from "react";
import styles from "./EditCompany.module.css";
import { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useInvoiceContext } from "../../invoices/invoiceContext/InvoiceContext";
import { useEffect } from "react";
import Header from "../../../components/header/Header";
import { UseGlobalContext } from "../../globalContext/GlobalContext";

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

const EditCompany = () => {
  const [switchView, setSwitchView] = useState(true);
  const [companyData, setCompanyData] = useState({
    address: {
      state: "INTERNATIONAL",
    },
  });
  const { companyID } = useParams();
  const { allCompanyData, setAllCompanyData, fetchAllCompanyData } =
    useInvoiceContext();
  const { setSnackbar } = UseGlobalContext();
  useEffect(() => {
    let company = allCompanyData?.filter(
      (data) => data?.company_id == companyID
    );
    setCompanyData(...company);
  }, [allCompanyData]);
  console.log(companyData);
  const navigate = useNavigate();
  const displayInformation = () => {
    setSwitchView(true);
  };
  const handleCompanyChange = (e) => {
    setCompanyData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCompanyAddressChange = (e) => {
    setCompanyData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [e.target.name]: e.target.value,
      },
    }));
  };
  const handleCompanyBankDetails = (e) => {
    setCompanyData((prev) => ({
      ...prev,
      bank_detail: {
        ...prev.bank_detail,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const displayBankingTaxes = () => {
    setSwitchView(false);
  };

  const displayBilingAddress = () => {
    setSwitchView(true);
  };
  console.log(companyData);
  const handleUpdate = (e) => {
    e.preventDefault();
    // navigate("/companies");
    window.history.back();
    axios
      .put(
        `https://finance.miratsoneservices.com/api/update-company/${companyID}`,
        companyData
      )
      .then((res) => {
        console.log(res.data);
        axios.put(
          `https://finance.miratsoneservices.com/api/update-address/${companyID}`,
          companyData?.address
        );
        axios.put(
          `https://finance.miratsoneservices.com/api/update-bank-details/${companyID}`,
          companyData?.bank_detail
        );
        setSnackbar({
          open: true,
          severity: "success",
          msg: "Company Updated Successfully!",
        });
        fetchAllCompanyData();
      })
      .catch((err) => console.log(err));
  };

  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
    setCompanyData((prev) => ({
      ...prev,
      address: {
        ...prev?.address,
        country: value.label,
      },
    }));
  };

  const activeTab = {
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "500",
    textDecoration: "none",
    background: "#1765dc",
    border: "1px solid #1765dc",
    padding: "0.5em 1em",
    color: "white",
  };

  const inActiveTab = {
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "500",
    textDecoration: "none",
    border: "1px solid #1765dc",
    padding: "0.5em 1em",
    color: "black",
  };

  console.log(companyData);
  return (
    <>
      <Header />
      <form onSubmit={handleUpdate}>
        <div className={styles.add_customer_container}>
          <div className={styles.customer_onboarding}>
            <p className={styles.onboarding_text}>Update Company </p>
            <div className={styles.switchContainer}>
              <span
                style={switchView ? activeTab : inActiveTab}
                className={styles.icons}
                onClick={displayInformation}
              >
                Information
              </span>
              <span
                style={switchView ? inActiveTab : activeTab}
                className={styles.icons}
                onClick={displayBankingTaxes}
              >
                Banking & Taxes
              </span>
            </div>
            <div className={styles.actionBtns}>
              <button type="submit" style={{ cursor: "pointer" }}>
                <span>+</span> Update
              </button>
            </div>
          </div>

          {switchView ? (
            <div className={styles.customer_information_container}>
              <div className={styles.customer_information}>
                <section className={styles.left_inputs}>
                  <div className={styles.input_group}>
                    {/* <select name="select_country" id="select_country">
                    {titleData.map((data) => {
                      return <option value={data}>{data}</option>;
                    })}
                  </select> */}
                    <input
                      type="text"
                      name="company_name"
                      value={companyData?.company_name}
                      onChange={handleCompanyChange}
                      placeholder="Company Name *"
                      required
                    />
                  </div>
                  <div className={styles.input_group}>
                    <input
                      type="text"
                      name="tax_id_no"
                      value={companyData?.tax_id_no}
                      onChange={handleCompanyChange}
                      placeholder="Company GSTIN"
                      required
                    />
                  </div>
                  <div className={styles.input_group}>
                    <input
                      type="text"
                      name="CIN_no"
                      value={companyData?.CIN_no}
                      onChange={handleCompanyChange}
                      placeholder="CIN No"
                      // required
                    />
                  </div>
                </section>
                <section className={styles.right_inputs}>
                  <div className={styles.input_group}>
                    <input
                      type="text"
                      name="company_registration_number"
                      value={companyData?.company_registration_number}
                      onChange={handleCompanyChange}
                      placeholder="Company Registration Number"
                    />
                  </div>
                  <div className={styles.input_group}>
                    <input
                      type="email"
                      name="company_email_id"
                      value={companyData?.company_email_id}
                      onChange={handleCompanyChange}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className={styles.input_group}>
                    <input
                      type="text"
                      value={companyData?.LUT_code}
                      name="LUT_code"
                      onChange={handleCompanyChange}
                      placeholder="LUT Code"
                      // required
                    />
                  </div>
                </section>
              </div>
              <div className={styles.biling_address_container}>
                <div className={styles.customer_information}>
                  <section className={styles.left_inputs}>
                    <div className={styles.input_group}>
                      <input
                        type="text"
                        name="street1"
                        onChange={handleCompanyAddressChange}
                        placeholder="Address Line 1"
                        value={companyData?.address?.street1}
                        required
                      />
                    </div>

                    <div className={styles.input_group}>
                      <input
                        type="text"
                        name="city"
                        onChange={handleCompanyAddressChange}
                        value={companyData?.address?.city}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className={styles.input_group}>
                      {value?.label !== "India" ? (
                        <input
                          name="state"
                          placeholder="State"
                          onChange={handleCompanyAddressChange}
                          type="text"
                          value={companyData?.address?.state}
                          required
                        />
                      ) : (
                        <select
                          name="state"
                          onChange={handleCompanyAddressChange}
                          id="select_country"
                          value={companyData?.address?.state}
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
                        placeholder="Area"
                        name="area"
                        value={companyData?.address?.area}
                        onChange={handleCompanyAddressChange}
                        // required
                      />
                    </div>
                  </section>
                  <section className={styles.right_inputs}>
                    <div className={styles.input_group}>
                      <input
                        type="text"
                        placeholder="Address Line 2"
                        name="street2"
                        value={companyData?.address?.street2}
                        onChange={handleCompanyAddressChange}
                        // required
                      />
                    </div>
                    <div className={styles.input_group}>
                      <input
                        type="number"
                        name="zip_code"
                        value={companyData?.address?.zip_code}
                        onChange={handleCompanyAddressChange}
                        placeholder="Pincode"
                        required
                      />
                    </div>
                    <div className={styles.input_group}>
                      <Select
                        options={options}
                        value={value}
                        onChange={changeHandler}
                        required
                      />
                    </div>
                  </section>
                </div>
              </div>
            </div>
          ) : (
            // banking and taxes
            // <div className={styles.banking_taxes21}>
            <>
              <div className={styles.banking_taxes}>
                <div className={styles.customer_information}>
                  <section className={styles.left_inputs}>
                    <div className={styles.input_group}>
                      <input
                        autoComplete="off"
                        type="text"
                        name="account_name"
                        onChange={handleCompanyBankDetails}
                        placeholder="Account Name"
                        value={companyData?.bank_detail?.account_name}
                        required
                      />
                    </div>
                    <div className={styles.input_group}>
                      <input
                        type="text"
                        name="IFSC_code"
                        value={companyData?.bank_detail?.IFSC_code}
                        onChange={handleCompanyBankDetails}
                        placeholder="IFSC Code"
                        required
                      />
                    </div>
                    <div className={styles.input_group}>
                      <input
                        type="text"
                        name="bank_name"
                        value={companyData?.bank_detail?.bank_name}
                        onChange={handleCompanyBankDetails}
                        placeholder="Bank Name"
                        required
                      />
                    </div>
                    <div className={styles.input_group}>
                      <input
                        type="text"
                        name="SWIFT_code"
                        value={companyData?.bank_detail?.SWIFT_code}
                        onChange={handleCompanyBankDetails}
                        placeholder="SWIFT Code"
                        required
                      />
                    </div>
                    <div className={styles.input_group}>
                      <input
                        type="text"
                        name="UPI"
                        value={companyData?.bank_detail?.UPI}
                        onChange={handleCompanyBankDetails}
                        placeholder="UPI ID"
                        required
                      />
                    </div>
                  </section>

                  <section className={styles.right_inputs}>
                    <div className={styles.input_group}>
                      <input
                        type="number"
                        id="account_number"
                        name="account_number"
                        onChange={handleCompanyBankDetails}
                        placeholder="Account Number"
                        value={companyData?.bank_detail?.account_number}
                        required
                      />
                    </div>
                    <div className={styles.input_group}>
                      <input
                        type="text"
                        id="account_number"
                        name="beneficiary_name"
                        onChange={handleCompanyBankDetails}
                        placeholder="Beneficiary Name"
                        value={companyData?.bank_detail?.beneficiary_name}
                        required
                      />
                    </div>
                    <div className={styles.input_group}>
                      <input
                        type="text"
                        id="routing_number"
                        name="routing_number"
                        onChange={handleCompanyBankDetails}
                        placeholder="Routing Number"
                        value={companyData?.bank_detail?.routing_number}
                        required
                      />
                    </div>
                    <div className={styles.input_group}>
                      <input
                        type="text"
                        name="bank_address"
                        value={companyData?.bank_detail?.bank_address}
                        onChange={handleCompanyBankDetails}
                        placeholder="bank_address"
                        required
                      />
                    </div>
                    <div className={styles.input_group}>
                      <input
                        type="text"
                        name="beneficiary_address"
                        onChange={handleCompanyBankDetails}
                        placeholder="Beneficiary Address"
                        value={companyData?.bank_detail?.beneficiary_address}
                        required
                      />
                    </div>
                  </section>
                </div>
              </div>
              {/* <div className={styles.banking_taxes}>
              <div className={styles.tax_information}>
                <h2 className={styles.tax_text}>Tax Information</h2>
                <div className={styles.customer_information}>
                  <section className={styles.left_inputs}>
                    <div className={styles.input_group}>
                      <input type="text" placeholder="PAN" />
                    </div>
                    <div className={styles.input_group}>
                      <select name="" id="">
                        <option value="">TDS Not Applicable</option>
                      </select>
                    </div>
                    <div className={styles.input_group}>
                      <select name="" id="">
                        <option value="">- Bank Name -</option>
                      </select>
                    </div>
                    <div className={styles.input_group}>
                      <select name="" id="">
                        <option value="">Not Applicable</option>
                      </select>
                    </div>
                  </section>
                  <section className={styles.right_inputs}>
                    <div className={styles.input_group}>
                      <input type="text" placeholder="TAN" />
                    </div>
                    <div className={styles.input_group}>
                      <select name="" id="">
                        <option value="">Indian Rupee</option>
                      </select>
                    </div>
                    <div className={styles.input_group}>
                      <select name="" id="">
                        <option value="no">NO</option>
                        <option value="yes">YES</option>
                      </select>
                    </div>
                  </section>
                </div>
              </div>
            </div> */}
            </>
            // {/* </div> */}
          )}
        </div>
      </form>
    </>
  );
};

export default EditCompany;
