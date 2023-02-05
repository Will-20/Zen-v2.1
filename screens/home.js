import React from 'react';
import {useState} from "react";
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';


const textButtons = StyleSheet.create({
  normal: {
    fontSize: 30,
    color: "#fff",
    textAlign:'center',
    fontFamily: 'Jost_500Medium',
    margin: 60,
  },
})

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: 10,
      margin: 10,
    },
    toptop: {
      flex: 0.1,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      justifyContent: 'center', //Centered horizontally
      alignItems: 'center', //Centered vertically
    },
    top: {
      flex: 0.4,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      justifyContent: 'center', //Centered horizontally
      alignItems: 'center', //Centered vertically
    },
    middle: {
      flex: 0.2,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      justifyContent: 'center', //Centered horizontally
      alignItems: 'center', //Centered vertically
    },
    bottom: {
      flex: 0.25,
      backgroundColor: "#00CC66",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      margin: 10,
      justifyContent: 'center', //Centered horizontally
      alignItems: 'center', //Centered vertically
    },
    image_style: {height: 105, width: 120, overflow: 'hidden', margin:10},
  });


const Home = ({navigation}) => {

    return (
    
        <View style={styles.container}>

          <View style={styles.toptop}>
            <Text style={{textAlign: "center", fontSize: 60, fontFamily: 'Jost_500Medium'}}>Zen</Text>
          </View>

            

          <View style={styles.middle}>
            <Image
              style={styles.image_style}
              source={require('../assets/green-heart.png')}
            />
              <Text style={{textAlign: "center", fontSize: 40, fontFamily: 'Jost_500Medium'}}>40</Text>
              <Text style={{textAlign: "center", fontSize: 20, fontFamily: 'Jost_500Medium'}}>Heart Rate</Text>
            
          </View>

          <View style={styles.middle}>
            <Image
                style={styles.image_style}
                source={require('../assets/green-clock.png')}
              />
                <Text style={{textAlign: "center", fontSize: 40, fontFamily: 'Jost_500Medium'}}>27</Text>
                <Text style={{textAlign: "center", fontSize: 20, fontFamily: 'Jost_500Medium'}}>Minutes meditated this week</Text>
          </View>

          
          
          <Ripple style = {styles.bottom} onPress={()=>navigation.navigate("Candle")}>
            <Text style={textButtons.normal}>Begin Meditation</Text>
          </Ripple> 

          

          </View>

      
    );
};
export default Home;