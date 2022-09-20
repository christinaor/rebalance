import React, {useEffect, useState} from "react";
import { Button, Paper, Typography, Link } from '@mui/material';


const Copyright = (props) => {
  return (
    <Paper elevation={3} square className="footer"><Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/christinaor">
        Christina Or
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography></Paper>
  );
};

export default Copyright;