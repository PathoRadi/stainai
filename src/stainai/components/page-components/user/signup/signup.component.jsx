import React from "react";
import classes from "./signup.module.sass";

import NavBar from "../../../shared-components/navbar/nav-bar.component";
import background from "../../../../assets/signin.png";
import SingUpContent from "./signup-content/signup-content.component";

import icon1 from "../../../../assets/Icon_in control.png";
import icon2 from "../../../../assets/Icon_secure.png";
import icon3 from "../../../../assets/Icon_why ID.png";

const SignUp = () => {
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
            A MorStainAI account grants you access to all AI-Stain services.
          </div>
          <div className={classes.blur}>
            Sign in now to effortiessly manage our account and take control of
            your MorStainAI experience.
          </div>
          <div className={classes.button}>
            <a href="/stainai/user/register">Sign Up</a>
          </div>
        </div>
        <SingUpContent
          icon={icon1}
          heading="In Control"
          blur="Take a moment to review or vital details, such as your name, password, and security information. Expore ways for others to contact you, verify your payment details, and efficiently manage the devices linked to your account."
        />

        <SingUpContent
          icon={icon2}
          heading="Private and Secure"
          blur="Privacy and security are paramount. With features like two-factor authentication, we ensures your account remains secure, your privacy protected, and your data under your control."
        />

        <SingUpContent
          icon={icon3}
          heading="What is MorStainAI ID?"
          blur="A MorStainAI ID is your personal account for accessing a range of AI-Stain services, including the MorStainAI Store, iCloud, Messages, and more. It encompasses your sign-in information along with contact, payment, and security details that are utilized accross all MorStainAI servies."
        />

        <SingUpContent
          icon={icon3}
          heading="When do I use my MorStainAI ID?"
          blur="For any new contact email, purchase, or use of AI-Stain services, simply sign in with your MorStainAI ID and password. This grants access to the service and your personal information. Use the same MorStainAI ID across all sign-ins for seamless integration of all services, allowing access to your personal content from anywhere."
        />
      </div>
    </>
  );
};

export default SignUp;
