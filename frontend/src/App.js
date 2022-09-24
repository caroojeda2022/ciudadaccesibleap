import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import IssueSearch from './components/IssueSearch/IssueSearch';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';

import './App.css';

function App () {
  return (
    <div className="app">
      <Header />
      <Routes>
                <Route path='/' element={<IssueSearch />} />
                <Route path='/signup' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/new' element={<IssueCreate />} />
                <Route path='*' element={<IssueSearch />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
