import React from "react";
import classes from "./content.module.sass";

const Content = ({ contentbg, icon, heading, blur, button, url }) => {
  return (
    <div className={classes.wrapper}>
      <div
        className={classes.content}
        style={{
          background: `url(${contentbg}) center center / cover no-repeat`,
        }}
      >
        <div className={classes.section}>
            <div className={classes.heading}>
                <img src={icon} />
                {heading}
            </div>
            <div className={classes.blur}>{blur}</div>
            <div className={classes.button}>
                <a href={url}>{button}</a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
