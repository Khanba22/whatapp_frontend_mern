import { createSlice } from "@reduxjs/toolkit";

const chatReducer = createSlice({
    name:"chatReducer",
    initialState: {
        username: "",
        contactNo: "1658121206",
        lastSeen: "3:13 PM",
        chats: [],
        profilePicture: "http://dummyimage.com/156x100.png/cc0000/ffffff"
    },
    reducers:{
        updateChat:(state,action)=>{
            return {
                ...state,
                ...action.payload,
                chats:action.payload.chats
            }
        },
        updateChatStatus:(state,action)=>{
            const {status} = action.payload
            return {
                ...state,
                chats: state.chats.map(chat => {
                    return {
                        ...chat,
                        status:status
                    };
                })
            };
        },
        updateChatStatusLast:(state,action)=>{
            const {status} = action.payload
            return {
                ...state,
                chats: state.chats.map((chat,index)=>{
                    if (index === state.chats.length - 1) {
                        return {
                            ...chat,
                            status:status
                        }
                    }else{
                        return chat
                    }
                })
            };
        },
    }
})
export const {updateChat,updateChatStatus,updateChatStatusLast} = chatReducer.actions
export default  chatReducer.reducer;