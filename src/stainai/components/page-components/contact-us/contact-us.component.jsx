import React, { useState } from "react";
import { useForm } from "react-hook-form";
import classes from "./contact-us.module.sass";
import NavBar from "../../shared-components/navbar/nav-bar.component";
import Hero from "../../shared-components/hero/hero.component";
import axios from "axios";

const ContactUs = () => {
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState ({
    firstname: '',
    lastname: '',
    email: '',
    message: ''
  });

  const onSubmit = async () => {
      console.group(form);
      const stainURL = process.env.REACT_APP_STAINAI_URL;
      // const stainURL = "http://localhost:3000";

      axios
      .post(`${stainURL}/contactUs`, {
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        message: form.message,
      })
      .then((res) => {
        setSuccess(true);
      })
      .catch((error) => console.log(error));
  };

  console.log(success)
  
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <NavBar />
        <Hero logo="" title="" blur="" button="" url="" />
      </div>
      <div className={classes.section}>
        <div className={classes.contactUs}>
          <div className={classes.info}>
            <div>
              <div className={classes.title}>CONTACT INFO</div>
              <div>tsangwei.tu@howard.edu</div>
              <div>+1(202)865-3742</div>
            </div>
            <div>
              <div className={classes.title}>ADDRESS</div>
              <div>
                <strong>Howard University</strong>
                <br />
                <strong>Molecular Imaging Laboratory</strong>
                <br />
                <span>2041 Georgia Ave., NW</span>
                <br />
                <span>Cancer Center B112</span>
                <br />
                <span>Washington, D.C. 20060</span>
              </div>
            </div>
          </div>

          <div className={classes.message}>
          {success ? (
            <p className="font-semibold text-green-500 mb-10 mt-10 flex items-center justify-center gap-1">
               Messaged has been sent!
            </p>
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <div className={classes.title}>PSRSON INFO</div>
                <div className={classes.row}>
                  <div className={classes.inputGroup}>
                    First Name
                    <input name="firstname" type="text" id="firstname" value={form.firstname} onChange={e => setForm({...form, firstname: e.target.value})}/>
                  </div>
                  <div className={classes.inputGroup}>
                    Last Name
                    <input name="lastname" type="text" id="lastname"  value={form.lastname} onChange={e => setForm({...form, lastname: e.target.value})}/>
                  </div>
                </div>
                <div className={classes.inputGroup}>
                  Email
                  <input name="email" type="text" id="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
                </div>
              </div>
              <div>
                <div className={classes.title}>MESSAGE</div>
                <textarea  value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
              </div>
              <div className={classes.button}>
                <input
                  type="submit"
                  onClick={onSubmit}
                  value="submit"
                />
              </div>
            </form>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
