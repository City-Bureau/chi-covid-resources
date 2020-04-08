import React, { useEffect, useState } from "react"
import { useIntl } from "gatsby-plugin-intl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { DEFAULT_DEBOUNCE } from "../constants"
import { debounce } from "../utils"

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false)
  const intl = useIntl()

  useEffect(() => {
    const onScroll = debounce(
      () => setVisible(window.innerHeight < 2 < window.pageYOffset),
      DEFAULT_DEBOUNCE * 2
    )
    document.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      document.removeEventListener("scroll", onScroll, { passive: true })
    }
  }, [setVisible])

  const onClick = () => {
    window.scroll({ left: 0, top: 0, behavior: "smooth" })
  }

  return (
    <button
      className={`button scroll-top-button is-primary ${
        visible ? `is-visible` : ``
      }`}
      type="button"
      aria-hidden={(!visible).toString()}
      tabIndex={visible ? "0" : "-1"}
      aria-label={intl.formatMessage({ id: "scroll-to-top" })}
      onClick={onClick}
    >
      <FontAwesomeIcon icon="chevron-up" />
    </button>
  )
}

export default ScrollTopButton
