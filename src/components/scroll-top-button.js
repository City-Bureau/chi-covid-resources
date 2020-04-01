import React, { useEffect, useState } from "react"
import { useIntl } from "gatsby-plugin-intl"

import Chevron from "./chevron"

import { debounce } from "../utils"

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false)
  const intl = useIntl()

  useEffect(() => {
    const onScroll = debounce(
      () => setVisible(window.innerHeight < 2 < window.pageYOffset),
      500
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
      className={`button scroll-button ${visible ? `is-visible` : ``}`}
      type="button"
      aria-hidden={(!visible).toString()}
      tabindex={visible ? "0" : "-1"}
      aria-label={intl.formatMessage({ id: "scroll-to-top" })}
      onClick={onClick}
    >
      <Chevron style={{ transform: "rotate(-90deg)" }} />
    </button>
  )
}

export default ScrollTopButton
