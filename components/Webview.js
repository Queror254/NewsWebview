import React, { useRef, useState, useEffect } from "react";
import { Text, TouchableOpacity, BackHandler, Dimensions, ActivityIndicator, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
//import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { WebView } from 'react-native-webview';
import icons from "../constants/icons.js"
import ScreenHeaderBtn from "../components/header/ScreenHeaderBtn"


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function Webview({ navigation }) {
	//const [isLoading, setIsLoading] = useState(true);
	const webViewRef = useRef(null);
	//const nav = useNavigation();
	const route = useRoute();
	const [url, setUrl] = useState(null);
	const [state, setState] = useState({})


	const onNavigationStateChange = (navState) => {
		console.log(navState)
		setState(navState);
	};


	useEffect(() => {
		if (route.params?.url) {
			setUrl(route.params.url);
		}
	}, [route.params]);

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", handleBackButton);

		return () => {
			// Remove event listener when component unmounts
			BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
		};
	}, []);



	// Handle Android hardware back button press
	const handleBackButton = () => {
		if (webViewRef.current) {
			webViewRef.current.goBack();
			return true; // Prevent default back action
		}
		return navigation.goBack(); // Allow default back action if WebView is not loaded
	};
	return (

		<View style={{ flex: 1 }}>



			{url && (
				<WebView
					style={{ flex: 1, height: 40 }}
					source={{ uri: url }}
					ref={webViewRef}
					onNavigationStateChange={onNavigationStateChange}


				/>
			)}
		</View>

	);
}