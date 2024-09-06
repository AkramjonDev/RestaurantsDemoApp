import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { selectRestaurant } from "../features/restaruantSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/outline";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity/sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState({});
  const dispatch = useDispatch();
  const basketTotal = useSelector(selectBasketTotal);

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      if (!results[item.id]) {
        results[item.id] = [];
      }
      results[item.id].push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  console.log(groupedItemsInBasket);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Basket</Text>
            <Text style={styles.restaurantTitle}>{restaurant?.title}</Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={styles.closeButton}
          >
            <XCircleIcon width={40} height={40} color={"#00CCBB"} />
          </TouchableOpacity>
        </View>

        <View style={styles.deliveryInfo}>
          <Image
            style={styles.deliveryImage}
            source={{ uri: "https://links.papareact.com/0pk" }}
          />
          <Text style={styles.deliveryText}>Deliver in 50-70 min</Text>
          <TouchableOpacity>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.itemsContainer}>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View key={key} style={styles.itemRow}>
              <Text style={styles.itemQuantity}>{items.length} x</Text>
              <Image
                source={{
                  uri:
                    urlFor(items[0]?.image)?.url() ||
                    "https://via.placeholder.com/150",
                }}
                style={styles.itemImage}
              />
              <Text style={styles.itemName}>{items[0]?.name}</Text>
              <Text style={styles.itemPrice}>
                <Currency quantity={items[0]?.price} currency="USD" />
              </Text>

              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({ id: key }))}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.orderSummary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryText}>
              <Currency quantity={basketTotal} currency="USD" />
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Delivery fee</Text>
            <Text style={styles.summaryText}>
              <Currency quantity={4} currency="USD" />
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Order total</Text>
            <Text style={styles.totalAmount}>
              <Currency quantity={basketTotal + 4} currency="USD" />
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrderScreen")}
            style={styles.placeOrderButton}
          >
            <Text style={styles.placeOrderText}>Place to order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#F3F4F6", 
    marginBottom: 20,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#00CCBB",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: "relative",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  restaurantTitle: {
    textAlign: "center",
    color: "#6B7280", 
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 20,
    backgroundColor: "#F3F4F6",
    borderRadius: 9999,
    padding: 5,
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    marginVertical: 20,
  },
  deliveryImage: {
    width: 28,
    height: 28,
    backgroundColor: "#D1D5DB",
    borderRadius: 9999,
    padding: 12,
  },
  deliveryText: {
    flex: 1,
    marginLeft: 16,
  },
  changeText: {
    color: "#00CCBB",
  },
  itemsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB", 
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  itemQuantity: {
    color: "#00CCBB",
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
  itemName: {
    flex: 1,
    marginLeft: 16,
  },
  itemPrice: {
    color: "#4B5563",
  },
  removeText: {
    color: "#00CCBB",
    fontSize: 12,
  },
  orderSummary: {
    padding: 20,
    backgroundColor: "white",
    marginTop: 20,
    spaceBetween: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryText: {
    color: "#6B7280", 
  },
  totalText: {
    fontWeight: "bold",
  },
  totalAmount: {
    fontWeight: "bold",
  },
  placeOrderButton: {
    marginTop: 16,
    backgroundColor: "#00CCBB",
    padding: 16,
    borderRadius: 8,
  },
  placeOrderText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default BasketScreen;
