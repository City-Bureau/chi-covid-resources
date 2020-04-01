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
            <Link to="https://citybureau.org/">City Bureau</Link>
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
