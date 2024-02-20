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
        },
        updateUserChats:(state,action)=>{
            return {
                ...state,
                contacts:action.payload.contacts
            }
        },
        readChats : (state,action)=>{
            // const contact = action.payload.contact
            
            return {
                ...state,
            }
        }

    }
})
export const { changeDetails , updateUserChats } = userReducers.actions
export default userReducers.reducer;