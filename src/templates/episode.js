import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"

export default ({ data }) => {
  const episode = data.podcastRssFeedEpisode
  return (
    <Layout>
      <div>
        <h1>{episode.item.title}</h1>
        <Img fixed={episode.featuredImg.childImageSharp.fixed} />
        <AudioPlayer
          autoPlay
          src={episode.item.enclosure.url}
          onPlay={(e) => console.log("onPlay")}
          progressJumpSteps={{ backward: 15000, forward: 15000 }}
        />
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
        enclosure {
          url
        }
      }
      featuredImg {
        childImageSharp {
          fixed(width: 300) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`
