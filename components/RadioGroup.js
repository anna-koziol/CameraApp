import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Font, Location, Permissions, Camera, MediaLibrary } from 'expo';
import RadioButton from "./RadioButton";



class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: false,
        };
        this.clickF = this.clickF.bind(this);
    }

    clickF() {
        var c = this.state.click;
        c = !c;
        this.setState({ click: c })
    }


    render() {
        var tab = [];

        tab.push(<Text style={{
            fontSize: 10,
            alignItems: 'flex-end',
            color: "white",
            borderColor: "white",
            borderBottomWidth: 1,
            margin: 5
        }}>{this.props.groupName}</Text>);

        var checkedVal = null;

        switch (this.props.groupName) {
            case "WHITE BALANCE":
                checkedVal = this.props.checked[0];
                break;
            case "FLASH MODE":
                checkedVal = this.props.checked[1];
                break;
            case "CAMERA RATION":
                checkedVal = this.props.checked[2];
                break;
            case "PICTURE SIZE":
                checkedVal = this.props.checked[3];
                break;
        }

        if (this.props.type == "array") {
            for (var i = 0; i < this.props.data.length; i++) {
                tab.push(<RadioButton tekst={this.props.data[i]} funkcja={this.props.funkcja} type={this.props.groupName} checked={checkedVal} />);
            }
        }
        if (this.props.type == "object") {
            var keys = Object.keys(this.props.data);
            for (var i = 0; i < keys.length; i++) {
                tab.push(<RadioButton tekst={keys[i]} funkcja={this.props.funkcja} type={this.props.groupName} checked={checkedVal} />);
            }
        }


        return (

            <View>
                {tab}
            </View>
        );
    }
}

RadioGroup.propTypes = {
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
    radio: {
        margin: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#00ff00',
        borderWidth: 2,
        width: 20,
        height: 20,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center',
    },
    radio2: {
        margin: 5,
        borderRadius: 100,
        borderWidth: 1,
        backgroundColor: '#00ff00',
        borderColor: '#00ff00',
        borderWidth: 2,
        width: 8,
        height: 8
    }
});

export default RadioGroup;








