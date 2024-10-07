import {Text, View} from "react-native";
import DateUtil from "@/utils/DateUtil";
import {useNavigation} from "@react-navigation/native";


export default function Event() {

    const event = (useNavigation().getState()?.routes[1].params.event);
    return (
        <View style={undefined}>

            <Text style={{marginBottom: 5}}>{event.name}</Text>
            <Text>{DateUtil(event.date)}</Text>
            <Text>{event.url}</Text>

            <Text>{event.description}</Text>


        </View>
    )
}