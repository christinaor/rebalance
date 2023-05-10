import React from "react";

import Copyright from "../../components/Copyright/Copyright.jsx";
import styles from './styles.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Copyright />
    </div>
  );
};

export default Footer;