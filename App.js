import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Barometer, Gyroscope, LightSensor, Pedometer } from 'expo-sensors';
import { useEffect, useState } from 'react';

export default function App() {

  const [{ pressure, relativeAltitude }, setBarometerData] = useState({});
  const[{x, y , z}, setGyroscopeData] = useState({});
  const[{isPedometerAvailable, pastStepCount, currentStepCount}, setPedometerData] = useState({});

  useEffect(() => {

    const getData = async () => {

      const {barometerStatus} = await Barometer.requestPermissionsAsync();
      await Barometer.addListener(setBarometerData);
      console.log('Barometric Pressure: ', pressure);
      console.log('Altitude: ', relativeAltitude);

      const {gyroscopeStatus} = await Gyroscope.requestPermissionsAsync();
      await Gyroscope.setUpdateInterval(2000)
      await Gyroscope.addListener(setGyroscopeData);

      const {pedometerStatus} = await Pedometer.requestPermissionsAsync();
      await Pedometer.watchStepCount(result => {
        setPedometerData({
          currentStepCount: result.steps,
        });
      });

    };

    getData();
    
  }, []);

  return (
    <View style={styles.container}>
      <Text>Barometer Pressure: {pressure} hPa</Text>
      <Text>Relative Altitude: {relativeAltitude} m</Text>
      <Text>Gyroscope: </Text>
      <Text>x: {x}</Text>
      <Text>y: {y}</Text>
      <Text>z: {z}</Text>
      <Text>Pedometer: {currentStepCount}</Text>
      <Text></Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
