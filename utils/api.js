import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'UdaciCards:decks'

export function getDecks() {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then((results) => {
		return JSON.parse(results)
	})
}

export function saveDeck (deck) {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results)
			if (data) {
				return data[deck.title]
			} else {
				return null
			}
		})
		.then((results) => {
			return !results && AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
				[deck.title]: deck
			}))
		})

}

export function addCardToDeck (title, card) {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results)
			return data[title]
		})
		.then((data) => {
			return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
				[title]: {
					title,
					questions: data.questions ? data.questions.concat(card) : [card]
				}
			}))
		})
}

export function removeDeck (title) {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then((results) => {
			const data = JSON.parse(results)
			data[title] = undefined
			AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
		})
}
