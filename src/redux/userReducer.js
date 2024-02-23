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
                    console.log(contact.username,contactName)
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
        }
    }
})
export const { changeDetails , updateUserChats , updateUserChatStatus } = userReducers.actions
export default userReducers.reducer;