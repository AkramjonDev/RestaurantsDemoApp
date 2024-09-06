import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    // Fetch featured categories
    client
      .fetch(
        `*[_type == "featured"]{
          ...,
          restaurants[]->{
            ...,
            dishes[]->{
            _id,
            name,
            dish_description,
            price,
            image
            },
            type->{
              name
            }
          }
        }`
      )
      .then((data) => {
        console.log("Fetched featured categories:", data); // Log fetched data
        setFeaturedCategories(data);
      })
      .catch(console.error);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={{ uri: "https://links.papareact.com/wru" }}
        />
        <View style={styles.locationContainer}>
          <Text style={styles.smallText}>Deliver Now!</Text>
          <View style={styles.locationTextContainer}>
            <Text style={styles.boldText}>Current Location</Text>
            <ChevronDownIcon size={20} color="#00CCBB" />
          </View>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      <View style={styles.searchFlex}>
        <View style={styles.searchContainer}>
          <MagnifyingGlassIcon color={"#00CCBB"} size={30} />
          <TextInput
            style={styles.input}
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsHorizontalIcon color={"#00CCBB"} size={35} />
      </View>
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Categories */}
        <Categories />
        {/* Featured Rows */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 5,
  },
  header: {
    flexDirection: "row",
    paddingBottom: 3,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  profileImage: {
    width: 35,
    height: 35,
    backgroundColor: "#ccc",
    borderRadius: 50,
  },
  locationContainer: {
    flex: 1,
    marginLeft: 10,
  },
  locationTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallText: {
    fontWeight: "bold",
    color: "#888",
    fontSize: 12,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  searchFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E7E9",
    flex: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "black",
    padding: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;
