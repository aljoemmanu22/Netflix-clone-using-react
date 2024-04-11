import './App.css';
import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Banner from './components/Banner/Banner';
import RowPost from './components/RowPost/RowPost';
import {originals, action, horror, comedy, romance } from './urls'; 
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <RowPost url={originals} title='Netflix Originals' />
      <RowPost url={action} title= 'Action' isSmall />
      <RowPost  url={horror} title={'Horror Movies'}/>
      <RowPost isSmall url={comedy} title={'Comedy Movies'} />
      <RowPost  url={romance} title={'Romantic Movies'}/>
      <Footer/>
    </div>
  );
}

export default App;
