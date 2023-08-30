import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { colours } from '../../../styling/colours';
import './Footer.scss'; // Import the SCSS file

const Footer = () => {
    const email = 'asaduzzaman.rahat@mail.mcgill.ca';
    const website = 'https://www.asadrahat.ca';

    return (
        <Box className="footer-container">
            {' '}
            {/* Use the class name */}
            <Typography variant="body2" color="inherit">
                <Link
                    href={email}
                    variant="caption"
                    color="inherit"
                    underline="none"
                >
                    Contact me
                </Link>
                <br />
            </Typography>
            <Typography variant="caption" color="inherit" mt={1}>
                <Link
                    href={website}
                    variant="caption"
                    color="inherit"
                    underline="none"
                >
                    &copy; {new Date().getFullYear()} Asad Rahat. All rights
                    reserved.
                </Link>
            </Typography>
            <Typography variant="body2" color="grey">
                v1.5
            </Typography>
        </Box>
    );
};

export default Footer;
