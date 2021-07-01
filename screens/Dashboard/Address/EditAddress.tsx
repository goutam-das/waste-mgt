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
import { Firestore } from '../../../services/firebase';

const Key = 'rruGYPG2GH8coVTot3dAgw2Wyy2fc1tF'; //api key

const EditAddress: FC = ({ navigation }: any) => {
    const [data, setData] = useState<any>([]);

    const onSearch = useCallback((search) => {
        axios
            .get(
                `http://www.mapquestapi.com/geocoding/v1/address?key=${Key}&location=${search}`
            )
            .then(({ data }) => {
                setData(data?.results[0].locations);
            });
    }, []);

    const renderAddress = ({ item }: any) => {
        console.log({item});
        
        const location = `${item.street},${item.adminArea5},${item.adminArea3},${item.adminArea1}`;
        return (
            <TouchableOpacity
                style={styles.field}
                onPress={() => {
                    Firestore.collection('address_book')
                        .add({ location })
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
                        {item.street}
                    </Text>
                    <Text
                        style={{
                            paddingLeft: 8,
                            paddingTop: 2,
                            fontSize: 12,
                            //width: '95%'
                        }}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                    >
                        {`${item.adminArea5},${item.adminArea3},${item.adminArea1}`}
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
                        keyExtractor={(item) => item.id}
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
