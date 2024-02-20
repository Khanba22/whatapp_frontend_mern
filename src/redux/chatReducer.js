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
        readChat:(state,action)=>{
            if (state.name === action.payload.name) {
                var newChats = [state.chats.map(chat=>{return {...chat,status:"read"}})]
            }
            return {
                ...state,
                chats:newChats
            }
        },
        updateChat:(state,action)=>{
            const data = action.payload.data
            if (data) {
                return{
                    ...state,
                    name:data.name,
                    chats:data.chats,
                    contactNo:data.contactNo,
                    lastSeen:data.lastSeen,
                    profilePicture:data.profilePicture
                }
            }else{
                return {
                    ...state,
                }
            }
        },
        deleteChat:(state,action)=>{
            // const data = action.payload.data
            return{
                ...state,
            }
        }
    }
})
export const {updateChat} = chatReducer.actions
export default  chatReducer.reducer;