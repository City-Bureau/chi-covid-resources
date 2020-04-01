import PropTypes from "prop-types"
import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Link, useIntl } from "gatsby-plugin-intl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import LanguageSelector from "./language-selector"

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
          <Img
            fixed={imageData.file.childImageSharp.fixed}
            alt={intl.formatMessage({ id: "logo-alt" })}
          />
          <h1 className="is-hidden-mobile">
            {intl.formatMessage({ id: "site-title" })}
          </h1>
        </Link>
        <div className="navbar-mobile-group  is-hidden-tablet">
          <LanguageSelector location={location} classNames="navbar-item" />
          <button
            type="button"
            className={`navbar-burger burger ${
              expanded === "true" ? `is-active` : ``
            }`}
            aria-label="menu"
            data-target="navbar-main-menu"
            aria-expanded={expanded}
            onClick={() => setExpanded((expanded === "false").toString())}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </div>
      <div
        id="navbar-main-menu"
        className={`navbar-menu ${expanded === "true" ? `is-active` : ``}`}
      >
        <div className="navbar-end">
          <Link className="navbar-item" to="/about">
            {intl.formatMessage({ id: "about" })}
          </Link>
          <button
            className="navbar-item button print-button is-text"
            onClick={() => window.print()}
          >
            <FontAwesomeIcon icon="print" />
            &nbsp; {intl.formatMessage({ id: "print" })}
          </button>
          <a
            className="navbar-item"
            href={intl.formatMessage({ id: "suggest-resource-url" })}
            target="_blank"
            rel="noopener noreferrer"
          >
            {intl.formatMessage({ id: "suggest-resource" })}
          </a>
          <LanguageSelector
            location={location}
            classNames="navbar-item is-hidden-mobile"
          />
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Header
