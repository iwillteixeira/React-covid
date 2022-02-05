import {
  Routes,
  Route,
} from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getData } from './redux/covidApi/covidSlice';
import Header from './components/Header';
import Home from './components/Home';
import Continent from './components/Continent';
import Country from './components/Country';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <>
      <Header />
      <div className="mt-16 px-12 pt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/continent/:continent" element={<Continent />} />
          <Route path="/continent/:continent/country/:country" element={<Country />} />
        </Routes>
      </div>
    </>

  );
};

export default App;
