const path = require('path');

exports.createPages = async function ({ actions, graphql }) {
    const { createPage } = actions;

    const { data } = await graphql(`
        query {
            campgrounds: allMongodbYelpCampCampgrounds {
                edges {
                    node {
                        mongodb_id
                    }
                }
            }
        }
    `)

    const pageTemplate = path.resolve('./src/templates/details.js');

    for (const { node } of data.campgrounds.edges) {
        createPage({
            path: `/details/${node.mongodb_id}`,
            component: pageTemplate,
            context: {
                id: node.mongodb_id
            }
        })
    }
}