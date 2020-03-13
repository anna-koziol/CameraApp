import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Font, Location, Permissions } from 'expo';
import { AsyncStorage } from "react-native";
import MyButton from "./MyButton";
import { Dimensions } from 'react-native';

Dimensions.get("window").width
Dimensions.get("window").height


class Main extends Component {
    static navigationOptions = {
        header: null,
        title: "SUPER APKA",
        headerStyle: {
            backgroundColor: "#000000",
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            a: 1,
            data: " ",
            number: 0,
            fontloaded: false,
        };

    }

    //CZCIONKI
    componentWillMount = async () => {
        await Font.loadAsync({
            'myfont': require('./Amatic-Bold.ttf'),
        });
        this.setState({ fontloaded: true })
    }

    anyFunction() {
        this.props.navigation.navigate("s2")
    }

    render() {
        return (
            this.state.fontloaded
                ?
                <View style={{ flex: 1 }}>
                    <View style={styles.banner}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>

                            <Text style={{
                                fontSize: 40,
                                color: 'white',
                                textAlign: 'center',
                                flex: 5,
                                marginTop: 40
                            }}>Camera App</Text>

                            <Text style={{ flex: 2 }}></Text>

                            <Text style={styles.text}>show gallery pictures</Text>
                            <Text style={styles.text}>take picture from camera</Text>
                            <Text style={styles.text}>save photo to device</Text>
                            <Text style={styles.text}>delete photo from device</Text>

                            <Text style={{ flex: 2 }}></Text>



                        </View>

                    </View>

                    <MyButton tekst="START" funkcja={() => this.anyFunction()} />

                </View>
                :
                <View>
                    <Text>Nie działa</Text>
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

export default Main;