import { createSlice } from '@reduxjs/toolkit';

export const avSlice = createSlice({
  name: 'av',
  initialState: [
    { img: 'https://images.unsplash.com/photo-1626379961798-54f819ee896a?auto=format&fit=crop&w=640&q=70', name: 'Projectors', cost: 200, quantity: 0 },
    { img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=640&q=70', name: 'Speaker', cost: 35, quantity: 0 },
    { img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=640&q=70', name: 'Microphones', cost: 45, quantity: 0 },
    { img: 'https://images.unsplash.com/photo-1532619187608-e5375cab36aa?auto=format&fit=crop&w=640&q=70', name: 'Whiteboards', cost: 80, quantity: 0 },
    { img: 'https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?auto=format&fit=crop&w=640&q=70', name: 'Signage', cost: 80, quantity: 0 },
  ],
  reducers: {
    incrementAvQuantity: (state, action) => {
      const item = state[action.payload];
      if (item) item.quantity++;
    },
    decrementAvQuantity: (state, action) => {
      const item = state[action.payload];
      if (item && item.quantity > 0) item.quantity--;
    },
  },
});

export const { incrementAvQuantity, decrementAvQuantity } = avSlice.actions;
export default avSlice.reducer;
