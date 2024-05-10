import { createSlice } from "@reduxjs/toolkit";

let id = 0;

const dailyMenuSlice = createSlice({
    name: 'dailyMenu',
    initialState: {
        items: [],
        totalCalories: 0,
    },
    reducers: {
        addToMenu(state, action) {
            const newItem = action.payload;
            //check if item already exists
            const existingItem = state.items.find((item) => item.name === newItem.name);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.calories += newItem.calories;
            } else {
                 state.items.push({
                id: ++id,
                calories: newItem.calories,
                quantity: 1,
                name: newItem.name,
            });
            }
            state.totalCalories += newItem.calories;
        },
        removeFromMenu(state, action) {
            const { id, calories } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.calories -= calories;
            }
            state.totalCalories -= existingItem.calories;
        }
    }
})


export const dailyMenuActions = dailyMenuSlice.actions;
export default dailyMenuSlice;