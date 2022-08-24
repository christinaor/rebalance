/**
 * ************************************
 *
 * @module  NavBar
 * @author
 * @date
 * @description NavBar is a component with different routes leading the user to different pages.
 *
 * ************************************
 */

import React, {useEffect, useState} from "react";
import { useNavigate, Routes, Route, Navigate, Link } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <nav className="navigation">
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/flow/settings">
        <button>Settings</button>
      </Link>
      <Link to="/flow/login">
        <button>Logout</button>
      </Link>
    </nav>

  )
};

export default NavBar;