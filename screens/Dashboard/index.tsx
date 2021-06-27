import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    createStackNavigator,
    StackScreenProps
} from '@react-navigation/stack';
import { RootStackParamList } from '../../routes';
import MainPage from './Main';
import PickupTime from './PickupTime';
import WasteCollection from './WasteCollection';
import Review from './Review';

type Props = StackScreenProps<RootStackParamList, 'Signup'>;
const Stack = createStackNavigator();
export default class Signup extends React.Component<Props> {
    state = {
        initialRoute: 'Main'
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

                <Stack.Navigator
                    initialRouteName={initialRoute}
                    screenOptions={{
                        headerShown: false,
                        animationEnabled: false
                    }}
                >
                    <Stack.Screen
                        name="Main"
                        component={MainPage}
                        initialParams={{
                            updateState: this.updateState,
                            getState: this.getState
                        }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="Pickup"
                        component={PickupTime}
                        initialParams={{
                            updateState: this.updateState,
                            getState: this.getState
                        }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="WasteCollection"
                        component={WasteCollection}
                        initialParams={{
                            updateState: this.updateState,
                            getState: this.getState
                        }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="Review"
                        component={Review}
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
