import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#D4A430`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <div
        style={{
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `center`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
    </div>
    <nav>
      <ul
        style={{
          listStyle: `none`,
          margin: `0 20px`,
          padding: 0,
          display: `flex`,
          justifyContent: `space-around`,
        }}
      >
        <li>
          <Link to="/blog/" style={{ color: `white` }}>
            Blog
          </Link>
        </li>
        <li>
          <Link
            to="/about-us/"
            style={{
              color: `white`,
            }}
          >
            About Us
          </Link>
        </li>
      </ul>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
