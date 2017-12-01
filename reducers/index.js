import {NEW_CARD, NEW_DECK, DELETE_DECK, RETRIEVE_DECK } from "../actions/types";
import { combineReducers } from 'redux'

const initialDecks = {
	React: {
		title: 'React',
		questions: [
			{
				question: 'What is React?',
				answer: 'A library for managing user interfaces'
			},
			{
				question: 'Where do you make Ajax requests in React?',
				answer: 'The componentDidMount lifecycle event'
			}
		]
	},
}

function decks (state = initialDecks, action) {
	switch (action.type) {
		case RETRIEVE_DECK :
			return {
				...state,
				[action.deck.title]: action.deck
			}
		case NEW_DECK :
			return {
				...state,
				[action.deck.title]: action.deck
			}
		case NEW_CARD :
			const { card, deck } = action
			console.log(state)
			return {
				...state,
				[deck.title]: {
					...state[deck.title],
					questions: [...state[deck.title].questions, card]
				}
			}
		case DELETE_DECK :
			const newDecks = {...state}
			newDecks[action.title] = undefined
			delete newDecks[action.title]
			return {
				...newDecks
			}
		default :
			return state
	}
}

export default combineReducers({
	decks
})