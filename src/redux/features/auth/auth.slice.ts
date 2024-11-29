import { User } from "@/types/user.type";
import tokenUtil from "@/utils/token.util";
import { createSlice } from "@reduxjs/toolkit";

export interface IAuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: IAuthState = {
  isAuthenticated: !!tokenUtil.isLogin(),
  user: tokenUtil.isLogin() ? tokenUtil.getUser() : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
