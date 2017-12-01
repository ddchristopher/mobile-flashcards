import React, {Component} from 'react'
import { StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux'
import {
	Container,
	Header,
	Content,
	Card,
	CardItem,
	Body,
	Text,
	Button,
	Right,
	Left,
	Icon,
	H1,
	H2,
	H3 } from 'native-base'
import Quiz from './Quiz'
import NewFlashCard from './NewFlashCard'

class DeckView extends Component {

	state = {
		bounceValue: new Animated.Value(1)
	}

	componentDidMount() {
		Animated.sequence([
			Animated.timing(this.state.bounceValue, { duration: 300, toValue: 1.25}),
			Animated.spring(this.state.bounceValue, { toValue: 1, friction: 4})
		]).start()
	}

	static navigationOptions = ({ navigation }) => {
		const { deck } = navigation.state.params
		return {
			title: deck.title
		}
	}

	render () {
		const deck = this.props.decks[this.props.navigation.state.params.deck.title]
		const { bounceValue } = this.state
		return (
			<Container style={styles.deck}>
				<Content>
					<Card>
						<CardItem>
							<Body>
								<Animated.Text style={[styles.title, {transform: [{scale: bounceValue}]}]}>
									{deck.title}
								</Animated.Text>
								<Text style={styles.quiz}>
									Cards: {deck.questions.length}
								</Text>
							</Body>
						</CardItem>
						<CardItem>
							<Body>
							<Button block onPress={() => {
								this.props.navigation.navigate(
									'Quiz',
									{ deck: deck }
								)
							}}>
								<Text>Start Quiz</Text>
							</Button>
							</Body>
						</CardItem>
						<CardItem>
							<Body>
								<Button block light onPress={() => {
									this.props.navigation.navigate(
										'NewFlashCard',
										{ deck: deck }
									)
								}}>
									<Text>Add Card</Text>
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
		alignSelf: 'center',
		fontSize: 30,
	},
	quiz: {
		alignSelf: 'center',
	},
	quizBtn: {
		alignSelf: 'center',
		padding: 5,
	}

});

function mapStateToProps ({ decks }) {
	return {
		decks: decks
	}
}

export default connect(mapStateToProps)(DeckView)