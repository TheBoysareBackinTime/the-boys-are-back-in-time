import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { VimePlayer, VimeAudio } from "@vime/react"
import SpotifyPlayer from "react-spotify-player"

export default ({ data }) => {
  const episode = data.podcastRssFeedEpisode
  const originalDescription = episode.item.content_encoded
  const regex = /https:\/\/open\.spotify\.com\/((user\/[A-Za-z0-9-_]*\/playlist|track|artist|album)|(playlist|track|artist|album))\/[A-Za-z0-9-_?=]*/
  const matches = originalDescription.match(regex)
  const spotifyElementType = matches[1]
  const spotifyElementKey = matches[0].split("?")[0].substr(-22)
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
        <SpotifyPlayer
          uri={`spotify:${spotifyElementType}:${spotifyElementKey}`}
          size={{
            width: "100%",
            height: 300,
          }}
          view="list"
          theme="black"
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
