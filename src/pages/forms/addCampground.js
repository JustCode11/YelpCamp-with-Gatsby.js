import React from 'react';
import { navigate } from 'gatsby';
import { useAuthValue } from '../../components/Auth/AuthContext';
import Layout from '../../components/Layout';

export default function AddCampground() {
    const { currentUser } = useAuthValue();
    if (!currentUser) {
        navigate("/forms/login");
        return null;
    }
    return (
        <Layout>
            <form className="addForm spacing" aria-labelledby='addCampgroundHeadline'>
                <h1 className="addForm__headline" id="addCampgroundHeadline">Add New Campground</h1>
                <div className="addForm__inputField">
                    <label htmlFor="name">Campground Name</label>
                    <input type="text" name="name"></input>
                </div>
                <div className="addForm__inputField">
                    <label htmlFor="price">Price</label>
                    <input type="text" name="price"></input>
                </div>
                <div className="addForm__inputField">
                    <label htmlFor="image">Image</label>
                    <input type="text" name="image"></input>
                </div>
                <div className="addForm__inputField">
                    <label htmlFor="description">Description</label>
                    <textarea className="addForm__inputField__textarea" name="description"></textarea>
                </div>
                <button>Add Campground</button>
            </form>
        </Layout>
    )
};
