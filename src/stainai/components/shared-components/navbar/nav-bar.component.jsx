import React, { useState } from "react";
import classes from "./nav-bar.module.sass";

import { FaBars } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

import UseUserContext from "../../../hook/auth/user.hook";
import logo from "../../../assets/logo.png";

const NavBar = () => {
  const user = UseUserContext();
  const [isDropdownVisible, setDropdownVisible] = useState({
    about: false,
    tryIt: false,
  });

  const handleMouseEnter = (item) => {
    item === "about" && setDropdownVisible({about: true, tryIt: false});
    item === "tryIt" && setDropdownVisible({about: false, tryIt: true});
  };

  const handleMouseLeave = (item) => {
    item === "about" && setDropdownVisible({...isDropdownVisible, about: false});
    item === "tryIt" && setDropdownVisible({...isDropdownVisible, tryIt: false});
  };

  const menuExpand = () => {
    let x = document.getElementById("myLinks");
    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
  };

  return (
    <div className={classes.wrapper}>
      <img src={logo} className={classes.logo} onClick={() => window.location = '/stainai'}/>
      <a className={classes.faBars} onClick={menuExpand}>
          <FaBars size={32} />
      </a>
      <nav className={classes.nav} id="myLinks">
        <ul>
          <li
            className={classes.dropItem}
            onMouseEnter={()=>handleMouseEnter('about')}
            onMouseLeave={()=>handleMouseLeave('about')}
          >
            <a href="#">ABOUT</a>
            {isDropdownVisible.about && (
              <div className={classes.dropContent}>
                <a href="https://imaging.howard.edu/">Molecular Imaging Laboratory</a>
                <a href="#">About StainAI</a>
              </div>
            )}
          </li>
          <li
            className={classes.dropItem}
            onMouseEnter={()=>handleMouseEnter('tryIt')}
            onMouseLeave={()=>handleMouseLeave('tryIt')}
          >
            <a href="#">TRY IT</a>
            {isDropdownVisible.tryIt && (
              <div className={classes.dropContent}>
                <a href="/stainai/upload-image">Upload Your Data</a>
                <a href="http://stainai.howard.edu/webapps/home/session.html?app=Microglia_MorpMap%2FMicroglia_MorpMap">See Your Result</a>
              </div>
            )}
          </li>
          <li>
            <a href="#">Q&A</a>
          </li>
          <li>
            <a href="/stainai/contact-us">CONTACT US</a>
          </li>
          <li className={classes.login}>
            <BsFillPersonFill size={25} />
              {user.info.firstname || user.info.lastname ? (
                <a href="/stainai/user/dashboard">
                  {" "}
                  {user.info.firstname} {user.info.lastname}{" "}
                </a>
              ) : (
                <a href="/stainai/user/signin">SIGNIN</a>
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
    </div>
  );
};

export default NavBar;
