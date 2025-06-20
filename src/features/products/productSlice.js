import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("products")) || [],
};

const saveToStorage = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newItem = { ...action.payload, id: Date.now() };
      state.items.push(newItem);
      saveToStorage(state.items);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        saveToStorage(state.items);
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
      saveToStorage(state.items);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productSlice.actions;
export default productSlice.reducer;
