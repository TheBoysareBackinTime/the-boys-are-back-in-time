import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import AppleBadge from "../images/badge-apple-podcasts.svg"
import OvercastBadge from "../images/badge-overcast.svg"
import PocketCastsBadge from "../images/badge-pocket-casts.svg"
import RadioPublicBadge from "../images/badge-radiopublic.svg"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="The Boys Are Back In Time Podcast" />
    <h2 style={{ textAlign: `center` }}>Subscribe in your favorite app</h2>
    <div
      className="subscribeBadges"
      style={{
        display: `flex`,
        flexWrap: `wrap`,
        justifyContent: `center`,
        marginBottom: `1rem`,
      }}
    >
      <a href="">
        <img src={AppleBadge} style={{ height: `50px`, margin: `.25rem` }} />
      </a>
      <a href="">
        <img src={OvercastBadge} style={{ height: `50px`, margin: `.25rem` }} />
      </a>
      <a href="">
        <img
          src={PocketCastsBadge}
          style={{ height: `50px`, margin: `.25rem` }}
        />
      </a>
      <a href="">
        <img
          src={RadioPublicBadge}
          style={{ height: `50px`, margin: `.25rem` }}
        />
      </a>
    </div>

    <h2>Episodes</h2>
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
