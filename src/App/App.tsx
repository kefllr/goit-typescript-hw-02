import { useEffect, useState, useRef } from 'react'
import './App.css'
import axios from "axios";

import SearchBar from '../components/SearchBar/SearchBar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../components/LoadMoreBtn/LoadMoreBtn';
import { pagination, ACCESS_KEY, initModImg } from '../api';
import ImageModal from '../components/ImageModal/ImageModal';

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageModal, setImageModal] = useState(initModImg);

  const listRef = useRef(null);
  const scrollHeight = useRef(0);

  useEffect(() => {
    if (!listRef.current) return;
    window.scroll({
      behavior: "smooth",
      top: scrollHeight.current,
    });
    scrollHeight.current = listRef.current.clientHeight;
  }, [images]);

  const handleModal = (id) => {
    setImageModal(images.find((image) => image.id === id));
    setModalIsOpen(true);
  };

  const onSearch = (search) => {
    if (search.trim() !== '') { 
      setQuery(search.trim());
      setPageNumber(1);
      setImages([]); 
    }
  };

  useEffect(() => {
    if(!query)return
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query: query,
            per_page: pagination,
            page: pageNumber,
            client_id: ACCESS_KEY,
          }
        });
        if(pageNumber === 1){
          setImages(response.data.results);
        }else{
          setImages(prevImages => [...prevImages, ...response.data.results]);
        } 
        setMaxPage(Math.ceil(response.data.total / pagination)); 
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, pageNumber]);

  const loadMore = () => {
    setPageNumber((prev) => prev + 1);  
  };

  return (
    <>
      <SearchBar onSearch={onSearch} />
      {loading && <Loader />}
      {isError && <ErrorMessage />}
      <ImageGallery images={images} openModal={handleModal} ref={listRef} />
      {images.length !== 0 && 
      pageNumber < maxPage && 
      (<LoadMoreBtn onLoadMore={loadMore} />)}
      <ImageModal isOpen={modalIsOpen} imageModal={imageModal} onClose={() => setModalIsOpen(false)} />
    </>
  );
}

export default App;