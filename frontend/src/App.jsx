import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Items from './pages/items';
import Add from './pages/add';
import Edit from './pages/edit';
import Header from './components/header';
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="w-full bg-slate-100 h-full">
        <Header />
        <div className="max-w-3xl lg:flex lg:justify-center mx-auto pt-14">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Items />} />
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Items />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
