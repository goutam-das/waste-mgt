import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TextInput,
    Platform,
    TouchableOpacity
} from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const PickTime = ({ navigation }: any) => {

    const [date, setDate] = useState(new Date());
    const [pickup, setPickup] = useState("Pickup at");
    const [time, setTime] = useState("Pickup at");
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    console.log({date});
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setPickup(date.toString().slice(4,15))
        setTime(date.toString().slice(16,24))
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        console.log("here");

        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ width: '100%', padding: 25 }}>
                <View style={styles.dashboard}>
                    <View style={styles.topBar}>
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color="#200E32"
                        />
                    </View>
                    <Text style={styles.subText}>Request a Pickup</Text>
                    <Text style={styles.title}>Enter date & time</Text>

                    <TouchableOpacity style={styles.field} onPress={showDatepicker}>
                        <Ionicons
                            name="md-calendar"
                            size={20}
                            color="#DD4335"
                        />

                        <Text style={{ paddingLeft: 8 }}>{pickup}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.field} onPress={showTimepicker}>
                        <Ionicons name="md-time" size={24} color="#DD4335" />
                        <Text style={{ paddingLeft: 8 }}>{time}</Text>
                    </TouchableOpacity>
                </View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </ScrollView>
            <View>
                <Button
                    title="Next"
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
                    onPress={() => navigation.navigate("WasteCollection")}
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
    dashboard: {
        marginTop: '7%'
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '5%',
        marginTop: '8%'
    },
    subText: {
        color: '#888',
        marginBottom: 5,
        marginTop: 5
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 3,
        height: 50,
        borderColor: '#ABB3BF',
        borderWidth: 1,
        paddingLeft: 10,
        marginTop: '8%'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    }
});
export default PickTime;
