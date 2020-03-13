import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class RadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: false,

        };
        this.clickF = this.clickF.bind(this);

    }

    componentDidMount() {
        if (this.props.checked == this.props.tekst) {            
            this.setState({ click: true })
        }
    }

    clickF() {
        var c = this.state.click;
        c = !c;
        //MOGĘ KLIKĄC GDY JEST PUSTY
        if (c) {
            this.props.funkcja(this.props.type, this.props.tekst)
        }
        this.setState({ click: c })
    }

    render() {

        return (
            this.props.checked == this.props.tekst
                ?
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={styles.radio} onPress={this.clickF}>
                        <View style={styles.radio2}></View>
                    </TouchableOpacity >
                    <Text style={styles.text}>{this.props.tekst}</Text>
                </View>
                :
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={styles.radio} onPress={this.clickF}>
                    </TouchableOpacity >
                    <Text style={styles.text}>{this.props.tekst}</Text>
                </View>
        );
    }
}

RadioButton.propTypes = {
    tekst: PropTypes.string.isRequired,
    funkcja: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    text: {
        fontSize: 10,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: 'center',
        color: "white",
        textAlign: 'center'
    },
    radio: {
        margin: 5,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#e4405f',
        borderWidth: 2,
        width: 15,
        height: 15,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center',
    },
    radio2: {
        margin: 3,
        borderRadius: 100,
        borderWidth: 1,
        backgroundColor: '#e4405f',
        borderColor: '#e4405f',
        borderWidth: 2,
        width: 6,
        height: 6
    }
});

export default RadioButton;








