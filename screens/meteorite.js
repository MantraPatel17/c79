import *as React from 'react'
import {View,Text,StyleSheet, Alert} from 'react-native'
import axios from "axios"



export default class MeteoriteScreen extends React.Component{

    constructor(props){
        super(props);
        this.state={
            meteors:{}
        }
    }

    getMeteors=()=>{
        axios
        .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=GpM4if7eDfqcdr8xB7vV1BLRzScahvV4ig3ehmiE")
        .then(response=>{
            this.setState({meteors:response.data.near_earth_objects})
            .catch(error=>{
                Alert.alert(error.message)
            })
        })
    }

    componentDidMount(){
        this.getMeteors()
    }

render(){
    if (Object.keys(this.state.meteors).length === 0) {
    return(
        <View style= {{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'white',
            alignItems:'center',
        }}>
          <Text>Loading... Might Take Some Time</Text>
        </View>
    )
}
else{
    let meteor_arr = Object.keys(this.state.meteors).map(meteor_date =>{
        return this.state.meteors[meteor_date]
    })
    let meteors = [].concat.apply([],meteor_arr)

    meteors.forEach(function (element) {
        let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
        let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
        element.threat_score = threatScore;
    });
    return(
        <View
        style= {{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'white',
            alignItems:'center',
        }}>
            <Text>Meteorite Screen</Text>
        </View>
    )
}
}
}