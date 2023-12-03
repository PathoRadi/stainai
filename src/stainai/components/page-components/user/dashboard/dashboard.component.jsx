import React, { useEffect, useState, useRef } from "react";
import classes from "./dashboard.module.sass";

import UseUserContext from "../../../../hook/auth/user.hook";
import NavBar from "./navbar/nav-bar.component";
import NoAccess from "../no-access/no-access.component";

import { FaUserCog } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { FaDownload } from "react-icons/fa";
import { ImDownload } from "react-icons/im";
import { FaCloudUploadAlt } from "react-icons/fa";

import axios from "axios";

const DashBoard = () => {
  const user = UseUserContext();

  const [role, setRole] = useState(user?.info?.role);
  const [keyword, setKeyword] = useState();

  if (!user.info) return <NoAccess />;

  const [projects, setProjects] = useState([]);
  const [filterprojects, setFilterprojects] = useState([]);

  const STORAGE_URL = "https://pathoradi.blob.core.windows.net/uploaded/"
  const ssaToken = "sp=r&st=2023-09-24T14:48:18Z&se=2024-09-24T14:48:18Z&sv=2022-11-02&sr=c&sig=xyyA6BN7xmPh8ILC7aclmIK%2BjjWNUJylUeuWpyHMVo8%3D"




  useEffect(() => {
    const stainURL = process.env.REACT_APP_STAINAI_URL;
    // const stainURL = "http://localhost:3000";

    const qery =
      role === "admin"
        ? `${stainURL}/uploadInfo/`
        : `${stainURL}/uploadInfo/user/${user.info.userid}`;
        

    axios.get(`${qery}`).then((res) => {
      setProjects([...res.data]);
      setFilterprojects([...res.data]);
    });
  }, [setProjects]);


  const filterProject = (e) => {
    console.log(e.target.value)
    const filterVal = e.target.value;
    setFilterprojects(
      projects.filter(
        (project) =>
          project.project.includes(filterVal) ||
          (role === "admin" && project.firstname.includes(filterVal)) ||
          (role === "admin" && project.lastname.includes(filterVal)) ||
          project.status.includes(filterVal)
      )
    );
    // setKeyword(e.target.value)
  };


  return (
    <>
      <NavBar />
      <div className={classes.wrapper}>
        <div className={classes.nav}>
          {role === "admin" && (
            <>
              <a href="/stainai/user/dashboard"> PRPJECT </a>
              {` | `}
              <a href="/stainai/user/dashboard/users"> USER </a>
            </>
          )}
        </div>

        <div className={classes.project}>
          <div className={classes.userInfo}>
            <FaUserCog size={25} />
            <p>
              UserName: {user.info.firstname} {user.info.lastname}
            </p>
            <p>Email: {user.info.email}</p>
          </div>
          <h2>Microglial Image </h2>
          <div className={classes.inputgroup}>
            <FcSearch size={20} />
            <div>Search: </div>

            <input
              type="text"
              placeholder="Search Here ..."
              // value={keyword}
              onChange={(e) => {
                filterProject(e);
              }}
              // onClick={() => filterProject()}
            />
          </div>

          <table>
            <tbody>
              <tr>
                {role === "admin" && <th>UserName</th>}
                <th>Project</th>
                {/* <th>Thickness</th>
                <th>Pixel</th>
                <th>Images</th> */}
                <th>Status</th>
                <th>Result</th>
              </tr>
              {filterprojects.map((project, idx) => (
                <tr key={`project_${idx}`}>
                  {role === "admin" && (
                    <td>
                      {project.firstname} {project.lastname}
                    </td>
                  )}
                  <td style={{ display: "flex" }}>
                    {/* {role === "admin" && <ImDownload size={14} />} */}
                    <p style={{ marginLeft: "5px", cursor: "pointer" }}>
                      {project.project}
                    </p>
                  </td>
                  {/* <td>{project.thickness}</td>
                  <td>{project.pixel}</td>
                  <td>{project.images}</td> */}
                  <td>{project.status}</td>
                  <td>
                    <a href={`${STORAGE_URL}/${user.info.firstname} ${user.info.lastname}/${project.project}/result/result.zip?${ssaToken}`}>
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
