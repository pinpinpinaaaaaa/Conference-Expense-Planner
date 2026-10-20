import { createSlice } from '@reduxjs/toolkit';

export const mealsSlice = createSlice({
  name: 'meals',
  initialState: [
    { name: 'Breakfast', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=640&q=70', cost: 50, selected: false },
    { name: 'High Tea', img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=640&q=70', cost: 25, selected: false },
    { name: 'Lunch', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=640&q=70', cost: 65, selected: false },
    { name: 'Dinner', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=640&q=70', cost: 70, selected: false },
  ],
  reducers: {
    toggleMealSelection: (state, action) => {
      const item = state[action.payload];
      if (item) item.selected = !item.selected;
    },
  },
});

export const { toggleMealSelection } = mealsSlice.actions;
export default mealsSlice.reducer;
