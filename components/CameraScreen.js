import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator, AsyncStorage, Dimensions, Animated, Button } from 'react-native';
import { Font, Location, Permissions, Camera, MediaLibrary } from 'expo';
import CircleButton from "./CircleButton";
import RadioButton from "./RadioButton";
import RadioGroup from "./RadioGroup";
import { ToastAndroid } from 'react-native';

Dimensions.get("window").width
Dimensions.get("window").height


class CameraScreen extends Component {
    static navigationOptions = {
        title: "Kamera",
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
            hasCameraPermission: null,         // przydzielone uprawnienia do kamery
            type: Camera.Constants.Type.back,  // typ kamery
            pos: new Animated.Value(600),  //startowa pozycja y wysuwanego View
            ratio: "4:3",
            wb: "auto",
            ps: "1280x720",
            fm: "auto",
            ratios: ["4:3", "16:9"],
            sizes: []
        };
        this.isHidden = true
        this.setPermissions = this.setPermissions.bind(this);
        this.doPhoto = this.doPhoto.bind(this);
        this.getSizes = this.getSizes.bind(this)
        this.change = this.change.bind(this)
    }

    toggle() {

        if (this.isHidden) toPos = 0; else toPos = 600

        //animacja

        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
            }
        ).start();

        this.isHidden = !this.isHidden;
    }

    componentWillMount() {
        this.setPermissions()
    }

    setPermissions = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status == 'granted' });
    }


    anyFunction() {
        alert("klik")
    }

    switch() {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }

    doPhoto = async () => {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyslnie zapisuje w DCIM
            ToastAndroid.showWithGravity(
                'Wykonano zdjęcie',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            this.props.navigation.state.params.refresh();
        }
        else {
            alert('err')
        }
    }

    change(a, b) {
        switch (a) {
            case "WHITE BALANCE":
                this.setState({ wb: b });
                break;
            case "FLASH MODE":
                this.setState({ fm: b });
                break;
            case "CAMERA RATION":
                this.setState({ ratio: b });
                break;
            case "PICTURE SIZE":
                this.setState({ ps: b });
                break;
        }
    }

    getSizes = async () => {
        if (this.camera) {
            const sizes = await this.camera.getAvailablePictureSizesAsync("16:9")

            this.setState({ sizes: sizes });
        }
    };

    render() {
        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        var whiteBalance = Camera.Constants.WhiteBalance;
        var flashMode = Camera.Constants.FlashMode;
        var ratios = this.state.ratios;
        var sizes = this.state.sizes;

        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}
                        onCameraReady={() => this.getSizes()}
                        ratio={this.state.ratio}
                        whiteBalance={this.state.wb}
                        pictureSize={this.state.ps}
                        flashMode={this.state.fm}
                    ></Camera>
                    <View style={{ position: "absolute", bottom: 0, right: 0, left: 0, display: "flex", flexDirection: 'row', alignContent: "center", justifyContent: "center", alignItems: "center", zIndex: 100 }}>
                        <CircleButton tekst='1' funkcja={() => this.switch()} />
                        <CircleButton tekst='2' funkcja={() => this.doPhoto()} />
                        <CircleButton tekst='3' funkcja={() => this.toggle()} />
                    </View>

                    <View style={{}}>

                        <Animated.View
                            style={[
                                styles.animatedView,
                                {
                                    transform: [
                                        { translateY: this.state.pos }
                                    ]
                                }]} >

                            <RadioGroup
                                checked={[this.state.wb, this.state.fm, this.state.ratio, this.state.ps]}
                                tekst='3'
                                funkcja={this.change}
                                data={whiteBalance}
                                groupName="WHITE BALANCE"
                                type="object"
                            />

                            <RadioGroup
                                checked={[this.state.wb, this.state.fm, this.state.ratio, this.state.ps]}
                                tekst='3'
                                funkcja={this.change}
                                data={flashMode}
                                groupName="FLASH MODE"
                                type="object"
                            />

                            <RadioGroup
                                checked={[this.state.wb, this.state.fm, this.state.ratio, this.state.ps]}
                                change={this.change}
                                tekst='3'
                                funkcja={this.change}
                                data={ratios}
                                groupName="CAMERA RATION"
                                type="array"
                            />

                            <RadioGroup
                                checked={[this.state.wb, this.state.fm, this.state.ratio, this.state.ps]}
                                change={this.change}
                                tekst='3'
                                funkcja={this.change}
                                data={sizes}
                                groupName="PICTURE SIZE"
                                type="array"
                            />

                        </Animated.View>
                    </View>




                </View>
            );
        }
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
    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        height: 510,
        width: Dimensions.get("window").width / 2.5,
        zIndex: 100
    }
});


export default CameraScreen;