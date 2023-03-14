import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./MainHeader.module.css";
import shareme_blue_logo from "../../assets/imgs/logos/shareme_blue_logo.png";
import { checkAuth, logout } from "../../store/auth-store/auth-actions";
import useUser from "../../hooks/useUser";

const MainHeader = () => {
  const dispatch = useDispatch();
  const user = useUser();

  const logoutHandler = (isAll = false) => {
    dispatch(logout(isAll));
  };

  return (
    <>
      <header className={classes.header}>
        <div className={classes.logo}>
          <img src={shareme_blue_logo} alt="ShareMe Logo" />
          <h1>ShareMe</h1>
        </div>
        <div className={classes.userInfo}>
          <img src={user.avatar} alt="User Avatar" />
          <h2>Hi {`${user.firstName} ${user.lastName}!`}</h2>
        </div>
        <div>
          <button className={classes.button} onClick={() => logoutHandler()}>
            Logout
          </button>
          <button
            className={classes.button}
            onClick={() => logoutHandler(true)}
          >
            Logout All
          </button>
        </div>
      </header>
    </>
  );
};

export default MainHeader;
