import { createSlice } from '@reduxjs/toolkit';

export const venueSlice = createSlice({
  name: 'venue',
  initialState: [
    { img: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=640&q=70', name: 'Conference Room', capacity: 15, cost: 1500, quantity: 0, max: 10 },
    { img: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=640&q=70', name: 'Auditorium Hall', capacity: 200, cost: 5500, quantity: 0, max: 3 },
    { img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=640&q=70', name: 'Presentation Room', capacity: 50, cost: 3500, quantity: 0, max: 10 },
    { img: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=640&q=70', name: 'Large Meeting Room', capacity: 10, cost: 1000, quantity: 0, max: 10 },
    { img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=640&q=70', name: 'Small Meeting Room', capacity: 5, cost: 800, quantity: 0, max: 10 },
  ],
  reducers: {
    incrementQuantity: (state, action) => {
      const item = state[action.payload];
      if (item && item.quantity < item.max) item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state[action.payload];
      if (item && item.quantity > 0) item.quantity--;
    },
  },
});

export const { incrementQuantity, decrementQuantity } = venueSlice.actions;
export default venueSlice.reducer;
