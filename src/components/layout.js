import React from "react"
import PropTypes from "prop-types"

import { library } from "@fortawesome/fontawesome-svg-core"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons/faExternalLinkAlt"
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope"
import { faPrint } from "@fortawesome/free-solid-svg-icons/faPrint"
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter"

import Header from "./header"
import Footer from "./footer"

import "../styles/style.scss"

library.add(
  faChevronUp,
  faExternalLinkAlt,
  faPhone,
  faEnvelope,
  faPrint,
  faFilter
)

const Layout = ({ location, children }) => (
  <>
    <Header location={location} />
    {children}
    <Footer />
  </>
)

Layout.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default Layout
