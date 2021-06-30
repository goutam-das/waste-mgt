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

const Key = "rruGYPG2GH8coVTot3dAgw2Wyy2fc1tF"; //api key

const EditAddress: FC = ({ navigation }: any) => {

    const [data, setData] = useState<any>([]);
    const [search, setSearch] = useState('');

    function getSearch() {
        console.log(search);
        getaddress(search).then(response => {
            console.log(response?.data?.results[0].locations);
            setData(response?.data?.results[0].locations);

        });
    }

    const renderAddress = ({ item }: any) => {
        return (
            <TouchableOpacity
                style={styles.field}
                onPress={() => alert("press")}
            >
                <Ionicons
                    name="location"
                    size={21}
                    color="#DD4335"
                    style={styles.icon}
                />
                <View style={{ justifyContent: "center" }}>
                    <Text style={{ paddingLeft: 8, fontSize: 15 }}>
                        Dubai Mall
                    </Text>
                    <Text style={{ paddingLeft: 8, paddingTop: 2, fontSize: 12, width: "95%" }} numberOfLines={1} ellipsizeMode={"tail"}>
                    Financial Center Street, Along Sheikh Zayed Road,Dubai - UAE
                    </Text>
                </View>

            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', padding: 25 }}>
                <View style={styles.dashboard}>
                    <TouchableOpacity style={styles.topBar} onPress={() => navigation.goBack()}>
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
                        onPress={() => getSearch()}
                        size={30}
                        style={styles.icon}
                    />
                    <TextInput
                        placeholder="Search Location"
                        onChangeText={search => setSearch(search)}
                        style={{
                            fontSize: 16,
                            padding: 12,
                            flexGrow: 1,
                        }}
                    />

                </View>
                <FlatList
                    data={data}
                    renderItem={renderAddress}
                    keyExtractor={item => item.id}
                />
            </View>

        </SafeAreaView>

    )
}

export default EditAddress;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: '#FDF8F5'
    },
    dashboard: {
        marginTop: '7%',
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "5%"

    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //marginBottom: '5%',
        //marginTop: '8%'
    },
    subText: {
        color: '#010101',
        fontSize: 16,
        padding: 10,
        fontWeight: "bold"
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
    },
   

})


export function getaddress(search: string) {
    console.log('calling get api.....');
    return axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=${Key}&location=${search}`, {
        headers: {},
    });
}