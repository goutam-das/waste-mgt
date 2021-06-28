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
import dayjs from 'dayjs';

const showDate = (date: any) => {
    if (!date) return undefined;
    return dayjs(date).format('DD/MM/YYYY');
};

const showTime = (date: any) => {
    if (!date) return undefined;
    return dayjs(date).format('HH:mm A');
};

const PickTime = ({ navigation }: any) => {
    const toDay = new Date();
    const [{ showDatePiker, pickup }, setDate] = useState<{
        showDatePiker: boolean;
        pickup: Date | undefined;
    }>({ showDatePiker: false, pickup: undefined });
    const [{ showTimePiker, time }, setTime] = useState<{
        showTimePiker: boolean;
        time: Date | undefined;
    }>({ showTimePiker: false, time: undefined });

    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || toDay;
        setDate({ showDatePiker: false, pickup: currentDate });
    };

    const onChangeTime = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || toDay;
        setTime({ showTimePiker: false, time: currentDate });
    };

    const showDatepicker = () => {
        setDate((prev) => ({ ...prev, showDatePiker: true }));
    };

    const showTimepicker = () => {
        setTime((prev) => ({ ...prev, showTimePiker: true }));
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

                    <TouchableOpacity
                        style={styles.field}
                        onPress={showDatepicker}
                    >
                        <Ionicons
                            name="md-calendar"
                            size={20}
                            color="#DD4335"
                        />

                        <Text style={{ paddingLeft: 8 }}>
                            {showDate(pickup) || 'Pickup at'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.field}
                        onPress={showTimepicker}
                    >
                        <Ionicons name="md-time" size={24} color="#DD4335" />
                        <Text style={{ paddingLeft: 8 }}>
                            {showTime(time) || 'Pickup at'}
                        </Text>
                    </TouchableOpacity>
                </View>
                {showDatePiker && (
                    <DateTimePicker
                        value={pickup || toDay}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                        minimumDate={toDay}
                    />
                )}
                {showTimePiker && (
                    <DateTimePicker
                        value={time || toDay}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeTime}
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
                    onPress={() => navigation.navigate('WasteCollection')}
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
