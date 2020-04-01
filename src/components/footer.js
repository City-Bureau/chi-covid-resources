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
            <p>
              <a
                href={intl.formatMessage({ id: "feedback-url" })}
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.formatMessage({ id: "feedback" })}
              </a>
            </p>
          </div>
          <div className="column">
            <p>
              <a href="https://citybureau.org/" target="_blank">
                City Bureau
              </a>
            </p>
            <Link to="/">{intl.formatMessage({ id: "social-media" })}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
