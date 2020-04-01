import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import Footer from "./footer"

import "../styles/style.scss"

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
