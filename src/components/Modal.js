import React from 'react'

import './Modal.css'

const Modal = ({ close, children }) => (
  <div className="modal">
    <div className="modal__body">
      <button
        className="modal__close"
        onClick={close}
      >
        x
      </button>

      { children }
    </div>

    <div
      className="modal__backdrop"
      onClick={close}
    />
  </div>
)

export default Modal
