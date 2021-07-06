import React, { FC, useState } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TextInput,
    Platform,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useCallback } from 'react';
import firebase from 'firebase';
import { Firestore } from '../../../services/firebase';
import { useEffect } from 'react';

const Key = '06c73d61b2e80bf877f4d9e4c88cca40'; //api key

const EditAddress: FC = ({ navigation }: any) => {
    const [data, setData] = useState<any>([]);

    const onSearch = useCallback((search) => {
        axios
            .get(
                `http://api.positionstack.com/v1/forward?access_key=${Key}&query=${search}`
            )
            .then(({ data }) => {
                setData(data.data);
            });
    }, []);

    const renderAddress = ({ item }: any) => {
        console.log({ item });

        const location = `${item.label}`;
        return (
            <TouchableOpacity
                style={styles.field}
                onPress={() => {
                    const currentUser = firebase.auth().currentUser;
                    const userId = currentUser?.uid;
                    const geolocation = {
                        latitude: item.latitude,
                        longitude: item.longitude
                    };
                    Firestore.collection('address_book')
                        .add({ location, userId, geolocation })
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((error) => console.error(error));
                    navigation.navigate('Main', {
                        location,
                        type: 'Edit Address'
                    });
                }}
            >
                <Ionicons
                    name="location"
                    size={21}
                    color="#DD4335"
                    style={styles.icon}
                />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ paddingLeft: 8, fontSize: 15 }}>
                        {item.name}
                    </Text>
                    <Text
                        style={{
                            paddingLeft: 8,
                            paddingTop: 2,
                            fontSize: 12
                            //width: '95%'
                        }}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                    >
                        {`${item.label}`}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', padding: 25 }}>
                <View style={styles.dashboard}>
                    <TouchableOpacity
                        style={styles.topBar}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color="#200E32"
                        />
                    </TouchableOpacity>
                    <Text style={styles.subText}>Edit Address</Text>
                </View>
                <View style={styles.field}>
                    <Icon
                        name="search"
                        type="evilicon"
                        color="#000"
                        size={30}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="Search Location"
                        onChangeText={onSearch}
                        style={{
                            fontSize: 16,
                            padding: 12,
                            flexGrow: 1
                        }}
                    />
                </View>
                <View style={{ height: '80%' }}>
                    <FlatList
                        data={data}
                        renderItem={renderAddress}
                        keyExtractor={(item) => item}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default EditAddress;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: '#FDF8F5'
    },
    dashboard: {
        marginTop: '7%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '5%'
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
        //marginBottom: '5%',
        //marginTop: '8%'
    },
    subText: {
        color: '#010101',
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold'
    },

    icon: {
        backgroundColor: '#F6EBE4',
        padding: 5,
        borderRadius: 4
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
        height: 55,
        paddingLeft: 10,
        marginBottom: 7,
        backgroundColor: '#fff',
        marginTop: 7
    }
});
