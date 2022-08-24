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
    <div>
      {/* <li>
        Welcome to Rebalance!
      </li> */}
      <li>
        <Link to="/flow/settings">Settings</Link>
      </li>
      <li>
        {/* <Link to="/flow/login">Logout</Link> */}
      </li>
    </div>

  )
};

export default NavBar;