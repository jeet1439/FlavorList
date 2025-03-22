import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

// Lazily load the pages
const Homepage = lazy(() => import('./pages/Homepage.jsx'));
const AllItem = lazy(() => import('./pages/AllItem.jsx'));
const Item = lazy(() => import('./pages/Item.jsx'));
export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className='min-h-screen flex justify-center items-center'>Loading...</div>}>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/allItems' element={<AllItem />}/>
          <Route path='/product/:id' element={<Item />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
