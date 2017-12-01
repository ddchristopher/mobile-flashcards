import React, {Component} from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addCardToDeck } from "../utils/api";
import { addNewCard } from "../actions/index";
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
	Toast } from 'native-base'

class NewFlashCard extends Component {
	state = {
		question: '',
		answer: '',
		showToast: false,
		submitted: false,
	}

	setQuestion = (value) => {
		this.setState({
			question: value
		})
	}

	setAnswer = (value) => {
		this.setState({
			answer: value
		})
	}

	submittedScreen = () => {
		this.setState({
			submitted: false,
			question: '',
			answer: '',
		})
	}

	submitCard = () => {
		const deck = this.props.navigation.state.params.deck
		if (this.state.question && this.state.answer) {
			const { question, answer } = this.state
			this.props.addCardToState({question: question, answer: answer}, deck)
			addCardToDeck(deck.title, {question: question, answer: answer})
			this.setState({
				submitted: true,
			})
		} else {
			Toast.show({
				text: "Enter a Question and Answer",
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
						{this.state.submitted ? (
							<Card>
								<CardItem>
									<Body>
										<H2 style={styles.submittedText}>
											Card Added to Deck
										</H2>
									</Body>
								</CardItem>
								<CardItem>
									<Body>
										<Button
											block
											light
											onPress={() => this.submittedScreen()}>
											<Text>Add Another Card</Text>
										</Button>
									</Body>
								</CardItem>
							</Card>
						) : (
							<Card>
								<Form>
									<Item stackedLabel>
										<Label>Question</Label>
										<Input
											value={this.state.question}
											onChangeText={(text) => {
												this.setQuestion(text)
											}}
										/>
									</Item>
									<Item stackedLabel last>
										<Label>Answer</Label>
										<Input
											value={this.state.answer}
											onChangeText={(text) => {
												this.setAnswer(text)
											}}
										/>
									</Item>
								</Form>
								<CardItem>
									<Body>
									<Button
										block
										light
										onPress={() => this.submitCard()}

									>
										<Text>Add Card</Text>
									</Button>
									</Body>
								</CardItem>
							</Card>
						)
						}

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
	submittedText: {
		paddingTop: 25,
		paddingLeft: 15,
		paddingRight: 15,
		alignSelf: 'center'
	},
});

function mapDispatchToProps (dispatch) {
	return {
		addCardToState: (card, deck) => dispatch(addNewCard(card, deck))
	}
}

export default connect(
	null,
	mapDispatchToProps
)(NewFlashCard)