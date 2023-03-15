import React, { useState } from "react";
import { Link } from "react-router-dom";

import classes from "./SideMenu.module.css";

const SideMenu = (props) => {
  const [showMenu, setShowMenu] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className={classes.sideMenu__container}>
        <button className={classes.sideMenu__button} onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>
        <div className={classes.sideMenu__search}>
          <input
            type="text"
            name="search_bar"
            id="search_bar"
            placeholder="Search..."
          />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      {showMenu && (
        <div className={classes.sideMenu__menu}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Your profile</Link>
            </li>
            <li>
              <Link to="/">Add stuff</Link>
            </li>
            <li>
              <Link to="/">Create collection</Link>
            </li>
            <li>
              <Link to="/">Messages</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default SideMenu;
