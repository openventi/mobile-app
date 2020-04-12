import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faEllipsisV, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';

const TopNav = ({ connected, toggleDrawer, title }) => {
	return (
		<LinearGradient colors={['#40918B', '#53AC4C']}>
			<View style={styles.topNav}>				
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingHorizontal: 5,
						marginTop: 30,						
					}}>
					<Text
						style={{
							fontWeight: 'bold',
							color: 'white',
							fontSize: 18,
						}}>
						{title}
					</Text>
					<FontAwesomeIcon icon={connected ? faCheck : faTimes} color="white" />
				</View>
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	topNav: {		
		marginTop: 5,
		paddingHorizontal: 10,
		marginBottom: 47,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	iconButton: {
		padding: 5,
		alignItems: 'center',
	},
});

export default TopNav;
