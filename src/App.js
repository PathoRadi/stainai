import "./App.css";
import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import StainAI from "./stainai/components/page-components/home/home.component";
import SignIn from "./stainai/components/page-components/user/signin/singin.component";
import SignUp from "./stainai/components/page-components/user/signup/signup.component";
import Register from "./stainai/components/page-components/user/register/register.component";
import ForgetPassword from "./stainai/components/page-components/user/forget-password/forget-password.component";
import ResetPasword from "./stainai/components/page-components/user/reset-password/reset-password.component";
import DashBoard from "./stainai/components/page-components/user/dashboard/dashboard.component";
import DashBoardUsers from "./stainai/components/page-components/user/dashboard/users.component";
import ContactUs from "./stainai/components/page-components/contact-us/contact-us.component";
import UploadImage from "./stainai/components/page-components/upload-image/upload-image.component";

export const UserContext = React.createContext(null);

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {/* <NavBar /> */}
      <Router>
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
          <Routes>
            <Route exact path="/" element={<StainAI />} />
            <Route exact path="/user/signin" element={<SignIn />} />
            <Route exact path="/user/singup" element={<SignUp />} />
            <Route exact path="/user/register" element={<Register />} />
            <Route exact path="/user/forget-password" element={<ForgetPassword />} />
            <Route exact path="/user/reset-password" element={<ResetPasword />} />
            <Route exact path="/user/dashboard" element={<DashBoard />} />
            <Route exact path="/user/dashboard/users" element={<DashBoardUsers />} />
            <Route exact path="/contact-us" element={<ContactUs />} />
            <Route exact path="/upload-image" element={<UploadImage />} />

          </Routes>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
