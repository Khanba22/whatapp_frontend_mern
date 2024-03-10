import React from "react";
import "./stylesheets/Root.css"
import styles from "./App.module.css"
import { Provider } from "react-redux";
import Chatbox from "./components/Chatbox";
import ContactList from "./components/ContactList";
import store from "./redux/store";
import ChatPage from "./pages/ChatPage";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
function App() {
  return (
    <Provider store={store}>
      <div className={styles.App}>
          <BrowserRouter>
            <Routes>
                <Route path="/" element = {<LoginForm/>}/>
                <Route path="/signup" element = {<SignUpForm/>}/>
                <Route path="/chatPage" element = {<ChatPage/>} />
            </Routes>
          </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
