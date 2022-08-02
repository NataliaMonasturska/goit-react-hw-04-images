import React from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({url, alt}) => {
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src={url} alt={alt} />
      </div>
    </div>
  );
};
