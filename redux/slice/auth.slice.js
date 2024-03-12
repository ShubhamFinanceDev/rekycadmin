import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    user: {
        name: "",
        phone: "",
        email: "",
    },
    company: {},
    token: "",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.company = action.payload.company;
        },
    },
})


export const { setUser } = authSlice.actions
export default authSlice.reducer