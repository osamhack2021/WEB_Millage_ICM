import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import './footer.css';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary"
      align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/osamhack2021/WEB_Millage_ICM">
        OSAM Hack 2021 - ICM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
      All rights reserved.
    </Typography>
  );
}


function Footer() {
  return (
    <footer>
      <Copyright className="footer" sx={{mt: 8, mb: 4}} />
    </footer>
  );
}


export default Footer;
