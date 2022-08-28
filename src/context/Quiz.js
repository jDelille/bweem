import { createContext, useReducer } from 'react';
import questions from '../data/questions';
import medium from '../data/medium';
import hard from '../data/hard';
import advanced from '../data/advanced';
import expert from '../data/expert';
import { shuffleAnswers } from '../helpers/helpers';

const initialState = {
	questions: questions,
	currentQuestionIndex: 0,
	showResults: false,
	correctAnswerCount: 0,
	answers: shuffleAnswers(questions[0]),
	currentAnswer: '',
	difficulty: 'Easy',
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'EASY': {
			return initialState;
		}
		case 'MEDIUM': {
			const questions = medium;
			const difficulty = 'Medium';
			return {
				...state,
				questions,
				difficulty,
			};
		}
		case 'HARD': {
			const questions = hard;
			const difficulty = 'Hard';
			return {
				...state,
				questions,
				difficulty,
			};
		}
		case 'ADVANCED': {
			const questions = advanced;
			const difficulty = 'Advanced';
			return {
				...state,
				questions,
				difficulty,
			};
		}
		case 'EXPERT': {
			const questions = expert;
			const difficulty = 'Expert';
			return {
				...state,
				questions,
				difficulty,
			};
		}
		case 'SELECT_ANSWER': {
			const correctAnswerCount =
				action.payload ===
				state.questions[state.currentQuestionIndex].correctAnswer
					? state.correctAnswerCount + 1
					: state.correctAnswerCount;
			return {
				...state,
				currentAnswer: action.payload,
				correctAnswerCount,
			};
		}
		case 'NEXT_QUESTION': {
			const showResults =
				state.currentQuestionIndex === state.questions.length - 1;
			const currentQuestionIndex = showResults
				? state.currentQuestionIndex
				: state.currentQuestionIndex + 1;
			const answers = showResults
				? []
				: shuffleAnswers(state.questions[currentQuestionIndex]);
			return {
				...state,
				currentQuestionIndex,
				showResults,
				answers,
				currentAnswer: '',
			};
		}
		case 'RESTART': {
			return initialState;
		}
		default:
	}
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
	const value = useReducer(reducer, initialState);
	return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
