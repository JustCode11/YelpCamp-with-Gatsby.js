import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { auth } from '../../components/Firebase/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            setError("");
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/home');
        } catch (err) {
            setError(err.message);
        }
    }
    return (
        <div className="signFormsContainer">
            <div className="signFormsContainer__contentContainer container">
                <header>
                    <StaticImage
                        className="form__header__logo"
                        src="../images/icons/logo.svg"
                        alt="YelpCamp Logo"
                    />
                    <Link className="linkBack" to="/home">&#8592; Back to campgrounds</Link>
                </header>
                <main>
                    <h1>Start exploring camps from all around the world.</h1>
                    <form
                        className="signForm spacing"
                        onSubmit={handleSignup}
                    >
                        {error && <div className="signForm__errorMessage">{error}</div>}
                        <div className="signForm__inputField">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                        <div className="signForm__inputField">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>
                        <button type="submit">Create an account</button>
                    </form>
                    <div>
                        <p>Already a user? <Link className="linkToForm" to="/forms/login">Sign in</Link></p>
                    </div>
                </main>
            </div>
            <aside className="signFormsContainer__testimonialContainer">
                <div className="container">
                    <p className="testimonialText">"YelpCamp has honestly saved me hours of research time, and the camps on here are definitely well picked and added."</p>
                    <div className="testimonialProfileContainer">
                        <div>
                            <StaticImage
                                className=""
                                src="../../images/icons/userTestimonial.svg"
                                alt="May Andrews Profile Picture"
                            />
                        </div>
                        <div className="testimonialProfileContainer__text">
                            <span className="testimonialProfileContainer__text__name">May Andrews</span>
                            <span className="testimonialProfileContainer__text__job">Professional Hiker</span>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    )
}
