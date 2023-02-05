import React, {useRef, useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Alert, RefreshControlComponent} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {Canvas, ReactThreeFiber, useFrame} from '@react-three/fiber/native'
import {NavigationActions} from 'react-navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TimePicker} from 'react-native-simple-time-picker';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer'
import {EventDispatcher} from "three";
import axios from 'axios';

const baseurl = "https://e0a3-2a0c-5bc0-40-2e33-a8df-8d85-2375-9ef1.eu.ngrok.io/api/hr"

const textButtons = StyleSheet.create({
    normal: {
        fontSize: 40,
        margin: 15,
        color: "#fff",
        textAlign: 'center',
        fontFamily: 'Jost_500Medium'
    },
    small: {
        fontSize: 20,
        margin: 10,
        color: "#fff",
        textAlign: 'center',
        fontFamily: 'Jost_500Medium'
    },
})

const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        justifyContent: "space-between",
        alignItems: 'center',
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
        margin: 10,
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
    },
    bottom: {
        flex: 0.8,
        backgroundColor: "#00CC66",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
    },
    button: {
        flex: 0.7,
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


    // useFrame((state, delta) => (setCandleHeight(this.props.ref.current)));

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
    const [flicker, setFlicker] = useState(false)
    const [height, setHeight] = useState(0)


    // useFrame((state, delta) => (mesh.current.rotation.z += 0.1));

    const colors = ['red', 'orange', 'yellow']

    function generateNextFlicker() {
        let x = Math.floor(Math.random() * 3);
        // console.log(x)
        setColor(colors[x])
    }

    function getFlameHeight() {
      axios.get(baseurl).then(res => {
        console.log(res.data[-1]);
      }).then(res => setHeight(res.data.at(-1) > 80 ? 0 : 1))
    }


    const [color, setColor] = useState(props.color);

    setInterval(generateNextFlicker, 2000);
    setInterval(getFlameHeight, 5000);

    return (<mesh
        position={props.position}
    >
        <coneBufferGeometry
            scale={[0, 0, 0]}
            attach="geometry"
            args={[props.radius, height * props.height, props.radialSegments]}
        />
        <meshBasicMaterial
            attach="material"
            color={color}
            opacity={0.5}
            transparent={true}
        />
    </mesh>)
}


const Candle = ({navigation}) => {

    const [hrs, setHrs] = useState(1);
    const [mins, setMins] = useState(0);
    const [sessionTime, setSessionTime] = useState(0)
    const [hidden, setHidden] = useState(false)
    const [sessionEnded, setSessionEnded] = useState(false)

    const handleChange = (value) => {
        setHrs(value.hours);
        setMins(value.minutes);
    };

    const renderTime = ({remainingTime}) => {
        return (

            <Ripple style={styles.middle} onPress={() => endSession(mins)}>
                < Text style={textButtons.small}>End Session {remainingTime}</Text>
            </Ripple>

        );
    }

    function beginSession(mins) {
        setSessionTime(mins)
        setHidden(true)

    }



    function endSession(mins) {

        console.log(sessionTime)
        console.log(mins)

        navigation.reset({
            index: 0,
            routes: [{name: 'EndSession', params: {minutes: (sessionTime - mins * 60)}}],
        });

    }

    return (
        <>
            <Canvas>
                <ambientLight/>
                <pointLight position={[10, 10, 10]}/>

                <Cylinder position={[0, -0.65, 0]} color={'orange'} radius={0.4} height={3}/>
                <Cylinder position={[0, -1.5, 0]} color={'grey'} radius={3} height={0.1}/>
                {/*<OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />*/}
                <Cylinder position={[0, 0.6, 0]} color={'black'} radius={0.01} height={0.3}/>
                <Cone position={[0, 0.9, 0]} color={'orange'} radius={0.1} height={0.3} radialSegments={15}/>
                <Cone position={[0, 0.85, 0]} color={'red'} radius={0.25} height={0.5} radialSegments={15}/>
            </Canvas>
            <View style={styles.container}>

                {hidden &&
                    <CountdownCircleTimer
                        isPlaying
                        duration={sessionTime * 60}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[sessionTime * 60, sessionTime * 45, sessionTime * 30, sessionTime * 15]}
                        size={300}
                        onComplete={() => endSession(0)}
                    >
                        {renderTime}
                    </CountdownCircleTimer>
                }
                {!hidden &&
                    <>
                        <Ripple style={styles.bottom} onPress={() => beginSession(60 * parseInt(hrs) + parseInt(mins))}>
                            <Text style={textButtons.normal}>Begin Session</Text>
                        </Ripple>

                        <TimePicker style={{flex: 0.4, justifyContent: 'center'}} onChange={handleChange}
                                    hoursUnit={'hrs'} minutesUnit={'min'}/>
                    </>
                }


            </View>


        </>
    );
}
export default Candle;