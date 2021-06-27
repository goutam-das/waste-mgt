import React from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TextInput
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const list = [
    {
        title: 'April 29, 2021',
        status: 'Processing'
    },
    {
        title: 'March 29, 2021',
        status: 'Completed'
    }
];

const RequestList = () => {
    return (
        <View>
            {list.map((item, i) => (
                <ListItem
                    key={i}
                    bottomDivider
                    containerStyle={styles.listContainer}
                >
                    <Ionicons
                        name="document"
                        size={30}
                        color="#F59C65"
                        style={styles.iconBg}
                    />

                    <ListItem.Content>
                        <ListItem.Title style={styles.listTitle}>
                            {item.title}
                        </ListItem.Title>
                        <ListItem.Subtitle>{item.status}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: 'transparent',
        paddingLeft: 0
    },
    iconBg: {
        backgroundColor: '#F6EBE4',
        borderRadius: 50,
        padding: 10
    },
    listTitle: {
        color: '#333',
        fontSize: 15,
        marginBottom: 5
    }
});

export default RequestList;
