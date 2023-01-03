/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        dbName: process.env.MONGODB_DATABASE,
        collection: ['campgrounds', 'comments'],
        connectionString: process.env.MONGODB_CONNECTION_STRING,
        auth: {
          user: process.env.MONGODB_USERNAME,
          password: process.env.MONGODB_PASSWORD
        },
        extraParams: {
          replicaSet: 'Main-shard-0',
          ssl: true,
          authSource: 'admin',
          retryWrites: true
        }
      }
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
        query: `
          query {
            allMongodbYelpCampCampgrounds {
              nodes {
                  mongodb_id
                  shortDescription
                  title
                  thumb
              }
            }
          }
        `,
        ref: 'mongodb_id',
        index: ['title', 'shortDescription'],
        store: ['title', 'shortDescription', 'mongodb_id', 'thumb'],
        normalizer: ({ data }) =>
          data.allMongodbYelpCampCampgrounds.nodes.map(node => ({
            title: node.title,
            shortDescription: node.shortDescription,
            mongodb_id: node.mongodb_id,
            thumb: node.thumb
          }))
      }
    }
  ],
}
