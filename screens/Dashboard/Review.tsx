import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { Text, Button, BottomSheet } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import MobilePayment from '../../svg/MobilePayment';
import PhoneInput from 'react-native-phone-number-input';

const Review = ({navigation}:any) => {
    const [isVisible, setIsVisible] = useState(true);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ width: '100%', padding: 25 }}>
                <View style={styles.dashboard}>
                <TouchableOpacity style={styles.topBar} onPress={()=>navigation.goBack()}>
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color="#200E32"
                        />
                    </TouchableOpacity>
                    <Text style={styles.subText}>Request a Pickup</Text>
                    <Text style={styles.title}>Review</Text>

                    <Text style={styles.subText}>Address</Text>
                    <View style={styles.field}>
                        <Ionicons
                            name="location"
                            size={20}
                            color="#DD4335"
                            style={styles.icon}
                        />
                        <View>
                            <Text style={styles.description}>Pickup at</Text>
                            <TextInput placeholder="Pickup at" />
                        </View>
                    </View>

                    <Text style={styles.subText}>Request Details</Text>
                    <View style={styles.card}>
                        <View style={styles.cardLeft}>
                            <View style={styles.innerContent}>
                                <Ionicons
                                    name="md-calendar"
                                    size={20}
                                    color="#DD4335"
                                    style={styles.icon}
                                />
                                <View>
                                    <Text style={styles.description}>Date</Text>
                                    <Text>20th March, 2021</Text>
                                </View>
                            </View>
                            <View style={styles.innerContent}>
                                <Ionicons
                                    name="md-time"
                                    size={20}
                                    color="#DD4335"
                                    style={styles.icon}
                                />
                                <View>
                                    <Text style={styles.description}>Time</Text>
                                    <Text>10:30 am</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.cardRight}>
                            <Button
                                title="Edit"
                                type="clear"
                                titleStyle={styles.editButton}
                                buttonStyle={styles.editButtonStyle}
                            />
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardLeft}>
                            <View>
                                <Text style={styles.description}>
                                    Amount of waste
                                </Text>
                                <Text>xx</Text>
                            </View>
                        </View>

                        <View style={styles.cardRight}>
                            <Button
                                title="Edit"
                                type="clear"
                                titleStyle={styles.editButton}
                                buttonStyle={styles.editButtonStyle}
                            />
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardLeft}>
                            <View>
                                <Text style={styles.description}>
                                    Recyclable materials
                                </Text>
                                <Text>Plastic</Text>
                                <Text>Metal</Text>
                            </View>
                        </View>

                        <View style={styles.cardRight}>
                            <Button
                                title="Edit"
                                type="clear"
                                titleStyle={styles.editButton}
                                buttonStyle={styles.editButtonStyle}
                            />
                        </View>
                    </View>

                    <View style={styles.totalContainer}>
                        <Text style={styles.title}>Total</Text>
                        <Text style={styles.title}>GHS 10.00</Text>
                    </View>
                </View>
                <BottomSheet
                    isVisible={isVisible}
                    containerStyle={{
                        backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'
                    }}
                >
                    <View style={styles.bottomSheetContainer}>
                        <View
                            style={{ alignItems: 'center', paddingTop: '10%' }}
                        >
                            <MobilePayment />
                            <Text style={styles.payTitle}>
                                Pay with mobile money
                            </Text>
                            <Text style={styles.paySubText}>Pay</Text>
                            <Text style={styles.amount}>GHS 10.00</Text>
                            <Text style={styles.paySubText}>
                                Enter your Mobile Money Number
                            </Text>
                            <PhoneInput
                                // onChangeText={(text) =>
                                //     this.enterCredentials(text, 'phoneNumber')
                                // }
                                // value={this.state.phoneNumber}
                                defaultCode="GH"
                                layout="first"
                                containerStyle={styles.payField}
                                textInputStyle={{
                                    fontSize: 14,
                                    justifyContent: 'center'
                                }}
                            />

                            <Text style={styles.paySubText}>
                                Enter reference
                            </Text>
                            <TextInput
                                placeholder="Enter Reference here"
                                style={styles.payReference}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                title="Cancel"
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
                                onPress={() => setIsVisible(false)}
                            />
                            <Button
                                title="Pay"
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
                            />
                        </View>
                    </View>
                </BottomSheet>
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
                    onPress={() => navigation.navigate("WasteCollection")}
                />
                <Button
                    title="Proceed to Payment"
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
                    onPress={() => setIsVisible(true)}
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
        height: 60,
        borderColor: '#ABB3BF',
        borderWidth: 1,
        padding: 10,
        marginBottom: '8%'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    icon: {
        backgroundColor: '#F6EBE4',
        padding: 5,
        borderRadius: 5,
        marginRight: 12
    },
    buttonContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row'
    },
    card: {
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingTop: 12,
        paddingLeft: 15,
        paddingBottom: 12,
        paddingRight: 12,
        marginBottom: 15
    },
    innerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    cardLeft: {
        width: '78%'
    },
    cardRight: {
        width: '22%'
    },
    description: {
        color: '#888',
        fontSize: 12,
        fontWeight: '400',
        marginBottom: 4
    },
    editButton: {
        color: '#9A0707',
        fontSize: 13
    },
    editButtonStyle: {
        justifyContent: 'flex-end'
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10
    },
    payTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop: 10
    },
    payField: {
        borderRadius: 3,
        height: 50,
        borderColor: '#ABB3BF',
        borderWidth: 1,
        marginBottom: 5,
        marginTop: 5,
        width: '80%'
    },
    paySubText: {
        color: '#4F4F4F',
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 4,
        marginTop: 12
    },
    amount: {
        color: '#DD4335',
        fontWeight: '700',
        fontSize: 20,
        marginBottom: 5,
        marginTop: 5
    },
    payReference: {
        borderRadius: 3,
        height: 50,
        borderColor: '#ABB3BF',
        borderWidth: 1,
        marginBottom: 5,
        marginTop: 5,
        width: '80%',
        paddingLeft: 12
    },
    bottomSheetContainer: {
        backgroundColor: 'white',
        height: 500,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60
    }
});
export default Review;
