import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul id="ImageGallery" className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          openModal={openModal}
          key={image.id}
          url={image.webformatURL}
          alt={image.tags}
          id={image.id}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),

  openModal: PropTypes.func.isRequired,
};
