import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';


class FotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get("window").width / 4,
            height: Dimensions.get("window").height / 4,
            clicked: false
        };
        // console.log(this.props);
        this.selectImg = this.selectImg.bind(this);
        this.Long = this.Long.bind(this);
    }

    selectImg() {
        var c = this.state.clicked;
        c = !c;
        this.setState({ clicked: c })
        this.props.select(this.props.id)
    }

    Long() {
        this.props.longPress(this.props.key2, this.props.uri, this.props.id, this.props.widthOrg, this.props.heightOrg)
    }


    render() {
        console.log(this.props.data)
        return (
            <TouchableOpacity onPress={this.selectImg} onLongPress={this.Long}>
                {
                    this.state.clicked == true
                        ?
                        <View>
                            <Image key={this.props.key2 + '-keyImg'}
                                source={{ uri: this.props.uri }}
                                style={{ minWidth: this.state.width - 5, height: this.state.width - 5, borderWidth: 0.5, borderColor: 'black', margin: 2, marginTop: 5, borderRadius: 3 }}
                            />
                            <Text style={{ color: "white", fontWeight: 'bold', position: "absolute", bottom: 0, right: 5 }}>{this.props.id}</Text>
                            <View style={{
                                minWidth: "100%", height: this.state.width - 5, borderWidth: 0.5, margin: 2, marginTop: 5, backgroundColor: "rgba(0, 0, 0, 0.5)", alignSelf: "center",
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignContent: "center",
                                position: 'absolute',
                                borderRadius: 3
                            }}>
                                <Image
                                    source={require('./img/plus-symbol.png')}
                                    style={{
                                        height: this.state.width / 3, width: this.state.width / 3, borderRadius: 3
                                    }}
                                    key={this.props.key2 + "-iconC"}
                                />
                            </View>
                        </View>
                        :
                        <View>
                            <Image key={this.props.key2 + '-keyImg'}
                                source={{ uri: this.props.uri }}
                                style={{ minWidth: this.state.width - 5, height: this.state.width - 5, borderWidth: 0.5, borderColor: 'black', margin: 2, marginTop: 5, borderRadius: 3 }}
                            />
                            <Text style={{ color: "white", fontWeight: 'bold', position: "absolute", bottom: 0, right: 5 }}>{this.props.id}</Text>
                        </View>
                }


            </TouchableOpacity >
        );
    }
}



export default FotoItem;