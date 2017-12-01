import {
	RETRIEVE_DECK,
	NEW_DECK,
	NEW_CARD,
	DELETE_DECK,
} from "./types";

export function retrieveDeck (deck) {
	return {
		type: RETRIEVE_DECK,
		deck
	}
}

export function addNewDeck (deck) {
	return {
		type: NEW_DECK,
		deck
	}
}

export function addNewCard (card, deck) {
	return {
		type: NEW_CARD,
		card,
		deck
	}
}

export function deleteDeck (title) {
	return {
		type: DELETE_DECK,
		title
	}
}