//?! https://finance.miratsoneservices.com/api
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import { auth } from "./FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "./components/Loader/Loader";
// import { Redirect } from "react-router-dom";

const InvoiceIndia = lazy(() =>
  import("./components/invoice_india/InvoiceIndia")
);
const InvoiceInternational = lazy(() => import("./components/invoice/Invoice"));
const AddCustomer = lazy(() =>
  import("./pages/customers/add_customer/AddCustomer")
);
const CustomerContextProvider = lazy(() =>
  import("./pages/customers/customerContex/CustomerContext")
);
const Customer = lazy(() => import("./pages/customers/Customer"));
const DomesticInvoice = lazy(() =>
  import("./pages/invoices/domestic_invoice/DomesticInvoice")
);
const InvoiceContextProvider = lazy(() =>
  import("./pages/invoices/invoiceContext/InvoiceContext")
);
const InternationalInvoice = lazy(() =>
  import("./pages/invoices/international_invoice/InternationalInvoice")
);
const Invoice = lazy(() => import("./pages/invoices/Invoice"));
const DetailInvoice = lazy(() =>
  import("./pages/invoices/DetailInvoice/DetailInvoice")
);
const AddCompany = lazy(() => import("./pages/company/add_company/AddCompany"));
const Header = lazy(() => import("./components/header/Header"));
const EditInvoice = lazy(() =>
  import("./pages/invoices/edit-invoice/EditInvoice")
);
const CustomerDetails = lazy(() =>
  import("./pages/customers/customerDetails/CustomerDetails")
);
const Company = lazy(() => import("./pages/company/Company"));
const EditCompany = lazy(() =>
  import("./pages/company/edit_company/EditCompany")
);
const CompanyDetails = lazy(() =>
  import("./pages/company/company_details/CompanyDetails")
);
const InvoiceLink = lazy(() =>
  import("./pages/invoices/invoiceLink/InvoiceLink")
);
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Bank = lazy(() => import("./pages/bank/Bank"));
const Register = lazy(() => import("./pages/register/Register"));
const Login = lazy(() => import("./pages/login/Login"));
const Expense = lazy(() => import("./pages/Expense/Expense"));
const AddExpense = lazy(() => import("./pages/Expense/add_expense/AddExpense"));
const Convert = lazy(() => import("./pages/covert/Convert"));
const GlobalContextProvider = lazy(() =>
  import("./pages/globalContext/GlobalContext")
);
const BankStatementDetails = lazy(() =>
  import("./pages/bank/BankStatementDetails/BankStatementDetails")
);
const VendorContextProvider = lazy(() =>
  import("./pages/vendors/vendorContext/VendorContext")
);
const VendorInvoices = lazy(() =>
  import("./pages/vendors/vendorInvoice/VendorInvoice")
);
const InvoiceReport = lazy(() =>
  import("./pages/invoices/invoiceReport/InvoiceReport")
);
const VendorReport = lazy(() =>
  import("./pages/vendors/clientReport/clientReport")
);
const AddVendorInvoice = lazy(() =>
  import("./pages/vendors/vendorInvoice/addVenodorInvoice/AddVendorInvoice")
);
const VendorUserSide = lazy(() =>
  import("./pages/vendorUserSide/VendorUserSide")
);
const Vendors = lazy(() => import("./pages/vendors/Vendors"));
const AddVendor = lazy(() => import("./pages/vendors/add-vendor/AddVendor"));
const ClientReport = lazy(() =>
  import("./pages/vendors/clientReport/clientReport")
);
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  if (loading) return null;
  if (!loading && !user) {
    return <Navigate to="/login" />;
  }
  return children;
}
function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <Suspense fallback={<Loader />}>
          <BrowserRouter>
            {/* <Header /> */}

            <Routes>
              <Route
                path="/invoice-report"
                element={
                  <ProtectedRoute>
                    <InvoiceReport />
                  </ProtectedRoute>
                }
              />
              <Route path="/loader" element={<Loader />} />
              <Route
                path="/client-report"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <InvoiceContextProvider>
                        <ClientReport />{" "}
                      </InvoiceContextProvider>
                    </CustomerContextProvider>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-vendor-invoice"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <VendorContextProvider>
                        <AddVendorInvoice />
                      </VendorContextProvider>
                    </CustomerContextProvider>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-vendor-invoice/:vendorInvoiceNumber"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <VendorContextProvider>
                        <AddVendorInvoice />{" "}
                      </VendorContextProvider>
                    </CustomerContextProvider>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/client/:currentUserId"
                element={
                  <CustomerContextProvider>
                    <InvoiceContextProvider>
                      <VendorUserSide />
                    </InvoiceContextProvider>
                  </CustomerContextProvider>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <Header />
                    </CustomerContextProvider>
                  </ProtectedRoute>
                }
              />
              {/* <Route path="/register" element={<Register />} /> */}
              <Route path="/expense" element={<Expense />} />
              <Route
                path="/vendors"
                element={
                  <ProtectedRoute>
                    <VendorContextProvider>
                      <Vendors />
                    </VendorContextProvider>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-vendor"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <VendorContextProvider>
                        <AddVendor />
                      </VendorContextProvider>
                    </CustomerContextProvider>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vendor-invoice"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <VendorContextProvider>
                        <VendorInvoices />
                      </VendorContextProvider>
                    </CustomerContextProvider>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bank-statement-details/:transactionID"
                element={<BankStatementDetails />}
              />
              <Route path="/convert" element={<Convert />} />
              <Route path="/add-expense" element={<AddExpense />} />
              <Route path="/edit-expense/:bill_id" element={<AddExpense />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/add-client"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <AddCustomer />
                    </CustomerContextProvider>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/clients"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <Customer />
                    </CustomerContextProvider>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/create-domestic-invoice"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <InvoiceContextProvider>
                        <DomesticInvoice />
                      </InvoiceContextProvider>
                    </CustomerContextProvider>{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bank"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <InvoiceContextProvider>
                        <Bank />
                      </InvoiceContextProvider>
                    </CustomerContextProvider>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-international-invoice"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <InvoiceContextProvider>
                        <InternationalInvoice />
                      </InvoiceContextProvider>
                    </CustomerContextProvider>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/invoices"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <InvoiceContextProvider>
                        <Invoice />
                      </InvoiceContextProvider>
                    </CustomerContextProvider>{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/companies"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <InvoiceContextProvider>
                        <Company />
                      </InvoiceContextProvider>
                    </CustomerContextProvider>{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/invoices/:invoiceNumber"
                element={
                  <CustomerContextProvider>
                    <InvoiceContextProvider>
                      <DetailInvoice />
                    </InvoiceContextProvider>
                  </CustomerContextProvider>
                }
              />
              <Route
                path="/edit-invoice/:invoiceNumber/:invoiceID"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <InvoiceContextProvider>
                        <EditInvoice />
                      </InvoiceContextProvider>
                    </CustomerContextProvider>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer-details/:customerID"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <InvoiceContextProvider>
                        <CustomerDetails />
                      </InvoiceContextProvider>
                    </CustomerContextProvider>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-company/:companyID"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <InvoiceContextProvider>
                        <EditCompany />
                      </InvoiceContextProvider>
                    </CustomerContextProvider>{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/companies/:companyID"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <InvoiceContextProvider>
                        <CompanyDetails />
                      </InvoiceContextProvider>
                    </CustomerContextProvider>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-company"
                element={
                  <ProtectedRoute>
                    <CustomerContextProvider>
                      <InvoiceContextProvider>
                        <AddCompany />
                      </InvoiceContextProvider>
                    </CustomerContextProvider>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/:invoiceNumber"
                element={
                  <CustomerContextProvider>
                    <InvoiceContextProvider>
                      <InvoiceLink />
                    </InvoiceContextProvider>
                  </CustomerContextProvider>
                }
              />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
