import React from "react";
import { useNavigate } from "react-router-dom";

import classes from "./SideMenu.module.css";

const SideMenu = (props) => {
  const navigate = useNavigate();

  const createStuffOnClickHandler = () => {
    navigate("/create-stuff", { replace: true });
    props.setOpenSideMenu(false);
  };

  const createCollectionOnClickHandler = () => {
    navigate("/create-collection", { replace: true });
    props.setOpenSideMenu(false);
  };

  const searchProfilesOnClickHandler = () => {
    navigate("/search-profiles", { replace: true });
    props.setOpenSideMenu(false);
  };

  return (
    <>
      <div
        className={`${classes.sideMenu__container} ${
          props.showMenu && classes["sideMenu__container--open"]
        } ${
          !props.showMenu && classes["sideMenu__container--close"]
        }`}
      >
        {props.showMenu && (
          <div className={classes.sideMenu__menu}>
            <ul>
              <li onClick={createStuffOnClickHandler}>
                Create stuff
              </li>
              <li onClick={createCollectionOnClickHandler}>
                Create collection
              </li>
              <li onClick={searchProfilesOnClickHandler}>
                Search profiles
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default SideMenu;
