import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const Key = "rruGYPG2GH8coVTot3dAgw2Wyy2fc1tF"; //api key

const CurrentLocation = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [data, setData] = useState<any>({});

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            getLocation(location.coords.latitude, location.coords.longitude);
        })();
    }, []);



    let text = 'Waiting..';

    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);

    }

    function getLocation(lat: any, long: any) {
        console.log("location-->", lat, long);
        // setLoader(true);
        getaddress(lat, long).then(response => {
            console.log(response?.data?.results[0].locations[0]);
              setData(response?.data?.results[0].locations[0]);
           
        });
    }

    return (
        <View style={{ flex: 1, margin: 10 }}>
            <Text>{text}</Text>
        </View>
    );
}

export default CurrentLocation;

export function getaddress(lat: string, long: string) {
    console.log('calling get api.....');
    return axios.get(`http://open.mapquestapi.com/geocoding/v1/reverse?key=${Key}&location=${lat},${long}`, {
        headers: {},
    });
}