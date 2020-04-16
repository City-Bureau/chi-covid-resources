import React from "react"
import PropTypes from "prop-types"

import { config, library } from "@fortawesome/fontawesome-svg-core"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons/faExternalLinkAlt"
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope"
import { faPrint } from "@fortawesome/free-solid-svg-icons/faPrint"
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter"
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons/faCalendarAlt"
import { faLanguage } from "@fortawesome/free-solid-svg-icons/faLanguage"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle"
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch"
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons/faDoorOpen"

import Header from "./header"
import Footer from "./footer"

import "@fortawesome/fontawesome-svg-core/styles.css"
import "../styles/style.scss"

// Fix FontAwesome icon flashing
// https://medium.com/@fabianterh/fixing-flashing-huge-font-awesome-icons-on-a-gatsby-static-site-787e1cfb3a18
config.autoAddCss = false

library.add(
  faChevronUp,
  faExternalLinkAlt,
  faPhone,
  faEnvelope,
  faPrint,
  faFilter,
  faCalendarAlt,
  faLanguage,
  faMapMarkerAlt,
  faExclamationCircle,
  faSearch,
  faDoorOpen
)

const Layout = ({ location, hide, children }) => (
  <>
    {hide ? `` : <Header location={location} />}
    {children}
    {hide ? `` : <Footer />}
  </>
)

Layout.propTypes = {
  location: PropTypes.object.isRequired,
  hide: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  hide: false,
}

export default Layout
