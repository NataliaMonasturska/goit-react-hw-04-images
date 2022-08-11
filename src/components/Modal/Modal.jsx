import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');


export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const HandleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', HandleKeyDown);
    return () => {
      window.removeEventListener('keydown', HandleKeyDown);
    }
  }, [onClose])


 
  const handleClickBacdrop = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleClickBacdrop}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}


Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
