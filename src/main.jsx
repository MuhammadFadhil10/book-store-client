import React, { createContext, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import Navigation from './components/Navigation';
import Profile from './pages/Profile';
import { TitleContext } from './context/TitleContext';
import { ThemeContext } from './context/ThemeContext';
import { ButtonContext } from './context/ButtonContext';
import { Register } from './pages/Auth/Register';
import { Login } from './pages/Auth/Login';
import { LoginContext } from './context/LoginContext';

const themesColor = {
	light: 'white',
	dark: '#191919',
};

function AppRouter() {
	const [theme, setTheme] = useState(themesColor.light);
	const [bgColor, setBgColor] = useState('');

	const [isLogin, setIsLogin] = useState(false);

	return (
		<BrowserRouter>
			<LoginContext.Provider value={{ isLogin, setIsLogin }}>
				<React.StrictMode>
					<Navigation />
					<Routes>
						<Route path='/' element={<App />}></Route>
						<Route path='/profile' element={<Profile />}></Route>
						<Route path='/register' element={<Register />}></Route>
						<Route path='/login' element={<Login />}></Route>
					</Routes>
				</React.StrictMode>
			</LoginContext.Provider>
		</BrowserRouter>
	);
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppRouter />);
