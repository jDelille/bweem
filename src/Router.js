import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// components
import Navbar from './components/nav/Navbar';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Profile from './pages/profile/Profile';

// styles
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './Themes.js';
const StyledApp = styled.div``;

const Router = () => {
	const { user, authIsReady } = useAuthContext();
	const [showSignup, setShowSignup] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const [theme, setTheme] = useState(true);
	const [toggle, setToggle] = useState(false);

	console.log(theme);

	return (
		authIsReady && (
			<BrowserRouter>
				<ThemeProvider theme={!theme ? darkTheme : lightTheme}>
					<GlobalStyles />
					<StyledApp>
						<Navbar
							setShowSignup={setShowSignup}
							setShowLogin={setShowLogin}
							toggle={toggle}
							setToggle={setToggle}
							setTheme={setTheme}
							theme={theme}
						/>
						{!user && showSignup && (
							<Signup
								setShowSignup={setShowSignup}
								setShowLogin={setShowLogin}
							/>
						)}
						{!user && showLogin && showLogin && (
							<Login
								setShowSignup={setShowSignup}
								setShowLogin={setShowLogin}
							/>
						)}

						<Routes>
							<Route exact path='/' element={<Home />}></Route>
							<Route path='/profile' element={user && <Profile />}></Route>
						</Routes>
					</StyledApp>
				</ThemeProvider>
			</BrowserRouter>
		)
	);
};

export default Router;
