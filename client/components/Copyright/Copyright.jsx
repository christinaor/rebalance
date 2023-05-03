import React, {useEffect, useState} from "react";
import { Button, Paper, Typography, Link } from '@mui/material';


const Copyright = (props) => {
  return (
    <footer>
      {'© '}
      <Link color="inherit" href="https://github.com/christinaor">
        Christina Or
      </Link>{' '}
      {new Date().getFullYear()}
      {' | MIT License'}
    </footer>
  );
};

export default Copyright;