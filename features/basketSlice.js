import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
        state.items = newBasket;
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as it's not in the basket`
        );
      }
    },
  },
});

// Action creators
export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors
export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsById = createSelector(
  [selectBasketItems, (state, id) => id],
  (items, id) => items.filter((item) => item.id === id)
);

export const selectBasketTotal = createSelector([selectBasketItems], (items) =>
  items.reduce((total, item) => (total += item.price), 0)
);

export default basketSlice.reducer;
