import React, { useEffect, useState, useRef, useMemo } from "react";
import classes from "./dashboard.module.sass";

import UseUserContext from "../../../../hook/auth/user.hook";
import NavBar from "./navbar/nav-bar.component";
import NoAccess from "../no-access/no-access.component";

import { FaUserCog } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";

import axios from "axios";

const DashBoardUsers = () => {
  const user = UseUserContext();

  const [role, setRole] = useState(user?.info?.role);

  if (!user.info) return <NoAccess />;

  const [users, setUsers] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [filterusers, setFilterusers] = useState([]);

  useEffect(() => {
    const morstainURL = process.env.REACT_APP_MORSTAIN_URL;
    axios.get(`${morstainURL}/userInfo/`).then((res) => {
      setUsers([...res.data]);
      setFilterusers([...res.data]);
      
    });
  }, [setUsers]);

  // sort by
  // const sortbyOrder = (sortCol) => {
  //   setSorting(!sorting);
  //   users.sort((a, b) =>
  //     a[`${sortCol}`].toString().toUpperCase() -
  //     b[`${sortCol}`].toString().toUpperCase()
  //       ? 1
  //       : -1
  //   );
  // };

  const filterUsers = (e) => {
    const filterVal = e.target.value;
    setFilterusers(
      users.filter(
        (user) =>
          user.firstname.toLowerCase().includes(filterVal) ||
          user.lastname.toLowerCase().includes(filterVal) ||
          user.email.toLowerCase().includes(filterVal) ||
          user.organization.toLowerCase().includes(filterVal)
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
              <a href="/morstainai/user/dashboard"> PRPJECT </a>
              {` | `}
              <a href="/morstainai/user/dashboard/users"> USER </a>
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
          <h2>Users Information </h2>

          <div className={classes.inputgroup}>
            <FcSearch size={20} />
            <div>Search: </div>

            <input
              type="text"
              placeholder="Search Here ..."
              // value={keyword}
              onChange={(e) => {
                filterUsers(e);
              }}
              // onClick={() => filterProject()}
            />
          </div>

          <table>
            <tbody>
              <tr>
                <th>
                  ID
                  {/* <button type="button" onClick={()=>sortbyOrder('userid')}>Sort</button> */}
                </th>
                <th>
                  UserName
                  {/* <button type="button" onClick={()=>sortbyOrder('firstname')}>Sort</button> */}
                </th>
                <th>
                  Email
                  {/* <button type="button" onClick={()=>sortbyOrder('email')}>Sort</button> */}
                </th>
                <th>
                  Organization
                  {/* <button type="button" onClick={()=>sortbyOrder('organization')}>Sort</button> */}
                </th>
              </tr>
              {filterusers.map((user, idx) => (
                <tr key={`user${idx}`}>
                  <td>{user.userid}</td>
                  <td>
                    {user.firstname} {user.lastname}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.organization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashBoardUsers;
