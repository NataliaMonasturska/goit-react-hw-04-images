import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} type="button" className={css.Button}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
<<<<<<< HEAD

=======
>>>>>>> 99fd7d643d5f1a405546f4bbef126e3d3101c16e
