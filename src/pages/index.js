import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="The Boys Are Back In Time Podcast" />
    <h1>Episodes</h1>
    {data.allPodcastRssFeedEpisode.edges.map(({ node }, index) => (
      <div key={index}>
        <p className="episode-date">{node.item.pubDate}</p>
        <p className="episode-title">{node.item.title}</p>
        <p className="episode-summary">{node.item.itunes.summary}</p>
      </div>
    ))}
  </Layout>
)

export default IndexPage

export const query = graphql`
  {
    allPodcastRssFeedEpisode {
      edges {
        node {
          id
          item {
            guid
            itunes {
              author
              duration
              image
              summary
            }
            pubDate
            title
          }
        }
      }
    }
  }
`
