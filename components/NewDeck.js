import React, {Component} from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { saveDeck } from "../utils/api";
import { addNewDeck } from "../actions/index";
import {
	Header,
	Container,
	Content,
	Form,
	Item,
	Input,
	Card,
	CardItem,
	Body,
	Button,
	Text,
	H2,
	Label,
	Toast
} from 'native-base'

class NewDeck extends Component {
	state = {
		title: '',
		showToast: false,
	}

	setTitle = (value) => {
		this.setState({
			title: value
		})
	}

	submitTitle = () => {
		if (this.state.title && !this.props.decks.hasOwnProperty(this.state.title)) {
			this.props.addDeck({
				title: this.state.title,
				questions: []
			})
			saveDeck({
				title: this.state.title,
				questions: []
			})
			this.props.navigation.navigate(
				'DeckView',
				{ deck: {
					title: this.state.title,
					questions: []
				}}
			)
			this.setState({
				title: ''
			})

		} else if (this.props.decks.hasOwnProperty(this.state.title)) {
			this.setState({title: ''})
			Toast.show({
				text: "Deck Already Exists",
				position: 'bottom',
				buttonText: 'Okay',
				type: 'warning',
				duration: 3000,
			})
		}
		else {
			Toast.show({
				text: "Enter a Title",
				position: 'bottom',
				buttonText: 'Okay',
				type: 'danger',
				duration: 3000,
			})
		}
	}

	render () {
		return (
			<Container style={styles.deck}>
				<Content>
					<Card>
						<CardItem>
							<Body>
								<H2 style={styles.title}>Create a New Deck</H2>
							</Body>
						</CardItem>
						<Form>
							<Item stackedLabel>
								<Label>Title</Label>
								<Input
									value={this.state.title}
									onChangeText={(text) => {
										this.setTitle(text)
									}}
								/>
							</Item>
						</Form>
						<CardItem>
							<Body>
							<Button
								block
								light
								onPress={() => {
									this.submitTitle()
								}}>
								<Text>Submit</Text>
							</Button>
							</Body>
						</CardItem>
					</Card>
				</Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	deck: {
		flex: 1,
		padding: 15,
		justifyContent: 'center'
	},
	title: {
		paddingTop: 25,
		paddingLeft: 15,
		paddingRight: 15,
		alignSelf: 'center'
	},
});

function mapStateToProps ({ decks }) {
	return {
		decks: decks
	}
}

function mapDispatchToProps (dispatch) {
	return {
		addDeck: (deck) => dispatch(addNewDeck(deck))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewDeck)