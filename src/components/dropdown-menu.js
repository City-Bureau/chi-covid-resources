import React, { useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const DropdownMenu = ({ label, menuId, classNames, hasChevron, children }) => {
  const [active, setActive] = useState("false")
  const dropdownEl = useRef(null)

  useEffect(() => {
    const docClickListener = e => {
      if (
        active === "true" &&
        dropdownEl &&
        !dropdownEl.current.contains(e.target)
      ) {
        setActive((active === "false").toString())
      }
    }
    document.addEventListener("click", docClickListener)

    return function cleanup() {
      document.removeEventListener("click", docClickListener)
    }
  }, [active, dropdownEl])

  return (
    <div
      className={`dropdown ${
        active === "true" ? `is-active` : ``
      } ${classNames}`}
      ref={dropdownEl}
    >
      <div className="dropdown-trigger">
        <button
          className="button"
          type="button"
          aria-haspopup="true"
          aria-expanded={active}
          aria-controls={menuId}
          onClick={() => setActive((active === "false").toString())}
        >
          {label}
          {hasChevron ? (
            <>
              &nbsp;&nbsp;{" "}
              <FontAwesomeIcon
                icon="chevron-up"
                style={{
                  transform: active === "false" ? `rotate(180deg)` : null,
                }}
              />
            </>
          ) : (
            ``
          )}
        </button>
      </div>
      <div className="dropdown-menu" id={menuId} role="menu">
        <div className="dropdown-content">{children}</div>
      </div>
    </div>
  )
}

DropdownMenu.propTypes = {
  label: PropTypes.string.isRequired,
  menuId: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  hasChevron: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

DropdownMenu.defaultProps = {
  classNames: ``,
  hasChevron: false,
}

export default DropdownMenu
