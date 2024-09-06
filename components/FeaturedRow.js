import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import RestaurantCard from "./RestaurantCard";
import client, { urlFor } from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      client
        .fetch(
          `*[_type == "featured" && _id == $id]{
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
          }[0]`,
          { id }
        )
        .then((data) => {
          setRestaurants(data?.restaurants || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={urlFor(restaurant.image).url()}
              title={restaurant.name}
              rating={restaurant.rating}
              genre={restaurant.type?.name}
              address={restaurant.address}
              restaurant_description={restaurant.restaurant_description}
              dishes={restaurant.dishes}
              short_description={restaurant.short_description}
              long={restaurant.longtitude}
              lat={restaurant.latitude}
            />
          ))
        ) : (
          <Text style={styles.noDataText}>No restaurants found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  description: {
    fontSize: 14,
    color: "gray",
    marginLeft: 10,
    marginBottom: 10,
  },
  scrollView: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 5,
  },
  noDataText: {
    fontSize: 16,
    color: "gray",
    paddingHorizontal: 10,
  },
});

export default FeaturedRow;
