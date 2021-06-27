import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text
} from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Recyclables from '../components/MultiSelect';

const RadioButton = ({ onPress, selected, children }) => {
    return (
        <View style={styles.radioButtonContainer}>
            <View style={styles.binIconContainer}>
                <TouchableOpacity onPress={onPress} style={styles.radioButton}>
                    {selected ? <View style={styles.radioButtonIcon} /> : null}
                </TouchableOpacity>
                <Ionicons name="trash" size={50} color="#DD4335" />
            </View>
            <View style={styles.radioTextContainer}>
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.radioTitle}>{children}</Text>
                    {/* <Text style={styles.subText}>here</Text> */}
                </TouchableOpacity>

                <View style={styles.radioButtonContainer}>
                    <Ionicons
                        name="md-remove"
                        size={20}
                        color="white"
                        style={styles.iconButtons}
                    />
                    <Text style={styles.numberContainer}>10</Text>
                    <Ionicons
                        name="add"
                        size={20}
                        color="white"
                        style={styles.iconButtons}
                    />
                </View>
            </View>
        </View>
    );
};

// const items = [
//     {
//         id: '92iijs7yta',
//         name: 'Ondo'
//     },
//     {
//         id: 'a0s0a8ssbsd',
//         name: 'Ogun'
//     },
//     {
//         id: '16hbajsabsd',
//         name: 'Calabar'
//     },
//     {
//         id: 'nahs75a5sg',
//         name: 'Lagos'
//     }
// ];

const WasteCollection = ({navigation}:any) => {
    const [isLiked, setIsLiked] = useState([
        { id: 1, value: true, name: '240L Waste Bin', selected: false },
        { id: 2, value: false, name: '120L Waste Bin', selected: false }
    ]);
    const onRadioBtnClick = (item) => {
        let updatedState = isLiked.map((isLikedItem) =>
            isLikedItem.id === item.id
                ? { ...isLikedItem, selected: true }
                : { ...isLikedItem, selected: false }
        );
        setIsLiked(updatedState);
    };

    const [checkbox, setcheckbox] = useState(true);

    const checkRecyclable = () => {
        setcheckbox(!checkbox);
    };

    // const [selectedItems, setSelectedItems] = useState([]);

    // const onSelectedItemsChange = (selectedItems) => {
    //     setSelectedItems( selectedItems );
    // };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={{
                    width: '100%',
                    padding: 25
                }}
            >
                <View style={styles.dashboard}>
                    <View style={styles.topBar}>
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color="#200E32"
                        />
                    </View>
                    <Text style={styles.subText}>Request a Pickup</Text>
                    <Text style={styles.title}>
                        Select and enter the number of bins
                    </Text>

                    <View>
                        {isLiked.map((item) => (
                            <RadioButton
                                onPress={() => onRadioBtnClick(item)}
                                selected={item.selected}
                                key={item.id}
                            >
                                {item.name}
                            </RadioButton>
                        ))}
                    </View>

                    <CheckBox
                        onPress={checkRecyclable}
                        title="Are there any recyclable material in the bin e.g. plastic, e-waste"
                        checkedIcon="check-square"
                        checked={checkbox}
                        checkedColor="#9A0707"
                        containerStyle={{
                            borderWidth: 0,
                            paddingLeft: 0,
                            marginLeft: 0
                        }}
                    />
                    <Recyclables />
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button
                    title="Previous"
                    buttonStyle={{
                        backgroundColor: '#F6EBE4',
                        padding: 12
                    }}
                    containerStyle={{
                        width: '50%'
                    }}
                    titleStyle={{
                        fontSize: 13,
                        color: '#9A0707'
                    }}
                    onPress={() => navigation.navigate("Pickup")}
                />
                <Button
                    title="Review Request"
                    buttonStyle={{
                        backgroundColor: '#9A0707',
                        padding: 12
                    }}
                    containerStyle={{
                        width: '50%'
                    }}
                    titleStyle={{
                        fontSize: 13
                    }}
                    // disabled
                    onPress={() => navigation.navigate("Review")}
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
    buttonContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row'
    },
    binIconContainer: {
        backgroundColor: '#F6EBE4',
        padding: 15,
        borderRadius: 4,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    radioTextContainer: {
        paddingLeft: 12,
        paddingTop: 8
    },
    iconButtons: {
        backgroundColor: '#DD4335',
        padding: 4,
        borderRadius: 12
    },
    numberContainer: {
        padding: 5
    },
    subText: {
        color: '#888',
        marginBottom: 5,
        marginTop: 5
    },
    radioButton: {
        height: 18,
        width: 18,
        backgroundColor: 'transparent',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ABB3BF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioButtonIcon: {
        height: 12,
        width: 12,
        borderRadius: 7,
        backgroundColor: '#9A0707'
    },
    radioTitle: {
        fontWeight: 'bold',
        marginBottom: 8
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
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    radioButtonText: {
        fontSize: 16,
        marginLeft: 16
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    }
});
export default WasteCollection;
