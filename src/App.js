import React from 'react';
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Slider from './components/Slider'



function App() {

  return (
    <div className="App">
      <Header></Header>
      <Slider/>
      <Home/>
      <Footer></Footer>
    </div>
  );
}

  
export default App;
  