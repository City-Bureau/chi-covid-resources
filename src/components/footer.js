import React from "react"
import { Link, useIntl } from "gatsby-plugin-intl"

const Footer = () => {
  const intl = useIntl()
  return (
    <footer className="footer">
      <div className="content">
        <div className="columns">
          <div className="column">
            <p>
              <Link to="/">{intl.formatMessage({ id: "home" })}</Link>
            </p>
            <p>
              <Link to="/about/">{intl.formatMessage({ id: "about" })}</Link>
            </p>
          </div>
          <div className="column">
            <p>
              <Link to="/suggest-resource/">
                {intl.formatMessage({ id: "suggest-resource" })}
              </Link>
            </p>
            <p>
              <Link to="/feedback/">
                {intl.formatMessage({ id: "feedback" })}
              </Link>
            </p>
            <p>
              <a href="https://citybureau.org/" target="_blank">
                City Bureau
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
