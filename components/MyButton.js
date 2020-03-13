import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class MyButton extends Component {
    render() {

        return (
            <TouchableOpacity style={styles.button} onPress={this.props.funkcja}>
                <Text style={styles.text}>{this.props.tekst}</Text>
            </TouchableOpacity >
        );
    }
}

MyButton.propTypes = {
    tekst: PropTypes.string.isRequired,
    funkcja: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: 'center',
        color: "black",
        textAlign: 'center'
    },
    button: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center',
        alignSelf: 'center',
    }
});

export default MyButton;








