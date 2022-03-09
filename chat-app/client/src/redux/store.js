import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./reducers/messages";
import usersReducer from "./reducers/users";
import userReducer from "./reducers/user";

export default configureStore({
  reducer: {
    messages: messagesReducer,
    users: usersReducer,
    user: userReducer,
  },
});
