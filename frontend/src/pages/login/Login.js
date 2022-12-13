import React, { useState } from "react";
import styles from "./Login.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { Input, Dropdown, Spacer, Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { query, collection, where, getDocs } from "firebase/firestore";
import { firestoredb } from "../../FirebaseConfig";
import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Login = () => {
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = query(
      collection(firestoredb, "miratsinsights", "peoples", "employee"),
      where("email", "==", loginData?.email),
      where("Portal_Access.finance_portal", "==", true)
    );
    const querysnapshot = await getDocs(q);
    let flag = false;
    if (querysnapshot.docs.length) {
      flag = true;
      signInWithEmailAndPassword(auth, loginData?.email, loginData?.password)
        .then(() => {
          console.log("success");
          setOpen({
            open: true,
            severity: "success",
            msg: "Login Successful!!!",
          });
          setTimeout(() => {
            navigate("/");
          }, 1500);
        })
        .catch((err) => {
          switch (err.message) {
            case "Firebase: Error (auth/user-not-found).":
              setOpen({
                open: true,
                severity: "error",
                msg: "User not found!!!",
              });
              break;
            case "Firebase: Error (auth/wrong-password).":
              setOpen({
                open: true,
                severity: "error",
                msg: "Wrong Password!!!",
              });
              break;
            default:
              setOpen({
                open: true,
                severity: "error",
                msg: err.message,
              });
              break;
          }
        });
    }
    if (!flag) {
      // setError("You cannot access the portal because you are not an admin");
      setOpen({
        open: true,
        severity: "error",
        msg: "You cannot access the portal because you are not an admin",
      });
    }
    // else {
    //   console.log("You are not authenticated to access this portal!");
    // }
    // signInWithEmailAndPassword(auth, loginData?.email, loginData?.password)
    //   .then((data) => (data?.user ? navigate("/") : ""))
    //   .catch((err) => console.log(err.message));
  };
  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //   snackbar
  const [open, setOpen] = useState({
    open: false,
    severity: "",
    msg: "",
  });
  // snackbar click function
  const handleClick = () => {
    setOpen({ ...open, open: true });
  };
  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen({ ...open, open: false });
  };

  const handleClose = () => {
    setOpen({ open: false });
  };
  // snackbar alert function
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  //   console.log(loginData);
  return (
    <div className={styles.mainRegisaterConatainer}>
      <div className={styles.innerRegisterContainer}>
        <h1 style={{ color: "#2a2a2b" }}>LogIn</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.registerRow}>
            <Input
              required
              bordered
              labelPlaceholder="Email"
              type="email"
              name="email"
              onChange={handleChange}
              css={{ width: "100%" }}
            />
          </div>

          <div className={styles.registerRow}>
            <Input.Password
              labelPlaceholder="Password"
              bordered
              name="password"
              onChange={handleChange}
              css={{ width: "100%" }}
            />
          </div>
          {/* <p>
            or{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              Register
            </Link>{" "}
          </p> */}
          <Button
            type="submit"
            css={{ background: "#333435" }}
            size="lg"
            onClick={handleSubmit}
          >
            LogIn
          </Button>
        </form>
      </div>
      <Snackbar
        open={open?.open}
        autoHideDuration={4000}
        onClose={handleClose}
        bodyStyle={{ maxWidth: "100%" }}
      >
        <Alert
          onClose={handleClose}
          severity={open?.severity}
          sx={{ width: "100%" }}
        >
          {open?.msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
