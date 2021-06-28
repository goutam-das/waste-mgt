import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import { Text, Button, Overlay } from 'react-native-elements';
import BottomSheet from 'reanimated-bottom-sheet';
import { Entypo } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import PopupImage from '../../svg/Popup';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons, AntDesign, Foundation } from '@expo/vector-icons';
import RequestList from '../components/RequestList';
import NoRequest from '../components/NoRequest';

const Dashboard = ({ navigation }: any) => {
    const sheetRef: any = React.useRef(null);
    const [visible, setVisible] = useState(true);

    const renderHeader = () => (
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
    );
    const renderContent = () => (
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
            >
                <AntDesign
                    name="edit"
                    size={24}
                    color="#DD4335"
                    style={styles.icon}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text>Email Address</Text>
                </View>
                <Entypo name="chevron-small-right" size={20} color="black" />
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
                <Entypo name="chevron-small-right" size={20} color="black" />
            </TouchableOpacity>
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
            >
                <Ionicons
                    name="location"
                    size={24}
                    color="#DD4335"
                    style={styles.icon}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ color: '#ccc' }}>Current Location</Text>
                    <Text>3, Gaysi Street, Accra, West Accra, Ghana...</Text>
                </View>
                <MaterialIcons name="check" size={20} color="green" />
            </TouchableOpacity>
        </View>
    );

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
        <SafeAreaView style={styles.container}>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[320, 300, 0]}
                borderRadius={25}
                renderContent={renderContent}
                renderHeader={renderHeader}
                enabledBottomClamp={true}
                enabledBottomInitialAnimation={true}
                initialSnap={1}
                enabledInnerScrolling={false}
            />
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
                                onPress={() => sheetRef.current.snapTo(0)}
                            >
                                <Ionicons
                                    name="location"
                                    size={20}
                                    color="#DD4335"
                                    style={styles.icon}
                                />
                                <Text style={{ paddingLeft: 8 }}>
                                    Pickup at
                                </Text>
                            </TouchableOpacity>

                            <Text style={styles.subTitle}>Recent Requests</Text>
                        </View>
                        <View style={styles.requestList}>
                            <NoRequest />

                            <RequestList />
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
