import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useEffect } from "react";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.Image
        source={require("../assets/loading_animation.gif")}
        animation="slideInUp"
        iterationCount={1}
        style={styles.image}
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        style={styles.text}
      >
        Waiting for restaurant to accept your order...
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00CCBB",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 240,
    width: "100%",
  },
  text: {
    fontSize: 18,
    marginVertical: 40,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PreparingOrderScreen;
