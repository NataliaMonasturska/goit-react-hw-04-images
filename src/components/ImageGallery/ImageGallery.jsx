import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css'





export const ImageGallery = ({images}) => {

        return (
            <ul id="ImageGallery" className= {css.ImageGallery}>
                 {images.map(image => (
             <ImageGalleryItem 
             key = {image.id}
             url = {image.webformatURL} 
             alt = {image.tags}/>
        ))}
           
          </ul>
        );
    }
  
  
  
//   ImageGallery.propTypes = {
//     onChangeFilter: PropTypes.func.isRequired,
//     filterContact: PropTypes.string.isRequired,
//   };
  













