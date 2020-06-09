import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="The Boys Are Back In Time Podcast" />
    <h1>Episodes</h1>
    {data.allPodcastRssFeedEpisode.edges.map(({ node }, index) => (
      <div key={index}>
        <p className="episode-date">{node.item.pubDate}</p>
        <Link to={`/episodes/${node.fields.slug}/`} className="episode-title">
          {node.item.title}
        </Link>
        <p className="episode-summary">{node.item.itunes.summary}</p>
        <Img fixed={node.featuredImg.childImageSharp.fixed} />
      </div>
    ))}
    <Link to="/about-us/">Go to About Us</Link>
  </Layout>
)

export default IndexPage

export const query = graphql`
  {
    allPodcastRssFeedEpisode {
      edges {
        node {
          item {
            itunes {
              summary
            }
            pubDate
            title
          }
          fields {
            slug
          }
          featuredImg {
            childImageSharp {
              fixed(width: 150) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
