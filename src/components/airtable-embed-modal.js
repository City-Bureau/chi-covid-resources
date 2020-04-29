import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { useIntl } from "gatsby-plugin-intl"
import AirtableEmbed from "./airtable-embed"

const AirtableEmbedModal = ({ embedId, title, queryParams, onClose }) => {
  const intl = useIntl()
  const modalRef = useRef()

  useEffect(() => {
    const escKeyListener = e => {
      if (e.keyCode === 27) {
        onClose()
      }
    }
    const docClickListener = e => {
      if (modalRef && !modalRef.current.contains(e.target)) {
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
      <div className="modal-content">
        <AirtableEmbed
          embedId={embedId}
          title={title}
          queryParams={queryParams}
        />
        <button
          type="button"
          className="modal-close is-large"
          aria-label={intl.formatMessage({ id: "close" })}
          onClick={onClose}
        />
      </div>
    </div>
  )
}

AirtableEmbedModal.propTypes = {
  embedId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  queryParams: PropTypes.object,
  onClose: PropTypes.func.isRequired,
}

AirtableEmbedModal.defaultProps = {
  queryParams: {},
}

export default AirtableEmbedModal
