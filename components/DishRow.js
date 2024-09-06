import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import client, { urlFor } from "../sanity";
import Currency from "react-currency-formatter";
import { useState } from "react";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsById,
} from "../features/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const imageUrl = image ? urlFor(image).url() : null;

  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemsById(state, id));

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (items.length <= 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        key={id}
        onPress={() => setIsPressed(!isPressed)}
        style={[
          styles.container,
          isPressed && styles.containerPressed,
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text>
            <Currency quantity={price} currency="USD" />
          </Text>
        </View>
        <View>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <View style={styles.noImageContainer}>
              <Text>No Image</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View style={styles.actionContainer}>
          <View style={styles.actionRow}>
            <TouchableOpacity onPress={removeItemFromBasket}>
              <MinusCircleIcon
                color={items.length > 0 ? "#00CCBB" : "gray"}
                size={40}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color={"#00CCBB"} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB", 
    backgroundColor: "white",
  },
  containerPressed: {
    borderBottomWidth: 0, 
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#6B7280", 
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  noImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#E5E7EB", 
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  actionContainer: {
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 12,
    spaceBetween: 8,
  },
});

export default DishRow;
