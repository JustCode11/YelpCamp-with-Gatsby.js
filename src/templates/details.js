import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Comment from '../components/Comment';

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

export default function Details({ data }) {
    const campground = data.campground;
    const comments = data.comments.nodes;

    return (
        <Layout>
            <div className="details">
                <div className="details__content">
                    <section className="dc spacing">
                        <div>
                            <img
                                className="dc__image"
                                src={campground.image}
                                alt={campground.title}
                            />
                        </div>
                        <div className="dc__titleContainer">
                            <h1>{campground.title}</h1>
                            <div className="dc__titleContainer__price">{formatter.format(campground.price)}/night</div>
                        </div>
                        <div className="dc__description">{campground.description}</div>
                        <div className="dc__user">Submitted by {campground.user}</div>
                    </section>
                    <section className="cc">
                        {comments.length > 0
                            ? comments.map(comment => {
                                return (
                                    <div
                                        key={comment.mongodb_id}
                                        className="cc__commentContainer"
                                    >
                                        <Comment
                                            comment={comment}
                                        />
                                    </div>
                                )
                            })
                            : <p>No Reviews yet</p>}
                        <div className="cc__buttonContainer">
                            <button className="cc__buttonContainer__button">Leave a Review</button>
                        </div>
                    </section>
                </div>
                <div className="details__map">
                    <div className="details__map__container">
                        <iframe src={`${campground.coordinates}`}
                            title={`Google Map of ${campground.title}`}
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const campgroundQuery = graphql`
    query($id: String!) {
        campground: mongodbYelpCampCampgrounds(mongodb_id: {eq: $id}) {
            title
            user
            description
            price
            image
            coordinates
        }
        comments: allMongodbYelpCampComments(filter: {campground_id: {eq: $id}}) {
            nodes {
                mongodb_id
                content
                user
                created_at
            }
        }
    }
`