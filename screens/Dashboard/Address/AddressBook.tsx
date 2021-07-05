import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Text } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Firestore } from '../../../services/firebase';

const DATA = [
    {
        House: 'House No.981',
        Street: 'PRIVADA UNIÓN 10',
        City: 'CIUDAD DE MÉXICO',
        State: ' CDMEX',
        Country: 'MÉXICO',
        id: 'a1'
    },
    {
        House: 'Dubai Mall',
        Street: 'Financial Center Street',
        City: 'Next to Burj Khalifa',
        State: ' Dubai',
        Country: 'UAE',
        id: 'a2'
    }
];

const AddressBook = ({ navigation }: any) => {
    const [locations, setLocations] = useState<
        Array<{ id: string; location: string }>
    >([]);
    useEffect(() => {
        Firestore.collection('address_book')
            .get()
            .then((querySnapshot) => {
                const locations: Array<{ id: string; location: string }> = [];
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, ' => ', doc.data());
                    locations.push({
                        id: doc.id,
                        location: doc.data().location
                    });
                });
                setLocations(locations);
            })
            .catch((error) => {
                console.log('Error getting documents: ', error);
            });
    }, [setLocations]);
    const renderAddress = ({ item }: any) => {
        const x = item.location.split(',');
        const street = x.slice(0,1).join(',');
        const location = x.slice(1).join(',');
        return (
            <TouchableOpacity
                style={styles.field}
                onPress={() => {
                    navigation.navigate('Main', {
                        location,
                        type: 'Address Book'
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
                        {street}
                    </Text>
                    <Text
                        style={{
                            paddingLeft: 8,
                            paddingTop: 2,
                            fontSize: 12,
                            width: '95%'
                        }}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                    >
                        {location}
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
                    <Text style={styles.subText}>Address Book</Text>
                </View>
                <FlatList
                    data={locations}
                    renderItem={renderAddress}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

export default AddressBook;

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
