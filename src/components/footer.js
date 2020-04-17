import React from "react"
import PropTypes from "prop-types"

import { Link, IntlContextConsumer, useIntl } from "gatsby-plugin-intl"

import { getBasePath, languageName } from "../utils"

const Footer = ({ location }) => {
  const intl = useIntl()
  return (
    <IntlContextConsumer>
      {({ languages, language }) => (
        <footer key="footer" className="footer">
          <div className="content">
            <div className="columns">
              <div className="column">
                <p>
                  <Link to="/">{intl.formatMessage({ id: "home" })}</Link>
                </p>
                <p>
                  <Link to="/about/">
                    {intl.formatMessage({ id: "about" })}
                  </Link>
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
            </div>
          </div>
        </footer>
      )}
    </IntlContextConsumer>
  )
}

Footer.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Footer
