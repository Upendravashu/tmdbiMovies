import React, { useEffect } from 'react';
import { fetchDatFromApi } from './utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/headers/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import SearchResult from './pages/searchResult/searchResult';
import Detail from './pages/detail/Detail';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';

const App = () => {
  const { url } = useSelector((state) => state.home);

  const dispatch = useDispatch();
  console.log(url)

  const fetchApiConfig = () => {
    fetchDatFromApi("/configuration")
      .then((res) => {
        console.log(res)
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }
        dispatch(getApiConfiguration(url))
      })
  }

  useEffect(() => {
    fetchApiConfig()
    genresCall()
  }, [])

  const genresCall = async () => {
    let promises = []
    let endPoints = ["tv", "movie"]
    let allGenres = {}
    endPoints.forEach((url) => {
      promises.push(fetchDatFromApi(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item))
    })
    dispatch(getGenres(allGenres))
  }
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediaType/:id' element={<Detail />} />
          <Route path='/search/:query' element={<SearchResult />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </React.Fragment >

  )
}

export default App;
