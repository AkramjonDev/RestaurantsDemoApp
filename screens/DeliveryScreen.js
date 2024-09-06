import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaruantSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import imageGif from "../assets/200w.gif";
import * as Progress from "react-native-progress";
// import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon width={40} height={40} color={"white"} />
          </TouchableOpacity>
          <Text style={styles.orderHelpText}>Order Help</Text>
        </View>

        <View style={styles.deliveryInfo}>
          <View style={styles.deliveryDetails}>
            <View>
              <Text style={styles.estimatedArrivalText}>Estimated Arrival</Text>
              <Text style={styles.estimatedTimeText}>45-55 minut</Text>
            </View>
            <Image style={styles.gifImage} source={imageGif} />
          </View>
          <Progress.Bar color="#00CCBB" indeterminate={true} />

          <Text style={styles.preparationText}>
            Your order at{" "}
            <Text style={styles.restaurantName}>{restaurant.title}</Text> is
            being prepared
          </Text>
        </View>
      </SafeAreaView>

      {/* <MapView
        initialRegion={{
          latitude: restaurant?.lat || 37.7749, // Default latitude 
          longitude: restaurant?.long || -122.4194, // Default longitude 
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={styles.map}
        mapType="mutedStandard"
      >
        {restaurant?.lat && restaurant?.long && (
          <Marker
            coordinate={{
              latitude: restaurant.lat,
              longitude: restaurant.long,
            }}
            title={restaurant.title}
            description={restaurant.restaurant_description}
            identifier="origin"
            pinColor="#00CCBB"
          />
        )}
      </MapView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00CCBB",
  },
  safeArea: {
    zIndex: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  orderHelpText: {
    fontSize: 18,
    color: "white",
    fontWeight: "300",
  },
  deliveryInfo: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 20,
    zIndex: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  deliveryDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  estimatedArrivalText: {
    fontSize: 18,
    color: "#9CA3AF", // Gray color
  },
  estimatedTimeText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  gifImage: {
    width: 80,
    height: 80,
  },
  preparationText: {
    marginTop: 10,
    color: "#6B7280", // Gray color for the text
  },
  restaurantName: {
    fontWeight: "600",
    color: "black",
  },
  map: {
    flex: 1,
    marginTop: 40,
    zIndex: 0,
  },
});

export default DeliveryScreen;
