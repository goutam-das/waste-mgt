import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RequestList = () => {
    return (
        <View style={styles.noRequest}>
            <Ionicons name="document" size={80} color="#F59C65" />
            <Text>You haven't made any requests yet</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    noRequest: {
        alignItems: 'center'
    }
});

export default RequestList;
