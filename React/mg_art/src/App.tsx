import { Routes, Route } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';
import { Checkout } from './pages/Checkout';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { NotFound } from './pages/NotFound';
import './App.css';

function App() {
  return (
    <WishlistProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="category/:categoryName" element={<CategoryPage />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </WishlistProvider>
  );
}

export default App;
