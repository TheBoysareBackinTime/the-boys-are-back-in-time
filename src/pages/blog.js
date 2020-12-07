import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  return (
    <Layout>
      {data.allMarkdownRemark.edges.map(({ node }, index) => (
        <Link key={index} to={`/blog${node.fields.slug}`} className="blog-post">
          {node.frontmatter.title}
        </Link>
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
