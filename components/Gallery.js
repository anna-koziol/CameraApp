import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList, Dimensions, Image, ToastAndroid  } from 'react-native';
import MyButton from "./MyButton";
import FotoItem from "./FotoItem";
import { Permissions, MediaLibrary } from 'expo';
import { ToolbarAndroid } from 'react-native';

class Gallery extends Component {
    static navigationOptions = {
        header: null,
        title: 'Zdjęcia zapisane w telefonie',
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
            images: [],
            numColumns: 4,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            clickedPhotos: []
        };
        this.onActionSelected = this.onActionSelected.bind(this);
        this.getPhotos = this.getPhotos.bind(this);
        this.selectItemClick = this.selectItemClick.bind(this);
        this.longPressFun = this.longPressFun.bind(this);
        this.refreshPhotosInGallery = this.refreshPhotosInGallery.bind(this);
        this.removeSelected = this.removeSelected.bind(this);
        this.navigate2 = this.navigate2.bind(this);
    }

    componentDidMount() {
        this.getPhotos()
    }

    setPermissions = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }
    }

    componentWillMount() {
        this.setPermissions()
    }

    getPhotos = async () => {
        let assets = await MediaLibrary.getAssetsAsync({
            first: 30,           // ilość pobranych assetów
            mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
        })

        var data = JSON.stringify(assets, null, 4);
        var images = JSON.parse(data)
        var images2 = images.assets;
        this.setState({ images: images2 })

        //console.log('KLIK - ', this.state.images)
    }

    onActionSelected(position) {
        //alert(position)
        switch (position) {
            case 0:
                //GRID LIST
                if (this.state.numColumns == 1) {
                    this.setState({ numColumns: 4, clickedPhotos: [] })
                } else {
                    this.setState({ numColumns: 1, clickedPhotos: [] })
                }
                break;
            case 1:
                this.props.navigation.navigate("s3", { refresh: this.refreshPhotosInGallery })
                //CAMERA
                break;
            case 2:
                //REMOVE SELECTED
                this.removeSelected()
                break;
        }
    }

    selectItemClick(id) {
        var tab = this.state.clickedPhotos;

        if (tab.indexOf(id) == -1) {
            tab.push(id)
        } else {
            var place = tab.indexOf(id);
            tab.splice(place, 1)
        }

        this.setState({ clickedPhotos: tab })
        //alert(JSON.stringify(this.state.clickedPhotos, null, 4))

    }

    navigate2() {
        this.props.navigation.navigate("s2")
    }

    longPressFun(key, url, id, width, height) {
        this.props.navigation.navigate("s4", {
            key: key,
            source: url,
            id: id,
            heightOrg: width,
            widthOrg: height,
            nav: this.navigate2
        })
    }

    _keyExtractor = (item, index) => item.id;

    itemsCreate = ({ item }) => (
        <FotoItem key={item.uri} key2={item.id} uri={item.uri} id={item.id} style={{ backgroundColor: 'black' }} select={this.selectItemClick} longPress={this.longPressFun} heightOrg={item.height} widthOrg={item.width}> </FotoItem>
    );

    refreshPhotosInGallery = async () => {
        let assets = await MediaLibrary.getAssetsAsync({
            first: 30,           // ilość pobranych assetów
            mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
        })

        var data = JSON.stringify(assets, null, 4);
        var images = JSON.parse(data)
        var images2 = images.assets;
        this.setState({ images: images2 })
    }

    removeSelected = async () => {
        if (this.state.clickedPhotos.length > 0) {
            await MediaLibrary.deleteAssetsAsync(this.state.clickedPhotos.toString());
            this.refreshPhotosInGallery();
        }
        else {
            ToastAndroid.showWithGravity(
                'Nie wybrano zdjęć do usunięcia!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ToolbarAndroid
                    style={{
                        backgroundColor: '#e4405f',
                        height: 60, width: "100%",
                        paddingTop: 50,
                        marginTop: 24,
                        elevation: 5 // cień poniżej
                    }}

                    titleColor="#ffffff"
                    title="Zdjęcia zapisane w telefonie"

                    actions={[
                        { title: 'GRID / LIST', icon: require('./img/back.png'), show: 'never' },
                        { title: 'OPEN CAMERA', icon: require('./img/back.png'), show: 'never' },
                        { title: 'REMOVE SELECTED', icon: require('./img/back.png'), show: 'never' },
                    ]}
                    onActionSelected={this.onActionSelected}
                />

                <View style={{ flex: 10 }}>
                    <FlatList
                        data={
                            this.state.images
                        }
                        renderItem={this.itemsCreate}
                        keyExtractor={(item, index) => item.key}
                        numColumns={this.state.numColumns}
                        key={this.state.numColumns}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: { fontSize: 48, }
});

export default Gallery;