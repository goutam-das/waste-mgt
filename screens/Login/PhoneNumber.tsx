import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ToastAndroid,
    Pressable
} from 'react-native';
import { Button } from 'react-native-elements';

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { provider, FirebaseConfig } from '../../services/firebase';
// import auth from 'firebase/app';
import { StackScreenProps } from '@react-navigation/stack';
import Hyperlink from 'react-native-hyperlink';
import PhoneInput from 'react-native-phone-number-input';
import { Ionicons } from '@expo/vector-icons';

type Props = StackScreenProps<any, ''>;

export default class PhoneNumber extends React.Component<Props> {
    recaptchaVerifier: React.RefObject<FirebaseRecaptchaVerifierModal>;
    updateState: (state: any) => any;
    constructor(props) {
        super(props);
        this.recaptchaVerifier = React.createRef();
        console.log(this.props);
        this.updateState = this.props.route.params.updateState;
    }

    state = {
        phoneNumber: '548705628',
        onChangeText: '',
        isRunning: false
    };
    navigateLogin = () => {
        this.props.navigation.navigate('Login');
    };

    enterCredentials = (text, type) => {
        this.setState({
            [type]: text
        });
        this.updateState({
            [type]: text
        });
    };
    sendOTP = async () => {
        try {
            this.setState({
                isRunning: true
            });
            console.log('runing');
            console.log('running 2', this.state);
            const verificationId = await provider.verifyPhoneNumber(
                '+233' + this.state.phoneNumber,
                this.recaptchaVerifier.current
            );
            console.log('running 3', verificationId);

            this.updateState({
                verificationId
            });
            ToastAndroid.show(
                'Verification code has been sent to your phone.',
                2000
            );
            this.props.navigation.navigate('Verification');
        } catch (err) {
            ToastAndroid.show(err.message, 2000);
        } finally {
            this.setState({
                isRunning: false
            });
        }
    };

    render() {
        return (
            <>
                <FirebaseRecaptchaVerifierModal
                    ref={this.recaptchaVerifier}
                    firebaseConfig={FirebaseConfig as any}
                    attemptInvisibleVerification={true}
                />
                <SafeAreaView style={styles.container}>
                    <View style={styles.backIcon}>
                        <Ionicons
                            name="md-arrow-back"
                            size={30}
                            color="#fff"
                            // onPress={() => navigation.goBack()}
                        />
                    </View>

                    <View style={styles.contentBox}>
                        <Text style={styles.title}>Welcome Back!</Text>
                        <PhoneInput
                            onChangeText={(text) =>
                                this.enterCredentials(text, 'phoneNumber')
                            }
                            value={this.state.phoneNumber}
                            defaultCode="GH"
                            layout="first"
                            containerStyle={styles.field}

                            // ref={phoneInput}
                            // defaultValue={value}

                            // textContainerStyle={}
                            // onChangeText={(text) => {
                            //   setValue(text);
                            // }}
                            // onChangeFormattedText={(text) => {
                            //   setFormattedValue(text);
                            // }}
                            // withDarkTheme
                            // withShadow
                            // autoFocus
                        />

                        <Button
                            title="Next"
                            buttonStyle={{
                                backgroundColor: '#9A0707'
                            }}
                            containerStyle={{
                                marginTop: 20,
                                width: '100%'
                            }}
                            disabled={this.state.isRunning}
                            onPress={() => this.sendOTP()}
                        />
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
    field: {
        borderRadius: 3,
        height: 55,
        borderColor: '#ABB3BF',
        borderWidth: 1,
        marginBottom: '10%',
        width: '100%'
    },
    button: {
        backgroundColor: '#1F5EAD',
        textTransform: 'none'
    },
    helper: {
        fontWeight: '400',
        fontSize: 12,
        color: '#888888',
        textAlign: 'center',
        paddingTop: 15,
        lineHeight: 18
    },
    login: {
        fontWeight: '400',
        fontSize: 14,
        color: '#888888',
        textAlign: 'center'
    },
    loginContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: '6%'
    }
});
