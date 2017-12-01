import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { AppLoading, Constants } from 'expo'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DeckView from './components/DeckView'
import Quiz from './components/Quiz'
import NewFlashCard from './components/NewFlashCard'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Root } from 'native-base'
import { setLocalNotification } from "./utils/notifications";

const store = createStore(
	reducer,
)

function Status ({backgroundColor, ...props}) {
	return (
		<View style={{backgroundColor, height: Constants.statusBarHeight}}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props}/>
		</View>
	)
}

const Tabs = TabNavigator({
	Decks: {
		screen: DeckList,
		navigationOptions: {
			tabBarLabel: 'Decks',
			tabBarIcon: () => <MaterialCommunityIcons name='cards' size={30} color='black'/>
		}
	},
	NewDeck: {
		screen: NewDeck,
		navigationOptions: {
			tabBarLabel: 'New Deck',
			tabBarIcon: () => <MaterialCommunityIcons name='cards' size={30} color='black'/>
		}
	},
}, {
	tabBarOptions: {
		activeTintColor: Platform.OS === 'ios' ? '#3F51B5' : 'white',
		style: {
			height: 56,
			backgroundColor: Platform.OS === 'ios' ? 'white' : '#3F51B5',
		}
	}
})

const DeckNavigator = StackNavigator({
	Home: {
		screen: Tabs,
		navigationOptions: {
			header: null,

		}
	},
	DeckView: {
		screen: DeckView,
		navigationOptions: {
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#3F51B5'
			}
		}
	},
	Quiz : {
		screen: Quiz,
		navigationOptions: {
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#3F51B5'
			}
		}
	},
	NewFlashCard : {
		screen: NewFlashCard,
		navigationOptions: {
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#3F51B5'
			}
		}
	}
})

export default class App extends React.Component {
	state = {
		fontsLoaded: false
	}

	async componentWillMount() {
		await Expo.Font.loadAsync({
			'Roboto': require('native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
			'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
		});
		this.setState({fontsLoaded: true })
	}

	componentDidMount() {
		setLocalNotification()
	}

	render() {
		return (
			<Root>
				<Provider store={ store }>
					<View style={styles.container}>
						<Status backgroundColor='#3F51B5' barStyle='light-content'/>
						{this.state.fontsLoaded ? (
							<DeckNavigator/>
						) : (
							<AppLoading/>
						)}
					</View>
				</Provider>
			</Root>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
