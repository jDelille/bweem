import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// components
import Navbar from './components/nav/Navbar';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ResetPassword from './pages/auth/ResetPassword';
import Profile from './pages/profile/Profile';

const Router = () => {
	const { user, authIsReady } = useAuthContext();
	const [showSignup, setShowSignup] = useState(false);
	const [showLogin, setShowLogin] = useState(false);

	return (
		authIsReady && (
			<BrowserRouter>
				<Navbar setShowSignup={setShowSignup} setShowLogin={setShowLogin} />
				{!user && showSignup && (
					<Signup setShowSignup={setShowSignup} setShowLogin={setShowLogin} />
				)}
				{!user && showLogin && showLogin && (
					<Login setShowSignup={setShowSignup} setShowLogin={setShowLogin} />
				)}

				<Routes>
					<Route exact path='/' element={<Home />}></Route>
					
					<Route path='/profile' element={user && <Profile />}></Route>
					{/* <Route path='/signup' element={!user && <Signup />}></Route>
					<Route path='/login' element={!user && <Login />}></Route> */}
					<Route
						path='/reset-password'
						element={user && <ResetPassword />}></Route>
				</Routes>
			</BrowserRouter>
		)
	);
};

export default Router;
