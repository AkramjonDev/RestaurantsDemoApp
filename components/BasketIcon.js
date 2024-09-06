import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const total = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        style={styles.button}
      >
        <Text style={styles.itemCount}>{items.length}</Text>
        <Text style={styles.viewBasketText}>View Basket</Text>
        <Text style={styles.totalText}>
          {/* <Currency quantity={total} currency="USD" /> */}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    zIndex: 50,
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: "#00CCBB",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemCount: {
    color: "white",
    fontWeight: "800",
    fontSize: 18,
    backgroundColor: "#01A296",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  viewBasketText: {
    flex: 1,
    fontWeight: "800",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  totalText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
});

export default BasketIcon;
