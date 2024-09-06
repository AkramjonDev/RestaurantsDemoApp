import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MapPinIcon, StarIcon } from "react-native-heroicons/outline";
// import dish from "../sanity/schemaTypes/dish";
import DishRow from "./DishRow";

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  restaurant_description,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          restaurant_description,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      style={styles.container}
    >
      <Image source={{ uri: imgUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
          <StarIcon opacity={0.5} size={22} color="green" />
          <Text style={styles.rating}>
            <Text style={styles.ratingNumber}>{rating}</Text> {genre}
          </Text>
        </View>
        <View style={styles.row}>
          <MapPinIcon size={22} color="gray" />
          <Text style={styles.address}>Nearby - {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    color: "gray",
  },
  ratingNumber: {
    color: "green",
  },
  address: {
    fontSize: 14,
    color: "gray",
  },
});

export default RestaurantCard;
