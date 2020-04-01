import React, { useEffect, useState, useRef } from "react"

const DropdownMenu = ({ label, menuId, classNames, children }) => {
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
      } ${classNames || ``}`}
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
        </button>
      </div>
      <div className="dropdown-menu" id={menuId} role="menu">
        <div className="dropdown-content">{children}</div>
      </div>
    </div>
  )
}

export default DropdownMenu
