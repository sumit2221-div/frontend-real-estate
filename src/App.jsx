import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Login from './components/login.jsx';
import Favorite from './components/favorite.jsx';
import Addproperty from './components/addproperty.jsx';
import Profile from './components/profile.jsx';
import Home from './components/home.jsx';
import Register from './components/regestation/register.jsx';
function App() {
  const [count, setCount] = useState(0);

  return (
   <>
    <Header />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/property" element={<Addproperty />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/registation' element={<Register/>}/>
        </Routes>
      </div>
      <Footer />
   </>
  );
}

export default App;
