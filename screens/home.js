import React from 'react';
import {useState} from "react";
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';


const textButtons = StyleSheet.create({
  normal: {
    fontSize: 30,
    color: "#fff",
    textAlign:'center',
    fontFamily: 'Jost_500Medium'
  },
})

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: "#fff",
      padding: 20,
      margin: 10,
    },
    top: {
      flex: 0.25,
      backgroundColor: "#00CC66",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      justifyContent: 'center', //Centered horizontally
      alignItems: 'center', //Centered vertically
    },
    middle: {
      flex: 0.5,
      backgroundColor: "#00CC66",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      justifyContent: 'center', //Centered horizontally
      alignItems: 'center', //Centered vertically
    },
    bottom: {
      flex: 0.15,
      backgroundColor: "#00CC66",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      justifyContent: 'center', //Centered horizontally
      alignItems: 'center', //Centered vertically
    },
    image_style: {height: 250, width: 250, overflow: 'hidden', margin:5},
  });


const Home = ({navigation}) => {

    return (

      <View style={styles.container}>

        <Text style={{textAlign: "center", fontSize: 40, fontFamily: 'Jost_500Medium'}}>Zen</Text>

        <Ripple style = {styles.bottom} onPress={()=>navigation.navigate("Candle")}>
          <Text style={textButtons.normal}>Candle</Text>
        </Ripple> 

      </View>
    );
};
export default Home;