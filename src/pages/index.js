import React from 'react'
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage, StaticImage, withArtDirection } from 'gatsby-plugin-image';

import '../styles/styles.css';

export default function LandingPage({ data }) {
  const heroImageDesktop = getImage(data.heroImageDesktop.childImageSharp.gatsbyImageData);
  const heroImageMobile = getImage(data.heroImageMobile.childImageSharp.gatsbyImageData);
  const images = withArtDirection(heroImageDesktop, [
    {
      media: "(max-width: 768px)",
      image: heroImageMobile
    }
  ]);
  return (
    <>
      <header className="headerLandingPage containerLandingPage">
        <StaticImage className="headerLandingPage__logo"
          src="../images/icons/logo.svg"
          alt="YelpCamp Logo" />
      </header>
      <main className="lpMain">
        <div className="lpMain__imgContainer">
          <GatsbyImage
            className="lpMain__imgContainer__img"
            image={images}
            alt="Camping Image"
          />
        </div>
        <section
          className="lpMain__contentContainer containerLandingPage"
          aria-labelledby='landingPageHeading'
        >
          <h1 id="landingPageHeading">Explore the best camps on Earth.</h1>
          <p>YelpCamp is a curated list of the best camping spots on Earth. Unfiltered and unbiased reviews.</p>
          <ul>
            <li>Add your own camp suggestions.</li>
            <li>Leave reviews and experiences.</li>
            <li>See locations for all camps.</li>
          </ul>
          <Link to="/home">
            <button>View Campgrounds</button>
          </Link>
          <div className="lpMain__contentContainer__partneredSection">
            <p>Partnered with:</p>
            <div className="lpMain__contentContainer__partneredSection__partner">
              <a href="https://www.airbnb.com/" target="_blank" rel="noreferrer" aria-label="Link to Airbnb">
                <StaticImage src="../images/icons/airbnb.svg" alt="Airbnb" />
              </a>
              <a href="https://www.booking.com/" target="_blank" rel="noreferrer" aria-label="Link to Booking">
                <StaticImage src="../images/icons/booking.svg" alt="Booking" />
              </a>
              <a href="https://www.plumguide.com/" target="_blank" rel="noreferrer" aria-label="Link to Plum Guide">
                <StaticImage src="../images/icons/plumGuide.svg" alt="Plum Guide" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export const query = graphql`
  query HeroImage {
    heroImageMobile: file(relativePath: {eq: "pictures/HeroImageMobile.jpg"}) {
      childImageSharp {
        gatsbyImageData(
        layout: FULL_WIDTH, 
        placeholder: BLURRED, 
        formats: [AUTO, WEBP]
        )
      }
    }
    heroImageDesktop: file(relativePath: {eq: "pictures/HeroImageDesktop.jpg"}) {
      childImageSharp {
        gatsbyImageData(
        layout: FULL_WIDTH, 
        placeholder: BLURRED, 
        formats: [AUTO, WEBP]
        )
      }
    }
  }
`