import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Screens/Styles/PairScreenStyle';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

export default class PairScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			canSubmit: false,
			ventilatorCode: '',
			firstDigit: '',
			secondDigit: '',
			thirdDigit: '',
			fourthDigit: '',
		}

		this.handleClick = this.handleClick.bind(this);  
	}

	handleClick() {
		this.setState(state => ({loading: true}));
		this.refs.FourthDigit.blur();
	}

	HandleFirstDigit(value) {
		this.setState({firstDigit: value});
		if( ! isNaN(parseInt(value)))
		{
			this.refs.SecondDigit.focus();
		}
	}

	HandleSecondDigit(value) {
		this.setState({secondDigit: value});
		if( ! isNaN(parseInt(value)))
		{
			this.refs.ThirdDigit.focus();
		}
	}

	HandleThirdDigit(value) {
		this.setState({thirdDigit: value});
		if( ! isNaN(parseInt(value)))
		{
			this.refs.FourthDigit.focus();
		}
	}

	HandleFourthDigit(value) {
		var code = this.state.firstDigit + this.state.secondDigit + this.state.thirdDigit + value;
		var canSubmitCode = false;

		if(code.length == 4 && ! isNaN(parseInt(code)))
		{
			canSubmitCode = true;
		}

		this.setState({fourthDigit: value, canSubmit: canSubmitCode, ventilatorCode: code});
	}

	render() {
		return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Image
					source={
					  require('../assets/images/logo.png')
					}
					style={styles.logoImage}
				/>
			</View>
			<View style={styles.pairingFormContainer} >
				<View style={styles.pairStatusContainer}>
					<HideWithKeyboard>
						<Image
							source={
							  require('../assets/images/connect_circle.png')
							}
							style={styles.connectImage}
						/>
					</HideWithKeyboard>
					<Text style={styles.connectMessage} >{
							this.state.loading ?
							'Conectándose a ventilador '
							: 'Ingresa el código del ventilador '
						}
						<Text style={styles.ventilatorName} >{
							this.state.loading ? this.props.ventilator : ''
							}</Text></Text>	
				</View>
				<View style={styles.codeFieldsContainer}>
					<TextInput
						style={[
							styles.pairCodeInput,
							this.state.firstDigit ?
							{ backgroundColor: '#16AB1F' } 
							: { backgroundColor: 'transparent' }
						]}
						onChangeText={(value) => this.HandleFirstDigit(value)}
						keyboardType="numeric"
						maxLength={1}
						ref='FirstDigit'
						name='first_digit'
					/>
					<TextInput
						style={[
							styles.pairCodeInput,
							this.state.secondDigit ?
							{ backgroundColor: '#16AB1F' } 
							: { backgroundColor: 'transparent' }
						]}
						onChangeText={(value) => this.HandleSecondDigit(value)}
						keyboardType="numeric"
						maxLength={1}
						ref='SecondDigit'
					/>
					<TextInput
						style={[
							styles.pairCodeInput,
							this.state.thirdDigit ?
							{ backgroundColor: '#16AB1F' } 
							: { backgroundColor: 'transparent' }
						]}
						onChangeText={this.HandleThirdDigit.bind(this)}
						keyboardType="numeric"
						maxLength={1}
						ref='ThirdDigit'
					/>
					<TextInput
						style={[
							styles.pairCodeInput,
							this.state.fourthDigit ?
							{ backgroundColor: '#16AB1F' } 
							: { backgroundColor: 'transparent' }
						]}
						onChangeText={this.HandleFourthDigit.bind(this)}
						keyboardType="numeric"
						maxLength={1}
						ref='FourthDigit'
					/>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={[
							styles.submitButton,
							this.state.canSubmit ? 
							{ opacity: 1 } 
							: { opacity: 0.7 }
						]}
						onPress={this.handleClick}
						disabled={
							this.state.canSubmit ? false : true
						}
					>
						<Text style={[
							styles.submitButtonText,
							this.state.loading ?
							{ opacity: 0 } 
							: { opacity: 1 }
							]}>INGRESAR</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.bottomSpacer} />
		</View>
	);
	}
}
