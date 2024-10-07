import {Button, View} from "react-native";

function HomeScreen({ navigation: { navigate } }) {
    return (
        <View>
            <Text>This is the home screen of the app</Text>
            <Button
                title="Go to Brent's profile"
            />
        </View>
    );
}