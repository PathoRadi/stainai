import React, { useRef, useState, useContext } from "react";
import classes from "./signin.module.sass";


import background from "../../../../assets/signin.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserContext } from "../../../../../App";
import NavBar from "../../../shared-components/navbar/nav-bar.component";

const SignIn = () => {
  const [allow, SetAllow] = useState(null);
  const { user, setUser } = useContext(UserContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({});

  const password = useRef({});

  password.current = watch("password", "");

  const onSubmit = async (data) => {
    const stainaiURL = process.env.REACT_APP_STAINAI_URL;
    // const stainaiURL = "http://localhost:3000";

    axios
      .post(`${stainaiURL}/singin`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        localStorage.setItem("STAINAI_USER_PROFILE", JSON.stringify(res.data));
        if (res.data.allow) {
          setUser(res.data);
          return (window.location = "/stainai");
        } else SetAllow(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className={classes.header}>
        <NavBar />
      </div>
      <div className={classes.wrapper}>
        <div className={classes.usernav}>
          <a href="/stainai/user/singup"> Create your Stain.AI ID</a>
        </div>
        <div className={classes.signin}>
          <div
            className={classes.logo}
            style={{
              background: `url(${background}) center center / cover no-repeat`,
            }}
          >
            Stain.AI
          </div>

          {allow === false && (
            <div className={classes.error}>Email or Password is Invalid!</div>
          )}

          <form onSubmit={(e) => e.preventDefault()}>
            <div className={classes.morstainid}>
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
            </div>

            <input
              type="submit"
              onClick={handleSubmit(onSubmit)}
              value="Sing In"
            />
          </form>

          <div className={classes.rememberme}>
            <input type="checkbox" className={classes.checkbox} />
            Remember me
          </div>
          <div className={classes.forget}>
            <a href="/stainai/user/forget-password">
              Forget Stain.AI ID Password?
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
