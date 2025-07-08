import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import InterviewPage from './pages/InterviewPage';

function App() {
  return (
    <>
      <div className='background-gradient'></div>
      <Header />
      
      {/* This new div will hold all our page content */}
      <div className='page-content'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/interview' element={<InterviewPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
