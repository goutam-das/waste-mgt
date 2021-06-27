import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes';
import AppIntroSlider from 'react-native-app-intro-slider';
import Welcome1 from '../../svg/Welcome1';
import Welcome2 from '../../svg/Welcome2';
import Welcome3 from '../../svg/Welcome3';
import { Button } from 'react-native-elements';

type Props = StackScreenProps<RootStackParamList, 'Welcome'>;
const slides = [
    {
        key: 'one',
        title: 'Order for your Waste',
        text: 'Request a pickup from your homes, businesses and events and be attended to ASAP.',
        image: <Welcome1 />
    },
    {
        key: 'two',
        title: 'Flexible Payment Plans',
        text: 'You can gain discount on the services being offered while we attend to your waste.',
        image: <Welcome2 />
    },
    {
        key: 'three',
        title: 'Recycling Scheme',
        text: 'Minimize negative environment impact by participating in recycling scheme.',
        image: <Welcome3 />
    }
];

export default class Welcome extends React.Component<Props> {
    slideRef: React.RefObject<AppIntroSlider>;
    constructor(props: Props | Readonly<Props>) {
        super(props);
        this.props.navigation.setOptions({
            headerShown: false
        });
        this.slideRef = React.createRef();
    }
    _renderItem: any = ({ item }) => {
        return (
            <SafeAreaView>
                <View style={styles.box1}>
                    <View style={styles.innerBox}>
                        <Button
                            title="Skip"
                            type="clear"
                            containerStyle={{
                                alignItems: 'flex-end',
                                marginTop: 10
                            }}
                            titleStyle={{
                                color: '#F59C65'
                            }}
                        />
                        <View style={styles.image}>{item.image}</View>
                    </View>
                </View>
                <View style={styles.box1}>
                    <View style={styles.box2}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subText}>{item.text}</Text>
                    </View>
                </View>
            </SafeAreaView>
        );
    };
    navigateGetStarted = () => {
        this.props.navigation.navigate('Signup');
    };

    navigateLogin = () => {
        this.props.navigation.navigate('Login');
    };

    _renderPagination = (index) => {
        return (
            <View style={styles.bottomBar}>
                <View style={styles.paginationDots}>
                    {slides.map((_, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[
                                styles.dot,
                                i === index ? styles.dotActive : styles.dot
                            ]}
                            onPress={() =>
                                this.slideRef.current.goToSlide(i + 1, true)
                            }
                        />
                    ))}
                </View>
                <Button
                    title="Get Started"
                    onPress={this.navigateGetStarted}
                    accessibilityLabel="Get Started"
                    buttonStyle={{
                        backgroundColor: '#9A0707'
                    }}
                    containerStyle={{
                        marginBottom: 15,
                        width: '100%'
                    }}
                />
                <Button
                    title="Already have an account? Login"
                    type="outline"
                    buttonStyle={styles.outlineButton}
                    containerStyle={{
                        width: '100%'
                    }}
                    titleStyle={{
                        color: '#9A0707'
                    }}
                    onPress={this.navigateLogin}
                    accessibilityLabel="Already have an account? Login"
                />
            </View>
        );
    };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    style="dark"
                />

                <AppIntroSlider
                    renderItem={this._renderItem}
                    ref={this.slideRef}
                    renderPagination={this._renderPagination}
                    bottomButton
                    showPrevButton={false}
                    showNextButton={false}
                    showDoneButton={false}
                    dotStyle={styles.dot}
                    activeDotStyle={styles.dotActive}
                    data={slides}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    box1: {
        height: '50%',
        borderBottomRightRadius: 120,
        backgroundColor: '#FFEDE3'
    },
    innerBox: {
        padding: 20
    },
    box2: {
        height: '100%',
        borderTopLeftRadius: 120,
        backgroundColor: '#FFF',
        flex: 1,
        padding: 30,
        alignItems: 'center'
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: '700',
        color: '#333',
        fontSize: 20,
        marginBottom: 10,
        marginTop: '20%'
    },
    subText: {
        fontWeight: '400',
        color: '#4F4F4F',
        fontSize: 14,
        lineHeight: 21,
        marginBottom: '10%',
        textAlign: 'center'
    },
    outlineButton: {
        borderColor: '#9A0707',
        color: '#9A0707'
    },
    paginationDots: {
        height: 5,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 50,
        marginRight: 5,
        backgroundColor: 'rgba(201, 193, 189, 0.3)'
    },
    dotActive: {
        width: 20,
        height: 8,
        borderRadius: 50,
        backgroundColor: '#C9C1BD'
    },

    bottomBar: {
        padding: 30,
        paddingTop: 0,
        position: 'absolute',
        height: 150,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent'
    }
});
