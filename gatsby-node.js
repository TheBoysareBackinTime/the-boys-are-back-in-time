/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allPodcastRssFeedEpisode {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allPodcastRssFeedEpisode.edges.forEach(({ node }) => {
    createPage({
      path: `/episodes/${node.fields.slug}/`,
      component: path.resolve(`./src/templates/episode.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  // For all PodcastRssFeedEpisode nodes that have an iTunes image, call createRemoteFileNode
  if (
    node.internal.type === "podcastRssFeedEpisode" &&
    node.item.itunes.image !== null
  ) {
    let fileNode = await createRemoteFileNode({
      url: node.item.itunes.image, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    })
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.featuredImg___NODE = fileNode.id
    }
  }
}
