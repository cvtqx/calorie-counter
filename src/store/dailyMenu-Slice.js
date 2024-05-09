import { createSlice } from "@reduxjs/toolkit";

const dailyMenuSlice = createSlice({
    name: 'dailyMenu',
    initialState: {
        items: [],
        totalCalories: 0,
    },
    reducers: {
        addToMenu(state, action) {
            const newItem = action.payload;
            state.items.push({
                id: newItem.id,
                calories: newItem.calories,
                quantity: 1,
                name: newItem.name,
            });
            state.totalCalories += newItem.calories;
        }
    }
})


export const dailyMenuActions = dailyMenuSlice.actions;
export default dailyMenuSlice;