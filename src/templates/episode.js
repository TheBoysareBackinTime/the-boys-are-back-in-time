import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { VimePlayer, VimeAudio } from "@vime/react"

export default ({ data }) => {
  const episode = data.podcastRssFeedEpisode
  return (
    <Layout>
      <div>
        <h1>{episode.item.title}</h1>
        <Img
          fixed={episode.featuredImg.childImageSharp.fixed}
          style={{ display: `block`, margin: `0 auto` }}
        />
        <VimePlayer controls>
          <VimeAudio>
            <source data-src={episode.item.enclosure.url} type="audio/mp3" />
          </VimeAudio>
        </VimePlayer>
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
