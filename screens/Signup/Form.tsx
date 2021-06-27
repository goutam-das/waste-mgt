import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ToastAndroid,
    SafeAreaView
} from 'react-native';
import { Firestore, timeStamp } from '../../services/firebase';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default class Form extends React.Component<any> {
    state = {
        fname: '',
        lname: ''
    };
    updateState: any;
    getState: any;
    constructor(props) {
        super(props);
        this.updateState = this.props.route.params.updateState;
        this.getState = this.props.route.params.getState;
    }

    enterCredentials = (text, type) => {
        this.setState({
            [type]: text
        });
    };
    async Signup() {
        const { user } = this.getState();
        const { fname, lname } = this.state;
        try {
            await Firestore.collection('users')
                .add({
                    userId: user.user.uid,
                    phoneNumber: user.user.phoneNumber,
                    createdAt: timeStamp,
                    updatedAt: timeStamp,
                    createdBy: user.user.uid,
                    updatedBy: user.user.uid,
                    firstName: fname,
                    lastName: lname,
                    userType: 'household'
                })
                .then(() => {
                    this.props.navigation.navigate('Welcome');
                });
        } catch (e) {
            console.log(e);
            ToastAndroid.show('Unable to Sign Up', 2000);
        }
    }

    componentDidMount() {}

    render() {
        const { fname, lname } = this.state;
        const { navigation } = this.props;
        return (
            <>
                <SafeAreaView style={styles.container}>
                    <View style={styles.backIcon}>
                        <Ionicons
                            name="md-arrow-back"
                            size={30}
                            color="#fff"
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </View>

                    <View style={styles.contentBox}>
                        <Text style={styles.title}>One more step</Text>
                        <Text style={styles.subTitle}>First Name</Text>
                        <TextInput
                            style={styles.field}
                            onChangeText={(text) =>
                                this.enterCredentials(text, 'fname')
                            }
                            value={this.state.fname}
                            placeholder="Enter first name"
                        />

                        <Text style={styles.subTitle}>Last Name</Text>
                        <TextInput
                            style={styles.field}
                            onChangeText={(text) =>
                                this.enterCredentials(text, 'lname')
                            }
                            value={this.state.lname}
                            placeholder="Enter last name"
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Login"
                                disabled={!fname || !lname}
                                onPress={() => this.Signup()}
                                buttonStyle={{
                                    backgroundColor: '#9A0707'
                                }}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9A0707'
    },
    backIcon: {
        marginTop: '15%',
        marginBottom: '5%',
        padding: 20
    },
    contentBox: {
        padding: 20,
        borderTopRightRadius: 80,
        borderTopLeftRadius: 80,
        backgroundColor: '#fff',
        height: '100%'
    },
    title: {
        fontWeight: '700',
        fontSize: 18,
        marginTop: '10%',
        textAlign: 'left',
        paddingBottom: '5%',
        color: '#3F3836'
    },
    subTitle: {
        fontWeight: '400',
        fontSize: 14,
        color: '#888888',
        marginBottom: 10
    },
    field: {
        borderRadius: 3,
        height: 50,
        borderColor: '#ABB3BF',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: '8%'
    },
    buttonContainer: {
        marginTop: '10%',
        marginBottom: '12%'
    }
});
