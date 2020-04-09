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
  address,
  hours,
  what,
  who,
  languages,
  description,
  lastUpdated,
  onFlag,
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
        <div className="tag-row">
          {what && what.length > 0
            ? what.map(t => (
                <span key={t} className="tag">
                  {intl.formatMessage({ id: t })}
                </span>
              ))
            : ``}
        </div>
        {who && who.length > 0 ? (
          <div className="tag-row">
            {who.map(t => (
              <span key={t} className="tag is-teal">
                {intl.formatMessage({ id: t })}
              </span>
            ))}
          </div>
        ) : (
          ``
        )}
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
            <a href={link} target="_blank" rel="noopener noreferrer">
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
        {address ? (
          <p>
            <FontAwesomeIcon icon="map-marker-alt" />
            &nbsp; {address}
          </p>
        ) : (
          ``
        )}
        {hours ? (
          <p>
            <FontAwesomeIcon icon="calendar-alt" />
            &nbsp; {hours}
          </p>
        ) : (
          ``
        )}
        {languages && languages.length > 0 ? (
          <p>
            <FontAwesomeIcon icon="language" />
            &nbsp;
            {languages.map(l => intl.formatMessage({ id: l })).join(", ")}
          </p>
        ) : (
          ``
        )}
      </div>
      <div className="column is-8 last-updated">
        <p className="is-italic">
          {intl.formatMessage({ id: "last-updated" })}{" "}
          {new Date(lastUpdated).toLocaleString(intl.locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="column is-4">
        <button
          type="button"
          className="button is-text flag-resource"
          onClick={onFlag}
        >
          <FontAwesomeIcon icon="exclamation-circle" />
          &nbsp;{" "}
          <span>{intl.formatMessage({ id: "flag-resource-label" })}</span>
        </button>
      </div>
    </div>
  )
}

ResourceRow.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string,
  email: PropTypes.string,
  link: PropTypes.string,
  address: PropTypes.string,
  hours: PropTypes.string,
  what: PropTypes.array,
  who: PropTypes.array,
  languages: PropTypes.array,
  description: PropTypes.string,
  lastUpdated: PropTypes.string.isRequired,
  onFlag: PropTypes.func,
}

ResourceRow.defaultProps = {
  phone: ``,
  email: ``,
  link: ``,
  address: ``,
  hours: ``,
  what: [],
  who: [],
  languages: [],
  description: ``,
  onFlag: () => {},
}

export default ResourceRow
