import React from "react";
import "./stylesheets/Root.css"
import styles from "./App.module.css"
import { Provider } from "react-redux";
import Chatbox from "./components/Chatbox";
import ContactList from "./components/ContactList";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <div className={styles.App} style={{ padding: "30px 0px 0px 30px", height: "100vh" , display:"flex" }}>
        <ContactList />
        <Chatbox/>
      </div>
    </Provider>
  );
}

export default App;
