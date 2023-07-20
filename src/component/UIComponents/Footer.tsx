import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { colours } from '../../styling/colours';

const Footer = () => {
    const email = 'asaduzzaman.rahat@mail.mcgill.ca';
    const website = 'https://www.asadrahat.ca';

    return (
        <Box
            sx={{
                //backgroundColor: colours.secondary,
                padding: '1rem',
                textAlign: 'center',
                color: colours.primary
            }}
        >
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
        </Box>
    );
};

export default Footer;
