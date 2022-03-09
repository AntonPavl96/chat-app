import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { name: "", room: "" },
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { signIn } = userSlice.actions;

export default userSlice.reducer;
