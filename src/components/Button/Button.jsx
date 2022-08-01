import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css'

export const Button = ({onClick}) => {
    return (
        <button onClick={onClick}
        type="button" className={css.Button} >Load more</button>
    );
  };



//   сделать чтобы вторая порция изображений рендерилась вместе с предидущими


