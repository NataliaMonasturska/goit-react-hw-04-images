import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';


export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('')

  const handleChangeInput = event => {
    setValue(event.target.value)
  }

  const handleSubmitForm = event => {
    event.preventDefault();
    onSubmit(value.trim());
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmitForm} className={css.SearchForm}>
        <button type="submit" className={css.SearchForm_button}></button>

        <input
          onChange={handleChangeInput}
          value={value}
          name="value"
          className={css.SearchForm_input}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
