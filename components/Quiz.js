import React, {Component} from 'react'
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
	Left,
	Right
} from 'native-base'
import FlashCard from './FlashCard'
import { NavigationActions } from 'react-navigation'
import { clearLocalNotifications, setLocalNotification } from "../utils/notifications";

class Quiz extends Component {
	state = {
		currentQuestion: 1,
		questionsRight: 0,
	}

	static navigationOptions = ({ navigation }) => {
		const { deck } = navigation.state.params
		return {
			title: deck.title
		}
	}

	correct = () => {
		this.setState({
			questionsRight: this.state.questionsRight + 1
		})
	}

	nextQuestion = () => {
		if (this.state.currentQuestion === this.props.navigation.state.params.deck.questions.length) {
			clearLocalNotifications().then(setLocalNotification)
		}
		this.setState({
			currentQuestion: this.state.currentQuestion + 1
		})
	}

	restart = () => {
		this.setState({
			currentQuestion: 1,
			questionsRight: 0,
		})
	}

	render () {
		const deck = this.props.navigation.state.params.deck
		return (
			<Container style={styles.deck}>
				<Content>
				{this.state.currentQuestion <= deck.questions.length ? (
					<Card>
						<CardItem>
							<Body>
							<Text style={styles.quiz}>
								Question {this.state.currentQuestion} of {deck.questions.length}
							</Text>
							</Body>
						</CardItem>

						<FlashCard
							question={deck.questions[this.state.currentQuestion - 1]}
						/>
						<CardItem>
							<Left>
								<Button success onPress={() => {
									this.correct()
									this.nextQuestion()
								}}>
									<Text>Correct</Text>
								</Button>
							</Left>
							<Right>
								<Button danger onPress={() => this.nextQuestion()}>
									<Text>Incorrect</Text>
								</Button>
							</Right>
						</CardItem>
					</Card>

				) : (
					<Card>
						<CardItem>
							<Body>
							<Text style={styles.quiz}>
								Quiz Completed
							</Text>
							<Text style={styles.quiz}>
								You answered {this.state.questionsRight} of {deck.questions.length} question(s) correctly.
							</Text>
							</Body>
						</CardItem>
						<CardItem style={styles.quiz}>
							<Body>
								<Button block onPress={() => this.restart()}>
									<Text>Restart Quiz</Text>
								</Button>
							</Body>
						</CardItem>
						<CardItem style={styles.quiz}>
							<Body>
							<Button block light onPress={() => {
								this.props.navigation.dispatch(NavigationActions.back())
							}}>
								<Text>Back to Deck</Text>
							</Button>
							</Body>
						</CardItem>
					</Card>

				)}
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
	quiz: {
		alignSelf: 'center'
	}

});

export default Quiz