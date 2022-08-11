 import React, { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import css from './App.module.css';
import { RotatingLines } from 'react-loader-spinner';

const axios = require('axios');
const Scrolling = require('react-scroll');
const scroll = Scrolling.animateScroll;

const MY_API_KEY = '27831514-d30de37ffbcb7c53880408e02';

export class App extends Component {
  state = {
    images: [],
    value: '',
    page: 1,
    isLoading: false,
    isShowModal: false,
    ImageForModal: { url: '', alt: '' },
    total: 0 
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.value !== this.state.value ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      this.getUser();
    }
  }

  scroll = () => {
    const { height: cardHeight } = document
      .querySelector('#ImageGallery')
      .firstElementChild.getBoundingClientRect();
    scroll.scrollMore(cardHeight * 3.2);
  };

  async getUser() {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${MY_API_KEY}&q=${this.state.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${this.state.page}`
      );
      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
        isLoading: false,
        total: response.data.total
      }));
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  }

  recordsValueInputForm = value => {
   if(value === this.state.value){
    return
   }
   this.setState({ value, page: 1, images: [], isLoading: true });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
    this.scroll();
  };

  openModal = id => {
    const image = this.state.images.find(image => image.id === id);

    if (image) {
      this.setState({
        ImageForModal: { url: image.largeImageURL, alt: image.tags },
        isShowModal: true,
      });
    }
  };
  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.recordsValueInputForm} />
        <ImageGallery images={this.state.images} openModal={this.openModal} />
        {this.state.images.length >= 12 && this.state.images.length < this.state.total && (
          <Button onClick={this.handleLoadMore} />
        )}
        {this.state.isLoading && (
          <div className={css.Loader}>
            <RotatingLines
              strokeColor="#3f51b5"
              strokeWidth="5"
              animationDuration="0.75"
              width="150"
              visible={true}
            />
          </div>
        )}
        {this.state.isShowModal && (
          <Modal onClose={this.closeModal}>
            <img
              src={this.state.ImageForModal.url}
              alt={this.state.ImageForModal.alt}
            />
          </Modal>
        )}
      </div>
    );
  }
}
