import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductListPage from './pages/ProductListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/products" element={<ProductListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
