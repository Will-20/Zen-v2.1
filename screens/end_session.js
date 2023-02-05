import React from 'react';
import {useState} from "react";
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import Ripple from "react-native-material-ripple";
import {styles} from "react-native-material-ripple/styles";
import {ShaderLib as textButtons} from "three";

const EndSession = ({route, navigation}) => {

    console.log(route.params)

    const {minutes} = route.params;

    const textButtons = StyleSheet.create({
        normal: {
            fontSize: 30,
            color: "#fff",
            textAlign:'center',
            fontFamily: 'Jost_500Medium',
            margin: 20,
        },
    })

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: 'center',
            padding: 20,
            margin: 10,
        },
        top: {
            flex: 0.2,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            justifyContent: 'center', //Centered horizontally
            alignItems: 'center', //Centered vertically
        },
        middle: {
            flex: 0.3,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            justifyContent: 'center', //Centered horizontally
            alignItems: 'center', //Centered vertically
        },
        bottom: {
            flex: 0.5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            justifyContent: 'center', //Centered horizontally
            alignItems: 'center', //Centered vertically
        },
        button: {
            flex: 0.3,
            backgroundColor: "#00CC66",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            justifyContent: 'center', //Centered horizontally
            alignItems: 'center', //Centered vertically
        },
        image_style: {height: 250, width: 250, overflow: 'hidden', margin: 5},
    });[]

    function returnHome() {
        navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
        })
    }

    return (

        <View style={styles.container}>

            <View style={styles.top} >
                <Text style={{textAlign: "center", fontSize: 40, fontFamily: 'Jost_500Medium'}}>Congratulations!</Text>
            </View>

            <View style={styles.middle} >
                <Text style={{textAlign: "center", fontSize: 25, fontFamily: 'Jost_500Medium'}}>Meditation time: {Math.abs(Math.round(minutes / 60))} mins</Text>
                <Text style={{textAlign: "center", fontSize: 25, fontFamily: 'Jost_500Medium'}}>Average heart rate: 66 bpm!</Text>
            </View>

            <View style={styles.bottom}>
                <Ripple style = {styles.button} onPress={()=>returnHome()}>
                    <Text style={textButtons.normal}>Return Home</Text>
                </Ripple>
            </View>


        </View>
    );
};
export default EndSession;