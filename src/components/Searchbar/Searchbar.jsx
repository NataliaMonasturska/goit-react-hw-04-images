import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChangeInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmitForm = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmitForm} className={css.SearchForm}>
          <button type="submit" className={css.SearchForm_button}></button>

          <input
            onChange={this.handleChangeInput}
            value={this.state.value}
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
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
