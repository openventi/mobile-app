import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Animated, Easing } from 'react-native';
import styles from '../Screens/Styles/PairScreenStyle';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { SCREENS } from '../constants';

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);

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

		this.scaleValue1 = new Animated.Value(0);
		this.scaleValue2 = new Animated.Value(0);
		this.scaleValue3 = new Animated.Value(0);

		this.SubmitCode = this.SubmitCode.bind(this);  
		this.ClearCode = this.ClearCode.bind(this);  
	}

	componentDidMount () {
		this.scaleDots()
	}

	scaleDots () {
		this.scaleValue1.setValue(0)
		this.scaleValue2.setValue(0)
		this.scaleValue3.setValue(0)

		const createDotAnimation = function (value) {
			return Animated.timing(
				value,
				{
					toValue: 1,
					duration: 300,
					easing: Easing.linear,
					useNativeDriver: true,
				}
			)
		}

		Animated.sequence([
			createDotAnimation(this.scaleValue1),
			createDotAnimation(this.scaleValue2),
			createDotAnimation(this.scaleValue3)        
		]).start(() => this.scaleDots())
	}

	// concatenate the code of all TextInput Fields
	GetCode(value, digit) {
		let code = "";

		if(digit == 1)
		{
			code += value;
		}
		else
		{
			code += this.state.firstDigit;
		}

		if(digit == 2)
		{
			code += value;
		}
		else
		{
			code += this.state.secondDigit;
		}

		if(digit == 3)
		{
			code += value;
		}
		else
		{
			code += this.state.thirdDigit;
		}

		if(digit == 4)
		{
			code += value;
		}
		else
		{
			code += this.state.fourthDigit;
		}

		return code;
	}

	CanSubmitCode(code) {
		if(code.length == 4 && ! isNaN(parseInt(code)))
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	SubmitCode() {
		this.setState(state => ({loading: true}));

		// TODO send code to ventilator and remove the following line
		setTimeout(this.ClearCode, 5000);	
	}

	ClearCode() {
		this.setState(state => ({loading: false, firstDigit: '', secondDigit: '', thirdDigit: '', fourthDigit: ''}));

		this.refs.FirstDigit.clear();
		this.refs.SecondDigit.clear();
		this.refs.ThirdDigit.clear();
		this.refs.FourthDigit.clear();

		this.refs.FourthDigit.blur();
		// TODO: handle real connection to device and then change screen.
    this.props.navigation.navigate(SCREENS.monitor);
	}

	HandleFirstDigit(value) {
		let code = this.GetCode(value, 1);
		let canSubmitCode = this.CanSubmitCode(code);

		if( ! isNaN(parseInt(value)))
		{
			this.refs.SecondDigit.focus();
		}

		this.setState({firstDigit: value, canSubmit: canSubmitCode, ventilatorCode: code});
	}

	HandleSecondDigit(value) {
		let code = this.GetCode(value, 2);
		let canSubmitCode = this.CanSubmitCode(code);

		if( ! isNaN(parseInt(value)))
		{
			this.refs.ThirdDigit.focus();
		}

		this.setState({secondDigit: value, canSubmit: canSubmitCode, ventilatorCode: code});
	}

	HandleThirdDigit(value) {
		let code = this.GetCode(value, 3);
		let canSubmitCode = this.CanSubmitCode(code);
		
		if( ! isNaN(parseInt(value)))
		{
			this.refs.FourthDigit.focus();
		}

		this.setState({thirdDigit: value, canSubmit: canSubmitCode, ventilatorCode: code});
	}

	HandleFourthDigit(value) {
		let code = this.GetCode(value, 4);
		let canSubmitCode = this.CanSubmitCode(code);

		if(canSubmitCode)
		{
			Keyboard.dismiss();
		}

		this.setState({fourthDigit: value, canSubmit: canSubmitCode, ventilatorCode: code});
	}

	HandleBackSpaceSecondDigit = ({ nativeEvent: { key: keyValue } }) => {
		if (keyValue === 'Backspace' && this.state.secondDigit == "")
		{
			this.refs.FirstDigit.focus();
		}
  	};

	HandleBackSpaceThirdDigit = ({ nativeEvent: { key: keyValue } }) => {
		if (keyValue === 'Backspace' && this.state.thirdDigit == "")
		{
			this.refs.SecondDigit.focus();
		}
  	};

	HandleBackSpaceFourthDigit = ({ nativeEvent: { key: keyValue } }) => {
		if (keyValue === 'Backspace' && this.state.fourthDigit == "")
		{
			this.refs.ThirdDigit.focus();
		}
  	};


	render() {
		const scaleDot1 = this.scaleValue1.interpolate({
    			inputRange: [0, 0.5, 1],
    			outputRange: [1, 2, 1]

		})
		const scaleDot2 = this.scaleValue2.interpolate({
    			inputRange: [0, 0.5, 1],
    			outputRange: [1, 2, 1]

		})
		const scaleDot3 = this.scaleValue3.interpolate({
    			inputRange: [0, 0.5, 1],
    			outputRange: [1, 2, 1]

		})

		return (
		<DismissKeyboard>
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
							value={this.state.firstDigit}
							onFocus= {() => this.setState({firstDigit : ''})}
							onChangeText={(value) => this.HandleFirstDigit(value)}
							keyboardType="numeric"
							maxLength={1}
							ref='FirstDigit'
							name='first_digit'
							editable={ this.state.loading ? false : true }
						/>
						<TextInput
							style={[
								styles.pairCodeInput,
								this.state.secondDigit ?
								{ backgroundColor: '#16AB1F' } 
								: { backgroundColor: 'transparent' }
							]}
							value={this.state.secondDigit}
							onFocus= {() => this.setState({secondDigit : ''})}
							onChangeText={(value) => this.HandleSecondDigit(value)}
							keyboardType="numeric"
							maxLength={1}
							ref='SecondDigit'
							editable={ this.state.loading ? false : true }
							onKeyPress={ this.HandleBackSpaceSecondDigit } 
						/>
						<TextInput
							style={[
								styles.pairCodeInput,
								this.state.thirdDigit ?
								{ backgroundColor: '#16AB1F' } 
								: { backgroundColor: 'transparent' }
							]}
							value={this.state.thirdDigit}
							onFocus= {() => this.setState({thirdDigit : ''})}
							onChangeText={this.HandleThirdDigit.bind(this)}
							keyboardType="numeric"
							maxLength={1}
							ref='ThirdDigit'
							editable={ this.state.loading ? false : true }
							onKeyPress={ this.HandleBackSpaceThirdDigit } 
						/>
						<TextInput
							style={[
								styles.pairCodeInput,
								this.state.fourthDigit ?
								{ backgroundColor: '#16AB1F' } 
								: { backgroundColor: 'transparent' }
							]}
							value={this.state.fourthDigit}
							onFocus= {() => this.setState({fourthDigit : ''})}
							onChangeText={this.HandleFourthDigit.bind(this)}
							keyboardType="numeric"
							maxLength={1}
							ref='FourthDigit'
							editable={ this.state.loading ? false : true }
							onKeyPress={ this.HandleBackSpaceFourthDigit } 
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
							onPress={this.SubmitCode}
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
							<View style={[
								styles.dotsContainer,
								this.state.loading ?
								{ opacity: 1 } 
								: { opacity: 0 }
							]}>
								<Animated.View style={[
									styles.loadingDot, 
									{transform: [{scale: scaleDot1}]},
								]}/>
								<Animated.View style={[
									styles.loadingDot, 
									{transform: [{scale: scaleDot2}]},
								]}/>
								<Animated.View style={[
									styles.loadingDot, 
									{transform: [{scale: scaleDot3}]},
								]}/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.bottomSpacer} />
			</View>
		</DismissKeyboard>
	);
	}
}
