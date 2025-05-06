import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Создание асинхронного thunk для получения случайной цитаты
export const fetchRandomQuote = createAsyncThunk('quote/fetchRandomQuote', async () => {
  const { data } = await axios.get('https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random');
  return data[0];
});
const quoteSlice = createSlice({
  name: 'quote',
  initialState: {
    quote: null,
    author: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomQuote.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        
        state.status = 'succeeded';
        state.quote = action.payload.q;
        state.author = action.payload.a;
      })
      .addCase(fetchRandomQuote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default quoteSlice.reducer;