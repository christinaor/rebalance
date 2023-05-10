import React from "react";

import styles from './styles.module.scss';

const Copyright = (props) => {
  return (
    <div className={styles.copyright}>
      <span>
        {`© `}
        <a href="https://github.com/christinaor">Christina Or</a>
        {` ${new Date().getFullYear()} | MIT License`}
      </span>
    </div>
  );
};

export default Copyright;