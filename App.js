import React, { Component } from 'react';
import { View } from 'react-native';
import PairScreen  from './Screens/PairScreen';

export default class App extends Component {
  render() {
  return (
        <PairScreen ventilator="N99" />
  );
  }
}
