import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

const Footer = () => {
    return (
        <footer className="footer container">
            <StaticImage className="footer__logo"
                src="../images/icons/logo.svg"
                alt="YelpCamp Logo" />
        </footer>
    )
}

export default Footer;