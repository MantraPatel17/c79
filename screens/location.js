import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from "axios";

export default class LocationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }

  getISSLocation = () => {
    axios
      .get('https://api.wheretheiss.at/v1/satellites/25544')
      .then((response) => {
        this.setState({
          location: response.data,
        }).catch((error) => {
          alert(error.message);
        });
      });
  };

  componentDidMount() {
    this.getISSLocation();
  }
  render() {
    if (Object.keys(this.state.location).length === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Loading... Might Take Some Time</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
          }}>
          <SafeAreaView style={styles.droidSafeArea} />
          <ImageBackground
            source={require('../assets/iss_bg.jpg')}
            style={styles.backgroundImage}>
            <Text> Location Screen </Text>
            <View style={{ flex: 0.7 }}>
              <MapView
                style={{
                  width: '100%',
                  height: '100%',
                }}
                region={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                  latitudeDelta: 100,
                  longitudeDelta: 100,
                }}>
                <Marker
                  coordinate={{
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                  }}>
                  <Image
                    source={require('../assets/iss_icon.png')}
                    style={{
                      height: 50,
                      width: 50,
                    }}
                  />
                </Marker>
              </MapView>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                Latitude:{this.state.location.latitude}
              </Text>
              <Text style={styles.infoText}>
                Longitude:{this.state.location.longitude}
              </Text>
              <Text style={styles.infoText}>
                Altitude(Km):{this.state.location.altitude}
              </Text>
              <Text style={styles.infoText}>
                Velocity(Km/h):{this.state.location.velocity}
              </Text>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 0.2,
    backgroundColor: 'white',
    marginTop: -10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },
  infoText: {
    fontSize: 15,
    color: 'cyan',
    fontWeight: 'bold',
  },
});
