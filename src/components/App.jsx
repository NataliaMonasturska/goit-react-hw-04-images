import React, { useState, useEffect } from 'react';
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

export const App = () => {
  const [images, setImages] = useState([])
  const [values, setValues] = useState('')
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)
  const [ImageForModal, setImageForModal] = useState({ url: '', alt: '' })
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (values === '') {
      return
    }
    setIsLoading(true)
    async function getUser() {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=${MY_API_KEY}&q=${values}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`
        );
        setImages(prevImages => [...prevImages, ...response.data.hits])
        setIsLoading(false)
        setTotal(response.data.total)
      } catch (error) {
        console.error(error);
        setIsLoading(false)
      }
    }
    getUser()
  }, [values, page])

  const scrolling = () => {
    const { height: cardHeight } = document
      .querySelector('#ImageGallery')
      .firstElementChild.getBoundingClientRect();
    scroll.scrollMore(cardHeight * 3.2);
  };

  const recordsValueInputForm = value => {
    if (value === values) {
      return
    }
    setValues(value)
    setPage(1)
    setImages([])
    setIsLoading(true)
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
    setIsLoading(true)
    scrolling();
  };

  const openModal = id => {
    const image = images.find(image => image.id === id);
    if (image) {
      setImageForModal({ url: image.largeImageURL, alt: image.tags })
      setIsShowModal(true)
    }
  };

  const closeModal = () => {
    setIsShowModal(false)
  };


  return (
    <div className={css.App}>
      <Searchbar onSubmit={recordsValueInputForm} />
      <ImageGallery images={images} openModal={openModal} />
      {images.length >= 12 && images.length < total && (
        <Button onClick={handleLoadMore} />
      )}
      {isLoading && (
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
      {isShowModal && (
        <Modal onClose={closeModal}>
          <img
            src={ImageForModal.url}
            alt={ImageForModal.alt}
          />
        </Modal>
      )}
    </div>
  );
}

