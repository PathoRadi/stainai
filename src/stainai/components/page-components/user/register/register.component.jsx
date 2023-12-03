import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import classes from "./register.module.sass";

import NavBar from "../../../shared-components/navbar/nav-bar.component";
import background from "../../../../assets/signin.png";
import axios from "axios";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [isExist, setIsExist] = useState(false);
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

    
    axios;
    axios.get(`${stainURL}/userInfo/${data.email}`).then((res) => {
      // checkt if email exists
      if (res.data.length > 0) {
        setIsExist(true);
      } else {
        axios
          .post(`${stainURL}/userInfo/create`, {
            firstname: data.firstname,
            lastname: data.lastname,
            organization: data.organization,
            email: data.email,
          })
          .then((res) => {
            setSuccess(true);
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <>
      <div className={classes.header}>
        <NavBar />
      </div>
      <div className={classes.wrapper}>
        <div className={classes.signup}>
          <div
            className={classes.logo}
            style={{
              background: `url(${background}) center center / cover no-repeat`,
            }}
          >
            Stain.AI
          </div>
          <div className={classes.title}>
            A Stain.AI account grants you access to all AI-Stain services.
          </div>
        </div>
        {
          !success && isExist && 
          <p className="font-semibold text-green-500 mb-10 mt-10 flex items-center justify-center gap-1">
           Email exists. Please create another Stain.AI account.
        </p>
        }

        {success ? (
          <p className="font-semibold text-green-500 mb-10 mt-10 flex items-center justify-center gap-1">
            Thank you for register. Please check your Email.
          </p>
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>First Name</label>
              <input
                name="firstname"
                type="text"
                id="firstname"
                {...register("firstname", {
                  required: "required",
                  maxLength: {
                    value: 30,
                    message: "30 characters max",
                  },
                })}
              />
              {errors.firstname && <p>{errors.firstname.message}</p>}

              <label>Last Name</label>
              <input
                name="lastname"
                type="text"
                id="lastname"
                {...register("lastname", {
                  required: "required",
                  maxLength: {
                    value: 30,
                    message: "30 characters max",
                  },
                })}
              />
              {errors.lastname && <p>{errors.lastname.message}</p>}
            </div>

            <label>Organization</label>
            <input
              name="organization"
              type="text"
              id="organization"
              {...register("organization", {
                required: "required",
                maxLength: {
                  value: 30,
                  message: "30 characters max",
                },
              })}
            />
            {errors.organization && <p>{errors.organization.message}</p>}

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
            <input
              type="submit"
              onClick={handleSubmit(onSubmit)}
              value="Register"
            />
          </form>
        )}
      </div>
    </>
  );
};

export default Register;
