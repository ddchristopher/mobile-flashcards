import React, {Component} from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import {
	Container,
	Header,
	Content,
	Card,
	CardItem,
	Body,
	Button,
	Text,
	H2
} from 'native-base'

class FlashCard extends Component {
	state = {
		revealAnswer: false,
	}

	componentWillReceiveProps() {
		this.setState({revealAnswer: false})
	}

	flipCard = () => {
		this.setState({revealAnswer: true})
	}

	render () {
		const { question } = this.props
		return (
			<View>
				<CardItem>
					<Body>
						{!this.state.revealAnswer ? (
							<H2 style={styles.questionText}>
								{question.question}
							</H2>
						) : (
							<H2 style={styles.questionText}>
								{question.answer}
							</H2>
						)}
					</Body>
				</CardItem>
				<CardItem style={styles.answerBtn}>
					<Button transparent danger onPress={() => this.flipCard()}>
						<Text>Answer</Text>
					</Button>
				</CardItem>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	questionText: {
		paddingTop: 25,
		paddingLeft: 15,
		paddingRight: 15,
		alignSelf: 'center'
	},
	answerBtn: {
		alignSelf: 'center'
	}
});

export default FlashCard