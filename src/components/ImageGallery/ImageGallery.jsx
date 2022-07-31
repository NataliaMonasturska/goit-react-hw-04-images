import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css'


export class ImageGallery extends Component {

    
    

    render () {

        return (
            <ul className= {css.ImageGallery}>
                 {this.props.images.map(image => (
             <ImageGalleryItem 
             key = {image.id}
             url = {image.webformatURL} 
             alt = {image.tags}/>
        ))}
           
          </ul>
        );
    }
  
  };
  
//   ImageGallery.propTypes = {
//     onChangeFilter: PropTypes.func.isRequired,
//     filterContact: PropTypes.string.isRequired,
//   };
  













