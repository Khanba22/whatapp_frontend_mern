import { createSlice } from "@reduxjs/toolkit";
const userReducers = createSlice({
    name: "userReducer",
    initialState: {
        username: "",
        lastSeen:"",
        contacts: [],
        email:"",
        password:"",
        profilePicture:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReG1Q1niGCxmNCzqY0JntvFVoiA2JNRHiMhHB8dRrikQ&s",
        contactNo: ""
    },
    reducers: {
        changeDetails: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        updateUserChats:(state,action)=>{
            return {
                ...state,
                ...action.payload
            }
        },
        updateUserChatStatus : (state,action)=>{
            const { contactName , status } = action.payload;
            return {
                ...state,
                contacts: state.contacts.map(contact => {
                    if (contact.username === contactName) {
                        return {
                            ...contact,
                            chats: contact.chats.map(chat => ({
                                ...chat,
                                status: status
                            }))
                        };
                    }
                    return contact;
                })
            };
        },
        updateUserChatStatusLast : (state,action)=>{
            const { contactName , status } = action.payload;
            return {
                ...state,
                contacts: state.contacts.map(contact => {
                    if (contact.username === contactName) {
                        return {
                            ...contact,
                            chats: contact.chats.map((chat,index)=>{
                                if (index === contact.chats.length - 1) {
                                    return {
                                        ...chat,
                                        status:status
                                    }
                                }else{
                                    return {...chat}
                                }
                            })
                        };
                    }
                    return contact;
                })
            };
        },
        addReactions:(state,action)=>{
            const { contactName , status } = action.payload;
            return {
                ...state,
                contacts: state.contacts.map(contact => {
                    if (contact.username === contactName) {
                        return {
                            ...contact,
                            chats: contact.chats.map((chat,index)=>{
                                if (index === contact.chats.length - 1) {
                                    return {
                                        ...chat,
                                        status:status
                                    }
                                }else{
                                    return {...chat}
                                }
                            })
                        };
                    }
                    return contact;
                })
            };
        }
    }
})
export const { changeDetails , updateUserChats , updateUserChatStatus ,updateUserChatStatusLast} = userReducers.actions
export default userReducers.reducer;