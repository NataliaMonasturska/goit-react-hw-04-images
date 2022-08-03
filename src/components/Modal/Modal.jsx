import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.HandleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.HandleKeyDown);
  }

  HandleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleClickBacdrop = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleClickBacdrop}>
        <div className={css.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
