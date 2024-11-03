import { View, Text, Dimensions, Platform } from "react-native";
import MapView from 'react-native-maps';

export default function maps() {
    // Location.requestForegroundPermissionsAsync();

    const deviceHeight = Dimensions.get("window").height

    if (Platform.OS === "ios") {
        // your code using Geolocation and asking for authorisation with

    } else {
        // ask for PermissionAndroid as written in your code
    }


    return (
        <View>
            <MapView style={{ height: deviceHeight }} showsUserLocation={true} followsUserLocation={true} />
        </View>
    );
}