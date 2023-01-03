import React from 'react';
import { Link } from 'gatsby';

const CampCard = ({ camp }) => {
    return (
        <div className="card spacing">
            <img src={camp.thumb} alt={camp.title} />
            <h2>{camp.title}</h2>
            <p>{camp.shortDescription}</p>
            <Link className="card__link" to={'/details/' + camp.mongodb_id}>
                <button>View Campground</button>
            </Link>
        </div>
    )
}

export default CampCard