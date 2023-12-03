import React from "react";
import classes from "./upload-image.module.sass";
import NavBar from "../../shared-components/navbar/nav-bar.component";
import Hero from "../../shared-components/hero/hero.component";
import UploadForm from "./upload-form/upload-form.component";
import UseUserContext from "../../../hook/auth/user.hook";
import NoAccess from "../user/no-access/no-access.component";

const UploadImage = () => {
  const user = UseUserContext();

  if(!user.info) 
    return <NoAccess />
  
  return (
    <>
      <div className={classes.header}>
        <NavBar />
        <Hero
          logo="Artificial Interlligence-aided"
          title="automated quantification"
          blur="Computor-aid automation to quantiy your neuron cell. <br/> We empower the neuron research."
          button=""
          url="#"
        />
      </div>
      <div className={classes.section}>
        <UploadForm
        />
      </div>
    </>
  );
};

export default UploadImage;
