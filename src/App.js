import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductListPage from "./pages/ProductListPage";
import { CssBaseline, Container } from "@mui/material";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="sm">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<ProductListPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
