import React from "react";
import classes from "./signup-content.module.sass";

const SingUpContent = ({ icon, heading, blur }) => {
  return (
    <div className={classes.wrapper}>
        <div className={classes.section}>
          <div className={classes.heading}>
            <img src={icon} />
            {heading}
          </div>
          <div className={classes.blur}>{blur}</div>
        </div>
    </div>
  );
};

export default SingUpContent;
