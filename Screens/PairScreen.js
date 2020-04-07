import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Easing,
} from 'react-native';
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
    };

    this.scaleValue1 = new Animated.Value(0);
    this.scaleValue2 = new Animated.Value(0);
    this.scaleValue3 = new Animated.Value(0);

    this.SubmitCode = this.SubmitCode.bind(this);
    this.ClearCode = this.ClearCode.bind(this);
  }

  componentDidMount() {
    this.scaleDots();
  }

  scaleDots() {
    this.scaleValue1.setValue(0);
    this.scaleValue2.setValue(0);
    this.scaleValue3.setValue(0);

    const createDotAnimation = function (value) {
      return Animated.timing(value, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      });
    };

    Animated.sequence([
      createDotAnimation(this.scaleValue1),
      createDotAnimation(this.scaleValue2),
      createDotAnimation(this.scaleValue3),
    ]).start(() => this.scaleDots());
  }

  // concatenate the code of all TextInput Fields
  SubmitCode() {
    if (this.state.canSubmit) {
      this.setState((state) => ({ loading: true }));

      // TODO send code to ventilator and remove the following line
      // var ventilatorCode = this.state.ventilatorCode;

      setTimeout(this.ClearCode, 5000);
    }
  }

  ClearCode() {
    this.setState({
      loading: false,
      canSubmit: false,
      ventilatorCode: '',
      firstDigit: '',
      secondDigit: '',
      thirdDigit: '',
      fourthDigit: '',
    });

    // TODO: handle real connection to device and then change screen.
    this.props.navigation.navigate(SCREENS.monitor);
  }

  HandleCodeDigitChangeText(input, value) {
    // Recuperamos el código actual
    var state = {
      firstDigit: this.state.firstDigit,
      secondDigit: this.state.secondDigit,
      thirdDigit: this.state.thirdDigit,
      fourthDigit: this.state.fourthDigit,
      loading: false,
    };

    // Verificar la validez del texto modificado y actualizar el estado
    var isValid = /^\d$/.test(value);
    state[input] = isValid ? value : '';

    // Actualizamos el resto de propiedades del estado
    var ventilatorCode =
      state.firstDigit + state.secondDigit + state.thirdDigit + state.fourthDigit;
    var canSubmit = /^\d{4}$/.test(ventilatorCode);

    state.canSubmit = canSubmit;
    state.ventilatorCode = ventilatorCode;

    this.setState(state);

    // Verificar si se requiere acción posterior
    if (isValid) {
      if (input === 'firstDigit') {
        this.SecondDigit.focus();
      } else if (input === 'secondDigit') {
        this.ThirdDigit.focus();
      } else if (input === 'thirdDigit') {
        this.FourthDigit.focus();
      } else if (input === 'fourthDigit') {
        Keyboard.dismiss();
      }
    }
  }

  render() {
    const scaleDot1 = this.scaleValue1.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 2, 1],
    });
    const scaleDot2 = this.scaleValue2.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 2, 1],
    });
    const scaleDot3 = this.scaleValue3.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 2, 1],
    });

    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.pairingFormContainer}>
            <View style={styles.pairStatusContainer}>
              <HideWithKeyboard>
                <Image
                  source={require('../assets/images/connect_circle.png')}
                  style={styles.connectImage}
                />
              </HideWithKeyboard>
              <Text style={styles.connectMessage}>
                {this.state.loading
                  ? 'Conectándose a ventilador '
                  : 'Código del ventilador '}
                <Text style={styles.ventilatorName}>
                  {this.state.loading ? this.props.ventilator : ''}
                </Text>
              </Text>
            </View>
            <View style={styles.codeFieldsContainer}>
              <TextInput
                style={
                  this.state.firstDigit
                    ? [styles.pairCodeInput, styles.pairCodeInputWithValue]
                    : styles.pairCodeInput
                }
                onChangeText={(value) =>
                  this.HandleCodeDigitChangeText('firstDigit', value)
                }
                keyboardType="numeric"
                maxLength={1}
                ref={(c) => (this.FirstDigit = c)}
                value={this.state.firstDigit}
                editable={this.state.loading ? false : true}
              />
              <TextInput
                style={
                  this.state.secondDigit
                    ? [styles.pairCodeInput, styles.pairCodeInputWithValue]
                    : styles.pairCodeInput
                }
                onChangeText={(value) =>
                  this.HandleCodeDigitChangeText('secondDigit', value)
                }
                keyboardType="numeric"
                maxLength={1}
                ref={(c) => (this.SecondDigit = c)}
                value={this.state.secondDigit}
                editable={this.state.loading ? false : true}
              />
              <TextInput
                style={
                  this.state.thirdDigit
                    ? [styles.pairCodeInput, styles.pairCodeInputWithValue]
                    : styles.pairCodeInput
                }
                onChangeText={(value) =>
                  this.HandleCodeDigitChangeText('thirdDigit', value)
                }
                keyboardType="numeric"
                maxLength={1}
                ref={(c) => (this.ThirdDigit = c)}
                value={this.state.thirdDigit}
                editable={this.state.loading ? false : true}
              />
              <TextInput
                style={
                  this.state.fourthDigit
                    ? [styles.pairCodeInput, styles.pairCodeInputWithValue]
                    : styles.pairCodeInput
                }
                onChangeText={(value) =>
                  this.HandleCodeDigitChangeText('fourthDigit', value)
                }
                keyboardType="numeric"
                maxLength={1}
                ref={(c) => (this.FourthDigit = c)}
                value={this.state.fourthDigit}
                editable={this.state.loading ? false : true}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !this.state.canSubmit ? styles.submitButtonDisabled : '',
                  this.state.loading ? styles.submitButtonProcessing : '',
                ]}
                onPress={this.SubmitCode}
                disabled={this.state.canSubmit ? false : true}>
                <Text
                  style={[
                    styles.submitButtonText,
                    !this.state.canSubmit ? styles.submitButtonTextDisabled : '',
                    this.state.loading ? styles.submitButtonTextProcessing : '',
                  ]}>
                  INGRESAR
                </Text>
                <View
                  style={[
                    styles.dotsContainer,
                    this.state.loading ? styles.dotsContainerProcessing : '',
                  ]}>
                  <Animated.View
                    style={[styles.loadingDot, { transform: [{ scale: scaleDot1 }] }]}
                  />
                  <Animated.View
                    style={[styles.loadingDot, { transform: [{ scale: scaleDot2 }] }]}
                  />
                  <Animated.View
                    style={[styles.loadingDot, { transform: [{ scale: scaleDot3 }] }]}
                  />
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
