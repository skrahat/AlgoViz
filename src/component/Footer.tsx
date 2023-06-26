import React from 'react';

const Footer = () => {
    const name = 'Asaduzzaman Rahat';
    const email = 'asaduzzaman.rahat@mail.mcgill.ca';
    const website = 'https://www.asadrahat.ca';

    return (
        <footer
            style={{
                //backgroundColor: '#f5f5f5',
                padding: '1rem',
                textAlign: 'center',
                marginTop: '2rem',
                position: 'fixed',
                bottom: '0',
                width: '100%'
            }}
        >
            <p>
                <a href={website} target="_blank" rel="noopener noreferrer">
                    asadrahat.ca
                </a>
                <br />
                Ping me at <a href={`mailto:${email}`}>{email}</a>
                <br />
            </p>
        </footer>
    );
};

export default Footer;
