import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="The Boys Are Back In Time Podcast" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    {data.allPodcastRssFeedEpisode.edges.map(({ node }, index) => (
      <div key={index}>
        <p className="episode-date">{node.item.pubDate}</p>
        <p className="episode-title">{node.item.title}</p>
        <p className="episode-summary">{node.item.itunes.summary}</p>
      </div>
    ))}
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
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
