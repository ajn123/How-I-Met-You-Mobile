import {Tabs} from "expo-router";
import {TabBarIcon} from "@/components/navigation/TabBarIcon";
import {Button} from "react-native";
import {useState} from "react";


export default function  TabLayout() {



    // @ts-ignore
    return (
        <Tabs

            >
            <Tabs.Screen
                name={"index"}
                options={{

                    tabBarIcon: (color, focused) => (
                        <TabBarIcon name={focused ? 'home': 'home-outline'} color={color} />
                    ),
                    headerLeft: () => (
                        <Button
                            onPress={() => alert('top left button')}
                            title="Filter"
                            color="#000"
                        />)
                }
                }
                />

            <Tabs.Screen
                name={'maps'}
                />



        </Tabs>
    )
}