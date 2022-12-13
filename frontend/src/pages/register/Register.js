import React, { useState } from "react";
import styles from "./Register.module.css";
import { Input, Dropdown, Spacer, Button } from "@nextui-org/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
const Register = () => {
  const [registerData, setRegisterData] = useState({});
  const print = (x) => {
    console.log(x);
  };
  //   console.log(auth);
  const handleChange = (e) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //   const [user] = useAuthState(auth);
  //   console.log(user?.uid);
  const handleSubmit = async (e) => {
    e.preventDefault();
    registerData?.password === registerData?.confirmPassword
      ? createUserWithEmailAndPassword(
          auth,
          registerData?.email,
          registerData?.password
        )
          .then((data) => console.log(data.user))
          .catch((err) => console.log(err?.message))
      : alert("Password And Confirm Password Must Be Same");
  };
  //   print(registerData);
  //   console.log(registerData);
  return (
    <div className={styles.mainRegisaterConatainer}>
      <div className={styles.innerRegisterContainer}>
        <h1 style={{ color: "#2a2a2b" }}>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.registerRow}>
            <Input
              bordered
              labelPlaceholder="First Name"
              name="firstName"
              onChange={handleChange}
              css={{ width: "50%" }}
            />
            <Input
              bordered
              labelPlaceholder="Last Name"
              name="lastName"
              onChange={handleChange}
              css={{ width: "50%" }}
            />
          </div>
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
              css={{ width: "50%" }}
            />

            <Input.Password
              labelPlaceholder="Confirm Password"
              bordered
              name="confirmPassword"
              onChange={handleChange}
              css={{ width: "50%" }}
            />
          </div>
          <Button
            type="submit"
            css={{ background: "#333435" }}
            size="lg"
            onClick={handleSubmit}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
