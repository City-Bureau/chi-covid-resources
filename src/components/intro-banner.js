import React, { useEffect, useState } from "react"
import { useIntl } from "gatsby-plugin-intl"

const IntroBanner = () => {
  const intl = useIntl()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!window.localStorage.getItem("covid.citybureau.org/intro")) {
      setShow(true)
    }
  }, [])

  const onClose = () => {
    setShow(false)
    window.localStorage.setItem("covid.citybureau.org/intro", "true")
  }

  return (
    <div className={`intro-banner ${show ? `` : `is-hidden`}`}>
      <div className="banner-container">
        <button
          type="button"
          className="delete"
          aria-label={intl.formatMessage({ id: "close" })}
          onClick={onClose}
        />
        <p>
          {intl.formatMessage(
            { id: "intro-description" },
            {
              TwoOneOneLink: (
                <a
                  href="https://211metrochicago.org/"
                  target="_blank"
                  rel="noopener"
                >
                  211metrochicago.org
                </a>
              ),
            }
          )}
        </p>
      </div>
    </div>
  )
}

export default IntroBanner
