import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import CircleButton from "./CircleButton";

class BigPhoto extends Component {
    static navigationOptions = {
        title: "Przybliżenie zdjęcia",
        headerTintColor: '#ffffff',
        headerStyle: {
            backgroundColor: '#e4405f'
        },
        headerTitleStyle: {
            fontSize: 18,
        },
    }

    constructor(props) {
        super(props);
        this.state = {
            a: 1,
            data: " ",
            number: 0,
            fontloaded: false,
        };
        this.removeBig = this.removeBig.bind(this);
    }

    removeBig = async () => {
        var helper = [];
        helper.push(this.props.navigation.state.params.id)

        if (helper.length > 0) {
            await MediaLibrary.deleteAssetsAsync(helper.toString());
        }

        //COFNIĘCIE
        this.props.navigation.state.params.nav()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 4 }}>
                    <Text style={{ color: "white", fontWeight: 'bold', position: "absolute", bottom: 5, right: 5, zIndex: 99, fontSize: 25 }}>{this.props.navigation.state.params.id}</Text>
                    <Text style={{ color: "white", fontWeight: 'bold', position: "absolute", bottom: 5, left: 5, zIndex: 99, fontSize: 25 }}>{this.props.navigation.state.params.widthOrg} x {this.props.navigation.state.params.heightOrg} </Text>
                    <Image key={this.props.navigation.state.params.key + '-bigPhoto'}
                        source={{ uri: this.props.navigation.state.params.source }}
                        style={{ width: Dimensions.get("window").width - 5, height: Dimensions.get("window").height - 180, borderWidth: 0.5, borderColor: 'black', margin: 2, marginTop: 5, borderRadius: 1 }}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <CircleButton tekst='4' funkcja={() => this.removeBig()} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        color: 'white',
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    banner: {
        flex: 1,
        backgroundColor: '#e4405f',
        flexDirection: 'row',

    },
});

export default BigPhoto;