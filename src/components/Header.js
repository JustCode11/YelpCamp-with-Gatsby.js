import React, { useState } from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { useAuthValue } from './Auth/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './Firebase/Firebase';

const Header = () => {
    const { currentUser } = useAuthValue();
    const [close, setClose] = useState(false);
    const closeInfoBox = () => {
        setClose((prev) => !prev);
    }
    const handleLogout = (e) => {
        e.preventDefault();
        signOut(auth);
    }
    return (
        <>
            <section className={`infoBox container ${close ? "close" : ""}`} aria-label="Created by Field">
                <div className="infoBox__fullContainer">
                    <div className="infoBox__fullContainer__textContainer">
                        <p>This project was made by &nbsp;
                            <a href="https://www.codewell.cc/challenges/yelpcamp-by-colt-steele--6144c7c8a383e41090a3d84b">Colt Steele</a>
                            &nbsp; and designed by &nbsp;
                            <a href="https://www.codewell.cc/">Codewell</a>
                        </p>
                    </div>
                    <div className="infoBox__fullContainer__closeIcon" onClick={closeInfoBox}>
                        <StaticImage
                            src="../images/icons/close.svg"
                            alt="Close Icon"
                            className="infoBox__closeIcon__icon"
                        />
                    </div>
                </div>
            </section>
            <header className="header container">
                <div className="header__imgContainer">
                    <StaticImage className="header__imgContainer__logo"
                        src="../images/icons/logo.svg"
                        alt="YelpCamp Logo"
                    />
                    <Link className="header__imgContainer__link hide-for-mobile-tablet" to="/home">Home</Link>
                </div>
                <div className="header__buttonContainer hide-for-desktop">
                    <div className="header__buttonContainer__hamburgerButton">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="header__userContainer hide-for-mobile-tablet">
                    {!currentUser ? (
                        <>
                            <Link
                                className="header__userContainer__link"
                                to="/forms/login"
                            >Login</Link>
                            <Link to="/forms/signup">
                                <button>Create an account</button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="header__userContainer__profile">{currentUser.email}</span>
                            <a
                                className="header__userContainer__link"
                                onClick={handleLogout}
                            >Logout</a>
                        </>
                    )}

                </div>
            </header>
        </>

    )
}

export default Header