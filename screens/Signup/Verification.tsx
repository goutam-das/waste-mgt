import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ToastAndroid
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CodeFields from '../components/ConfirmationCodeInput';
import firebase from 'firebase';
import { Button } from 'react-native-elements';
import { Firestore, timeStamp } from '../../services/firebase';

export default class PhoneNumberVerification extends React.Component {
    props: any;
    updateState: any;
    getState: any;
    constructor(props) {
        super(props);
        this.updateState = this.props.route.params.updateState;
        this.getState = this.props.route.params.getState;
    }

    state = {
        number: '',
        onChangeText: ''
    };

    enterCredentials = (text, type) => {
        this.setState({
            [type]: text
        });
    };
    setOTP(text) {
        this.setState({
            otp: text
        });
        this.updateState({
            verificationCode: text
        });
    }
    async verifyOTP() {
        const { verificationId, verificationCode } = this.getState();
        try {
            //const credent = firebase.auth.PhoneAuthCredential
            const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                verificationCode
            );
            const user = await firebase.auth().signInWithCredential(credential);
            console.log(user);
            this.updateState({ user });
            ToastAndroid.show('Phone authentication successful 👍', 2000);
            this.props.navigation.navigate('Form');
        } catch (err) {
            ToastAndroid.show(err.message, 2000);
        }
    }
    componentDidMount() {}

    render() {
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
                        <Text style={styles.title}>Create an account</Text>
                        <Text style={styles.subTitle}>
                            Enter code sent to ***
                        </Text>
                        <CodeFields setOTP={this.setOTP.bind(this)} />

                        <Button
                            title="Next"
                            buttonStyle={{
                                backgroundColor: '#9A0707'
                            }}
                            containerStyle={{
                                marginTop: 20,
                                width: '100%'
                            }}
                            // disabled={this.state.isRunning}
                            onPress={() => this.verifyOTP()}
                        />

                        <Text style={styles.resend}>
                            Resend Confirmation Code
                        </Text>
                        <Text style={styles.helper}>
                            Not your number?{' '}
                            <Text style={{ textDecorationLine: 'underline' }}>
                                Change Phone Number
                            </Text>
                        </Text>
                    </View>
                </SafeAreaView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //
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
        marginTop: '10%',
        fontWeight: '700',
        fontSize: 18,
        textAlign: 'left',
        paddingBottom: '5%',
        color: '#3F3836'
    },
    subTitle: {
        fontWeight: '400',
        fontSize: 14,
        color: '#888888',
        marginBottom: 15
    },
    button: {
        backgroundColor: '#1F5EAD',
        textTransform: 'none'
    },
    buttonContainer: {
        marginTop: '10%',
        marginBottom: '12%'
    },
    resend: {
        fontWeight: '400',
        fontSize: 12,
        color: '#888888',
        textAlign: 'center',
        paddingTop: 20,
        lineHeight: 18,
        textDecorationLine: 'underline'
    },
    helper: {
        fontWeight: '400',
        fontSize: 12,
        color: '#888888',
        textAlign: 'center',
        paddingTop: 20,
        lineHeight: 18
    }
});
