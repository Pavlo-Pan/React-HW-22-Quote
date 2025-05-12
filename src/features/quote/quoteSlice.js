import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRandomQuote = createAsyncThunk('quote/fetchRandomQuote', async () => {
  const response = await axios.get('https://zenquotes-proxy.onrender.com/api/random');
  return response.data;
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
        state.error = null;
      })
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.quote = action.payload.q;
        state.author = action.payload.a;
      })
      .addCase(fetchRandomQuote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default quoteSlice.reducer;