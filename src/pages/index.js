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

    {data.allFile.edges.map(({ node }, index) => (
      <Img
        key={index}
        fixed={node.childImageSharp.fixed}
        style={{ display: `block`, margin: `0 auto` }}
      />
    ))}

    <h2 style={{ marginTop: `1em`, textDecoration: `underline` }}>Episodes:</h2>
    {data.allPodcastRssFeedEpisode.edges.map(({ node }, index) => (
      <div key={index} style={{ margin: `1em auto` }}>
        <Link to={`/episodes/${node.fields.slug}/`} className="episode-title">
          {node.item.title}
        </Link>
        <span style={{ color: `gray` }}>&nbsp;&mdash;&nbsp;</span>
        <span className="episode-date" style={{ fontFamily: `monospace` }}>
          {new Date(Date.parse(node.item.pubDate)).toDateString()}
        </span>
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `150px auto`,
            columnGap: `10px`,
          }}
        >
          <Img fixed={node.featuredImg.childImageSharp.fixed} />
          <p className="episode-summary">{node.item.itunes.summary}</p>
        </div>
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
    allFile(filter: { name: { eq: "cover-icon" } }) {
      edges {
        node {
          childImageSharp {
            fixed(width: 300) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
