import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Dimensions, BackHandler, SafeAreaView, Button, View, Text } from "react-native";
import { WebView } from 'react-native-webview'


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function Aljazeera({ navigation }) {

    const [isLoading, setIsLoading] = useState(true);
    const webViewRef = useRef(null);
    const nav = useNavigation();

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
        return nav.goBack(); // Allow default back action if WebView is not loaded
    };

    const handleWebViewLoadStart = () => {
        // This function will be called when the WebView starts loading a web page.
        setIsLoading(true); // Set isLoading to true to show the loading indicator.
    };

    const handleWebViewLoadEnd = () => {
        // This function will be called when the WebView finishes loading a web page.
        setIsLoading(false); // Set isLoading to false to hide the loading indicator.
    };

    const [loaded, setLoaded] = useState(false);

    return (
        <View style={{ width: width, height: height, marginTop: 20 }}>
            <View style={{ marginVertical: 15 }}>

            </View>
            {isLoading && (
                <View>
                    <ActivityIndicator size="large" color="#000000" />
                </View>
            )}
            <WebView
                source={{
                    uri: "https://www.aljazeera.com/news/",
                }}
                //onLoad={handleWebViewLoad} // Specify the onLoad event handler
                allowFullScreen={true}
                allowsFullscreenVideo={true}
                onLoadStart={handleWebViewLoadStart}
                onLoadEnd={handleWebViewLoadEnd}
                ref={webViewRef}
            />
        </View>

    )
}
/*https://chat.openai.com/** */