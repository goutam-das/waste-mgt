import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TextInput
} from 'react-native';
import { Text, Button, Overlay } from 'react-native-elements';
import PopupImage from '../../svg/Popup';
import { Ionicons } from '@expo/vector-icons';
import RequestList from '../components/RequestList';
import NoRequest from '../components/NoRequest';

const Dashboard = ({navigation}:any) => {
    const [visible, setVisible] = useState(true);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ width: '100%', padding: 25 }}>
                <View>
                    <View style={styles.dashboard}>
                        <View style={styles.topBar}>
                            <Ionicons name="grid" size={24} color="#DB4C4C" />
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

                        <View style={styles.field}>
                            <Ionicons
                                name="location"
                                size={20}
                                color="#DD4335"
                                style={styles.icon}
                            />
                            <TextInput
                                style={{ paddingLeft: 8 }}
                                placeholder="Pickup at"
                            />
                        </View>

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
                                reliable waste collection service and we hope
                                you enjoy our service
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
                    onPress={() => navigation.navigate("Pickup")}
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
