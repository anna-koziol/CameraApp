import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';


class CircleButton extends Component {
    render() {
        const thumbnails = {
            '1': require('./img/exchange.png'),
            '2': require('./img/photo-camera.png'),
            '3': require('./img/settings.png'),
            '4': require('./img/garbage.png')
        }

        const thumbnail = thumbnails[this.props.tekst]

        return (
            this.props.tekst == '2'
                ?
                <TouchableOpacity style={styles.button} onPress={this.props.funkcja}>
                    <Image
                        source={thumbnail}
                        style={{ height: 30, width: 30, zIndex: 99 }}
                        key={this.props.tekst + "-iconC"}
                    />
                </TouchableOpacity >
                :
                <TouchableOpacity style={styles.button2} onPress={this.props.funkcja}>
                    <Image
                        source={thumbnail}
                        style={{ height: 30, width: 30, zIndex: 99 }}
                        key={this.props.tekst + "-iconC"}
                    />
                </TouchableOpacity >
        );
    }
}

CircleButton.propTypes = {
    tekst: PropTypes.string.isRequired,
    funkcja: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    text: {
        color: "#e4405f",
        textAlign: 'center',
    },
    button: {
        margin: 10,
        backgroundColor: '#ffffff',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#ff0000',
        width: 70,
        height: 70,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 101
    },
    button2: {
        margin: 10,
        backgroundColor: '#ffffff',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#ff0000',
        width: 50,
        height: 50,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default CircleButton;
