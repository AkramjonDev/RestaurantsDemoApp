import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  restaurant: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    restaurant_description: null,
    short_description: null,
    dishes: null,
    long: null,
    lat: null,
  }
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
        state.restaurant = action.payload;
    }
  },
});

// Action creators
export const { setRestaurant } = restaurantSlice.actions;

// Selectors
export const selectRestaurant = (state) => state.restaurant.restaurant;


export default restaurantSlice.reducer;
