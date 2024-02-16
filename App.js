import "react-native-gesture-handler"; //this should be the first import in your code
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Text, Button, TouchableOpacity } from "react-native";
//import { createDrawerNavigator } from "@react-navigation/drawer";
import { NativeBaseProvider } from "native-base";
import { Image } from "react-native"; // Import Image component
import { useTheme } from '@react-navigation/native';
import { SSRProvider } from '@react-aria/ssr';

//it is always useful to implement navigation in the root App.js file
//screen components to be used in navigation are imported here 


//import JobNews from './components/JobNews';
//import HomeScreen from './components/Home'
import icons from "./constants/icons.js"
import ScreenHeaderBtn from "./components/header/ScreenHeaderBtn"
import { COLORS } from "./constants/theme.js"
import CNN from "./components/CNN.js";
import WebView from "./components/Webview";
import BBC from "./components/BBC.js";
import Aljazeera from "./components/Aljazeera.js";




//creating instances of the navigation functions
const Stack = createNativeStackNavigator();//stack nav
const Tab = createMaterialBottomTabNavigator();//tab nav
//const Drawer = createDrawerNavigator(); //drawer nav

const tabBarIcons = {
  "Al Jazeera": require("./assets/aljazeera.png"),
  "CNN": require("./assets/cnn.png"),
  "BBC": require("./assets/bbc.png")

};

//tab navigation implementation
const MyTabs = () => {
  const { colors } = useTheme();
  return (
    // <HStack
    //     my="800"
    //  >
    <Tab.Navigator initialRouteName="Al Jazeera"
      barStyle={{ backgroundColor: "#FFFFFF", height: 60 }}
      screenOptions={({ route }) => ({

        tabBarIcon: ({ focused, color, size }) => {
          // Get the appropriate icon for the current tab screen
          const iconSource = tabBarIcons[route.name];
          return (
            <Image
              source={iconSource}
              style={{ width: 30, height: 30 }}
            />
          );
        },

      })}

    >

      <Tab.Screen name="Al Jazeera" component={NewNav} />
      <Tab.Screen name="CNN" component={CNN} />
      <Tab.Screen name="BBC" component={BBC} />

    </Tab.Navigator >
    // </HStack>
  );
}

const NewNav = () =>
  <Stack.Navigator initialRouteName="Tabs">
    <Stack.Screen name="Tabs"
      component={Aljazeera}
      options={{ headerShown: false }}
    />

    <Stack.Screen name="Home"
      component={WebView}
      options={() => { }}
    />

  </Stack.Navigator>

export default function App() {
  return (

    <NativeBaseProvider>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </NativeBaseProvider>

  );
}

/*
 tabBarOptions={{
          tabBarStyle: {
            height: 60, // Adjust this value to increase/decrease the tab bar height
          },
        }}
      

      */




