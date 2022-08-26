import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { QuizProvider } from './context/Quiz';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<QuizProvider>
			<AuthContextProvider>
				<App />
			</AuthContextProvider>
		</QuizProvider>
	</React.StrictMode>
);
