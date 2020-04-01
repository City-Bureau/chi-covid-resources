import PropTypes from "prop-types"
import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Link, useIntl } from "gatsby-plugin-intl"

import LanguageSelector from "./language-selector"

/* TODO:
- Print (should load all resources when triggered)
*/
const Header = ({ location }) => {
  const [expanded, setExpanded] = useState("false")
  const imageData = useStaticQuery(graphql`
    query {
      file: file(relativePath: { eq: "icon.png" }) {
        childImageSharp {
          fixed(width: 48) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const intl = useIntl()

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          {/* TODO: Alt text */}
          <Img fixed={imageData.file.childImageSharp.fixed} />
          <h1>{intl.formatMessage({ id: "site-title" })}</h1>
        </Link>
        <button
          type="button"
          className={`navbar-burger burger ${
            expanded === "true" ? `is-active` : ``
          }`}
          aria-label="menu"
          data-target="navbar-main-menu"
          aria-expanded={expanded}
          onClick={() => setExpanded((expanded === "false").toString())}
          // TODO: keyboard listener
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div
        id="navbar-main-menu"
        className={`navbar-menu ${expanded === "true" ? `is-active` : ``}`}
      >
        <div className="navbar-end">
          <a
            className="navbar-item"
            href={intl.formatMessage({ id: "suggest-resource-url" })}
            target="_blank"
            rel="noopener noreferrer"
          >
            {intl.formatMessage({ id: "suggest-resource" })}
          </a>
          <a
            className="navbar-item"
            href={intl.formatMessage({ id: "feedback-url" })}
            target="_blank"
            rel="noopener noreferrer"
          >
            {intl.formatMessage({ id: "feedback" })}
          </a>
          <Link className="navbar-item" to="/about">
            {intl.formatMessage({ id: "about" })}
          </Link>
          <LanguageSelector location={location} classNames="navbar-item" />
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Header
