import { createSlice } from "@reduxjs/toolkit";
const userReducers = createSlice({
    name: "userReducer",
    initialState: {
        username: "",
        lastSeen:"",
        contacts: [],
        profilePicture:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReG1Q1niGCxmNCzqY0JntvFVoiA2JNRHiMhHB8dRrikQ&s",
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
            const contacts = action.payload.contacts
            return {
                ...state,
                contacts:contacts
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
                    console.log(contact.username,contactName)
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