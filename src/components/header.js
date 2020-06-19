import PropTypes from "prop-types"
import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Link, useIntl } from "gatsby-plugin-intl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import LanguageSelector from "./language-selector"


const Header = ({ location }) => {
  const [expanded, setExpanded] = useState("false")
  const headerData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTerritory
        }
      }
      imageData: file(relativePath: { eq: "icon.png" }) {
        childImageSharp {
          fixed(width: 48) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const intl = useIntl()

  const onPrint = () => {
    if (typeof window === "undefined") return
    if (window.gtag && !window.location.host.includes("staging")) {
      window.gtag("event", "print", {
        event_category: window.location.pathname,
        event_label: "Print",
      })
    }
    window.print()
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <Img
            fixed={headerData.imageData.childImageSharp.fixed}
            style={{ minWidth: headerData.imageData.childImageSharp.fixed.width }}
            alt={intl.formatMessage({ id: "logo-alt" })}
          />
          <h1>{intl.formatMessage({ id: "site-title" }, {siteTerritory: headerData.site.siteMetadata.siteTerritory })}</h1>
        </Link>
        <div className="navbar-mobile-group  is-hidden-tablet">
          <LanguageSelector
            location={location}
            menuId="lang-menu-mobile"
            classNames="navbar-item"
          />
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
            onClick={onPrint}
          >
            <FontAwesomeIcon icon="print" />
            &nbsp; {intl.formatMessage({ id: "print" })}
          </button>
          <Link className="navbar-item" to="/suggest-resource/">
            {intl.formatMessage({ id: "suggest-resource" })}
          </Link>
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
