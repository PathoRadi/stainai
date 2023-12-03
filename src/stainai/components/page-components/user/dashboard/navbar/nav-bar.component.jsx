import React, { useEffect, useState, useRef } from "react";
import classes from "./nav-bar.module.sass";
import { FaBars } from "react-icons/fa";

import { BsFillPersonFill } from "react-icons/bs";
import UseUserContext from "../../../../../hook/auth/user.hook";
import logo from "../../../../../assets/logo.png";

const NavBar = () => {
  const user = UseUserContext();

  useEffect(() => {
    function handleResize() {
      let x = document.getElementById("myLinks");
      let w = document.documentElement.clientWidth;
      if (w >= 890) {
        x.style.display = "flex";
      } else {
        x.style.display = "none";
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ref = useRef();

  // useEffect(() => {
  //   const checkIfClickedOutside = (e) => {
  //     // If the menu is open and the clicked target is not within the menu,
  //     // then close the menu
  //     if (ref.current && !ref.current.contains(e.target) ) {
  //       let x = document.getElementById("myLinks");
  //       x.style.display = "none";
  //     }
  //   };

  //   document.addEventListener("mousedown", checkIfClickedOutside);
  //   return () => window.removeEventListener("mousedown", checkIfClickedOutside);
  // }, []);

  const menuExpand = () => {
    let x = document.getElementById("myLinks");
    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
  };
  return (
    <div className={classes.wrapper} ref={ref}>
      <header className={classes.siteHeader}>
        <div className={classes.compartment}>
          <img src={logo} className={classes.logo} onClick={() => window.location = '/stainai'} />
        </div>
        <a className={classes.faBars} onClick={menuExpand}>
          <FaBars size={32} />
        </a>
        <nav className={classes.nav} id="myLinks">
          <ul>
            {/* <li>
              <a href="/morstainai">PROJECT</a>
            </li>
            <li>
              <a href="/morstainai">SETTING</a>
            </li> */}

            <li className={classes.login}>
              <BsFillPersonFill size={25} />
              {user.info.firstname || user.info.lastname ? (
                <a href="/user/dashboard">
                  {" "}
                  {user.info.firstname} {user.info.lastname}{" "}
                </a>
              ) : (
                <a href="/user">SIGNIN</a>
              )}
            </li>
            {(user.info.firstname || user.info.lastname) && (
              <li>
               <a href="/stainai" onClick={()=>{
                  localStorage.removeItem("STAINAI_USER_PROFILE");
                  setAuthTokens("");
                }}>Log Out</a>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
