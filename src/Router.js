import React, { useEffect, useState } from 'react';
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
import Chords from './pages/Chords';
import ChordQuiz from './pages/quiz/ChordQuiz';
import Quiz from './pages/quiz/Quiz';
import Leaderboard from './pages/leaderboard/Leaderboard';
import Lobby from './pages/lobby/Lobby';
const StyledApp = styled.div``;

const Router = () => {
	const { user, authIsReady } = useAuthContext();
	const [showSignup, setShowSignup] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const [theme, setTheme] = useState(true);
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		const data = localStorage.getItem('theme');
		if (data) {
			setTheme(JSON.parse(data));
		}
	}, [theme]);

	return (
		authIsReady && (
			<BrowserRouter>
				<ThemeProvider theme={theme ? darkTheme : lightTheme}>
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
							<Route exact path='/chords' element={<Chords />}></Route>
							<Route exact path='/chord_quiz' element={<Quiz />}></Route>
							<Route exact path='/lobby' element={<Lobby />}></Route>
							<Route exact path='/profile/:id' element={<Profile />}></Route>

							<Route
								exact
								path='/leaderboard'
								element={<Leaderboard />}></Route>
							<Route path='/profile' element={user && <Profile />}></Route>
						</Routes>
					</StyledApp>
				</ThemeProvider>
			</BrowserRouter>
		)
	);
};

export default Router;
