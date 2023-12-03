import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import classes from "./reset-password.module.sass";
import axios from "axios";

import NavBar from "../../../shared-components/navbar/nav-bar.component";
import background from "../../../../assets/signin.png";

const ResetPasword = () => {

  let params = new URL(document.location).searchParams;

  const [allow, Setallow] = useState(false);
  const [email, SetEmail] = useState(params.get("email"));
  const [token, SetToken] = useState(params.get("token"));
  

  // if (!email && !token) return (window.location = "/stainai/user/signin");

  useEffect(() => {
    const stainURL = process.env.REACT_APP_STAINAI_URL;
    // const stainURL = "http://localhost:3000";

    axios
      .get(`${stainURL}/resetPassword?email=${email}&token=${token}`)
      .then((res) => {
        // console.log(res.data.allow);
        Setallow(res.data.allow);
      });
  }, [params]);


  const [success, setSuccess] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({});

  const password = useRef({});

  password.current = watch("password", "");

  const onSubmit = async (data) => {
    const stainURL = process.env.REACT_APP_STAINAI_URL;
    // const stainURL = "http://localhost:3000";

    axios
      .post(`${stainURL}/resetPassword/update`, {
        email: email,
        token: token,
        password: data.password,
      })
      .then((res) => {
        return (window.location = "/stainai/user/signin")
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
          <div className={classes.subtitle}>Reset Your Stain.AI Password</div>

          {allow ? (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className={classes.morstainid}>
                 <label>Email</label>
                <input
                  name="email"
                  type="text"
                  id="email"
                  value={email}
                  disabled
                />
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "You must specify a password",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <label>Comfirm password</label>
                <input
                  name="cpassword"
                  type="password"
                  id="cpassword"
                  {...register("cpassword", {
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                />
                {errors.cpassword && <p>{errors.cpassword.message}</p>}
              </div>

              <input type="submit" onClick={handleSubmit(onSubmit)} value="Reset Password" />
            </form>
          ) : (
            <div className={classes.error}>
              Your email or toke is invalided. Please go back to{" "}
              <a href="/user/signin">sign in</a> page
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPasword;
