import { createSlice } from "@reduxjs/toolkit";

const chatReducer = createSlice({
    name:"chatReducer",
    initialState: {
        name:"",
        contactNo:"",
        profilePicture:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReG1Q1niGCxmNCzqY0JntvFVoiA2JNRHiMhHB8dRrikQ&s",
        lastSeen:"",
        chats: []
    },
    reducers:{
        updateChat:(state,action)=>{
            const data = action.payload.data
            return{
                ...state,
                name:data.name,
                chats:data.chats,
                contactNo:data.contactNo,
                lastSeen:data.lastSeen,
                profilePicture:data.profilePicture
            }
        },
        deleteChat:(state,action)=>{
            const data = action.payload.data
            return{
                ...state,
            }
        }
    }
})
export const {updateChat} = chatReducer.actions
export default  chatReducer.reducer;