import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const ToastMessage = ({ show, duration, onHide, children }) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(show)
    if (show) {
      setTimeout(() => setVisible(false), duration - 500)
      setTimeout(onHide, duration)
    }
  }, [duration, onHide, show])

  return show ? (
    <div className={`toast-message ${visible ? `is-active` : ``}`}>
      {children}
    </div>
  ) : (
    ``
  )
}

ToastMessage.propTypes = {
  show: PropTypes.bool,
  duration: PropTypes.number,
  onHide: PropTypes.func.isRequired,
  children: PropTypes.node,
}

ToastMessage.defaultProps = {
  duration: 2500,
  show: false,
}

export default ToastMessage
