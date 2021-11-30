import React from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Favorites from './components/Favorites';
import Footer from './components/Footer';
import './components/styling.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <hr />
        <Search />
      <hr />
        <Favorites />   
        <hr />
     <footer className='App-footer'>
        <Footer />
      </footer>
    </div>
  );
}

export default App;