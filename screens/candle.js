import React, {useRef, useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Image} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {Canvas, useFrame} from '@react-three/fiber/native'
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TimePicker} from 'react-native-simple-time-picker';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'


const textButtons = StyleSheet.create({
    normal: {
        fontSize: 40,
        color: "#fff",
        textAlign: 'center',
        fontFamily: 'Jost_500Medium'
    },
})

const styles = StyleSheet.create({
    container: {
        flex: 0.6,
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
        flex: 1,
        backgroundColor: "#00CC66",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
    },
    image_style: {height: 250, width: 250, overflow: 'hidden', margin: 5},
});

function Cylinder(props) {
    const mesh = useRef(null)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // useFrame((state, delta) => (mesh.current.rotation.z += 0.1));

    return (<mesh
        {...props}
        ref={mesh}
        scale={0.75}
        // scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <cylinderGeometry attach="geometry" args={[props.radius, props.radius, props.height]}/>
        <meshStandardMaterial color={props.color}/>
    </mesh>)
}

function Cone(props) {
    const mesh = useRef(null)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // useFrame((state, delta) => (mesh.current.rotation.z += 0.1));

    const [color, setColor] = useState(props.color);
    return (<mesh
        position={props.position}
        onPointerOver={() => setColor(props.color)}
        onPointerOut={() => setColor('blue')}
        // radialSegments={props.radialSegments}
    >
        <coneBufferGeometry
            scale={[0, 0, 0]}
            attach="geometry"
            args={[props.radius, props.height, props.radialSegments]}
        />
        <meshBasicMaterial
            attach="material"
            color={props.color}
            opacity={0.5}
            transparent={true}
        />
    </mesh>)
}

const renderTime = ({ remainingTime }) => {
  return (
          <>
            
            <Text style={{fontSize: 100}}>{remainingTime}</Text>

            <Canvas>
              <ambientLight/>
              <pointLight position={[10, 10, 10]}/>
              <Cylinder position={[0, 0, 0]} color={'orange'} radius={0.4} height={3}/> 
                {/*<OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />*/}
             <Cylinder position={[0, 1.25, 0]} color={'black'} radius={0.01} height={0.3}/>
              <Cone position={[0, 1.5, 0]} color={'red'} radius={0.25} height={0.5} radialSegments={15}/>
              <Cone position={[0, 1.5, 0]} color={'orange'} radius={0.1} height={0.3} radialSegments={15}/>
            </Canvas>
            
          </>
    );
}


const Candle = ({navigation}) => {

    const [hrs, setHrs] = useState('0');
    const [mins, setMins] = useState('1');
    const [secs, setSecs] = useState('1');

    const handleChange = (value) => {
      const {hours, mins} = value
      setHrs(hours);
      setMins(mins);
    };


    return (
        <>
             
          <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <CountdownCircleTimer
            isPlaying
            duration={120}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            size = {350}
            >
            {renderTime}
          </CountdownCircleTimer>

            

          </View>
            


            <View style={styles.container}>
        
              <Ripple style = {styles.bottom} onPress={()=>navigation.navigate("Candle")}>
                <Text style={textButtons.normal}>Begin Session</Text>
              </Ripple>

              <TimePicker style = {{flex: 0.3, justifyContent: 'center'}} value={ (hrs, mins) } onChange={handleChange} hoursUnit={'hrs'} minutesUnit={'min'} />
              
            </View>
            

            
         </>
    );
};
export default Candle;