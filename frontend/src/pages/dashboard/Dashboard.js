import React from "react";
import Header from "../../components/header/Header";
import { auth } from "../../FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
const Dashboard = () => {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <div>
      <Header />
      <p>Dashboard</p>
    </div>
  );
};

export default Dashboard;
