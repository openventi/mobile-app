import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from '../Screens/Styles/ParametersScreenStyle';
import BottomNav from '../components/BottomNav';
import TopNav from '../components/TopNav';
import { SCREENS } from '../constants';

export default class PairScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
	volume: this.props.volume,
	peep: this.props.peep,
	o2: this.props.o2,
	rr: this.props.rr,
	focused_parameter: "",
    };

    this.HandleCancelClick = this.HandleCancelClick.bind(this);
    this.SaveParameters = this.SaveParameters.bind(this);
  }
  HandleSlideValueChange(slider, value) {
	var state = {};

	state[slider] = value;
	
	this.setState(state);
  }

  HandleSlideFocusStart(slider) {
	this.setState({"focused_parameter": slider});
  }

  HandleSlideFocusEnd() {
	this.setState({"focused_parameter": ""});
  }

  HandleCancelClick() {
	this.props.navigation.navigate(SCREENS.monitor)
  }

  SaveParameters() {
	console.log("save parameters");
	this.props.navigation.navigate(SCREENS.monitor)
  }

  render() {
    return (
        <View style={styles.container}>
		<View style={styles.params_container}>
			<Text style={styles.params_header}>Ajustar Parámetros</Text>
			<View style={styles.param_container}>
				<Text style={styles.param_name}>Tidal Volume</Text>
				<View style={styles.slider_container}>
					<Slider
						style={styles.param_slider}
						minimumValue={0}
						maximumValue={512}
						value={this.state.volume}
						minimumTrackTintColor="#16ab1f"
						maximumTrackTintColor="#090B0C"
						thumbTintColor="#16AB1F"
						onValueChange={(value) =>
						  this.HandleSlideValueChange('volume', value)
						}
						onSlidingStart={(value) =>
						  this.HandleSlideFocusStart('volume')
						}
						onSlidingComplete={() =>
						  this.HandleSlideFocusEnd()
						}
					/>
					<Text style={[ styles.param_input, 
						this.state.focused_parameter == "volume" ? styles.param_input_focused : null
					]}>{this.state.volume + ""}</Text>
				</View>
			</View>
			<View style={styles.param_container}>
				<Text style={styles.param_name}>PEEP</Text>
				<View style={styles.slider_container}>
					<Slider
						style={styles.param_slider}
						minimumValue={0}
						maximumValue={512}
						value={this.state.peep}
						minimumTrackTintColor="#16ab1f"
						maximumTrackTintColor="#090B0C"
						thumbTintColor="#16AB1F"
						onValueChange={(value) =>
						  this.HandleSlideValueChange('peep', value)
						}
						onSlidingStart={(value) =>
						  this.HandleSlideFocusStart('peep')
						}
						onSlidingComplete={() =>
						  this.HandleSlideFocusEnd()
						}
					/>
					<Text style={[ styles.param_input, 
						this.state.focused_parameter == "peep" ? styles.param_input_focused : null
					]}>{this.state.peep + ""}</Text>
				</View>
			</View>
			<View style={styles.param_container}>
				<Text style={styles.param_name}>O2</Text>
				<View style={styles.slider_container}>
					<Slider
						style={styles.param_slider}
						minimumValue={0}
						maximumValue={512}
						value={this.state.o2}
						minimumTrackTintColor="#16ab1f"
						maximumTrackTintColor="#090B0C"
						thumbTintColor="#16AB1F"
						onValueChange={(value) =>
						  this.HandleSlideValueChange('o2', value)
						}
						onSlidingStart={(value) =>
						  this.HandleSlideFocusStart('o2')
						}
						onSlidingComplete={() =>
						  this.HandleSlideFocusEnd()
						}
					/>
					<Text style={[ styles.param_input, 
						this.state.focused_parameter == "o2" ? styles.param_input_focused : null
					]}>{this.state.o2 + ""}</Text>
				</View>
			</View>
			<View style={styles.param_container}>
				<Text style={styles.param_name}>RR</Text>
				<View style={styles.slider_container}>
					<Slider
						style={styles.param_slider}
						minimumValue={0}
						maximumValue={512}
						value={this.state.rr}
						minimumTrackTintColor="#16ab1f"
						maximumTrackTintColor="#090B0C"
						thumbTintColor="#16AB1F"
						onValueChange={(value) =>
						  this.HandleSlideValueChange('rr', value)
						}
						onSlidingStart={(value) =>
						  this.HandleSlideFocusStart('rr')
						}
						onSlidingComplete={() =>
						  this.HandleSlideFocusEnd()
						}
					/>
					<Text style={[ styles.param_input, 
						this.state.focused_parameter == "rr" ? styles.param_input_focused : null
					]}>{this.state.rr + ""}</Text>
				</View>
			</View>
			<View style={styles.buttons_container}>
				<TouchableOpacity style={[styles.button, styles.cancel_button]} onPress={this.HandleCancelClick}>
					<Text style={styles.button_text}>CANCELAR</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.button, styles.save_button]} onPress={this.SaveParameters}>
					<Text style={styles.button_text}>GUARDAR</Text>
				</TouchableOpacity>
			</View>
		</View>
      		<BottomNav toggleDrawer={() => this.props.navigation.toggleDrawer()} goToScreen={this.props.navigation.navigate} selectedItem="Parameters" />
	</View>
    );
  }
}
