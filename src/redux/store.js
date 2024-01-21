import { configureStore  } from "@reduxjs/toolkit";
import chatReducer from "./chatReducer";
import userReducer from "./userReducer"
import replyReducer from "./replyReducer";

export default  configureStore({
    name: "store",
    reducer:{
        chatDetails: chatReducer,
        user:userReducer,
        reply:replyReducer
    }
})