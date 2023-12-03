import { useEffect, useState } from "react";
import classes from "./upload-form.module.sass";
import classnames from "classnames";
import cn from "classnames";
import axios from "axios";

import { FaUserCog, FaProjectDiagram } from "react-icons/fa";
import { BiDownArrow } from "react-icons/bi";
import FileUpload from "../file-upload/file-upload.component";
import UseUserContext from "../../../../hook/auth/user.hook";
import uploadFileToBlob from "../../../../utils/fileUpload";
import Spinner from "../../../shared-components/spinner/spinner.component";

const UploadForm = () => {
  const user = UseUserContext();
  const [agree, setAgree] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentBatch, setCurrentBatch] = useState(1);
  const [toUpload, setToUpload] = useState({
    username: `${user.info.firstname} ${user.info.lastname}`,
    email: user.info.email,
    project: `Stain.AI-${
      new Date().getMonth() + 1
    }${new Date().getDate()}${new Date().getFullYear()}`,
    uploadInfo: {
      [currentBatch]: {
        species: "rat",
        strain: "",
        treatment: "",
        organ: "brain",
        slice: "",
        pixel: "",
        region: "Cerebral Cortex",
        structure: "",
        images: [],
        rawImages: "",
      },
    },
  });


  const buttonStyling = agree
    ? "p-5 rounded-md bg-blue-600 font-semibold text-white flex items-center gap-1 hover:bg-blue-800"
    : "p-5 rounded-md bg-gray-600 font-semibold text-white flex items-center gap-1";

  const updateUploadedFiles = (files, idx) => {
    setToUpload((oldState) => ({
      ...oldState,
      uploadInfo: {
        ...oldState.uploadInfo,
        [idx]: {
          ...oldState.uploadInfo[idx],
          images: files.map((file) => file.name),
          rawImages: files,
        },
      },
    }));
  };

  const handleField = (e, idx, field) => {
    setCurrentBatch(idx);
    setToUpload((oldState) => ({
      ...oldState,
      uploadInfo: {
        ...oldState.uploadInfo,
        [idx]: {
          ...oldState.uploadInfo[idx],
          [field]: e.target.value,
        },
      },
    }));

    if(document.getElementById(`organ_${idx}`).value === 'other'){
      document.getElementById(`otherOrgan_${idx}`).style.display = 'block'
    }
    else
      document.getElementById(`otherOrgan_${idx}`).style.display = 'none'
  };

  const newLine = (idx, updateUploadedFiles) => (
    <div className={classnames(classes.row)}>
      <div className={classes.imageBatchNum}>
        <div className={classes.lightgrey}>Image Batch</div>
        <div>{idx + 1}</div>
      </div>
      <div className={classes.imageBatchInfo}>
        <div className={classnames(classes.col, classes.lightpurple)}>
          <div className={classes.imageBatchHeader}>TISSUE</div>
          <div className={classes.row}>
            <div className={classes.col}>
              <label>*Species</label>
              {/* <input
                name="species"
                type="text"
                id="species"
                defaultValue={currentBatch[idx + 1]?.species}
                onChange={(e) => handleField(e, idx + 1, "species")}
              /> */}

              <select
                name="species"
                id="species"
                onChange={(e) => handleField(e, idx + 1, "species")}
              >
                <option value="rat">rat</option>
                <option value="mouse">mouse</option>
                <option value="primate">primate</option>
                <option value="bovine">bovine</option>
                <option value="pig">pig</option>
                <option value="other">other</option>
              </select>
            </div>
            <div className={classes.col}>
              <label>Strain</label>
              <input
                name="strain"
                type="text"
                id="strain"
                onChange={(e) => handleField(e, idx + 1, "strain")}
              />
            </div>
            <div className={classes.col}>
              <label>Animal Treatment</label>
              <input
                name="treatment"
                type="text"
                id="treatment"
                onChange={(e) => handleField(e, idx + 1, "treatment")}
              />
            </div>
            <div className={classes.col}>
              <label>*Organ</label>
              {/* <input
                name="organ"
                type="text"
                id="organ"
                defaultValue={currentBatch[idx + 1]?.organ}
                onChange={(e) => handleField(e, idx + 1, "organ")}
              /> */}

              <select
                name="organ"
                id={`organ_${idx + 1}`}
                onChange={(e) => handleField(e, idx + 1, "organ")}
              >
                <option value="brain">brain</option>
                <option value="spinal cord">spinal cord</option>
                <option value="retina">retina</option>
                <option value="other">other</option>
              </select>
              {/* {toUpload.uploadInfo[idx + 1]?.organ === "other" && ( */}
                <input
                  type="text"
                  name="otherOrgan"
                  id={`otherOrgan_${idx + 1}`}
                  placeholder=""
                  onChange={(e) => handleField(e, idx + 1, "otherOrgan")}
                  style={{ marginLeft: "10px", marginTop: "5px", display: "none"}}
                />
              {/* )} */}
            </div>
          </div>
        </div>
        <div className={classnames(classes.col, classes.lightyellow)}>
          <div className={classes.imageBatchHeader}>IMAGE METADATA</div>
          <div className={classes.row}>
            <div className={classes.col}>
              <label>*Slice Thickness(um)</label>
              <input
                name="slice"
                type="text"
                id="slice"
                onChange={(e) => handleField(e, idx + 1, "slice")}
              />
            </div>
            <div className={classes.col}>
              <label>*Pixel Size(um)</label>
              <input
                name="pixel"
                type="text"
                id="pixel"
                onChange={(e) => handleField(e, idx + 1, "pixel")}
              />
            </div>
            <div className={classes.col}>
              <label>*Anatomical Region</label>
              {/* <input
                name="region"
                type="text"
                id="region"
                defaultValue={currentBatch[idx + 1]?.region}
                onChange={(e) => handleField(e, idx + 1, "region")}
              /> */}
              <select
                name="region"
                id="region"
                onChange={(e) => handleField(e, idx + 1, "region")}
              >
                <option value="Cerebral Cortex">Cerebral Cortex</option>
                <option value="Hippocampus">Hippocampus</option>
                <option value="Striatum">Striatum</option>
                <option value="Amygdala">Amygdala</option>
                <option value="Thalamus">Thalamus</option>
                <option value="Hypothalamus">Hypothalamus</option>
                <option value="Midbrain">Midbrain</option>
                <option value="Cerebellum">Cerebellum</option>
                <option value="Medulla Oblongata">Medulla Oblongata</option>
                <option value="Pons">Pons</option>
                <option value="Olfactory Bulb">Olfactory Bulb</option>
                <option value="Nucleus Accumben">Nucleus Accumben</option>
                <option value="Periaqueductal Gray">Periaqueductal Gray</option>
                <option value="Superior Colliculus">Superior Colliculus</option>
                <option value="Inferior Colliculus">Inferior Colliculus</option>
              </select>
            </div>
            <div className={classes.col}>
              <label>Structure Detail</label>
              <input
                name="structure"
                type="text"
                id="structure"
                onChange={(e) => handleField(e, idx + 1, "structure")}
              />
            </div>
          </div>
        </div>
        <div className={classnames(classes.col, classes.lightblue)}>
          {/* <div className={classes.imageBatchHeader}>UPLOAD FILES</div>  */}
          <div style={{ width: "100%" }}>
            <FileUpload
              accept=".jpg,.png,.jpeg, .tif"
              // label="Upload raw image to get result"
              multiple
              updateFilesCb={updateUploadedFiles}
              idx={idx + 1}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const [divs, setDivs] = useState([
    <div key="0">{newLine(0, updateUploadedFiles)}</div>,
  ]);

  const addNewDiv = () => {
    setDivs([
      ...divs,
      <div key={divs.length}>{newLine(divs.length, updateUploadedFiles)}</div>,
    ]);
    setCurrentBatch(divs.length + 1);
    setToUpload((oldState) => ({
      ...oldState,
      uploadInfo: {
        ...oldState.uploadInfo,
        [divs.length + 1]: {
          species: "rat",
          strain: "",
          treatment: "",
          organ: "brain",
          slice: "",
          pixel: "",
          region: "Cerebral Cortex",
          structure: "",
          images: [],
          rawImages: "",
        },
      },
    }));
  };

  const onSubmit = async () => {

    const stainURL = process.env.REACT_APP_STAINAI_URL;
    const userid = user.info.userid;

    setLoading(true);

    try {
      // Make the POST request and wait for it to complete
      await axios.post(`${stainURL}/uploadInfo/create`, {
        ...toUpload,
        userid,
      });

      // Use map to create an array of promises for uploadFileToBlob
      const uploadPromises = Object.keys(toUpload.uploadInfo).map(
        async (idx) => {
          await uploadFileToBlob(
            toUpload.username,
            toUpload.project,
            toUpload.uploadInfo[idx].rawImages,
            idx
          );
        }
      );

      // Wait for all uploadFileToBlob promises to resolve
      await Promise.all(uploadPromises);

      // Set loading to false and success to true after all operations are complete
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading to false in case of an error
      // Handle other error scenarios if needed
    }
  };

  return (
    <div className={classes.wrapper}>
      {success ? (
        <p className="font-semibold text-green-500 mb-10 mt-10 flex items-center justify-center gap-1">
          Form has been submitted successfully
        </p>
      ) : loading ? (
        <Spinner className={classes.spinner} />
      ) : (
        <>
          {/* <FormProvider {...methods}> */}
          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            autoComplete="off"
            // className="container"
          >
            <div className={classnames(classes.row, classes.lightgrey)}>
              <div className={classes.row2}>
                <div>
                  <FaUserCog />{" "}
                </div>
                <div>Use Name: {toUpload.username}</div>
                <div>Email: {toUpload.email}</div>
              </div>
              <div className={classes.row2}>
                <div>
                  <FaProjectDiagram />
                </div>
                <div>
                  <label>*Project</label>
                  <input
                    name="Project"
                    type="text"
                    id="Project"
                    defaultValue={toUpload.project}
                    onChange={(e) => {
                      setToUpload((oldState) => ({
                        ...oldState,
                        project: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={classes.uploadForm}>
              {divs.map((div, index) => (
                <div key={index}>{div}</div>
              ))}
              <div
                className={classnames(
                  classes.col,
                  classes.lightgrey,
                  classes.newbatch
                )}
                style={{ padding: "20px 0" }}
                onClick={addNewDiv}
              >
                + Add new batch
              </div>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() => {
                  setAgree(!agree);
                }}
              />{" "}
              Agree: This web application tool is designed to assist academic
              institutes in quantifying cells for research and educational
              purposes. While we strive to ensure the accuracy and reliability
              of the results, we cannot guarantee the absolute precision of the
              calculations. The accuracy of cell counting may vary based on
              image quality and user input. The tool is not a substitute for
              professional medical or scientific analysis. Users are encouraged
              to verify the results independently for critical applications. The
              developers of this tool disclaim any responsibility for the
              accuracy, completeness, or reliability of the results obtained.
              Users are solely responsible for the interpretation and use of the
              data generated by this application. By using this web application,
              you agree to these terms and acknowledge the limitations of the
              tool.
            </div>
            <div className="flex justify-end">
              <button
                className={buttonStyling}
                disabled={!agree ? true : false}
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </form>
          {/* </FormProvider> */}
        </>
      )}
    </div>
  );
};

export default UploadForm;
