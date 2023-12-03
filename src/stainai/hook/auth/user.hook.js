import React, { useContext } from "react";

const UseUserContext = () => {
  return {
    info: localStorage.getItem("STAINAI_USER_PROFILE")
      ? JSON.parse(localStorage.getItem("STAINAI_USER_PROFILE"))
      : "",
  };
};

export default UseUserContext;
