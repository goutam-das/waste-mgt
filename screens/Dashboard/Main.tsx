import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import * as Location from 'expo-location';
import { Text, Button, Overlay } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import PopupImage from '../../svg/Popup';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons, AntDesign, Foundation } from '@expo/vector-icons';
import RequestList from '../components/RequestList';
import NoRequest from '../components/NoRequest';
import axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';
import firebase from 'firebase';
import { Firestore } from '../../services/firebase';

const Key = '06c73d61b2e80bf877f4d9e4c88cca40';  //key

const Dashboard = ({ navigation, route }: any) => {
    const sheetRef: any = React.useRef(null);
    const refRBSheet: any = useRef(null);
    const [{ location, type }, setState] = useState<{
        location: string;
        type: 'Edit Address' | 'Address Book' | 'Current Location' | undefined;
    }>({
        location: '',
        type: undefined
    });
    const [currentLocation, setCurrentLocation] = useState<string>('');
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (route.params?.type === 'Edit Address') {
            setState({ location: route.params.location, type: 'Edit Address' });
        }
        if (route.params?.type === 'Address Book') {
            setState({ location: route.params.location, type: 'Address Book' });
        }
    }, [route.params]);

    useEffect(() => {
        (async () => {
            try {
                let { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') return;
                const location = await Location.getCurrentPositionAsync({});
                if (!Boolean(location.coords)) return;
                const { data } = await axios.get(
                    `http://api.positionstack.com/v1/reverse?access_key=${Key}&query=${location.coords.latitude},${location.coords.longitude}`
                );
                if (data) {
                    const clocation = data?.data[0];
                    const location = clocation.label
                    const currentUser = firebase.auth().currentUser;
                    const userId = currentUser?.uid;
                    const geolocation = {
                        latitude: clocation.latitude,
                        longitude: clocation.longitude
                    };
                    Firestore.collection('address_book')
                        .add({ location, userId, geolocation })
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((error) => console.error(error));

                    setCurrentLocation(location);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => {
                    console.log('pressed');
                    sheetRef.current.snapTo(1);
                }}
            >
                <ScrollView style={{ width: '100%', padding: 25 }}>
                    <View>
                        <View style={styles.dashboard}>
                            <View style={styles.topBar}>
                                <Ionicons
                                    name="grid"
                                    size={24}
                                    color="#DB4C4C"
                                />
                                <Ionicons
                                    name="md-notifications"
                                    size={24}
                                    color="#4F4F4F"
                                />
                            </View>

                            <Text h4>Good morning [[user]]</Text>
                            <Text style={styles.subText}>
                                Where would you like us to pick your waste from
                            </Text>

                            <TouchableOpacity
                                style={styles.field}
                                onPress={() => refRBSheet.current.open()}
                            >
                                <Ionicons
                                    name="location"
                                    size={20}
                                    color="#DD4335"
                                    style={styles.icon}
                                />
                                <Text style={{ paddingLeft: 8 }}>
                                    {location || 'Pickup at'}
                                </Text>
                            </TouchableOpacity>

                            <Text style={styles.subTitle}>Recent Requests</Text>
                        </View>
                        <View style={styles.requestList}>
                            <NoRequest />

                            {/* <RequestList /> */}
                        </View>

                        <Overlay
                            isVisible={visible}
                            onBackdropPress={toggleOverlay}
                            style={styles.overlay}
                        >
                            <View style={styles.welcome}>
                                <View style={styles.imageBg}>
                                    <PopupImage />
                                </View>

                                <Text style={styles.welcomeTitle}>
                                    Welcome to Waste Collection
                                </Text>
                                <Text style={styles.welcomeText}>
                                    What we do here is we help to organize a
                                    reliable waste collection service and we
                                    hope you enjoy our service
                                </Text>
                                <Button
                                    title="Got it"
                                    buttonStyle={{
                                        backgroundColor: '#9A0707'
                                    }}
                                    onPress={toggleOverlay}
                                />
                            </View>
                        </Overlay>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            <View>
                <Button
                    title="Request a Pickup"
                    buttonStyle={{
                        backgroundColor: '#9A0707',
                        padding: 12
                    }}
                    containerStyle={{
                        width: '100%',
                        position: 'absolute',
                        bottom: 0
                    }}
                    titleStyle={{
                        fontSize: 14
                    }}
                    onPress={() => navigation.navigate('Pickup')}
                />
            </View>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                dragFromTopOnly={true}
                height={350}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,0.25)'
                    },
                    draggableIcon: {
                        backgroundColor: 'rgba(0,0,0,0.45)'
                    },
                    container: {
                        elevation: 100,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20
                    }
                }}
            >
                <View
                    style={[
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 50,
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            paddingVertical: 10,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.5,
                            shadowRadius: 5,
                            elevation: 1,
                            borderTopLeftRadius: 25,
                            borderTopRightRadius: 25
                        }
                    ]}
                >
                    <Text style={{ fontSize: 16 }}>Delivery Address</Text>
                </View>
                <View
                    style={{
                        backgroundColor: '#fff',
                        padding: 16,
                        // height: 450,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.9,
                        shadowRadius: 3,
                        elevation: 3
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={[
                            {
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderRadius: 6,
                                height: 72,
                                paddingHorizontal: 10,
                                marginBottom: 10,
                                backgroundColor: '#fff',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.5,
                                shadowRadius: 6,
                                elevation: 1
                            }
                        ]}
                        onPress={() => navigation.navigate('EditAddress')}
                    >
                        <AntDesign
                            name="edit"
                            size={24}
                            color="#DD4335"
                            style={styles.icon}
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text>Edit Address</Text>
                        </View>
                        {type === 'Edit Address' ? (
                            <MaterialIcons
                                name="check"
                                size={20}
                                color="green"
                            />
                        ) : (
                            <Entypo
                                name="chevron-small-right"
                                size={20}
                                color="black"
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            {
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderRadius: 6,
                                height: 72,
                                paddingHorizontal: 10,
                                marginBottom: 10,
                                backgroundColor: '#fff',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.5,
                                shadowRadius: 6,
                                elevation: 1
                            }
                        ]}
                        onPress={() => navigation.navigate('AddressBook')}
                    >
                        <Foundation
                            name="address-book"
                            size={24}
                            color="#DD4335"
                            style={styles.icon}
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text>Choose from address book</Text>
                        </View>
                        {type === 'Address Book' ? (
                            <MaterialIcons
                                name="check"
                                size={20}
                                color="green"
                            />
                        ) : (
                            <Entypo
                                name="chevron-small-right"
                                size={20}
                                color="black"
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            setState({
                                location: currentLocation,
                                type: 'Current Location'
                            })
                        }
                        activeOpacity={0.5}
                        style={[
                            {
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderRadius: 6,
                                height: 72,
                                paddingHorizontal: 10,
                                marginBottom: 10,
                                backgroundColor: '#fff',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.5,
                                shadowRadius: 6,
                                elevation: 1
                            }
                        ]}
                    >
                        <Ionicons
                            name="location"
                            size={24}
                            color="#DD4335"
                            style={styles.icon}
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={{ color: '#ccc' }}>
                                Current Location
                            </Text>
                            <Text>{currentLocation}</Text>
                        </View>
                        {type === 'Current Location' ? (
                            <MaterialIcons
                                name="check"
                                size={20}
                                color="green"
                            />
                        ) : (
                            <Entypo
                                name="chevron-small-right"
                                size={20}
                                color="black"
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </RBSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: '#FDF8F5'
    },
    overlay: {
        padding: 0,
        margin: 0
    },
    welcome: {
        width: '80%'
    },
    imageBg: {
        backgroundColor: '#F6EBE4',
        paddingTop: '10%',
        marginBottom: '10%'
    },
    welcomeTitle: {
        textAlign: 'center',
        color: '#333',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: '5%'
    },
    welcomeText: {
        textAlign: 'center',
        marginBottom: '5%'
    },
    dashboard: {
        marginTop: '7%'
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '5%'
    },
    userTitle: {
        color: '#4F4F4F',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 5
    },
    subText: {
        color: '#888',
        marginBottom: 5,
        marginTop: 5
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        height: 50,
        paddingLeft: 10,
        marginBottom: '8%',
        backgroundColor: '#fff',
        marginTop: '5%'
    },
    icon: {
        backgroundColor: '#F6EBE4',
        padding: 4,
        borderRadius: 4
        // width: 32,
        // height: 32,
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333'
    },
    requestList: {
        marginTop: '10%',
        marginBottom: '25%'
    }
});
export default Dashboard;
