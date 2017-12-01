import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native';
import {
	Container,
	Header,
	Content,
	Card,
	CardItem,
	Body,
	Text,
	Button,
	H2,
	H3,
	Left,
	Right,
	Icon } from 'native-base'
import { DeckView } from './DeckView'
import { retrieveDeck, deleteDeck } from "../actions/index";
import {getDecks, saveDeck, removeDeck } from "../utils/api";


class DeckList extends Component {
	state = {
		confirmDelete: false,
		cardToDelete: ''
	}

	componentDidMount() {
		this.props.deckList.forEach((deck) => {
			saveDeck(deck)
		})
		getDecks().then((data) => {
			if (data) {
				const savedDecks = Object.keys(data).map((deck) => {
					return data[deck]
				})
				savedDecks.forEach((deck) => {
					this.props.loadDecks(deck)
				})
			}
		})
	}

	confirmDelete = (title) => {
		this.setState({
			cardToDelete: title,
			confirmDelete: true
		})
	}

	cancelDelete = () => {
		this.setState({
			cardToDelete: '',
			confirmDelete: false
		})
	}

	removeD = (title) => {
		this.setState({
			cardToDelete: '',
			confirmDelete: false })
		this.props.deleteD(title)
		removeDeck(title)
	}

	render () {
		const { deckList } = this.props
		return (
			<Container style={styles.deckItem}>
				<Content>
					{deckList.map((deck, index) => (
						<Card key={index}>
							<CardItem button onPress={() => {
								this.cancelDelete()
								this.props.navigation.navigate(
									'DeckView',
									{ deck: deck }
								)
							}}>
								<Left>
									<CardItem >
										<Body>
										<H2>
											{deck.title}
										</H2>
										<Text note>
											Cards: {deck.questions.length}
										</Text>
										</Body>
									</CardItem>
								</Left>
								<Right>
										{
											deck.title !== 'React' &&
											this.state.confirmDelete &&
											this.state.cardToDelete === deck.title &&
												<CardItem>
													<Button
														bordered
														style={styles.confirmBtn}
														onPress={() => this.removeD(deck.title)}
													>
														<Icon name='checkmark'/>
													</Button>
													<Button
														bordered
														onPress={() => this.cancelDelete()}
													>
														<Icon name='close'/>
													</Button>
												</CardItem>
										}
										{
											deck.title !== 'React' &&
											this.state.confirmDelete &&
											this.state.cardToDelete !== deck.title &&
												<CardItem>
													<Button
														bordered
														onPress={() => this.confirmDelete(deck.title)}
													>
														<Icon name='trash'/>
													</Button>
												</CardItem>



										}
										{
											deck.title !== 'React' &&
											!this.state.confirmDelete &&
												<CardItem>
													<Button
														bordered
														onPress={() => this.confirmDelete(deck.title)}
													>
														<Icon name='trash'/>
													</Button>
												</CardItem>
										}
								</Right>
							</CardItem>
						</Card>
					))}
				</Content>
			</Container>
		)
	}
}

function mapStateToProps ({ decks }) {
	const deckList = Object.keys(decks).map((deck) => {
		return decks[deck]
	})
	return {
		deckList: deckList
	}
}

function mapDispatchToProps (dispatch) {
	return {
		loadDecks: (deck) => dispatch(retrieveDeck(deck)),
		deleteD: (title) => dispatch(deleteDeck(title))
	}
}

const styles = StyleSheet.create({
	deckItem: {
		flex: 1,
		padding: 15,
		justifyContent: 'center'
	},
	confirmBtn: {
		marginRight: 10,
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DeckList)

