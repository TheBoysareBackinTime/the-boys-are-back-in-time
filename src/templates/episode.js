import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  const episode = data.podcastRssFeedEpisode
  return (
    <Layout>
      <div>
        <h1>{episode.item.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: episode.item.content_encoded }}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query MyQuery($slug: String!) {
    podcastRssFeedEpisode(fields: { slug: { eq: $slug } }) {
      id
      fields {
        slug
      }
      item {
        title
        content_encoded
      }
    }
  }
`
