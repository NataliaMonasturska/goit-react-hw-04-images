import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ url, alt, openModal, id }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={() => openModal(id)}>
      <img src={url} alt={alt} className={css.ImageGalleryItem_image} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
