import React from "react";
import classes from "./hero.module.sass";

const Hero = ({ background, logo, title, blur, button, url }) => {
  return (
    <div className={classes.wrapper}>
      <ol>
        <li className={classes.hero}>
          <div className={classes.compartment}>
            <div className={classes.heroContent}>
              <h1>{logo}</h1>
              <h2>{title}</h2>
              {/* <h3> {blur}</h3> */}
              <div className ={classes.blur} dangerouslySetInnerHTML={{__html: blur}} />
            </div>
          </div>
          {button && (
            <div className={classes.learnmore}>
              <a href={url} className={classes.button}>
                {button}
              </a>
            </div>
          )}
        </li>
      </ol>
    </div>
  );
};

export default Hero;
