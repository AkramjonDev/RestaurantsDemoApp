import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import CategoryCard from "./CategoryCard";
import client, { urlFor } from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "category"]`)
      .then((data) => {
        console.log("Fetched categories:", data);
        setCategories(data);
      })
      .catch(console.error);

    const subscription = client
      .listen(`*[_type == "category"]`)
      .subscribe((update) => {
        console.log("Update received:", update);
        client
          .fetch(`*[_type == "category"]`)
          .then((data) => {
            console.log("Fetched categories after update:", data);
            setCategories(data);
          })
          .catch(console.error);
      });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
    >
      {categories.length > 0 ? (
        categories.map((category) => (
          <CategoryCard
            key={category._id}
            imgUrl={urlFor(category.image).url()}
            title={category.name}
          />
        ))
      ) : (
        <Text>No categories found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
});

export default Categories;
