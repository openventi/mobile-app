import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import PairScreen from './Screens/PairScreen';

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return <PairScreen ventilator="N99" />;
  }
}
