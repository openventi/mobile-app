import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, StyleSheet, Animated } from 'react-native';
import LogoSVG from '../components/LogoSVG';
import { SCREENS } from '../constants';

const BottomNav = ({ toggleDrawer, goToScreen, selectedItem }) => {
    return (
        <View>
            <View style={styles.buttonBar}>

                <TouchableOpacity style={[
                      styles.divSetting,
                      selectedItem == "Parameters"? styles.greenButton : styles.grayButton
		  ]} underlayColor="white"
                    onPress={() => {
                        goToScreen(SCREENS.parameters);
                    }}
                >
                    <LogoSVG name='settings' width="24" height="18.3" />
                    <Animated.View style={styles.bgFill} />
                </TouchableOpacity>

                <TouchableOpacity style={[
                      styles.divAlarm,
                      selectedItem == "Alarms"? styles.greenButton : styles.grayButton
                    ]} underlayColor="#16AB1F">
                    <LogoSVG name='alarm' width="24" height="18.3" />
                </TouchableOpacity>

            </View>
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => {
                        toggleDrawer();
                    }}>
                    <FontAwesomeIcon icon={faBars} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <FontAwesomeIcon icon={faEllipsisV} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BottomNav;

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 15,
        paddingHorizontal: 10,
        paddingBottom: 15,
        backgroundColor: '#0F1416',
    },
    iconButton: {
        padding: 5,
        alignItems: 'center',
    },
    buttonBar: {
        zIndex: 1,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        top: '-50%'
    },
    button: {
        textAlign: 'center'
    },
    divSetting: {
        borderTopLeftRadius: 28,
        borderBottomLeftRadius: 28,
        marginRight: .5,
        width: 64,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },

    divAlarm: {
        borderTopRightRadius: 28,
        borderBottomRightRadius: 28,
        marginLeft: .5,
        width: 64,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    grayButton : {
        backgroundColor: '#192327',
    },
    greenButton : {
        backgroundColor: '#16AB1F',
    },
    bgFill: {
        backgroundColor: '#16AB1F'
    }


});
