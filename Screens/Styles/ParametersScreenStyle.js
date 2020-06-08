import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#090B0C',
		width: '100%',
	},
	params_container: {
		flex: 1,
		width:'90%',
		marginLeft: '5%',
		backgroundColor: '#0F1416',
		alignItems: 'center',
		minHeight:200,
		borderRadius: 10,
		marginTop: 20,
		marginBottom: 40,
	},
	params_header: {
		backgroundColor: '#192327',
		width: '100%',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		fontSize: 19,
		color: 'rgba(255, 255, 255, 0.8)',
		padding: 20,
		height:63,
	},
	param_container: {
		width: '100%',
		paddingLeft: 5,
		paddingRight: 20,
		paddingBottom: 12,
		paddingTop: 12,
	},
	param_name: {
		fontSize: 19,
		lineHeight: 24,
		color: '#FFFFFF',
		marginLeft: 15,
	},
	slider_container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	param_slider: {
		flex: 3,
		marginLeft: 0,
		paddingLeft: 0,
	},
	param_input: {
		flex: 1,
		backgroundColor: '#090B0C',
		borderColor: '#192327',
		borderWidth: 1,
		borderRadius: 6,
		marginLeft: 20,
		color: '#FFFFFF',
		fontSize: 22,
		textAlign: "center",
		height: 46,
		lineHeight: 42,
	},
	param_input_focused: {
		borderColor: '#28CAAD',
		color: '#16AB1F',
	},
	buttons_container: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		paddingTop: 20,
		width: '100%',
	},
	button: {
		height:48,
		borderRadius: 10,
		padding: 10,
		paddingRight: 20,
		paddingLeft: 20,
	},
	button_text: {
		fontSize:19,
		color: '#FFFFFF',
	},
	cancel_button: {
		backgroundColor: '#545454',
	},
	save_button: {
		backgroundColor: '#16AB1F',
	},
});
