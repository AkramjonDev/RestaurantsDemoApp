import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: imgUrl }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 10,
    borderRadius: 10,
    position: "relative",
    marginBottom: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  title: {
    marginTop: 5,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default CategoryCard;
