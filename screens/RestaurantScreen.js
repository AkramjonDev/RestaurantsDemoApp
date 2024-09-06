import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useEffect } from "react";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  StarIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaruantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
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
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
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
      })
    );
  }, [
    dispatch,
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
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            style={styles.image}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeftIcon size={20} color={"#00CCBB"} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.infoRow}>
              <View style={styles.infoBlock}>
                <StarIcon color={"green"} opacity={0.5} size={22} />
                <Text style={styles.ratingText}>
                  <Text style={styles.ratingHighlight}>{rating}</Text> · {genre}
                </Text>
              </View>

              <View style={styles.infoBlock}>
                <MapPinIcon color={"gray"} opacity={0.4} size={22} />
                <Text style={styles.addressText}>{address}</Text>
              </View>
            </View>

            <Text style={styles.description}>{restaurant_description}</Text>
          </View>

          <TouchableOpacity style={styles.allergyButton}>
            <QuestionMarkCircleIcon color={"gray"} opacity={0.6} size={22} />
            <Text style={styles.allergyText}>Have a food allergy?</Text>
            <ChevronRightIcon color={"#00CCBB"} size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Menu</Text>

          {dishes && dishes.length > 0 ? (
            dishes.map((dish) => (
              <DishRow
                key={dish._id}
                id={dish._id}
                name={dish.name}
                description={dish.dish_description}
                price={dish.price}
                image={dish.image}
              />
            ))
          ) : (
            <Text style={styles.noDishesText}>No dishes</Text>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 224, 
    backgroundColor: "#E2E8F0", 
    padding: 16, 
  },
  backButton: {
    position: "absolute",
    top: 56, 
    left: 20, 
    padding: 8, 
    backgroundColor: "#F3F4F6", 
    borderRadius: 9999, 
  },
  infoContainer: {
    backgroundColor: "white",
  },
  titleContainer: {
    paddingHorizontal: 16, 
    paddingTop: 16, 
  },
  title: {
    fontSize: 24, 
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4, 
    marginBottom: 4, 
  },
  infoBlock: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8, 
  },
  ratingText: {
    fontSize: 12, 
    color: "#6B7280", 
  },
  ratingHighlight: {
    color: "#10B981", 
  },
  addressText: {
    fontSize: 12, 
    color: "#6B7280", 
  },
  description: {
    color: "#6B7280", 
    marginTop: 8, 
    paddingBottom: 16, 
  },
  allergyButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16, 
    paddingVertical: 16, 
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB", 
  },
  allergyText: {
    paddingLeft: 8,
    flex: 1,
    fontWeight: "bold",
    fontSize: 16, 
    color: "#000", 
  },
  menuContainer: {
    paddingBottom: 144, 
  },
  menuTitle: {
    paddingHorizontal: 16, 
    paddingTop: 24, 
    marginBottom: 12, 
    fontWeight: "bold",
    fontSize: 20, 
  },
  noDishesText: {
    paddingHorizontal: 16, 
    paddingTop: 24, 
    marginBottom: 12, 
    fontWeight: "bold",
    fontSize: 20, 
  },
});

export default RestaurantScreen;
