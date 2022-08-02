import React, { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import * as Scroll from 'react-scroll';
import css from './App.module.css';
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
  };

  componentDidUpdate(_, prevState) {
    if (prevState.value !== this.state.value || prevState.page !== this.state.page) {
      this.getUser();
    }
  }

  scroll = () => {
    const { height: cardHeight } = document
      .querySelector('#ImageGallery')
      .firstElementChild.getBoundingClientRect();
    scroll.scrollMore(cardHeight * 2);
  };

  async getUser() {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${MY_API_KEY}&q=${this.state.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${this.state.page}`
      );
      // console.log(response.data.hits);
      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
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
    }
  }

  recordsValueInputForm = value => {
    this.setState({ value, page: 1 });
  };

  handleLoadMore = event => {
    // event.preventDefault();
    this.setState(prevState => ({ page: prevState.page + 1 }));
    // this.getUser();
    this.scroll();
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.recordsValueInputForm} />
        <ImageGallery images={this.state.images} />
        {this.state.images.length > 0 && (
          <Button onClick={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
