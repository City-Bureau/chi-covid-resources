import React from "react"
import { Link, FormattedMessage } from "gatsby-plugin-intl"

const Footer = () => (
  <footer className="footer">
    <div className="content">
      <div className="columns">
        <div className="column">
          <p>
            <Link to="/">
              <FormattedMessage id="home" />
            </Link>
          </p>
          <p>
            <Link to="/about/">
              <FormattedMessage id="about" />
            </Link>
          </p>
        </div>
        <div className="column">
          <p>
            <a href="https://citybureau.org/" target="_blank">
              City Bureau
            </a>
          </p>
          <Link to="/">
            <FormattedMessage id="social-media" />
          </Link>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
