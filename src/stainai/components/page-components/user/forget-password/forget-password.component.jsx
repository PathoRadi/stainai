import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import classes from "./forget-password.module.sass";
import axios from "axios";

import NavBar from "../../../shared-components/navbar/nav-bar.component";
import background from "../../../../assets/signin.png";

const ForgetPassword = () => {
  const [success, setSuccess] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({});

  const onSubmit = async (data) => {
    const stainURL = process.env.REACT_APP_STAINAI_URL;
    // const stainURL = "http://localhost:3000";

    axios
      .post(`${stainURL}/forgetPassword`, {
        email: data.email,
      })
      .then((res) => {
        setSuccess(true);
        // return (window.location = "/morstainai/user");
      });
  };

  return (
    <>
      <div className={classes.header}>
        <NavBar />
      </div>

      <div className={classes.wrapper}>
        <div className={classes.signin}>
          <div
            className={classes.logo}
            style={{
              background: `url(${background}) center center / cover no-repeat`,
            }}
          >
            Stain.AI
          </div>
          <div className={classes.subtitle}>Forget Your MorStain Password</div>
          {success ? (
            <p className="font-semibold text-green-500 mb-10 mt-10 flex items-center justify-center gap-1">
               Reset password email has been set.   Please check your Email.
            </p>
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className={classes.morstainid}>
                {/* <input placeholder="Password" className={classes.input} />
                <input
                  placeholder="Comfirm Password"
                  className={classes.input}
                /> */}
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  id="email"
                  {...register("email", {
                    required: "required",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "not valid",
                    },
                  })}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>

              <input
                type="submit"
                onClick={handleSubmit(onSubmit)}
                value="Reset Password"
              />
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
