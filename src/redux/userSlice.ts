import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './api/axiosConfig';
import { User, RandomUserResponse } from './types';

export const fetchUsers = createAsyncThunk(
    'user/fetchUser',
    async () => {
        const response = await axios.get<RandomUserResponse>('?results=100');
        return response.data.results;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [] as User[],
        loading: false,
        error: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.loading = false;
                state.error = true;
            });
    }
});

export default userSlice.reducer;
