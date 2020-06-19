import React from "react"
import PropTypes from "prop-types"

import { Link, IntlContextConsumer, injectIntl } from "gatsby-plugin-intl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { languageName } from "../constants"
import { getBasePath } from "../utils"

const Footer = ({ location, intl }) => (
  <IntlContextConsumer>
    {({ languages, language }) => (
      <footer key="footer" className="footer">
        <div className="content">
          <div className="columns">
            <div className="column">
              {languages
                .filter(lang => lang !== language)
                .map(lang => (
                  <p key={lang}>
                    <Link
                      language={lang}
                      to={getBasePath({
                        pathname: location.pathname,
                        language,
                      })}
                    >
                      {languageName[lang]}
                    </Link>
                  </p>
                ))}
            </div>
            <div className="column">
              <p>
                <Link to="/">{intl.formatMessage({ id: "home" })}</Link>
              </p>
              <p>
                <Link to="/about/">{intl.formatMessage({ id: "about" })}</Link>
              </p>
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
            </div>
            <div className="column">
              <p>
                <a
                  href="https://www.citybureau.org/"
                  target="_blank"
                  rel="noopener"
                >
                  {intl.formatMessage({ id: "site-owner" })}
                </a>
              </p>
              <div className="social-icons">
                <a
                  href="https://facebook.com/citybureau"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="icon-link"
                >
                  <FontAwesomeIcon icon={["fab", "facebook"]} />
                </a>
                <a
                  href="https://www.instagram.com/city_bureau/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="icon-link"
                >
                  <FontAwesomeIcon icon={["fab", "instagram"]} />
                </a>
                <a
                  href="https://twitter.com/city_bureau"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="icon-link"
                >
                  <FontAwesomeIcon icon={["fab", "twitter"]} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )}
  </IntlContextConsumer>
)

Footer.propTypes = {
  location: PropTypes.object.isRequired,
}

export default injectIntl(Footer)
