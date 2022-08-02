import React, { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import css from './App.module.css';
import { RotatingLines } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
const axios = require('axios');
const Scrolling = require('react-scroll');
const scroll = Scrolling.animateScroll;

// scroll.scrollToTop(options);

// scroll.scrollMore(10, {
//   duration: 1500,
//   delay: 100,
//   smooth: true,
//   offset: 50, // Scrolls to element + 50 pixels down the page

// });

const MY_API_KEY = '27831514-d30de37ffbcb7c53880408e02';

export class App extends Component {
  state = {
    images: [],
    value: '',
    page: 1,
    isLoading: false,
    isShowModal: false,
    ImageForModal: {url: "", alt: ""}
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.value !== this.state.value ||
      prevState.page !== this.state.page
    ) {
      this.setState({isLoading: true});
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
      // console.log(response.data.hits);
      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
        isLoading: false
      }));

      // if (response.data.hits.length === 0) {
      //      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      // }
      // let arr = response.data.hits;
      // let lastPage = Math.ceil(response.data.totalHits / 40);
      // totalHitsValue = response.data.totalHits;

      // makeListCountries(arr);

      // if (response.data.total > 40) {
      //   loadMore.classList.remove('visually-hidden');
      // }
      // if (pageforBtn === lastPage) {
      //    if (!loadMore.classList.contains('visually-hidden')) {
      //    loadMore.classList.add('visually-hidden')
      //    }
      // if (response.data.total <= 40) {
      //     return
      // }
      //     Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      // }
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false});
    }
  }

  recordsValueInputForm = value => {
    this.setState({ value, page: 1, images: [], isLoading: true });
  };

  handleLoadMore = () => {
    // event.preventDefault();
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
    // this.getUser();
    this.scroll();
  };

  openModal = (id) => {
    console.log(id);
    const image = this.state.images.find((image) => image.id === id)
    console.log(image);
    if(image){
      this.setState({ImageForModal: {url: image.largeImageURL, alt: image.tags},  isShowModal: true, })
    }
 
  }
  closeModal = () => {
    this.setState({ isShowModal: false})
  }



  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.recordsValueInputForm} />
        <ImageGallery images={this.state.images} openModal={this.openModal } />
        {this.state.images.length > 0 && (
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
          <Modal url={this.state.ImageForModal.url} alt={this.state.ImageForModal.alt} />
        )}
      </div>
    );
  }
}
