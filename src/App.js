import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import themeLight from './theme/LightTheme/LightTheme';
import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import { CssBaseline } from '@mui/material';
import LoginPage from './pages/login/loginPage';


function App() {
  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
