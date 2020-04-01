import React from "react"
import PropTypes from "prop-types"
import { useIntl } from "gatsby-plugin-intl"
import remark from "remark"
import html from "remark-html"
import recommended from "remark-preset-lint-recommended"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const processor = remark()
  .use(recommended)
  .use(html)

const ResourceRow = ({
  name,
  phone,
  email,
  link,
  what,
  who,
  description,
  ...props
}) => {
  const intl = useIntl()
  // Resolve description text for language (use default if not present)
  const descriptionText =
    intl.locale !== intl.defaultLocale && !!props[`description${intl.locale}`]
      ? props[`description${intl.locale}`]
      : description

  return (
    <div className="resource-row columns is-multiline">
      <div className="column is-8">
        <h4>{name}</h4>
        {descriptionText ? (
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: processor.processSync(descriptionText),
            }}
          />
        ) : (
          ``
        )}
      </div>
      <div className="column is-4 detail-column">
        {link ? (
          <p>
            <a href={link} target="_blank" rel="noopener">
              <FontAwesomeIcon icon="external-link-alt" />
              &nbsp; {intl.formatMessage({ id: "website" })}
            </a>
          </p>
        ) : (
          ``
        )}
        {phone ? (
          <p>
            <FontAwesomeIcon icon="phone" />
            &nbsp; {phone}
          </p>
        ) : (
          ``
        )}
        {email ? (
          <p>
            <a href={`mailto:${email}`}>
              <FontAwesomeIcon icon="envelope" />
              &nbsp; {email}
            </a>
          </p>
        ) : (
          ``
        )}
      </div>
    </div>
  )
}

ResourceRow.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string,
  email: PropTypes.string,
  link: PropTypes.string,
  what: PropTypes.array,
  who: PropTypes.array,
  description: PropTypes.string,
}

ResourceRow.defaultProps = {
  phone: ``,
  email: ``,
  link: ``,
  what: [],
  who: [],
  description: ``,
}

export default ResourceRow
