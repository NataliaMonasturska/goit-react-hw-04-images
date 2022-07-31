import React from 'react'; 
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({ url, alt }) => {
    return (
        <li className= {css.ImageGalleryItem}>
        <img src={url} alt={alt} className={css.ImageGalleryItem_image } />
        </li>
    );
  };