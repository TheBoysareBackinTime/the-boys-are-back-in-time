import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"
import Back15Button from "../images/iconfinder_btn_15_Forward_4719305.svg"
import Forward30Button from "../images/iconfinder_btn_30_Backward_4719314.svg"

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
          progressJumpSteps={{ backward: 15000, forward: 30000 }}
          customIcons={{
            rewind: <img src={Back15Button} alt="logo" width="100%"></img>,
            forward: <img src={Forward30Button} alt="logo" width="100%"></img>,
          }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: episode.item.content_encoded }}
        />
        <span>
          Skip forward/back icons by{" "}
          <a
            href="https://www.iconfinder.com/ramankumar"
            target="_blank"
            rel="noreferrer"
          >
            Raman Kumar
          </a>{" "}
          under{" "}
          <a
            href="https://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Creative Commons
          </a>{" "}
          license.
        </span>
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
