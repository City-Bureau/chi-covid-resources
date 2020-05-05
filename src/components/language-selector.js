import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link, IntlContextConsumer } from "gatsby-plugin-intl"

import { languageName } from "../constants"
import { getBasePath } from "../utils"
import DropdownMenu from "./dropdown-menu"

const LanguageSelector = ({ location, menuId, classNames }) => {
  const [queryParams, setQueryParams] = useState(location.search)

  // Watch for query param changes to update links
  useEffect(() => {
    const onSearchParamChange = () => {
      setQueryParams(window.location.search)
    }
    document.addEventListener("location-search-change", onSearchParamChange)
    return function cleanup() {
      document.removeEventListener(
        "location-search-change",
        onSearchParamChange
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <IntlContextConsumer>
      {({ languages, language }) => (
        <DropdownMenu
          key="lang-menu"
          label={languageName[language]}
          hasChevron
          menuId={menuId}
          classNames={`language-selector ${classNames}`}
        >
          {languages
            .filter(lang => lang !== language)
            .map(lang => (
              <Link
                key={lang}
                language={lang}
                to={`${getBasePath({
                  pathname: location.pathname,
                  language,
                })}${queryParams}`}
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
}

LanguageSelector.propTypes = {
  location: PropTypes.object.isRequired,
  menuId: PropTypes.string,
  classNames: PropTypes.string,
}

LanguageSelector.defaultProps = {
  menuId: `lang-menu`,
  classNames: ``,
}

export default LanguageSelector
