import React, { useState } from 'react';
import { Link, graphql } from 'gatsby';
import { useFlexSearch } from 'react-use-flexsearch';
import Layout from '../../components/Layout';
import CampCard from '../../components/CampCard';

export default function Home({ data }) {
    const { index, store } = data.localSearchPages;
    const { search } = window.location;
    const query = new URLSearchParams(search).get('searchCamp');
    const [searchQuery, setSearchQuery] = useState(query || '');

    //const campgrounds = data.campgrounds.nodes;
    const results = useFlexSearch(searchQuery, index, store);
    const campgrounds = searchQuery ? results : data.campgrounds.nodes;
    return (
        <Layout>
            <section className="searchSection" aria-labelledby='searchHeadline'>
                <h1 id="searchHeadline">Welcome to YelpCamp!</h1>
                <p>View our hand-picked campgrounds from all over the world, or add your own.</p>
                <form
                    className="searchSection__form"
                    onSubmit={() => console.log('search')}
                    aria-label="Search for campground"
                >
                    <div className="searchSection__form__inputField">
                        <label htmlFor="searchField" hidden>Search for camps</label>
                        <input
                            id="searchField"
                            type="text"
                            aria-label="Search for camps"
                            placeholder="Search for camps"
                            value={searchQuery}
                            onInput={(e) => setSearchQuery(e.target.value)}
                            name="searchCamp"
                        />
                    </div>
                    <button type="submit">Search</button>
                </form>
                <Link to="/forms/addCampground">Or add your own campground</Link>
            </section>
            <section className="campCardsContainer">
                {campgrounds.map(campground => {
                    return (
                        <CampCard
                            key={campground.mongodb_id}
                            camp={campground}
                        />
                    )
                })}
            </section>
        </Layout>
    )
}

export const allCampgroundsQuery = graphql`
    query allCampgrounds {
        localSearchPages {
            index
            store
        }
        campgrounds: allMongodbYelpCampCampgrounds {
            nodes {
                mongodb_id
                shortDescription
                title
                thumb
            }
        }
    }
`;
