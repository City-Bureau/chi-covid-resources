import React from "react"
import PropTypes from "prop-types"
import { useIntl } from "gatsby-plugin-intl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { OutboundLink } from "gatsby-plugin-google-gtag"

import { rtlLanguages } from "../constants"

const formatPhone = phone => {
  const phoneStr = phone.replace(/\D/gi, "")
  return phoneStr[0] === "1" ? `+${phoneStr}` : `+1${phoneStr}`
}

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
  qualifications,
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
  const descDir =
    !!props[`description${intl.locale}`] && rtlLanguages.includes(intl.locale)
      ? `rtl`
      : `ltr`

  return (
    <div className="resource-row columns is-multiline">
      <div className="column is-8">
        {(what || []).concat(who || []).length > 0 ? (
          <div className="tag-row">
            {what && what.length > 0
              ? what.map(t => (
                  <span key={t} className="tag">
                    {intl.formatMessage({ id: t })}
                  </span>
                ))
              : ``}
            {who && who.length > 0
              ? who.map(t => (
                  <span key={t} className="tag is-teal">
                    {intl.formatMessage({ id: t })}
                  </span>
                ))
              : ``}
          </div>
        ) : (
          ``
        )}
        <h3 dir="ltr">{name}</h3>
        {descriptionText ? (
          <div dir={descDir}>
            {descriptionText
              .trim()
              .split("\n")
              .map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
          </div>
        ) : (
          ``
        )}
      </div>
      <div className="column is-4 detail-column">
        {link ? (
          <p className="has-link">
            <OutboundLink
              href={
                link.trim().substr(0, 4) === "http"
                  ? link.trim()
                  : `http://${link.trim()}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="website"
            >
              <FontAwesomeIcon icon="external-link-alt" />
              &nbsp; {intl.formatMessage({ id: "website" })}
            </OutboundLink>
          </p>
        ) : (
          ``
        )}
        {phone ? (
          <p className="has-link">
            <OutboundLink href={`tel:${formatPhone(phone)}`}>
              <FontAwesomeIcon icon="phone" />
              &nbsp; <span dir="ltr">{phone}</span>
            </OutboundLink>
          </p>
        ) : (
          ``
        )}
        {email ? (
          <p className="has-link">
            <OutboundLink href={`mailto:${email}`}>
              <FontAwesomeIcon icon="envelope" />
              &nbsp; {email}
            </OutboundLink>
          </p>
        ) : (
          ``
        )}
        {address ? (
          <p className="has-link">
            <OutboundLink
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                address
              )}`}
            >
              <FontAwesomeIcon icon="map-marker-alt" />
              &nbsp; {address}
            </OutboundLink>
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
      </div>
      <div className="column is-8 bottom-column">
        <div>
          {languages && languages.length > 0 ? (
            <p>
              <FontAwesomeIcon icon="comments" />
              &nbsp;
              {languages.map(l => intl.formatMessage({ id: l })).join(", ")}
            </p>
          ) : (
            ``
          )}
          {qualifications && qualifications.includes("Regardless of status") ? (
            <p>
              <FontAwesomeIcon icon="door-open" />
              &nbsp;
              {intl.formatMessage({ id: "regardless-of-status" })}
            </p>
          ) : (
            ``
          )}
          <p className="last-updated is-italic">
            {intl.formatMessage({ id: "last-updated" })}{" "}
            {intl.formatDate(new Date(lastUpdated), {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="column is-4 bottom-column">
        <div>
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
  qualifications: PropTypes.array,
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
  qualifications: [],
  languages: [],
  description: ``,
  onFlag: () => {},
}

export default ResourceRow
