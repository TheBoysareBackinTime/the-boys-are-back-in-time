import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Blog" />
      <h2 style={{ textAlign: `center` }}>Blog Posts</h2>
      {data.allMarkdownRemark.edges.map(({ node }, index) => (
        <>
          <Link
            key={index}
            to={`/blog${node.fields.slug}`}
            className="blog-post"
          >
            {node.frontmatter.title}
          </Link>
          <p className="blog-description">{node.frontmatter.description}</p>
        </>
      ))}
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
