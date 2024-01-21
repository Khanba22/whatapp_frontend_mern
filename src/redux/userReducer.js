import { createSlice } from "@reduxjs/toolkit";
const userReducers = createSlice({
    name: "userReducer",
    initialState: {
        username: "",
        contacts: [],
        contactNo: ""
    },
    reducers: {
        changeDetails: (state, action) => {
            const name = action.payload.name
            return {
                ...state,
                [name]: action.payload.value
            }
        }
    }
})
export const { changeDetails } = userReducers.actions
export default userReducers.reducer;