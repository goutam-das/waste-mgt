import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    createStackNavigator,
    StackScreenProps
} from '@react-navigation/stack';
import { RootStackParamList } from '../../routes';
import PhoneNumber from './PhoneNumber';
import PhoneNumberVerification from './Verification';
import Form from './Form';
// import Pattern from "../../svg/pattern";

type Props = StackScreenProps<RootStackParamList, 'Signup'>;
const Stack = createStackNavigator();
export default class Signup extends React.Component<Props> {
    state = {
        initialRoute: 'Phone',
        phoneNumber: '',
        verificationId: '',
        verificationCode: '',
        user: null
    };
    updateState = this.setState.bind(this);
    getState = () => this.state;
    constructor(props) {
        super(props);
    }

    enterCredentials = (text, type) => {
        this.setState({
            [type]: text
        });
    };

    componentDidMount() {}

    render() {
        const { initialRoute } = this.state;
        return (
            <>
                <StatusBar
                    style="dark"
                    translucent
                    backgroundColor="#fff"
                ></StatusBar>
                {/* <Pattern /> */}
                <Stack.Navigator
                    initialRouteName={initialRoute}
                    screenOptions={{
                        headerShown: false,
                        animationEnabled: false
                    }}
                >
                    <Stack.Screen
                        name="Phone"
                        component={PhoneNumber}
                        initialParams={{
                            updateState: this.updateState,
                            getState: this.getState
                        }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="Verification"
                        component={PhoneNumberVerification}
                        initialParams={{
                            updateState: this.updateState,
                            getState: this.getState
                        }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="Form"
                        component={Form}
                        initialParams={{
                            updateState: this.updateState,
                            getState: this.getState
                        }}
                    ></Stack.Screen>
                </Stack.Navigator>
            </>
        );
    }
}
