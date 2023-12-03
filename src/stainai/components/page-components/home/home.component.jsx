import React from "react";
import classes from "./home.module.sass";
import NavBar from "../../shared-components/navbar/nav-bar.component";
import Hero from "../../shared-components/hero/hero.component";

import contentbg1 from "../../../assets/1_section.png";
import contentbg2 from "../../../assets/2_section.png";
import contentbg3 from "../../../assets/3_section.png";
import icon1 from "../../../assets/1_icon_50x50.png";
import icon2 from "../../../assets/2_icon_50x50.png";
import icon3 from "../../../assets/3_icon_50x50.png";
import background from "../../../assets/home_hero.png";
import Content from "./content/content.component";

const StainAI = () => {
  return (
    <>
      <div className={classes.header}>
        <NavBar />
        <Hero
          logo="Stain.AI"
          title="AI Stain of Cell Morphology on Whole Brain"
          blur=" Stain.AI is a website-as-a-service software package that can count & quantify morphological phenotypes of cells, even on low magnification immunohistochemistry images."
          button="Learn more"
          url="#"
        />
      </div>
      <div className={classes.section}>
        <Content
          contentbg={contentbg1}
          icon={icon1}
          heading="Automated Quantification"
          blur="Give it a try on your microglial image!"
          button="UPLOAD YOUR DATA"
          url="/stainai/upload-image"
        />
        <Content
          contentbg={contentbg2}
          icon={icon2}
          heading="Visualization & Analysis"
          blur="Interactive data quantification and statistical analysis."
          button="SEE YOUR RESULT"
          url="http://stainai.howard.edu/webapps/home/session.html?app=Microglia_MorpMap%2FMicroglia_MorpMap"
        />
        <Content
          contentbg={contentbg3}
          icon={icon3}
          heading="Future Work"
          blur="AI-assisted radiologic-pathologic correlation analysis"
          button="COMING SOON"
          url="#"
        />
      </div>
    </>
  );
};

export default StainAI;
