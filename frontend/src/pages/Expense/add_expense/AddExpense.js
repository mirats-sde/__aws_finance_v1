import React, { useEffect, useState } from "react";
import styles from "./AddExpense.module.css";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db, firestoredb, storage } from "../../../FirebaseConfig";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import loader from "../../../assets/loader.gif";
import { UseGlobalContext } from "../../globalContext/GlobalContext";

const AddExpense = () => {
  const { bill_id } = useParams();
  const navigate = useNavigate();
  const [expenseData, setExpenseData] = useState({});
  const [img, setImg] = useState();
  const [disableBTN, setDisableBTN] = useState(false);
  const [user] = useAuthState(auth);
  const { setSnackbar } = UseGlobalContext();
  //   console.log(user?.uid);

  // edit expense
  const getEditExpense = async () => {
    bill_id
      ? onSnapshot(doc(firestoredb, "expenses", String(bill_id)), (data) => {
          setExpenseData({ ...data?.data() });
        })
      : setExpenseData({});
  };
  console.log(expenseData);

  useEffect(() => {
    getEditExpense();
  }, []);
  const handleChagne = (e) => {
    setExpenseData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ----------to Get Last DataBase ID-------
  const GetLastClientID = async () => {
    const q = query(
      collection(firestoredb, "expenses"),
      orderBy("bill_id", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    let bill_id = null;
    querySnapshot.forEach((elem) => {
      bill_id = elem.data()?.bill_id;
    });
    return bill_id;
  };
  console.log(bill_id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    bill_id
      ? listAll(ref(storage, `expense/${bill_id}`))
          .then((res) => {
            res.items.forEach((itemref) => {
              deleteObject(itemref)
                .then(() => {})
                .catch((er) => {});
            });
          })
          .then((data) => {
            setDisableBTN(true);
            uploadBytes(
              ref(storage, `expense/${bill_id}/${img?.name}`),
              img
            ).then(async (snapshot) => {
              getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                console.log("File available at", downloadURL);
                await setDoc(doc(firestoredb, "expenses", String(bill_id)), {
                  ...expenseData,
                  image_url: downloadURL,
                  bill_id: Number(bill_id),
                })
                  .then(
                    () => setDisableBTN(false),
                    setExpenseData({}),
                    navigate("/expense"),
                    setSnackbar({
                      open: true,
                      severity: "success",
                      msg: "Expense Updated Successfully!",
                    })
                  )
                  .catch((err) => console.log(err));
              });
            });
          })
      : GetLastClientID().then(async (lastid) => {
          console.log("The last id is", lastid);
          console.log("NEw id is", Number(lastid) + 1);
          setDisableBTN(true);
          uploadBytes(
            ref(storage, `expense/${Number(lastid) + 1}/${img?.name}`),
            img
          ).then(async (snapshot) => {
            console.log(snapshot);
            getDownloadURL(snapshot.ref).then(async (downloadURL) => {
              console.log("File available at", downloadURL);
              await setDoc(
                doc(firestoredb, "expenses", String(Number(lastid) + 1)),
                {
                  ...expenseData,
                  image_url: downloadURL,
                  bill_id: Number(lastid) + 1,
                }
              )
                .then(
                  () => setDisableBTN(false),
                  setExpenseData({}),
                  setImg(),
                  navigate("/expense"),
                  setSnackbar({
                    open: true,
                    severity: "success",
                    msg: "Expense Added Successfully!",
                  })
                )
                .catch((err) => console.log(err));
            });
          });
        });
  };
  return (
    <div className={styles.expenseTrackerMainContainer}>
      <button onClick={() => navigate("/expense")}>Back To Home</button>
      <div className={styles.expenseTrackerBodyContainer}>
        <form onSubmit={handleSubmit}>
          <section className={styles.expenseInputContainer}>
            <label htmlFor="company_name">Company Name :</label>
            <select
              required
              name="company_name"
              value={expenseData?.company_name ? expenseData?.company_name : ""}
              onChange={handleChagne}
            >
              <option value="" disabled selected>
                Select A Company
              </option>
              <option value="Mirats Insights Private Limited">
                Mirats Insights Private Limited
              </option>
              <option value=" Macer India Research & Technology Service">
                Macer India Research & Technology Service
              </option>
            </select>
          </section>
          <section className={styles.expenseInputContainer}>
            <label htmlFor="expense_nature">Expense Nature :</label>
            <input
              required
              type="text"
              name="expense_nature"
              value={
                expenseData?.expense_nature ? expenseData?.expense_nature : ""
              }
              onChange={handleChagne}
            />
          </section>
          <section className={styles.expenseInputContainer}>
            <label htmlFor="bill_amount">Bill Amount :</label>
            <input
              type="number"
              name="bill_amount"
              required
              // step="any"
              value={expenseData?.bill_amount ? expenseData?.bill_amount : ""}
              placeholder="Enter Bill Amount"
              onChange={handleChagne}
            />
          </section>
          <section className={styles.expenseInputContainer}>
            <label htmlFor="uploaded_by">select Name :</label>
            <select
              name="uploaded_by"
              required
              value={expenseData?.uploaded_by ? expenseData?.uploaded_by : ""}
              onChange={handleChagne}
            >
              {/* <option value="" disabled selected>
              Select A Company
            </option> */}
              <option value="" disabled defaultValue>
                Select Person
              </option>
              <option value="Mayank Patel">Mayank Patel</option>
              <option value=" Amit Sharma">Amit Sharma</option>
              <option value=" Anupam Kumar">Anupam Kumar</option>
              <option value=" Saumil Shah">Saumil Shah</option>
              <option value=" Suyog kosia">Suyog kosia</option>
              <option value=" Ashwin Gopalakrishnan">
                Ashwin Gopalakrishnan
              </option>
            </select>
          </section>
          <section className={styles.expenseInputContainer}>
            <label htmlFor="payment_method">Select Payment Method :</label>
            <select
              name="payment_method"
              id="payment_method"
              required
              value={
                expenseData?.payment_method ? expenseData?.payment_method : ""
              }
              onChange={handleChagne}
            >
              <option value="" disabled selected>
                Select Payment Mode
              </option>
              <option value="Mirats Credit Cards">Mirats Credit Cards</option>
              <option value=" Macer Credit Cards">Macer Credit Cards</option>
              <option value=" Mirats UPI">Mirats UPI</option>
              <option value=" Macer UPI">Macer UPI</option>
              <option value=" Mirats Debit Cards">Mirats Debit Cards</option>
              <option value=" Macer Debit Cards">Macer Debit Cards</option>
              <option value=" Mirats Net banking">Mirats Net banking</option>
              <option value=" Macer Net Banking">Macer Net Banking</option>
            </select>
          </section>
          <section className={styles.expenseInputContainer}>
            <label htmlFor="selected_date">Pick Date :</label>
            <input
              type="date"
              name="selected_date"
              required
              value={
                expenseData?.selected_date ? expenseData?.selected_date : ""
              }
              onChange={(e) =>
                setExpenseData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </section>
          {/* name must be image_url for the below file input */}
          <section className={styles.expenseInputContainer}>
            <label htmlFor="file">Upload Bill File :</label>
            <input
              type="file"
              name="image_url"
              required
              // value={expenseData?.image_url}
              onChange={(e) => setImg(e.target.files[0])}
            />
          </section>
          <section className={styles.expenseInputContainer}>
            <label htmlFor="selected_date">Invoice Number :</label>
            <input
              type="text"
              name="invoice_number"
              value={
                expenseData?.invoice_number ? expenseData?.invoice_number : ""
              }
              placeholder="Invoice Number"
              onChange={handleChagne}
            />
          </section>
          <section className={styles.expenseInputContainer}>
            <label htmlFor="selected_date">Description :</label>
            <textarea
              name="description"
              cols="50"
              rows="4"
              value={expenseData?.description ? expenseData?.description : ""}
              onChange={handleChagne}
              placeholder="Bill Description"
            ></textarea>
          </section>
          <section className={styles.expenseInputContainer}>
            <label htmlFor="selected_date">GST Number :</label>
            <input
              type="text"
              name="GST_number"
              value={expenseData?.GST_number ? expenseData?.GST_number : ""}
              placeholder="GST Number"
              onChange={handleChagne}
            />
          </section>
          <div className={styles.expenseTrackerFooterContainer}>
            {disableBTN ? (
              <img src={loader} />
            ) : (
              <button type="submit" disabled={disableBTN}>
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
