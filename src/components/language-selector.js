import React from "react"
import PropTypes from "prop-types"
import { Link, IntlContextConsumer } from "gatsby-plugin-intl"

import { languageName } from "../constants"
import { getBasePath } from "../utils"
import DropdownMenu from "./dropdown-menu"

const LanguageSelector = ({ location, classNames }) => (
  <IntlContextConsumer>
    {({ languages, language }) => (
      <DropdownMenu
        key="lang-menu"
        label={languageName[language]}
        hasChevron
        menuId="lang-menu"
        classNames={`language-selector ${classNames}`}
      >
        {languages
          .filter(lang => lang !== language)
          .map(lang => (
            <Link
              key={lang}
              language={lang}
              to={getBasePath({ pathname: location.pathname, language })}
              role="menuitem"
              className="dropdown-item"
            >
              {languageName[lang]}
            </Link>
          ))}
      </DropdownMenu>
    )}
  </IntlContextConsumer>
)

LanguageSelector.propTypes = {
  location: PropTypes.object.isRequired,
  classNames: PropTypes.string,
}

LanguageSelector.defaultProps = {
  classNames: ``,
}

export default LanguageSelector
