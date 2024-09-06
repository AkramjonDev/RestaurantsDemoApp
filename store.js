import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import restaruantReducer from "./features/restaruantSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaruantReducer,
  },
});
