import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
    loader: false,
    purpose: "",
}

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducerrs: {
        starLoaderAct: (state, action) => {
            if (!state.loader) {
                state.loader = true

                if (action?.payload != undefined) {
                    state.purpose = action.payload
                }

            }
        },

        stopLoaderAct: (state) => {
            state.loader = false,
                state.purpose = ""

        },
    },
})

export const { starLoaderAct, stopLoaderAct } = loaderSlice.actions
export default loaderSlice.reducer