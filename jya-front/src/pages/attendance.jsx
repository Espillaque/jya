import React, { useContext, useEffect } from "react";
import Header from "../components/header-footer/header";
import Footer from "../components/header-footer/footer";
import { MyContext } from "../context";
import ROUTES from "../router/routes";
import AttendanceForm from "../components/forms/formAttendance";

const Attendance = () => {
  const { contextData, setContextData } = useContext(MyContext);

  useEffect(() => {
    if (!contextData.token) {
      console.log("REDIREEEECTUS!");
      setContextData({ ...contextData, activeRoute: ROUTES.LOGIN });
    }
  });

  return (
    <>
      <Header />
      <AttendanceForm/>
      <Footer />
    </>
  );
};

export default Attendance;
