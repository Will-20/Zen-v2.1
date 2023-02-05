import React, {useRef, useState} from 'react'
import {Canvas, useFrame} from '@react-three/fiber/native'
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {...} from 'terra-react'

import Intro from './screens/intro';
import Home from './screens/home';
import Candle from './screens/candle';

import {useFonts, Jost_500Medium, Jost_500Medium_Italic} from "@expo-google-fonts/jost";
import AppLoading from 'expo-app-loading';

import {LogBox} from 'react-native';
import EndSession from "./screens/end_session";

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Stack = createNativeStackNavigator();

              
export default function App() {


    let [fontsLoaded] = useFonts({
        Jost_500Medium, Jost_500Medium_Italic
    });

    if (!fontsLoaded) {
        return <AppLoading/>
    } else {
        return (<>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName='Home'>
                        <Stack.Screen
                            name='Home'
                            component={Home}
                            options={{title: 'Home'}}
                        />
                        <Stack.Screen
                            name='Candle'
                            component={Candle}
                            options={{title: 'Meditation Session'}}
                        />
                        <Stack.Screen
                            name='Intro'
                            component={Intro}
                            options={{title: 'Introduction'}}
                        />
                        <Stack.Screen
                            name='EndSession'
                            component={EndSession}
                            options={{title: 'End Session'}}
                        />

                    </Stack.Navigator>
                </NavigationContainer>
            </>);
    }
}