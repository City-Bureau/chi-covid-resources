import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { useIntl } from "gatsby-plugin-intl"

const ReportErrorModal = ({ reportErrorPath, id, onSuccess, onClose }) => {
  const intl = useIntl()
  const textInput = useRef()
  const reportResourceError = () => {
    fetch(`${reportErrorPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Resource: [id],
        Notes: textInput.current.value,
      }),
    })
      .then(res => res.json())
      .then(() => {
        onClose()
        onSuccess()
      })
      .catch(err => {
        onClose()
        console.error(err)
      })
  }

  useEffect(() => {
    const escKeyListener = e => {
      if (e.keyCode === 27) {
        onClose()
      }
    }
    const docClickListener = e => {
      if (textInput && !textInput.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener("keyup", escKeyListener)
    document.addEventListener("click", docClickListener)

    return function cleanup() {
      document.removeEventListener("keyup", escKeyListener)
      document.removeEventListener("click", docClickListener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <form id="report-error-form" name="report-error" action="">
          <header className="modal-card-head">
            <h2 className="modal-card-title">
              {intl.formatMessage({ id: "flag-resource-label" })}
            </h2>
            <button
              type="button"
              className="delete is-medium"
              aria-label={intl.formatMessage({ id: "close" })}
              onClick={onClose}
            />
          </header>
          <section className="modal-card-body">
            <label className="label" htmlFor="report-error-notes">
              {intl.formatMessage({ id: "notes-label" })}
            </label>
            <textarea
              ref={textInput}
              className="textarea"
              id="report-error-notes"
              rows="2"
            />
          </section>
          <footer className="modal-card-foot">
            <button
              type="submit"
              onClick={reportResourceError}
              className="button is-primary"
            >
              {intl.formatMessage({ id: "flag-resource-label" })}
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}

ReportErrorModal.propTypes = {
  reportErrorPath: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ReportErrorModal
