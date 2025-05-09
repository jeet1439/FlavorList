import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar.jsx';

const Homepage = lazy(() => import('./pages/Homepage.jsx'));
const Menu = lazy(() => import('./pages/Menu.jsx'));
const Item = lazy(() => import('./pages/Item.jsx'));
const Login = lazy(() => import('./pages/login.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const Orders = lazy(() => import('./pages/orders.jsx'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className='text-stone-50 min-h-screen flex justify-center items-center pt-20 bg-slate-950'>Loading...</div>}>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/menu' element={<Menu />}/>
          <Route path='/product/:id' element={<Item />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/orders' element={<Orders/>}/>
        </Routes>
        <Toaster />
      </Suspense>
    </BrowserRouter>
  );
}
